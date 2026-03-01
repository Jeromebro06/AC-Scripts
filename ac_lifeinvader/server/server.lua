local AC_SCRIPTS = {}
local ESX = Config.ESX()

-- Webhook Function
function sendToDiscord(webhook, title, description, color, fields)
    if webhook and webhook ~= '' then
        local embed = {
            {
                ["color"] = color or Webhooks.Profile.color,
                ["title"] = title,
                ["description"] = description,
                ["fields"] = fields or {},
                ["footer"] = {
                    ["text"] = "Lifeinvader",
                },
                ["timestamp"] = os.date("!%Y-%m-%dT%H:%M:%SZ")
            }
        }

        PerformHttpRequest(webhook, function(err, text, headers) 
            if err ~= 200 and err ~= 204 then
                print('[WEBHOOK] Failed to send webhook '..err)
            end
        end, 'POST', json.encode({
            username = Webhooks.Profile.username,
            avatar_url = Webhooks.Profile.avatar,
            embeds = embed
        }), {
            ['Content-Type'] = 'application/json'
        })
    end
end

function AC_SCRIPTS:loadCode()
    local lifeinvaderMessages = {}
    local lifeinvaderCooldown = {}
    ESX.RegisterServerCallback('lifeinvader', function(source, cb)
        cb(lifeinvaderMessages)
    end)

    RegisterServerEvent('ac_scritps:lifeinvader', function(data)
        local s = source
        local message = data.message
        local selectedType = data.selectedType
        local messageLength = data.messageLength
        local xPlayer = ESX.GetPlayerFromId(s)
        local currentTime = GetGameTimer()
        if xPlayer then
            Config.getPhoneNumber(s, xPlayer.getIdentifier(), function(phoneNumber)
                if phoneNumber then
                    if not lifeinvaderCooldown[s] or (currentTime - lifeinvaderCooldown[s]) >= (Config['cooldown'] * 60 * 1000) then
                        local price = (messageLength * Config['pricePerLetter'])
                        if xPlayer.getAccount('money').money >= price then
                            xPlayer.removeAccountMoney('money', price)
                        else
                            Config.notify(s, 'error', Lang[Config.language]['information'],
                                Lang[Config.language]['not_enough_money'])
                            return
                        end

                        for i = 1, #Config['blacklisted'] do
                            if string.find(string.lower(message:gsub("%s+", "")), string.lower(Config['blacklisted'][i])) then
                                Config.notify(s, 'error', Lang[Config.language]['information'],
                                    Lang[Config.language]['blacklisted_words'])
                                return
                            end
                        end

                        lifeinvaderCooldown[s] = currentTime
                        if message and messageLength < Config['maxlenght'] then
                            local data = {}
                            if selectedType == 'public' then
                                data = {
                                    name = xPlayer.getName(),
                                    message = message,
                                    number = phoneNumber
                                }
                            else
                                data = {
                                    name = Lang[Config.language]['anonymous'],
                                    message = message,
                                    number = Lang[Config.language]['anonymous']
                                }
                            end
                            table.insert(lifeinvaderMessages, data)
                            TriggerClientEvent('ac_scritps:closeLifeinvader', s)
                            TriggerClientEvent('ac_scritps:lifeinvader_message', -1, data)

                            if Webhooks.URLS.publiclog and Webhooks.URLS.publiclog ~= '' then
                                local publicTitle = Lang[Config.language]['webhook_new_message']
                                local senderLabel = selectedType == 'public' and Lang[Config.language]['webhook_player_name'] or Lang[Config.language]['webhook_sender']
                                local publicDescription = string.format("**%s:** %s\n**%s:** %s\n**%s:** %s", 
                                    senderLabel,
                                    data.name,
                                    Lang[Config.language]['webhook_phone_number'], 
                                    data.number,
                                    Lang[Config.language]['webhook_message'],
                                    message
                                )

                                sendToDiscord(Webhooks.URLS.publiclog, publicTitle, publicDescription, 0xff0000)
                            end

                            if Webhooks.URLS.adminlog and Webhooks.URLS.adminlog ~= '' then
                                local adminTitle = Lang[Config.language]['webhook_admin_log']
                                local adminDescription = ""
                                local messageType = selectedType == 'public' and Lang[Config.language]['webhook_type_public'] or Lang[Config.language]['webhook_type_anonymous']
                                
                                local adminFields = {
                                    {
                                        ["name"] = Lang[Config.language]['webhook_player_info'],
                                        ["value"] = string.format("**%s:** %s\n**%s:** %s\n**%s:** %s", 
                                            Lang[Config.language]['webhook_player_id'], s, 
                                            Lang[Config.language]['webhook_player_name'], xPlayer.getName(), 
                                            Lang[Config.language]['webhook_player_identifier'], xPlayer.getIdentifier()
                                        ),
                                        ["inline"] = true
                                    },
                                    {
                                        ["name"] = Lang[Config.language]['webhook_message_details'],
                                        ["value"] = string.format("**%s:** %s\n**%s:** %s\n**%s:** $%s", 
                                            Lang[Config.language]['webhook_message_type'], messageType,
                                            Lang[Config.language]['webhook_phone_number'], phoneNumber or '000-000',
                                            Lang[Config.language]['webhook_cost'], price
                                        ),
                                        ["inline"] = true
                                    },
                                    {
                                        ["name"] = Lang[Config.language]['webhook_message'],
                                        ["value"] = message,
                                        ["inline"] = false
                                    }
                                }

                                sendToDiscord(Webhooks.URLS.adminlog, adminTitle, adminDescription, 0xff9900, adminFields)
                            end
                        else
                            Config.notify(s, 'error', Lang[Config.language]['information'],
                                Lang[Config.language]['message_too_long'])
                        end
                    else
                        local timeLeft = (Config['cooldown'] * 60 * 1000 - (currentTime - lifeinvaderCooldown[s])) / 1000
                        Config.notify(s, 'info', Lang[Config.language]['information'],
                            string.format(Lang[Config.language]['cooldown_active'], math.ceil(timeLeft / 60)))
                    end
                else
                    Config.notify(s, 'error', Lang[Config.language]['information'],
                        Lang[Config.language]['error_occurred'])
                end
            end)
        else
            Config.notify(s, 'error', Lang[Config.language]['information'], Lang[Config.language]['error_occurred'])
        end
    end)

    exports('getMessages', function()
        return lifeinvaderMessages
    end)
end

CreateThread(function()
    AC_SCRIPTS:loadCode()
end)
