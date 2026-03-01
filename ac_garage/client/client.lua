local GARAGE = {}
local garageopen = false
local parkouts = {}
local ESX = Config.ESX()

function GARAGE:openGarageMenu(bool, garage, imound)
    garageopen = bool
    if not bool then
        SendNUIMessage({action = 'garage', enable = false})
        SetNuiFocus(false, false)
        return
    end
    parkouts = garage['vehpoints']
    local callbackName = imound and 'ac_garage:getImound' or 'ac_garage:garage'
    ESX.TriggerServerCallback(callbackName, function(vehicleList)
        local vehicles = {}
        for _, vehicle in ipairs(vehicleList) do
            if garage['type'] == vehicle.type then
                local vehicleData = json.decode(vehicle.vehicle)
                if IsModelInCdimage(vehicleData.model) then
                    local displayName = (vehicle.name and vehicle.name:match("%S")) and vehicle.name or GetDisplayNameFromVehicleModel(vehicleData.model)
                    table.insert(vehicles, {
                        name = displayName,
                        plate = vehicle.plate,
                        isfav = vehicle.fav,
                        modelname = GetDisplayNameFromVehicleModel(vehicleData.model):lower()
                    })
                else
                    table.insert(vehicles, {
                        name = 'NOT EXIST',
                        plate = vehicle.plate,
                        isfav = vehicle.fav,
                        modelname = Lang[Config['language']]['vehicle_not_exist']
                    })
                end
            end
        end
        SendNUIMessage({
            action = 'garage',
            enable = true,
            vehicles = vehicles,
            imound = imound or false,
            imoundprice = Config.ImoundPrice or 0
        })
    end)
    
    SetNuiFocus(true, true)
end

function GARAGE:setupGarageMarkers(garages, isImpound)
    for _, v in pairs(garages) do
        local coord = v.parkout
        AC:addBlip(coord, Config.blips[isImpound and 'impound' or v.type].type, 27, 0.5, Config.blips[isImpound and 'impound' or v.type].label)
        AC:createMarkerInteract({
            markertype = Config.marker[v.type],
            color = Config.MarkerColor,
            scale = 0.7,
            vehicleonly = false,
            playeronly = true,
            visibledistance = 10.0,
            animation = { camfollow = false, bump = false, rotate = true },
            coords = { coord }
        }, function(markerId)
            if not garageopen then
                Config.help_notify(isImpound and Lang[Config['language']]['open_impound'] or Lang[Config['language']]['open_garage'])
                if IsControlJustPressed(0, 38) then
                    self:openGarageMenu(true, v, isImpound)
                end
            else
                AC:hideMarkerInteract(markerId)
            end
        end)
    end
end

function GARAGE:setupParkingSpots()
    for _, v in pairs(Config.garages) do
        AC:createMarkerInteract({
            markertype = 43,
            color = Config.MarkerColor,
            scale = 1.0,
            lenghtx = 2.5,
            lenghty = 5.0,
            vehicleonly = true,
            playeronly = false,
            visibledistance = 15.0,
            animation = { camfollow = false, bump = false, rotate = false },
            coords = v.vehpoints
        }, function()
            Config.help_notify(Lang[Config['language']]['park_vehicle'])
            if IsControlJustPressed(0, 38) then
                local vehicle = GetVehiclePedIsIn(PlayerPedId())
                if vehicle then
                    local parked = true
                    CreateThread(function()
                        while parked do
                            Wait(0)
                            DisableControlAction(0, 38)
                        end
                        EnableControlAction(0, 38)
                    end)
                    ESX.TriggerServerCallback('ac_garage:parkinVehicle', function(success)
                        if success then
                            SetVehicleDoorsLocked(vehicle, true)
                            FreezeEntityPosition(vehicle, true)
                            TaskLeaveVehicle(PlayerPedId(), vehicle, false)
                            Wait(2000)
                            for i = 255, 0, -5 do
                                Wait(10)
                                SetEntityAlpha(vehicle, i)
                            end                        
                            SetEntityAsMissionEntity(vehicle, false, false)
                            SetVehicleAsNoLongerNeeded(vehicle)
                            DeleteEntity(vehicle)
                            parked = false
                        end
                    end, ESX.Game.GetVehicleProperties(vehicle))
                end
            end
        end)
    end
end

RegisterNUICallback('garage', function(data)
    if garageopen then
        AC:switch(data.type)({
            close = function()
                GARAGE:openGarageMenu(false)
            end,
            toggle_fav = function()
                PlaySoundFrontend(-1, "Click", "DLC_HEIST_HACKING_SNAKE_SOUNDS", 1)
                local plate = data.plate
                local enable = data.enable
                AC:SendSecuredServerEvent('ac_garage:setVehicle_Fav', plate, enable)
            end,
            parkout_vehicle = function()
                if #parkouts > 0 then
                    local spawn = AC:getSpawnPoint(parkouts)
                    if spawn then
                        GARAGE:openGarageMenu(false)
                        AC:SendSecuredServerEvent('ac_garage:parkout', data.plate, spawn)
                    else
                        Config.notify_client('info', Lang[Config['language']]['information'], Lang[Config['language']]['no_free_spawn'], 3500)
                    end
                else
                    print('error', '[GARAGE] No spawn point found')
                end
            end,
            edit = function()
                PlaySoundFrontend(-1, "Click", "DLC_HEIST_HACKING_SNAKE_SOUNDS", 1)
                local plate = data.plate
                local name = data.newName
                AC:SendSecuredServerEvent('ac_garage:editVehicle', plate, name)
            end,
            impound = function()
                if #parkouts > 0 then
                    local spawn = AC:getSpawnPoint(parkouts)
                    if spawn then
                        GARAGE:openGarageMenu(false)
                        AC:SendSecuredServerEvent('ac_garage:parkout', data.plate, spawn, true)
                    else
                        Config.notify_client('info', Lang[Config['language']]['information'], Lang[Config['language']]['no_free_spawn'], 3500)
                    end
                else
                    print('error', '[GARAGE] No spawn point found')
                end
            end,
            default = function()
                print('error', '[GARAGE] Invalid action')
            end
        }) 
    end
end)

CreateThread(function()
    GARAGE:setupGarageMarkers(Config.garages, false)
    GARAGE:setupGarageMarkers(Config.impound, true)
    GARAGE:setupParkingSpots()
end)
