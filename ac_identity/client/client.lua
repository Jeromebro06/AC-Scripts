local Identity = {}

function Identity:loadCode()
    local identity = false
    local isgiven = false
    local cam = nil
    local skin = nil
    local standartSkin = nil
    local ESX = Config.ESX()

    local hu = false
    function self:handsup()
        local playerPed = PlayerPedId()
        if not IsPedInAnyVehicle(playerPed) and not IsPedInAnyHeli(playerPed) and not IsPedInAnyPlane(playerPed) and not IsEntityDead(PlayerPedId()) then
            if not hu then
                hu = true
                AC:loadAnimDict('random@mugging3')
                TaskPlayAnim(playerPed, 'random@mugging3', 'handsup_standing_base', 8.0, -8, -1, 49, 0, 0, 0, 0)
                SetCurrentPedWeapon(playerPed, GetHashKey('WEAPON_UNARMED'), true)
            else
                ClearPedTasks(playerPed)
                hu = false
            end
        end
    end

    function self:flymode()
        local spawnCoords = vector4(-1694.3456, -2855.0554, 203.1512, 245.9765)
        local destinationCoords = vector4(-1146.0015, -2864.4084, 14.6219, 331.9293)
        DoScreenFadeOut(500)
        while not IsScreenFadedOut() do
            Wait(100)
        end
        local playerPed = PlayerPedId()
        local heliModel = GetHashKey('supervolito')
        local pilotModel = GetHashKey('s_m_y_pilot_01')
        RequestModel(heliModel)
        while not HasModelLoaded(heliModel) do
            Wait(500)
        end
        RequestModel(pilotModel)
        while not HasModelLoaded(pilotModel) do
            Wait(500)
        end
        local heli = CreateVehicle(heliModel, spawnCoords.x, spawnCoords.y, spawnCoords.z, spawnCoords.w, false, true)
        local pilot = CreatePedInsideVehicle(heli, 26, pilotModel, -1, false, true)
        SetPedIntoVehicle(playerPed, heli, 0)
        SetVehicleEngineOn(heli, true, true, false)
        SetEntityInvincible(heli, true)
        SetEntityInvincible(pilot, true)
        TaskHeliMission(pilot, heli, 0, 0, destinationCoords.x, destinationCoords.y, destinationCoords.z, 19, 45.0, -1.0, destinationCoords.w, -1.0, -1.0, 30.0, 96)
        CreateThread(function()
            while DoesEntityExist(heli) and GetVehiclePedIsIn(playerPed, false) == heli do
                DisableAllControlActions(0)
                EnableControlAction(0, 1, true)
                EnableControlAction(0, 2, true)
                EnableControlAction(0, 3, true)
                EnableControlAction(0, 4, true)
                EnableControlAction(0, 5, true)
                EnableControlAction(0, 6, true)
                Wait(0)
            end
        end)
        CreateThread(function()
            while DoesEntityExist(heli) do
                local heliCoords = GetEntityCoords(heli)
                local distance = #(vector3(heliCoords.x, heliCoords.y, heliCoords.z) - vector3(destinationCoords.x, destinationCoords.y, destinationCoords.z))
                if distance < 20.0 and GetEntityHeightAboveGround(heli) < 10.0 then
                    SetVehicleEngineOn(heli, false, true, false)
                    Wait(4000)
                    TaskLeaveVehicle(playerPed, heli, 0)
                    Wait(3000)
                    DoScreenFadeOut(500)
                    while not IsScreenFadedOut() do
                        Wait(100)
                    end
                    if DoesEntityExist(heli) then
                        DeleteEntity(heli)
                    end
                    if DoesEntityExist(pilot) then
                        DeleteEntity(pilot)
                    end
                    SetModelAsNoLongerNeeded(heliModel)
                    SetModelAsNoLongerNeeded(pilotModel)
                    break
                end
                Wait(1000)
            end  
            Wait(2000)
            AC:SendSecuredServerEvent('ac_scripts:identity:heli:end')
            SetEntityCoordsNoOffset(playerPed, -1034.5184, -2726.9351, 13.7566)
            SetEntityHeading(playerPed, 31.6238)
            DoScreenFadeIn(500)
        end)
        Wait(4000)
        DoScreenFadeIn(500)
    end

    exports('identity', function()
        return identity
    end)

    function self:identityUI(bool, items)
        identity = bool
        SetNuiFocus(bool, bool)
        SendNUIMessage({
            action = 'identity',
            enable = bool,
            items = items or {}
        })
        local ped = PlayerPedId()
        if bool then
            FreezeEntityPosition(ped, true)
            SetCurrentPedWeapon(ped, GetHashKey('WEAPON_UNARMED'), true)
            Wait(1000)
            self:setupIdentityCam(ped)
            CreateThread(function()
                DisplayRadar(false)
                while identity do
                    local players = GetActivePlayers()
                    for i = 1, #players do
                        local currentplayer = players[i]
                        local ped = GetPlayerPed(currentplayer)
                        if ped ~= PlayerPedId() then
                            SetPlayerInvisibleLocally(currentplayer, true)
                        end
                    end
                    -- exports.ac_scripts:identity:hideHud()
                    DisableAllControlActions(0)
                    SetBlockingOfNonTemporaryEvents(ped, true)
                    Wait(0)
                end
                SetBlockingOfNonTemporaryEvents(ped, false)
                FreezeEntityPosition(ped, false)
                DisplayRadar(true)
            end)
        else
            self:destroyIdentityCam()
            Wait(200)
            SetEntityInvincible(ped, false)
            FreezeEntityPosition(ped, false)
        end
    end

    function self:setupIdentityCam(ped)
        if not isgiven then
            local ped = PlayerPedId()
            cam = CreateCam("DEFAULT_SCRIPTED_CAMERA", true)
            SetCamCoord(cam, -813.4491, 174.4609, 76.9409)
            PointCamAtCoord(cam, -811.6832, 175.0467, 76.7453)
            SetEntityCoords(ped, -811.7283, 175.1879, 75.8453)
            SetEntityHeading(ped, 107.782)
            FreezeEntityPosition(ped, true)
            SetCamActive(cam, true)
            RenderScriptCams(true, false, 1000, true, true)
            ClearPedTasksImmediately(ped)
        else
            local pedCoords = GetEntityCoords(ped)
            local pedHeading = GetEntityHeading(ped)
            local offset = 1.7
            local cameraPosition = vector3(
                pedCoords.x + math.cos(math.rad(pedHeading)) * offset,
                pedCoords.y + math.sin(math.rad(pedHeading)) * offset,
                pedCoords.z + 0.9
            )
            cam = CreateCam("DEFAULT_SCRIPTED_CAMERA", true)
            SetCamCoord(cam, cameraPosition.x, cameraPosition.y, cameraPosition.z - 0.6)
            PointCamAtCoord(cam, pedCoords.x, pedCoords.y, pedCoords.z)
            local dx = pedCoords.x - cameraPosition.x
            local dy = pedCoords.y - cameraPosition.y
            local targetHeading = math.deg(math.atan2(dy, dx)) + 90.0
            SetEntityHeading(ped, targetHeading)
            SetCamActive(cam, true)
            RenderScriptCams(true, false, 1000, true, true)
        end
        ClearPedTasksImmediately(ped)
    end

    function self:destroyIdentityCam()
        if cam then
            RenderScriptCams(false, true, 1000, true, true)
            Wait(1000)
            DestroyCam(cam, false)
            cam = nil
        end
    end

    function IsPlayerLoaded()
        if not NetworkIsPlayerActive(PlayerId()) == 1 then return false end
        if not NetworkIsPlayerConnected(PlayerId()) == 1 then return false end
        if IsPlayerSwitchInProgress() then return false end
        return true
    end

    RegisterNetEvent('ac_scripts:identity:identity', function(bool, bool2)
        while not IsPlayerLoaded() do
            Wait(1000)
        end
        Wait(1000)
        TriggerEvent('skinchanger:getSkin', function(skin)
            standartSkin = skin
        end)

        isgiven = bool2

        if bool and not identity then
            TriggerEvent('skinchanger:getSkin', function(currentSkin)
                skin = currentSkin
                TriggerEvent('skinchanger:getData', function(components, maxVals)
                    local items = {}
                    for _, component in ipairs(Config.Components) do
                        table.insert(items, {
                            title = component.label,
                            name = component.name,
                            value = skin[component.name],
                            min = 0,
                            max = maxVals[component.name],
                            variation = {
                                value = skin[component.name],
                                max = maxVals[component.name],
                                min = 0
                            }
                        })
                    end
                    Wait(10)
                    local x, y, z = table.unpack(GetEntityCoords(PlayerPedId()))
                    SetEntityCoords(PlayerPedId(), x, y, z - GetEntityHeightAboveGround(PlayerPedId()) + 0.1)
                    if not isgiven then
                        Wait(1000 * 5)
                        SetNuiFocus(false, false)
                        Wait(10)
                        SetNuiFocus(true, true)
                    end
                    self:identityUI(true, items)
                end)
            end)
        elseif identity then
            self:identityUI(false)
        end
    end)

    RegisterNUICallback('identity', function(data)
        if identity then
            AC:switch(data.type)({
                close = function()
                    if isgiven then
                        self:identityUI(false)
                        TriggerEvent('skinchanger:loadSkin', standartSkin)
                        skin = nil
                        standartSkin = nil
                    end
                end,
                change = function()
                    local name = data.key
                    local value = tonumber(data.value)
                    if name and value then
                        skin[name] = value
                        PlaySound(-1, "SELECT", "HUD_FRONTEND_DEFAULT_SOUNDSET", 0, 0, 1)
                        TriggerEvent('skinchanger:loadSkin', skin)
                    end
                end,
                save = function()
                    local playerPed = PlayerPedId()
                    local playerModel = GetEntityModel(playerPed)
                    local isMale = playerModel == GetHashKey("mp_m_freemode_01")
                    local isFemale = playerModel == GetHashKey("mp_f_freemode_01")
                    if isMale then
                        data.sex = "m"
                    elseif isFemale then
                        data.sex = "f"
                    else
                        data.sex = "m"
                    end
                    ESX.TriggerServerCallback("ac_scripts:identity:checkIdentity", function(cb)
                        if cb == true then
                            AC:SendSecuredServerEvent('esx_skin:save', skin)
                            skin = nil
                            standartSkin = nil
                            self:identityUI(false)
                            ESX.SetPlayerData("name", ("%s %s"):format(data.firstname, data.lastname))
                            ESX.SetPlayerData("firstName", data.firstname)
                            ESX.SetPlayerData("lastName", data.lastname)
                            ESX.SetPlayerData("dateofbirth", data.date)
                            ESX.SetPlayerData("sex", data.sex)
                            ESX.SetPlayerData("height", data.size)
                            Player(GetPlayerServerId(PlayerId())).state.name = ("%s %s"):format(data.firstname, data.lastname)
                            if not isgiven then
                                FreezeEntityPosition(PlayerPedId(), false)
                                if Config['flymode'] then
                                    self:flymode()
                                else
                                    SetEntityCoordsNoOffset(playerPed, -1034.5184, -2726.9351, 13.7566)
                                    SetEntityHeading(playerPed, 31.6238)
                                    AC:SendSecuredServerEvent('ac_scripts:identity:heli:end')
                                end
                            end
                        else
                            SendNUIMessage({
                                action = 'identity-error',
                                error = cb,
                            })
                        end
                    end, data, isgiven)
                end,
                move = function()
                    local heading = GetEntityHeading(PlayerPedId())
                    if data.move == "left" then 
                        SetEntityHeading(PlayerPedId(), heading-8)
                    else 
                        SetEntityHeading(PlayerPedId(), heading+8)
                    end
                end, 
                hands = function()
                    self:handsup()
                end,                                                          
                default = function()
                    print('error', '[IDENTITY] Invalid action')
                end
            })
        end
    end)

    CreateThread(function()
        while not AC:IsSpawned() do
            Wait(1000)
        end
        AC:SendSecuredServerEvent('ac_scripts:identity:spawned')
    end)
end

CreateThread(function()
    while GetResourceState('ac_core') ~= 'started' do
        Wait(1000)
    end
    Identity:loadCode()
end)