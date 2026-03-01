local AC_SCRIPTS = {}
local ESX = Config.ESX()

function AC_SCRIPTS:loadCode()
    local playerCooldowns = {}
    function self:checkRateLimit(playerId, eventName, limit)
        limit = limit or 500
        if not playerCooldowns[playerId] then
            playerCooldowns[playerId] = {}
        end
        local currentTime = GetGameTimer()
        if playerCooldowns[playerId][eventName] and 
        (currentTime - playerCooldowns[playerId][eventName]) < limit then
            return false
        end
        playerCooldowns[playerId][eventName] = currentTime
        return true
    end

    function self:SendWebhook(webhook, title, description, color)
        local embed = {
            {
                ['title'] = title,
                ['description'] = description,
                ['color'] = color or Webhooks['Profile']['color'],
                ['footer'] = {
                    ['text'] = os.date('%d.%m.%Y - %H:%M:%S'),
                },
            }
        }
        PerformHttpRequest(webhook, function(err, text, headers) end, 'POST', json.encode({
            username = Webhooks['Profile']['username'],
            avatar_url = Webhooks['Profile']['avatar'],
            embeds = embed
        }), { ['Content-Type'] = 'application/json' })
    end

    AddEventHandler('playerDropped', function()
        local playerId = source
        playerCooldowns[playerId] = nil
    end)

    ESX.RegisterServerCallback('ac_scripts:clothshop:buy', function(source, cb, store, name, skin, gender)
        if not self:checkRateLimit(source, 'clotheshop:buy', 500) then
            Config.notify(source, 'info', Lang[Config['language'] or 'en']['information'], Lang[Config['language'] or 'en']['wait_message'])
            cb(false)
            return
        end
        local xPlayer = ESX.GetPlayerFromId(source)
        local price = Config['price']
        if xPlayer.getAccount(Config['account']).money >= price then
            xPlayer.removeAccountMoney(Config['account'], price)

            local webhookTitle = Lang[Config['language'] or 'en']['webhook_title']
            local webhookDesc = Lang[Config['language'] or 'en']['webhook_description']:format(
                GetPlayerName(source),
                xPlayer.identifier,
                price,
                store and name or Lang[Config['language'] or 'en']['webhook_not_saved']
            )
            self:SendWebhook(Webhooks['URLS']['clothshop'], webhookTitle, webhookDesc)

            if store == true and name and name ~= "" then
                MySQL.Async.execute('INSERT INTO clotheshop_savings (identifier, name, data) VALUES (@identifier, @name, @skin)', {
                    ['@identifier'] = xPlayer.identifier,
                    ['@name'] = name,
                    ['@skin'] = json.encode(skin)
                }, function()
                    Config.notify(source, 'info', Lang[Config['language'] or 'en']['information'], Lang[Config['language'] or 'en']['bought_and_saved']:format(price, name))
                    TriggerClientEvent("ac_scripts:clothshop:updateOutfits", source)
                    cb(true)
                end)
            else
                Config.notify(source, 'info', Lang[Config['language'] or 'en']['information'], Lang[Config['language'] or 'en']['bought']:format(price))
                cb(true)
            end
        else
            Config.notify(source, 'info', Lang[Config['language'] or 'en']['information'], Lang[Config['language'] or 'en']['not_enough_money']:format(price))
            cb(false)
        end
    end)

    RegisterNetEvent("ac_scripts:clothshop:deleteOutfit")
    AddEventHandler("ac_scripts:clothshop:deleteOutfit", function(id)
        if not self:checkRateLimit(source, 'clotheshop:deleteOutfit', 500) then
            Config.notify(source, 'info', Lang[Config['language'] or 'en']['information'], Lang[Config['language'] or 'en']['wait_message'])
            return
        end
        local xPlayer = ESX.GetPlayerFromId(source)
        id = tonumber(id)
        MySQL.query.await("DELETE FROM clotheshop_savings WHERE identifier = @identifier AND id = @id", {
            ['@identifier'] = xPlayer.identifier,
            ['@id'] = id
        })
        TriggerClientEvent("ac_scripts:clothshop:updateOutfits", xPlayer.source)
    end)

    ESX.RegisterServerCallback('ac_scripts:clothshop:getOutfitData', function(source, cb, outfitId)
        if not self:checkRateLimit(source, 'clotheshop:getOutfitData', 500) then
            Config.notify(source, 'info', Lang[Config['language'] or 'en']['information'], Lang[Config['language'] or 'en']['wait_message'])
            cb(nil)
            return
        end
        local xPlayer = ESX.GetPlayerFromId(source)
        if not xPlayer then
            cb(nil)
            return
        end
        MySQL.Async.fetchAll('SELECT data AS skin FROM clotheshop_savings WHERE id = @id AND identifier = @identifier', {
            ['@id'] = outfitId,
            ['@identifier'] = xPlayer.identifier
        }, function(result)
            if result and result[1] and result[1].skin then
                local skinData = json.decode(result[1].skin)
                cb(skinData)
            else
                cb(nil)
            end
        end)
    end)

    ESX.RegisterServerCallback('ac_scripts:clothshop:getOutfits', function(src, cb)
        local xPlayer = ESX.GetPlayerFromId(src)
        local outfits = MySQL.query.await("SELECT * FROM clotheshop_savings WHERE identifier = @identifier ORDER BY created_at DESC", {
            ['@identifier'] = xPlayer.identifier
        })    
        cb(outfits)
    end)
end

CreateThread(function()
    AC_SCRIPTS:loadCode()
end)