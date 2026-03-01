local AC_SCRIPTS = {}
local ESX = Config.ESX()

function AC_SCRIPTS:loadCode()
    local function SendWebhook(action, xPlayer, amount, xTarget)
        local webhook = Webhooks['URLS']['banking']
        if not webhook or webhook == '' then return end
        
        local embed = {
            {
                ['color'] = Webhooks['Profile']['color'],
                ['title'] = 'Banking',
                ['description'] = '**Action:** ' .. action,
                ['fields'] = {
                    {
                        ['name'] = '👤 Player',
                        ['value'] = string.format('**Name:** %s\n**Identifier:** %s\n**Player ID:** %s', 
                            xPlayer.getName(), 
                            xPlayer.identifier, 
                            xPlayer.source
                        ),
                        ['inline'] = true
                    },
                    {
                        ['name'] = '💰 Amount',
                        ['value'] = amount,
                        ['inline'] = true
                    }
                },
                ['footer'] = {
                    ['text'] = os.date('%d.%m.%Y - %H:%M:%S'),
                },
            }
        }
        
        if xTarget then
            table.insert(embed[1]['fields'], {
                ['name'] = '📤 Target Player',
                ['value'] = string.format('**Name:** %s\n**Identifier:** %s\n**Player ID:** %s', 
                    xTarget.getName(), 
                    xTarget.identifier, 
                    xTarget.source
                ),
                ['inline'] = false
            })
        end
        
        PerformHttpRequest(webhook, function(err, text, headers) end, 'POST', json.encode({
            username = Webhooks['Profile']['username'],
            avatar_url = Webhooks['Profile']['avatar'],
            embeds = embed
        }), { ['Content-Type'] = 'application/json' })
    end
    
    RegisterServerEvent('ac_scripts:banking:banking', function(action, data)
        local xPlayer = ESX.GetPlayerFromId(source)
        if xPlayer then
            local amount = data.amount or 0
            if amount <= 0 then
                Config.notify(source, 'error', 'Information', Lang[Config['language'] or 'en']['invalid_amount'])
                return
            end
            if action == 'einzahlen' then
                if xPlayer.getAccount('money').money >= amount then
                    xPlayer.removeAccountMoney('money', amount)
                    xPlayer.addAccountMoney('bank', amount)
                    Config.notify(source, 'success', 'Information', string.format(Lang[Config['language'] or 'en']['deposit_success'], amount))
                    TriggerClientEvent('ac_scripts_bank:updatemoney', source, xPlayer.getAccount('bank').money, 'einzahlen', amount)
                    SendWebhook('Deposit', xPlayer, amount)
                else
                    Config.notify(source, 'error', 'Information', Lang[Config['language'] or 'en']['not_enough_cash'])
                end
            elseif action == 'auszahlen' then
                if xPlayer.getAccount('bank').money >= amount then
                    xPlayer.removeAccountMoney('bank', amount)
                    xPlayer.addAccountMoney('money', amount)
                    Config.notify(source, 'success', 'Information', string.format(Lang[Config['language'] or 'en']['withdraw_success'], amount))
                    TriggerClientEvent('ac_scripts_bank:updatemoney', source, xPlayer.getAccount('bank').money, 'auszahlen', amount)
                    SendWebhook('Withdraw', xPlayer, amount)
                else
                    Config.notify(source, 'error', 'Information', Lang[Config['language'] or 'en']['not_enough_bank'])
                end
            elseif action == 'transfer' then
                if data.target == nil then
                    Config.notify(source, 'error', 'Information', Lang[Config['language'] or 'en']['no_player_selected'])
                    return
                end
                if data.target == -1 then
                    Config.notify(source, 'error', 'Information', Lang[Config['language'] or 'en']['cannot_transfer_all'])
                    return
                end
                if data.target == source then
                    Config.notify(source, 'error', 'Information', Lang[Config['language'] or 'en']['cannot_transfer_self'])
                    return
                end
                local xTarget = ESX.GetPlayerFromId(data.target)
                if xTarget then
                    if xPlayer.getAccount('bank').money >= amount then
                        xPlayer.removeAccountMoney('bank', amount)
                        xTarget.addAccountMoney('bank', amount)
                        Config.notify(source, 'success', 'Information', string.format(Lang[Config['language'] or 'en']['transfer_success'], amount))
                        Config.notify(xTarget.source, 'info', 'Information', string.format(Lang[Config['language'] or 'en']['money_received'], amount))
                        TriggerClientEvent('ac_scripts_bank:updatemoney', source, xPlayer.getAccount('bank').money, 'transfer', amount)
                        TriggerClientEvent('ac_scripts_bank:updatemoney', xTarget.source, xTarget.getAccount('bank').money, 'erhalten', amount)
                        SendWebhook('Transfer', xPlayer, amount, xTarget)
                    else
                        Config.notify(source, 'error', 'Information', Lang[Config['language'] or 'en']['not_enough_bank'])
                    end
                else
                    Config.notify(source, 'error', 'Information', Lang[Config['language'] or 'en']['player_not_online'])
                end
            else
                Config.exploit_ban(source)
            end
        else
            Config.notify(source, 'error', 'Information', Lang[Config['language'] or 'en']['error_occurred'])
        end
    end)
    
    ESX.RegisterServerCallback('bankingData', function(src, cb)
        local xPlayer = ESX.GetPlayerFromId(src)
        local bank_money = xPlayer.getAccount('bank').money
        cb(bank_money)
    end)
end

CreateThread(function()
    AC_SCRIPTS:loadCode()
end)