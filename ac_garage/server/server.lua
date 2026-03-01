local AC_SCRIPTS = {}
local ESX = Config.ESX()

function AC_SCRIPTS:loadCode()
    ESX.RegisterServerCallback('ac_garage:garage', function(source, cb)
        local xPlayer = ESX.GetPlayerFromId(source)
        if not xPlayer then return cb({}) end
        local identifier = xPlayer.getIdentifier()
        local result = MySQL.query.await('SELECT * FROM owned_vehicles WHERE owner = ? AND stored = 1 AND (job IS NULL OR job = "")', { 
            identifier 
        })
        cb(result or {})
    end)

    function sendWebhook(type, title, description, color)
        local url = Webhooks['URLS'][type]
        if not url or url == "" then return end
        local embed = {
            {
                ["title"] = title,
                ["description"] = description,
                ["color"] = color or Webhooks['Profile']['color'],
                ["footer"] = {
                    ["text"] = os.date("%d.%m.%Y %H:%M:%S")
                }
            }
        }
        PerformHttpRequest(url, function(err, text, headers) end, "POST", json.encode({
            username = Webhooks['Profile']['username'],
            avatar_url = Webhooks['Profile']['avatar'],
            embeds = embed
        }), {["Content-Type"] = "application/json"})
    end
    
    ESX.RegisterServerCallback('ac_garage:getImound', function(source, cb)
        local xPlayer = ESX.GetPlayerFromId(source)
        if xPlayer then
            local identifier = xPlayer.getIdentifier()
            local result = MySQL.query.await('SELECT * FROM owned_vehicles WHERE owner = ? AND stored = 2', { 
                identifier 
            })
            if result then
                cb(result)
            else
                cb({})
            end
        else
            cb({})
        end
    end)
    
    RegisterServerEvent('ac_garage:setVehicle_Fav', function(plate, enable)
        local xPlayer = ESX.GetPlayerFromId(source)
        if xPlayer then
            local identifier = xPlayer.getIdentifier()
            MySQL.execute('UPDATE owned_vehicles SET fav = @enable WHERE plate = @plate AND owner = @identifier', {
                ['@enable'] = enable,
                ['@plate'] = plate,
                ['@identifier'] = identifier
            })
        end
    end)
    
    RegisterServerEvent('ac_garage:setState', function(plate, state)
        MySQL.Sync.execute("UPDATE owned_vehicles SET stored = @state WHERE plate = @plate", {
            ['@state'] = state,
            ['@plate'] = plate
        })
    end)
    
    local spawnedVehicles = {}
    RegisterServerEvent('ac_garage:delete', function(plate)
        local entity = spawnedVehicles[plate]
        if spawnedVehicles[plate] then
            spawnedVehicles[plate] = nil
        end
        Wait(4000)
        if DoesEntityExist(entity) then
            DeleteEntity(entity)
        end
    end)
    
    ESX.RegisterServerCallback('ac_garage:parkinVehicle', function(source, cb, vehicleProps)
        local xPlayer = ESX.GetPlayerFromId(source)
        if xPlayer and vehicleProps.plate then
            local identifier = xPlayer.getIdentifier()
            MySQL.execute('UPDATE owned_vehicles SET `stored` = 1, `vehicle` = @vehicle WHERE `plate` = @plate', {
                ['@plate'] = vehicleProps.plate,
                ['@vehicle'] = json.encode(vehicleProps)
            }, function(result)
                if result.affectedRows > 0 then
                    MySQL.query('SELECT owner FROM owned_vehicles WHERE plate = @plate', {
                        ['@plate'] = vehicleProps.plate
                    }, function(data)
                        local xPlayer = ESX.GetPlayerFromId(source)
                        TriggerEvent('ac_garage:delete', vehicleProps.plate)
                        if Config['GetMoneyForVeh'] and Config['GetMoneyForVeh']['enabled'] then
                            if data[1] and data[1].owner ~= xPlayer.getIdentifier() then
                                xPlayer.addAccountMoney(Config['GetMoneyForVeh']['account'], Config['GetMoneyForVeh']['amount'])
                                Config.notify_server(source, 'success', Lang[Config['language']]['information'], Lang[Config['language']]['park_other'])
                            else
                                Config.notify_server(source, 'success', Lang[Config['language']]['information'], Lang[Config['language']]['park_success'])
                            end
                        else
                            Config.notify_server(source, 'success', Lang[Config['language']]['information'], Lang[Config['language']]['park_success'])
                        end
                        sendWebhook('parkin', Lang[Config['language']]['webhook_parkin'], 
                        (Lang[Config['language']]['webhook_parkin_desc']):format(xPlayer.getName(), xPlayer.getIdentifier(), vehicleProps.plate))
                        cb(true)
                    end)
                else
                    Config.notify_server(source, 'error', Lang[Config['language']]['information'], Lang[Config['language']]['park_failed'])
                    cb(false)
                end
            end)   
        else
            Config.notify_server(source, 'error', Lang[Config['language']]['information'], Lang[Config['language']]['error_general'])
            cb(false)
        end
    end)
    
    RegisterServerEvent('ac_garage:parkout', function(plate, spawn, imound)
        local _source = source
        local xPlayer = ESX.GetPlayerFromId(_source)
        if xPlayer and plate then
            if imound then
                if xPlayer.getAccount('money').money >= Config.ImoundPrice then
                    xPlayer.removeAccountMoney('money', Config.ImoundPrice)
                    local promise = promise.new()
                    MySQL.Async.execute("UPDATE owned_vehicles SET stored = 1 WHERE plate = @plate", {
                        ['@plate'] = plate
                    }, function(rowsChanged)
                        promise:resolve(rowsChanged)
                    end)
                    Citizen.Await(promise)
                    sendWebhook('impound', Lang[Config['language']]['webhook_impound'], 
                    (Lang[Config['language']]['webhook_impound_desc']):format(xPlayer.getName(), xPlayer.getIdentifier(), plate, Config.ImoundPrice))
                    Config.notify_server(_source, 'info', Lang[Config['language']]['information'], (Lang[Config['language']]['impound_paid']):format(Config.ImoundPrice))
                else
                    Config.notify_server(_source, 'error', Lang[Config['language']]['information'], Lang[Config['language']]['not_enough_money'])
                    return
                end
            end
            local identifier = xPlayer.getIdentifier()
            MySQL.query('SELECT vehicle FROM owned_vehicles WHERE `plate` = @plate AND owner = @identifier AND stored = 1', {
                ['@plate'] = plate,
                ['@identifier'] = identifier
            }, function(data)
                if data[1] then
                    TriggerEvent('ac_garage:setState', plate, 0)
                    local vehicleProps = json.decode(data[1].vehicle)
                    if GetPlayerPed(_source) ~= 0 then
                        ESX.OneSync.SpawnVehicle(vehicleProps.model, vector3(spawn.x, spawn.y, spawn.z  + 1.5), spawn.w, vehicleProps, function(vehicle)
                            if vehicle then
                                local vehicleEntity = NetworkGetEntityFromNetworkId(vehicle)
                                spawnedVehicles[plate] = vehicleEntity
                                Wait(1000)
                                TaskWarpPedIntoVehicle(GetPlayerPed(_source), vehicleEntity, -1)
                                sendWebhook('parkout', Lang[Config['language']]['webhook_parkout'], 
                                (Lang[Config['language']]['webhook_parkout_desc']):format(xPlayer.getName(), xPlayer.getIdentifier(), plate))
                                Config.notify_server(_source, 'success', Lang[Config['language']]['information'], Lang[Config['language']]['parkout_success'])
                            else
                                Config.notify_server(_source, 'error', Lang[Config['language']]['information'], Lang[Config['language']]['parkout_failed'])
                                TriggerEvent('ac_garage:setState', plate, 1)
                            end
                        end)
                    else
                        Config.notify_server(_source, 'error', Lang[Config['language']]['information'], Lang[Config['language']]['player_not_exist'])
                    end
                else
                    Config.notify_server(_source, 'error', Lang[Config['language']]['information'], Lang[Config['language']]['vehicle_already_out'])
                end
            end)
        else
            Config.notify_server(_source, 'error', Lang[Config['language']]['information'], Lang[Config['language']]['error_general'])
        end
    end)
    
    CreateThread(function()
        while true do
            Wait(1 * 1000 * 60)
            for plate, vehicle in pairs(spawnedVehicles) do
                if not DoesEntityExist(vehicle) then
                    TriggerEvent('ac_garage:setState', plate, 2)
                    spawnedVehicles[plate] = nil
                end
            end
        end
    end)

    AddEventHandler('entityRemoved', function(entity)
        for plate, vehicle in pairs(spawnedVehicles) do
            if vehicle == entity then
                if not DoesEntityExist(vehicle) then
                    TriggerEvent('ac_garage:setState', plate, 2)
                    spawnedVehicles[plate] = nil
                end
                break
            end
        end
    end)
    
    RegisterServerEvent('ac_garage:editVehicle', function(plate, name)
        local _source = source
        local xPlayer = ESX.GetPlayerFromId(_source)
        if xPlayer and plate then
            for i = 1, #Config['blacklisted_names'] do
                if string.find(string.lower(name:gsub("%s+", "")), string.lower(Config['blacklisted_names'][i])) then
                    Config.notify_server(_source, 'error', Lang[Config['language']]['information'], Lang[Config['language']]['name_blacklist'])
                    return
                end
            end
            local identifier = xPlayer.getIdentifier()
            MySQL.execute('UPDATE owned_vehicles SET `name` = @name WHERE `plate` = @plate AND owner = @identifier', {
                ['@name'] = name,
                ['@plate'] = plate,
                ['@identifier'] = identifier
            }, function(result)
                if result.affectedRows > 0 then
                    Config.notify_server(_source, 'success', Lang[Config['language']]['information'], Lang[Config['language']]['name_changed'])
                    sendWebhook('rename', Lang[Config['language']]['webhook_rename'], 
                    (Lang[Config['language']]['webhook_rename_desc']):format(xPlayer.getName(), xPlayer.getIdentifier(), plate, name))
                else
                    Config.notify_server(_source, 'error', Lang[Config['language']]['information'], Lang[Config['language']]['name_failed'])
                end
            end)
        else
            Config.notify_server(_source, 'error', Lang[Config['language']]['information'], Lang[Config['language']]['error_general'])
        end
    end)
    
    MySQL.ready(function()
        MySQL.query('UPDATE owned_vehicles SET stored=1 WHERE stored=0')
    end)
end

CreateThread(function()
    AC_SCRIPTS:loadCode()
end)
