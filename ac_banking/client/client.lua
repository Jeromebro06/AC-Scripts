local ESX = Config.ESX()

function GetTransActions()
    local actions = GetResourceKvpString("ac_scripts_transactions")
    if actions then
        return json.decode(actions)
    else
        return {}
    end
end

function GetTime()
    local year, month, day, hour, minute, second = GetLocalTime()
    return string.format("%04d-%02d-%02d %02d:%02d", year, month, day, hour, minute)
end

function UpdateTransActions(transactionType, betrag)
    local actions = GetResourceKvpString("ac_scripts_transactions")
    local transactionTable = {}
    if actions then
        transactionTable = json.decode(actions)
    end
    if #transactionTable >= 3 then
        for i = 1, (#transactionTable - 2) do
            table.remove(transactionTable, 1)
        end
    end
    table.insert(transactionTable, {
        type = transactionType,
        money = betrag,
        date = GetTime()
    })
    SetResourceKvp("ac_scripts_transactions", json.encode(transactionTable))
    return transactionTable
end

RegisterNetEvent('ac_scripts_bank:updatemoney', function(money, typet, changed)
    local transactions = UpdateTransActions(typet, changed)
    SendNUIMessage({
        type = "banking_update",
        balance = money,
        transactions = transactions
    })
end)

local banking = false

function bankingUI(bool)
    banking = bool
    SetNuiFocus(bool, bool)
    if banking then
        ESX.TriggerServerCallback('bankingData', function(bank_money)
            SendNUIMessage({
                type = "banking",
                enable = true,
                transactions = GetTransActions(),
                balance = bank_money,
            })
        end)
    else
        SendNUIMessage({
            type = "banking",
            enable = false
        })
    end
end

CreateThread(function()
    while true do
        local ped = PlayerPedId()
        local coords = GetEntityCoords(ped)
        local sleep = 2000
        if not banking and not IsPedInAnyVehicle(ped, false) then
            for i = 1, #Config['props'] do 
                local model = Config['props'][i]
                local obj = GetClosestObjectOfType(coords.x, coords.y, coords.z, 2.0, model, false, true ,true)
                local objectcoords = GetEntityCoords(obj)
                local distance = #(coords - objectcoords)
                if distance <= 1.7 then
                    sleep = 0
                    Config.help_notify(Lang[Config['language'] or 'en']['interact_atm'])
                    if IsControlJustPressed(0, 38) then
                        bankingUI(true)
                    end   
                end
            end
        end
        Wait(sleep)
    end
end)

CreateThread(function()
    local coords = Config['bankcoords']
    if Config['blip']['enable'] then
        for i = 1, #coords do 
            AC:addBlip(coords[i], Config['blip']['type'], Config['blip']['color'], Config['blip']['size'], Config['blip']['name'])
        end
    end
    AC:createMarkerInteract({
        markertype = 29,
        color = Config['marker_color'],
        scale = 0.8,
        vehicleonly = false,
        playeronly = true,
        visibledistance = 5.0,
        animation = {
            camfollow = false,
            bump = false,
            rotate = false
        },
        coords = coords
    }, function(markerId)
        if not banking then
            Config.help_notify(Lang[Config['language'] or 'en']['interact']) 
            if IsControlJustPressed(0, 38) then
                bankingUI(true)
            end
        else
            AC:hideMarkerInteract(markerId)
        end
    end)
end)

-- Banking Code
RegisterNUICallback('banking', function(data)
    if data.type == 'close' and banking then
        bankingUI(false)
    elseif data.type == 'moneyself' then
        AC:SendSecuredServerEvent('ac_scripts:banking:banking', data.action, { 
            amount = data.amount
        })
    elseif data.type == 'transfer' then
        AC:SendSecuredServerEvent('ac_scripts:banking:banking', 'transfer', {
            target = data.target,
            amount = data.amount
        })
    end
end)