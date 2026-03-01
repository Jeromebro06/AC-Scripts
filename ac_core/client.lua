AC = {}

function AC:SendSecuredServerEvent(event, ...)
    TriggerLatentServerEvent(event, 500000, ...)
end

function AC:switch(case)
    return setmetatable({case = case}, {
        __call = function(self, cases)
            local action = cases[self.case] or cases.default
            if action then
                return action()
            end
        end
    })
end

function AC:IsSpawned()
    local p = PlayerPedId()
    local d = #(GetEntityCoords(p) - vector3(0, 0, 0))
    if d <= 5.0 then return false end
    if not NetworkIsPlayerActive(PlayerId()) == 1 then return false end
    if not NetworkIsPlayerConnected(PlayerId()) == 1 then return false end
    if IsPlayerSwitchInProgress() then return false end
    if IsRadarPreferenceSwitchedOn() and not IsRadarHidden() then
        if not IsMinimapRendering() then return false end
    end
    return true
end

function AC:loadAnimDict(dict)
	while (not HasAnimDictLoaded(dict)) do
		RequestAnimDict(dict)
		Wait(5)
	end
end

local blips = {}
function AC:addBlip(coords, design, color, scale, name)
    if not coords or not design then return nil end
    local blip = AddBlipForCoord(coords.x, coords.y, coords.z)
    SetBlipSprite(blip, design)
    SetBlipColour(blip, color)
    SetBlipAsShortRange(blip, true)
    SetBlipScale(blip, scale)
    BeginTextCommandSetBlipName('STRING')
    AddTextComponentSubstringPlayerName(name)
    EndTextCommandSetBlipName(blip)
    blips[blip] = { coords = coords, design = design, color = color, scale = scale, name = name }
    return blip
end

function AC:removeBlip(blip)
    if blips[blip] then
        RemoveBlip(blip)
        blips[blip] = nil
        return true
    end
    return false
end

function AC:updateBlip(blip, coords, design, color, scale, name)
    if not blips[blip] then return nil end
    if blips[blip].design ~= design then
        AC:removeBlip(blip)
        return AC:addBlip(coords, design, color, scale, name)
    end
    SetBlipCoords(blip, coords.x, coords.y, coords.z)
    SetBlipColour(blip, color)
    SetBlipScale(blip, scale)
    BeginTextCommandSetBlipName('STRING')
    AddTextComponentSubstringPlayerName(name)
    EndTextCommandSetBlipName(blip)
    blips[blip] = { coords = coords, design = design, color = color, scale = scale, name = name }
    return blip
end

function AC:isPlayerInsideMarker(markerType, markerX, markerY, playerX, playerY, lengthX, lengthY)
    if markerType == 43 then
        local halfLengthX = lengthX / 2
        local halfLengthY = lengthY / 2
        return (playerX >= markerX - halfLengthX and playerX <= markerX + halfLengthX) and
               (playerY >= markerY - halfLengthY and playerY <= markerY + halfLengthY)
    else
        local distance = math.sqrt((playerX - markerX)^2 + (playerY - markerY)^2)
        local radius = math.max(lengthX, lengthY)
        return distance <= radius
    end
end

local markers = {}
function AC:createMarkerInteract(config, actionCallback)
    local markerConfig = {
        markertype = config.markertype or 1,
        color = config.color or {r = 255, g = 0, b = 0, a = 255},
        scale = config.scale or 1.0,
        lenghtx = config.lenghtx or config.scale or 1.0,
        lenghty = config.lenghty or config.scale or 1.0,
        vehicleonly = config.vehicleonly or false,
        playeronly = config.playeronly or false,
        visibledistance = config.visibledistance or 10.0,
        coords = config.coords or {},

        camfollow = config.animation and config.animation.camfollow or false,
        bump = config.animation and config.animation.bump or false,
        rotate = config.animation and config.animation.rotate or false,
        isHidden = false
    }
    table.insert(markers, {
        config = markerConfig,
        actionCallback = actionCallback,
        isPlayerInside = false
    })
    return #markers
end

function AC:deleteMarkerInteract(markerId)
    if markers[markerId] then
        markers[markerId] = nil
    end
end

function AC:hideMarkerInteract(markerId)
    if markers[markerId] then
        markers[markerId].config.isHidden = true
    end
end

CreateThread(function()
    while true do
        local playerPed = PlayerPedId()
        local playerCoords = GetEntityCoords(playerPed)
        local isInVehicle = IsPedInAnyVehicle(playerPed, false)
        local sleep = 2000
        local markerFound = false
        if not IsEntityDead(playerPed) then
            local visibleMarkers = {}
            for index, markerData in ipairs(markers) do
                local markerConfig = markerData.config
                if (markerConfig.vehicleonly and isInVehicle) or 
                (markerConfig.playeronly and not isInVehicle) or 
                (not markerConfig.vehicleonly and not markerConfig.playeronly) then
                    for _, coord in ipairs(markerConfig.coords) do
                        local coordTable = type(coord) == "vector3" and {x = coord.x, y = coord.y, z = coord.z} or coord
                        local distance = #(playerCoords - vector3(coordTable.x, coordTable.y, coordTable.z))
                        if distance < markerConfig.visibledistance then
                            table.insert(visibleMarkers, {
                                index = index,
                                markerData = markerData,
                                markerConfig = markerConfig,
                                coordTable = coordTable,
                                distance = distance,
                                heading = coordTable.w or 0
                            })
                            markerFound = true
                        end
                    end
                end
            end
            if #visibleMarkers > 0 then
                sleep = 0
                for _, markerInfo in ipairs(visibleMarkers) do
                    local markerConfig = markerInfo.markerConfig
                    local coordTable = markerInfo.coordTable
                    local heading = markerInfo.heading

                    if not markerConfig.isHidden and markerConfig.markertype ~= -1 then
                        DrawMarker(
                            markerConfig.markertype,
                            coordTable.x, coordTable.y, coordTable.z,
                            0.0, 0.0, 0.0,
                            0.0, 0.0, heading,
                            markerConfig.lenghtx, markerConfig.lenghty, markerConfig.scale,
                            markerConfig.color.r, markerConfig.color.g, markerConfig.color.b, markerConfig.color.a,
                            markerConfig.bump, markerConfig.camfollow, 0, markerConfig.rotate, nil, nil, false
                        )
                    else
                        markerConfig.isHidden = false
                    end

                    if AC:isPlayerInsideMarker(markerConfig.markertype, coordTable.x, coordTable.y, playerCoords.x, playerCoords.y, markerConfig.lenghtx, markerConfig.lenghty) then
                        if not markerInfo.markerData.isPlayerInside then
                            markerInfo.markerData.isPlayerInside = true
                        end
                        markerInfo.markerData.actionCallback(markerInfo.index)
                    else
                        if markerInfo.markerData.isPlayerInside then
                            markerInfo.markerData.isPlayerInside = false
                        end
                    end
                    
                end
            end
        end
        if not markerFound then
            sleep = 1500
        end
        Wait(sleep)
    end
end)

function AC:getSpawnPoint(points)
    for i = 1, #points do 
        local vec3coords = vector3(points[i].x, points[i].y, points[i].z)
        if ESX.Game.IsSpawnPointClear(vec3coords, 4.5) then
            return points[i]
        end
    end
    return false
end

local spawnedDudes = {}
function AC:spawnPed(model, coord)
    local key = coord.x .. "_" .. coord.y .. "_" .. coord.z
    if spawnedDudes[key] then return end
    local pedmodel = GetHashKey(model)
    if IsModelInCdimage(pedmodel) then
        RequestModel(pedmodel)
        while not HasModelLoaded(pedmodel) do Wait(1) end
        local ped = CreatePed(4, pedmodel, coord.x, coord.y, coord.z - 1.0, coord.w, false, true)
        FreezeEntityPosition(ped, true)
        SetEntityHeading(ped, coord.w)
        SetEntityInvincible(ped, true)
        SetBlockingOfNonTemporaryEvents(ped, true)
        SetEntityAsMissionEntity(ped, true)
        SetModelAsNoLongerNeeded(pedmodel)
        spawnedDudes[key] = ped
        return key
    else
        return false
    end
end

function AC:deletePed(key)
    if spawnedDudes[key] then
        DeleteEntity(spawnedDudes[key])
    end
end

AddEventHandler("onResourceStop", function(resource)
    if resource == GetCurrentResourceName() then
        for _, ped in pairs(spawnedDudes) do
            DeleteEntity(ped)
        end
    end
end)

function AC:isPlayerAdmin()
    if Player(GetPlayerServerId(PlayerId())) then
        local rank = Player(GetPlayerServerId(PlayerId())).state.group
        if rank ~= 'user' then
            return rank 
        else
            return false
        end
    else
        return false
    end
end

function AC:getPlayerJob()
    if Player(GetPlayerServerId(PlayerId())) then
        job = Player(GetPlayerServerId(PlayerId())).state.job.name or 'unemployed'
        label = Player(GetPlayerServerId(PlayerId())).state.job.label or 'Unemployed'
        grade = Player(GetPlayerServerId(PlayerId())).state.job.grade or 0
        return {
            job = job,
            label = label,
            grade = grade,
        }
    else 
        return {}
    end
end

function AC:getClientPlayers()
    local coords = GetEntityCoords(PlayerPedId())
    local players = {}
    for _, player in ipairs(GetActivePlayers()) do
        local ped = GetPlayerPed(player)
        local othercoords = GetEntityCoords(ped)
        local distance = #(coords - othercoords)
        local statebag = Player(GetPlayerServerId(PlayerId()))
        local jobdata = {}
        local group = 'user'
        if statebag then
            group = Player(GetPlayerServerId(PlayerId())).state.group
            jobdata = Player(GetPlayerServerId(PlayerId())).state.job
        end
        local data = {
            ped = ped,
            coords = othercoords,
            distance = distance,
            source = GetPlayerServerId(player),
            name = GetPlayerName(player),
            isDead = IsEntityDead(ped),
            jobdata = jobdata,
            group = group
        }
        table.insert(players, data)
    end
    return players
end

function AC:PointGameplayCamAtCoord(coord)
    local ped = PlayerPedId()
    local camDirection = coord
    local pedCoords = GetEntityCoords(ped)
    local heading = GetHeadingFromVector_2d(camDirection.x - pedCoords.x, camDirection.y - pedCoords.y)
    SetGameplayCamRelativeHeading(heading - GetEntityHeading(ped))
end