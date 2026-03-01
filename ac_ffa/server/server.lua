local FFA = {}
local ESX = Config.ESX()
FFA.lobbys = {}
FFA.savedLoadouts = {}
FFA.playerStats = {}
FFA.killedPlayers = {}

exports('isFFA', function(source)
    return FFA:isInFFA(source)
end)

function FFA:loadCode()
    function FFA:addFFA(name, data)
        local index = #self.lobbys + 789
        table.insert(self.lobbys, {
            key = index,
            name = name,
            players = {},
            slots = data.slots,
            image = data.image,
            spawns = data.spawns,
            loadout = data.loadout,
            zone = data.zone,
            password = data.password,
            ffatype = data.ffatype,
            lobbyowner = data.lobbyowner,
            bodyshot = data.bodyshot
        })
        return index
    end
    
    function FFA:SendFFAStatsToDiscord()
        local success, result = pcall(function()
            return MySQL.query.await("SELECT name, kills, deaths FROM ac_ffa ORDER BY kills DESC LIMIT 10")
        end)
        
        local topPlayers = {}
        if not success then
            print('^4[FFA] ^1Please add the sql.sql to your database!')
            return
        else
            topPlayers = result or {}
        end
        
        if not topPlayers or #topPlayers == 0 then 
            return 
        end
    
        local content = "**"..Lang[Config['language']]['top_10'].."**\n\n"
        for i, player in ipairs(topPlayers) do
            local kd = FFA:GetKD(player.kills, player.deaths)
            content = content .. string.format("`#%d` **%s** - Kills: **%d**, Deaths: **%d**, K/D: **%.2f**\n", 
                i, player.name, player.kills, player.deaths, kd)
        end
    
        PerformHttpRequest(Webhooks['URLS']['ffa_public'], function(err, text, headers) 
            if err ~= 200 and err ~= 204 then
                print('^4[FFA] ^1Discord webhook error: ' .. tostring(err))
            end
        end, 'POST', json.encode({
            username = Webhooks['Profile']['username'],
            avatar_url = Webhooks['Profile']['avatar'],
            embeds = {{
                title = Lang[Config['language']]['embed_title'],
                description = content,
                color = 16753920
            }}
        }), { ['Content-Type'] = 'application/json' })
    end
    
    function FFA:json_format(lua_table)
        local json_string = json.encode(lua_table, { indent = true })
        local discord_formatted = "```json\n" .. json_string .. "\n```"
        return discord_formatted
    end
    
    function FFA:removeFFA(index)
        for i = 1, #self.lobbys do
            if self.lobbys[i].key == index then
                table.remove(self.lobbys, i)
                TriggerClientEvent('ac_scripts:ffa:update', -1, self.lobbys)
                return
            end
        end
    end
    
    function FFA:GetKD(kills, deaths)
        if deaths == 0 then
            return tonumber(string.format("%.2f", kills))
        end
        return tonumber(string.format("%.2f", kills / deaths))
    end
    
    function FFA:isFull(index)
        for i = 1, #self.lobbys do
            if self.lobbys[i].key == index then
                return #self.lobbys[i].players >= self.lobbys[i].slots
            end
        end
        return false
    end
    
    function FFA:updatePlayers(index, data)
        if data.action == 'addPlayer' then
            for i = 1, #self.lobbys do
                if tonumber(self.lobbys[i].key) == tonumber(index) then
                    table.insert(self.lobbys[i].players, data.player)
                    TriggerClientEvent('ac_scripts:ffa:update', -1, self.lobbys)
                    return self.lobbys[i]
                end
            end
            return false
        elseif data.action == 'removePlayer' then
            for i = 1, #self.lobbys do
                for j = 1, #self.lobbys[i].players do
                    if data.player == self.lobbys[i].players[j] then
                        table.remove(self.lobbys[i].players, j)
                        TriggerClientEvent('ac_scripts:ffa:update', -1, self.lobbys)
                        return self.lobbys[i]
                    end
                end
            end
            return false
        end
    end
    
    function FFA:isInFFA(source)
        for i = 1, #self.lobbys do
            for j = 1, #self.lobbys[i].players do
                if source == self.lobbys[i].players[j] then
                    return self.lobbys[i]
                end
            end
        end
        return false
    end    
    
    function FFA:leave(source)
        local lobby = self:isInFFA(source)
        if not lobby then
            Config.notify(source, 'error', Lang[Config['language']]['notify_title'], Lang[Config['language']]['not_ffa'])
            return false
        end
    
        self:loadout(source, {
            action = 'restore',
        })
    
        local xPlayer = ESX.GetPlayerFromId(source)
        if not xPlayer then return false end
        local identifier = xPlayer.identifier
    
        if self.playerStats and self.playerStats[source] then
            local stats = self.playerStats[source]
            MySQL.update.await('UPDATE ac_ffa SET kills = ?, deaths = ?, name = ? WHERE identifier = ?', {
                stats.kills, stats.deaths, GetPlayerName(source), identifier
            })
            self.playerStats[source] = nil
        end
    
        self:updatePlayers(lobby.key, {
            action = 'removePlayer',
            player = source
        })
    
        if lobby.lobbyowner ~= 0 and lobby.lobbyowner ~= source then
            for j = 1, #lobby.players do
                local playerId = lobby.players[j]
                if playerId and source then
                    if playerId ~= source then
                        Config.notify(playerId, 'info', Lang[Config['language']]['notify_title'], string.format(Lang[Config['language']]['leaved_ffa'], (GetPlayerName(source) or "Undefined")))
                    end
                end
            end
        end
    
        if lobby.lobbyowner == source then
            if lobby.players and #lobby.players > 0 then
                local playersCopy = {}
                for _, pid in ipairs(lobby.players) do
                    if pid ~= source then
                        table.insert(playersCopy, pid)
                    end
                end
    
                for _, playerId in ipairs(playersCopy) do
                    self:leave(playerId)
                    Config.notify(playerId, 'info', Lang[Config['language']]['notify_title'], Lang[Config['language']]['owner_leaved'])
                end
            end
    
            self:removeFFA(lobby.key)
        end
    
        local playerPed = GetPlayerPed(source)
        SetPlayerRoutingBucket(source, 0)
        TriggerClientEvent('ac_scripts:ffa:lobby', source, false)
        if GetEntityHealth(playerPed) <= 0 then
            Config.revive_player(source)
            Wait(1000)
        end
        SetEntityCoords(playerPed, Config['join'])
        Config.notify(source, 'success', Lang[Config['language']]['notify_title'], Lang[Config['language']]['self_leave'])
        return true
    end
    
    function FFA:getLobbybyKey(key)
        for i = 1, #self.lobbys do
            if tonumber(self.lobbys[i].key) == tonumber(key) then
                return self.lobbys[i]
            end
        end
        return false
    end
    
    function FFA:hasPassword(key)
        local lobby = self:getLobbybyKey(key)
        return lobby and lobby.password ~= ''
    end
    
    function FFA:verifyPassword(key, password)
        local lobby = self:getLobbybyKey(key)
        return lobby and lobby.password == password
    end
    
    function FFA:getSpawnPoint(key)
        local lobby = self:getLobbybyKey(key)
        if lobby then
            return lobby.spawns[math.random(#lobby.spawns)]
        else
            return false
        end
    end
    
    function FFA:join(source, key)
        if not self:isInFFA(source) then
            local lobby = FFA:updatePlayers(key, {
                action = 'addPlayer',
                player = source
            })
            if lobby then
                local xPlayer = ESX.GetPlayerFromId(source)
                if not xPlayer then return false end            
                local identifier = xPlayer.identifier
                local stats = MySQL.single.await('SELECT kills, deaths FROM ac_ffa WHERE identifier = ?', {identifier})
                if not stats then
                    MySQL.insert.await('INSERT INTO ac_ffa (identifier, kills, deaths, name) VALUES (?, 0, 0, ?)', {identifier, GetPlayerName(source)})
                    stats = { kills = 0, deaths = 0 }
                end
                self.playerStats[source] = stats
                SetPlayerRoutingBucket(source, lobby.key)
                local c = self:getSpawnPoint(lobby.key)
                SetEntityCoords(GetPlayerPed(source), vector3(c.x, c.y, c.z))
                SetEntityHeading(GetPlayerPed(source), c.w)
                TriggerClientEvent('ac_scripts:ffa:lobby', source, true, lobby.zone, self.playerStats[source], (lobby.bodyshot or false), lobby.loadout[1])
                Config.notify(source, 'success', Lang[Config['language']]['notify_title'], Lang[Config['language']]['joined_lobby'])
                self:loadout(source, {
                    action = 'loadout',
                    loadout = lobby.loadout
                })
                return true
            else
                Config.notify(source, 'error', Lang[Config['language']]['notify_title'], Lang[Config['language']]['lobby_not_found'])
                return false
            end
        else
            return false
        end
    end
    
    function FFA:respawn(source)
        local lobby = self:isInFFA(source)
        if lobby then
            local c = self:getSpawnPoint(lobby.key)
            SetTimeout(Config['RespawnTime'] * 1000, function()
                Config.revive_player(source)
                Wait(1000)
                SetEntityCoords(GetPlayerPed(source), vector3(c.x, c.y, c.z))
                SetEntityHeading(GetPlayerPed(source), c.w)
            end)
        end
    end
    
    function FFA:loadout(source, data)
        local xPlayer = ESX.GetPlayerFromId(source)
        if not xPlayer then return end
        
        if data.action == 'loadout' then
            self.savedLoadouts[source] = {}
            local currentLoadout = xPlayer.getLoadout()
            for _, weapon in ipairs(currentLoadout) do
                table.insert(self.savedLoadouts[source], {
                    name = weapon.name,
                    ammo = weapon.ammo or 0,
                    components = weapon.components or {},
                    tintIndex = weapon.tintIndex or 0
                })
            end
            for _, weapon in ipairs(currentLoadout) do
                xPlayer.removeWeapon(weapon.name)
            end
            for i = 1, #data.loadout do
                xPlayer.addWeapon(data.loadout[i], 255)
            end
        elseif data.action == 'restore' then
            if self.savedLoadouts[source] then
                local currentLoadout = xPlayer.getLoadout()
                for _, weapon in ipairs(currentLoadout) do
                    xPlayer.removeWeapon(weapon.name)
                end
                for _, weapon in ipairs(self.savedLoadouts[source]) do
                    xPlayer.addWeapon(weapon.name, weapon.ammo or 0)
                    if weapon.components and #weapon.components > 0 then
                        for _, component in ipairs(weapon.components) do
                            xPlayer.addWeaponComponent(weapon.name, component)
                        end
                    end
                    if weapon.tintIndex and weapon.tintIndex > 0 then
                        xPlayer.setWeaponTint(weapon.name, weapon.tintIndex)
                    end
                end
                self.savedLoadouts[source] = nil 
                Config.notify(source, 'info', Lang[Config['language']]['notify_title'], Lang[Config['language']]['old_loadout'])
            else
                Config.notify(source, 'info', Lang[Config['language']]['notify_title'], Lang[Config['language']]['no_loadout'])
            end
        end
    end
    
    function FFA:updateStats(s, action)
        if action == "kill" then
            self.playerStats[s].kills = self.playerStats[s].kills + 1
        else
            self.playerStats[s].deaths = self.playerStats[s].deaths + 1
        end
    end
    
    function FFA:killhandler(victim, killer)
        if killer ~= 0 and killer ~= victim then
            local victimName = GetPlayerName(victim)
            local killerName = GetPlayerName(killer)
            Config.notify(killer, 'success', Lang[Config['language']]['notify_title'], (Lang[Config['language']]['killer']):format(victimName))
            Config.notify(victim, 'error', Lang[Config['language']]['notify_title'], (Lang[Config['language']]['victim']):format(killerName))
            if killer ~= victim then
                self:updateStats(killer, "kill")
                self:updateStats(victim, "death")
                if Config['MoneyPerKill'] and Config['MoneyPerKill']['enable'] then
                    local xPlayer = ESX.GetPlayerFromId(killer)
                    if xPlayer then
                        xPlayer.addAccountMoney(Config['MoneyPerKill']['account'], Config['MoneyPerKill']['amount'])
                    end
                end
            end
            TriggerClientEvent('ac_scripts:ffa:updateStats', killer, self.playerStats[killer], true)
            TriggerClientEvent('ac_scripts:ffa:updateStats', victim, self.playerStats[victim], true)
        end
    end
    
    CreateThread(function()
        if Config['lobbys'] then
            for k, v in pairs(Config['lobbys']) do
                v.password = ''
                v.ffatype = 'normal'
                v.lobbyowner = 0
                FFA:addFFA(k, v)
            end
        else
            print("[FFA] Keine Lobbys in Config gefunden!")
        end
        FFA:SendFFAStatsToDiscord()
    end)
    
    ESX.RegisterServerCallback('ac_scripts:ffa:get', function(src, cb)
        local topPlayers = MySQL.query.await("SELECT name, kills, deaths FROM ac_ffa ORDER BY kills DESC LIMIT 10")
        local topStats = {}
        for i, player in ipairs(topPlayers) do
            table.insert(topStats, {
                name = player.name,
                kills = player.kills,
                deaths = player.deaths,
                kd = FFA:GetKD(player.kills, player.deaths),
            })
        end

        local maps = {}
        for mapName, _ in pairs(Config['lobbys']) do
            table.insert(maps, {
                name = mapName,
                value = mapName
            })
        end

        cb(FFA.lobbys, topStats, maps)
    end)
    
    RegisterServerEvent('ac_scripts:ffa:join', function(key, password)
        if FFA:isFull(key) then
            Config.notify(source, 'error', Lang[Config['language']]['notify_title'], Lang[Config['language']]['lobby_full'])
            return
        end
        if FFA:hasPassword(key) then
            if FFA:verifyPassword(key, password) then
                FFA:join(source, key)
            else
                Config.notify(source, 'error', Lang[Config['language']]['notify_title'], Lang[Config['language']]['wrong_password'])
            end
        else
            FFA:join(source, key)
        end
    end)
    
    RegisterCommand(Config['quitcommand'], function(source, args, raw)
        local playerPed = GetPlayerPed(source)
        if GetEntityHealth(playerPed) <= 0 then
            Config.notify(source, "error", Lang[Config['language']]['notify_title'], Lang[Config['language']]['death_leave'])
            return
        end
        FFA:leave(source)
    end, false)
    
    RegisterServerEvent('ac_scripts:ffa:died', function(killer)
        if FFA:isInFFA(source) then
            local currentTime = os.time()
            if FFA.killedPlayers[source] and (currentTime - FFA.killedPlayers[source]) < 1 then
                return
            end
            FFA.killedPlayers[source] = currentTime
            FFA:killhandler(source, killer or 0)
            FFA:respawn(source)
        end
    end)
    
    RegisterServerEvent('ac_scripts:ffa:create', function(data)
        if FFA:isInFFA(source) then
            Config.notify(source, 'error', Lang[Config['language']]['notify_title'], Lang[Config['language']]['already_lobby'])
            return
        end
        if data.slots < 2 or data.slots > 40 then
            Config.notify(source, 'error', Lang[Config['language']]['notify_title'], Lang[Config['language']]['undefined_players'])
            return
        end
        if not Config['lobbys'][data.map] then
            Config.notify(source, 'error', Lang[Config['language']]['notify_title'], Lang[Config['language']]['undefined_card'])
            return
        end
        if #data.weapons == 0 then
            Config.notify(source, 'error', Lang[Config['language']]['notify_title'], Lang[Config['language']]['no_weapon'])
            return
        end
        local mapconfig = Config['lobbys'][data.map]
        if mapconfig then
            local key = FFA:addFFA(GetPlayerName(source), {
                slots = data.slots,
                image = mapconfig.image,
                spawns = mapconfig.spawns,
                loadout = data.weapons,
                zone = mapconfig.zone,
                password = data.password or '',
                bodyshot = data.bodyshot or false,
                ffatype = 'custom',
                lobbyowner = source
            })
            if key then
                local logData = {
                    mapname = data.map,
                    owner = GetPlayerName(source),
                    slots = data.slots,
                    loadout = data.weapons,
                    password = data.password or Lang[Config['language']]['no_password'],
                    bodyshot = data.bodyshot or false,
                    timestamp = os.date("%Y-%m-%d %H:%M:%S")
                }
                PerformHttpRequest(Webhooks['URLS']['ffa_admin'], function(err, text, headers) 
                end, 'POST', json.encode({
                    username = Webhooks['Profile']['username'],
                    avatar_url = Webhooks['Profile']['avatar'],
                    embeds = {{
                        title = Lang[Config['language']]['lobby_created'],
                        description = Lang[Config['language']]['lobby_created'], 'Data: ' .. FFA:json_format(logData),
                        color = 16753920
                    }}
                }), { 
                    ['Content-Type'] = 'application/json' 
                })
                FFA:join(source, key)
            else
                Config.notify(source, 'error', Lang[Config['language']]['notify_title'], Lang[Config['language']]['error_creating'])
            end
        else
            Config.notify(source, 'error', Lang[Config['language']]['notify_title'], Lang[Config['language']]['undefined_card'])
        end
    end)
    
    AddEventHandler('playerDropped', function(reason)
        FFA:leave(source)
    end)
    
    AddEventHandler('onResourceStop', function(resourceName)
        if (GetCurrentResourceName() ~= resourceName) then
            return
        end
        for i = 1, #FFA.lobbys do
            for j = 1, #FFA.lobbys[i].players do
                FFA:leave(FFA.lobbys[i].players[j])
            end
        end
    end)
end

CreateThread(function()
    FFA:loadCode()
end)