local AC_SCRIPTS = {}
local ESX = Config.ESX()

function AC_SCRIPTS:loadCode()
    RegisterCommand('resetchar', function(source, args)
        if source == 0 and args[1] then
            local xPlayer = ESX.GetPlayerFromId(args[1])
            if xPlayer then
                TriggerClientEvent('ac_scripts:identity:identity', args[1], true, true)
            end
        else
            local xPlayer = ESX.GetPlayerFromId(source)
            if xPlayer and Config.Permissions[xPlayer.getGroup()] then
                if args[1] == nil or args[1] == 'me' then
                    TriggerClientEvent('ac_scripts:identity:identity', xPlayer.source, true, true)
                else
                    local target = ESX.GetPlayerFromId(args[1])
                    if target then
                        TriggerClientEvent('ac_scripts:identity:identity', target.source, true, true)
                    else
                        Config.Notify(source, 'error', 'Information', 'Spieler nicht gefunden')
                    end
                end
            else
                Config.Notify(source, 'error', 'Information', 'Dazu hast du keine rechte')
            end
        end
    end, false)

    ---@param name string
    ---@return boolean
    function self:CheckName(name)
        local nameLower = name:lower()
        if type(nameLower) ~= "string" or not nameLower:match("^[A-Za-zäöü]+$") then
            return false
        end
        for i = 1, #Config['blnamestrings'] do
            local blname = Config['blnamestrings'][i]:lower()
            if string.find(nameLower, blname) then
                return false
            end
        end
        return true
    end

    function self:checkDOBFormat(str)
        if not string.match(str, "(%d%d%d%d)%-(%d%d)%-(%d%d)") then
            return false
        end
        local y, m, d = string.match(str, "(%d%d%d%d)%-(%d%d)%-(%d%d)")
        m = tonumber(m)
        d = tonumber(d)
        y = tonumber(y)
        if ((d <= 0) or (d > 31)) or ((m <= 0) or (m > 12)) or ((y <= 1900) or (y > 2025)) then
            return false
        elseif m == 4 or m == 6 or m == 9 or m == 11 then
            return d <= 30
        elseif m == 2 then
            if y % 400 == 0 or (y % 100 ~= 0 and y % 4 == 0) then
                return d <= 29
            else
                return d <= 28
            end
        else
            return d <= 31
        end
    end

    function self:validateIdentityData(data)
        local size = false
        local firstname = false
        local lastname = false
        local date = false
        local sex = false
        local namePattern = "^[A-Z][a-z]+$"
        data.size = tonumber(data.size)
        if string.match(data.firstname, namePattern) and self:CheckName(data.firstname) then
            firstname = true
        else
            return 'Fehlerhafter Vorname'
        end
        if string.match(data.lastname, namePattern) and self:CheckName(data.lastname) then
            lastname = true
        else
            return 'Fehlerhafter Nachname'
        end
        if data.size and data.size <= 200 and data.size >= 50 then
            size = true
        else
            return 'Fehlerhafte Größe'
        end
        if data.sex == "m" or data.sex == "f" then
            sex = true
        else
            return 'Fehlerhaftes Geschlecht'
        end
        if self:checkDOBFormat(data.date) then
            date = true
        else
            return 'Fehlerhaftes Geburtsdatum'
        end
        if size and firstname and lastname and date and sex then
            return true
        else
            return 'Es ist ein Fehler aufgetreten'
        end
    end

    local allowedsource = {}
    ESX.RegisterServerCallback('ac_scripts:identity:checkIdentity', function(source, cb, data, isgiven)
        local validate = self:validateIdentityData(data)
        if validate == true then
            local xPlayer = ESX.GetPlayerFromId(source)
            local identifier = xPlayer.getIdentifier()
            MySQL.update.await("UPDATE users SET firstname = @firstname, lastname = @lastname, dateofbirth = @date, sex = @sex, height = @height WHERE identifier = @identifier", { 
                ['@firstname'] = data.firstname,
                ['@lastname'] = data.lastname,
                ['@date'] = data.date,
                ['@sex'] = data.sex,
                ['@height'] = data.size,
                ['@identifier'] = identifier
            }, function(rowsChacnged)
                xPlayer.setName(("%s %s"):format(data.firstname, data.lastname))
                xPlayer.set("firstName", data.firstname)
                xPlayer.set("lastName", data.lastname)
                xPlayer.set("dateofbirth", data.date)
                xPlayer.set("sex", data.sex)
                xPlayer.set("height", data.size)
            end)
            cb(true)
        else
            cb(validate)
        end
    end)

    RegisterServerEvent('ac_scripts:identity:heli:end', function()
        local s = source 
        if allowedsource[s] then
            allowedsource[s] = nil
            SetPlayerRoutingBucket(s, 0)
        end
    end)

    local cooldown = {}
    RegisterNetEvent("ac_scripts:identity:spawned", function()
        local s = source
        local xPlayer = ESX.GetPlayerFromId(s)
        if cooldown[s] then
            DropPlayer(s, 'Server Crash Attempt')
        end
        cooldown[s] = true
        MySQL.single("SELECT firstname, lastname, dateofbirth, sex, height FROM users WHERE identifier = ?", { xPlayer.identifier }, function(result)
            if not result or not result.firstname or not result.lastname then 
                TriggerClientEvent('ac_scripts:identity:identity', xPlayer.source, true, false)
                SetPlayerRoutingBucket(xPlayer.source, xPlayer.source)
                allowedsource[xPlayer.source] = true
                return
            end
            xPlayer.setName(("%s %s"):format(result.firstname, result.lastname))
            xPlayer.set("firstName", result.firstname)
            xPlayer.set("lastName", result.lastname)
            xPlayer.set("dateofbirth", result.dateofbirth)
            xPlayer.set("sex", result.sex)
            xPlayer.set("height", result.height)
        end)
    end)

    function self:checkIdentity(xPlayer)
        MySQL.single("SELECT firstname, lastname, dateofbirth, sex, height FROM users WHERE identifier = ?", { xPlayer.identifier }, function(result)
            if not result then
                return TriggerClientEvent('ac_scripts:identity:identity', xPlayer.source, true, false)
            end
            if not result.firstname then
                return TriggerClientEvent('ac_scripts:identity:identity', xPlayer.source, true, false)
            end
        end)
    end

    AddEventHandler("onResourceStart", function(resource)
        if resource ~= GetCurrentResourceName() then
            return
        end
        Wait(10000)
        local xPlayers = ESX.GetExtendedPlayers()
        for i = 1, #xPlayers do
            if xPlayers[i] then
                self:checkIdentity(xPlayers[i])
            end
        end
    end)
end
CreateThread(function()
    AC_SCRIPTS:loadCode()
end)
