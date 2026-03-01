local AC_SCRIPTS = {}
local ESX = Config.ESX()

function AC_SCRIPTS:loadCode()
    ---@param name string
    ---@return boolean
    function self:CheckName(name)
        local nameLower = name:lower()
        if type(nameLower) ~= "string" or not nameLower:lower():match("^[A-Za-zäöü]+$") then
            return false
        end
        for i = 1, #Config['blnamestrings'] do
            local blname = Config['blnamestrings'][i]:lower()
            if string.find(nameLower:lower(), blname) then
                return false
            end
        end
        return true
    end

    ---@param firstname string
    ---@param lastname string
    ---@return boolean
    function self:CheckLetter(firstname, lastname)
        if firstname == nil or lastname == nil then
            return false
        end
        if string.match(firstname, "^%u") and string.match(lastname, "^%u") then
            return true
        else
            return false
        end
    end

    ---@param oldName string
    ---@param newName string
    ---@param playerId number
    ---@param method string
    ---@param price number
    function self:SendNameChangeWebhook(oldName, newName, playerId, method, price)
        local xPlayer = ESX.GetPlayerFromId(playerId)
        if not xPlayer then return end
        
        local webhookUrl = Webhooks['URLS']['namechange']
        if webhookUrl == "" or webhookUrl == nil then return end
        
        local lang = Config['language'] or 'en'
        local license = "Nicht gefunden"
        
        for k, v in pairs(GetPlayerIdentifiers(playerId)) do
            if string.sub(v, 1, string.len("license:")) == "license:" then
                license = v
                break
            end
        end
        
        local priceFormatted = ESX.Math.GroupDigits(price)
        local paymentMethod = method == "bank" and Lang[lang]['webhook_payment_card'] or Lang[lang]['webhook_payment_cash']
        
        local embed = {
            {
                ["color"] = Webhooks['Profile']['color'],
                ["title"] = Lang[lang]['webhook_title'],
                ["description"] = Lang[lang]['webhook_description'],
                ["fields"] = {
                    {
                        ["name"] = Lang[lang]['webhook_player'],
                        ["value"] = GetPlayerName(playerId),
                        ["inline"] = true
                    },
                    {
                        ["name"] = Lang[lang]['webhook_serverid'],
                        ["value"] = tostring(playerId),
                        ["inline"] = true
                    },
                    {
                        ["name"] = Lang[lang]['webhook_oldname'],
                        ["value"] = oldName,
                        ["inline"] = false
                    },
                    {
                        ["name"] = Lang[lang]['webhook_newname'],
                        ["value"] = newName,
                        ["inline"] = false
                    },
                    {
                        ["name"] = Lang[lang]['webhook_price'],
                        ["value"] = priceFormatted .. "$",
                        ["inline"] = true
                    },
                    {
                        ["name"] = Lang[lang]['webhook_payment'],
                        ["value"] = paymentMethod,
                        ["inline"] = true
                    },
                    {
                        ["name"] = Lang[lang]['webhook_license'],
                        ["value"] = license,
                        ["inline"] = false
                    }
                },
                ["footer"] = {
                    ["text"] = os.date("%d.%m.%Y - %H:%M:%S Uhr"),
                }
            }
        }
        
        PerformHttpRequest(webhookUrl, function(err, text, headers) end, 'POST', json.encode({
            username = Webhooks['Profile']['username'],
            embeds = embed
        }), { ['Content-Type'] = 'application/json' })
    end

    RegisterServerEvent('ac_scripts:namechange:namechange', function(data)
        local s = source
        local xPlayer = ESX.GetPlayerFromId(s)
        local lang = Config['language'] or 'en'

        if xPlayer then
            local oldName = xPlayer.getName()
            if xPlayer.getAccount(data.method).money >= Config['price'] then
                if data.firstname == "" or data.firstname == nil then
                    Config.notify(s, 'error', 'Information', Lang[lang]['firstname_empty'])
                    return
                end
                if data.lastname == "" or data.lastname == nil then
                    Config.notify(s, 'error', 'Information', Lang[lang]['lastname_empty'])
                    return
                end
                local name = data.firstname .. ' ' .. data.lastname
                if name == xPlayer.getName() then
                    Config.notify(s, 'error', 'Information', Lang[lang]['name_identical'])
                    return
                end
                if self:CheckLetter(data.firstname, data.lastname) then
                    if self:CheckName(data.firstname) and self:CheckName(data.lastname) then
                        xPlayer.removeAccountMoney(data.method, Config['price'])
                        xPlayer.setName(name)
                        MySQL.Async.execute(
                        'UPDATE users SET firstname = @firstname, lastname = @lastname WHERE identifier = @identifier', {
                            ['@firstname'] = data.firstname,
                            ['@lastname'] = data.lastname,
                            ['@identifier'] = xPlayer.identifier
                        })
                        TriggerClientEvent('ac_scripts:namechange:closenamechange', s)
                        Config.notify(s, 'success', 'Information', string.format(Lang[lang]['name_changed'], name))

                        -- Webhook senden
                        self:SendNameChangeWebhook(oldName, name, s, data.method, Config['price'])
                    else
                        Config.notify(s, 'error', 'Information', Lang[lang]['name_forbidden'])
                    end
                else
                    Config.notify(s, 'error', 'Information', Lang[lang]['name_uppercase'])
                end
            else
                Config.notify(s, 'error', 'Information', Lang[lang]['not_enough_money'])
            end
        else
            Config.notify(s, 'error', 'Information', Lang[lang]['error_occurred'])
        end
    end)
end

CreateThread(function()
    AC_SCRIPTS:loadCode()
end)
