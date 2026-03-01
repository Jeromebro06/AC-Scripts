local FFA = {}
local ESX = Config.ESX()
FFA.ffaopen = false
FFA.isInFFA = false
FFA.aufnahme = false
FFA.lastWeapon = nil

function FFA:loadCode()
    function FFA:open(bool)
        self.ffaopen = bool
        if bool then
            ESX.TriggerServerCallback('ac_scripts:ffa:get', function(lobbys, stats, maps) 
                SendNUIMessage({
                    action = "ffa",
                    enable = true,
                    lobbys = lobbys,
                    stats = stats,
                    maps = maps
                })
                SetNuiFocus(true, true)
            end)
        else
            SendNUIMessage({
                action = "ffa",
                enable = false
            })
            SetNuiFocus(false, false)
        end
    end
    
    function FFA:GetKD(kills, deaths)
        if deaths == 0 then
            return tonumber(string.format("%.2f", kills))
        end
        return tonumber(string.format("%.2f", kills / deaths))
    end
    
    RegisterNetEvent('ac_scripts:ffa:update', function(lobbys)
        SendNUIMessage({
            action = "updateffa",
            lobbys = lobbys
        })
    end)
    
    function FFA:SpectateKiller(killerServerId, duration)
        local killerPed = GetPlayerPed(GetPlayerFromServerId(killerServerId))
        if not killerPed or killerPed == 0 then
            return
        end
        NetworkSetInSpectatorMode(true, killerPed)
        Config.InSpecate(true)
        CreateThread(function()
            Wait(duration)
            NetworkSetInSpectatorMode(false, killerPed)
            Config.InSpecate(false)
        end)
    end
    
    AddEventHandler(Config['player_death_event'], function(data)
        if FFA.isInFFA then
            local killer = data.killerServerId or 0
            TriggerServerEvent('ac_scripts:ffa:died', killer)
            if killer and killer > 0 and killer ~= GetPlayerServerId(PlayerId()) and Config['SpectateKiller'] then
                FFA:SpectateKiller(killer, (Config['RespawnTime'] * 1000) + 1500)
            end
            if Config['RespawnWeapon'] then
                CreateThread(function()
                    Wait((Config['RespawnTime'] * 1000) + 1500)
                    if FFA.isInFFA and FFA.lastWeapon then
                        SetCurrentPedWeapon(PlayerPedId(), FFA.lastWeapon, false)
                    end
                end)
            end
        end
    end)
    
    RegisterNetEvent('ac_scripts:ffa:updateStats', function(data, heal)
        if heal then
            SetEntityHealth(PlayerPedId(), 200.0)
            AddArmourToPed(PlayerPedId(), 100.0)
        end
        SendNUIMessage({
            action = "updateFFAStats",
            kills = data.kills,
            deaths = data.deaths,
            kd = FFA:GetKD(data.kills, data.deaths),
        })
    end)
    
    local joinCooldown = false
    RegisterNUICallback('ffa', function(data)
        if FFA.ffaopen or FFA.aufnahme then
            if data.type == 'close' then
                FFA:open(false)
            elseif data.type == 'aufnahme' then
                SendNUIMessage({
                    action = 'ffa-aufnahme',
                    enable = false,
                })
                SetNuiFocus(false, false)
                FFA.aufnahme = false
            elseif data.type == 'join' then
                if not joinCooldown then
                    joinCooldown = true
                    TriggerServerEvent('ac_scripts:ffa:join', data.key, data.password)
                    Citizen.SetTimeout(1000, function()
                        joinCooldown = false
                    end)
                end
            elseif data.type == 'create' then
                TriggerServerEvent('ac_scripts:ffa:create', data)
            else
                print('[FFA] Invalid action')
            end
        end
    end)
    
    function FFA:init()
        local coord = Config['join']
        local blipsettings = Config['JoinMarker']['blip']
        AC:addBlip(coord, blipsettings['type'], blipsettings['color'], blipsettings['size'], blipsettings['title'])
        CreateThread(function()
            while true do
                local sleep = 1500
                local playerPed = PlayerPedId()
                local playerCoords = GetEntityCoords(playerPed)
                local distance = #(playerCoords - vector3(coord.x, coord.y, coord.z))
                if distance < 10.0 and not FFA.isInFFA then
                    sleep = 0
                    DrawMarker(Config.JoinMarker.type, coord.x, coord.y, coord.z, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, Config.JoinMarker.size, Config.JoinMarker.size, Config.JoinMarker.size, Config.JoinMarker.color.r, Config.JoinMarker.color.g, Config.JoinMarker.color.b, Config.JoinMarker.color.a or 255, true, true, 2, false, nil, nil, false)
                    if distance < 2.0 and not self.ffaopen then
                        Config.help_notify(Lang[Config['language']]['interact'])
                        if IsControlJustPressed(0, 38) then
                            self:open(true)
                            Wait(100)
                        end
                    end
                end
                Wait(sleep)
            end
        end)
    end
    
    CreateThread(function()
        FFA:init()
    end)
    
    RegisterNetEvent('ac_scripts:ffa:lobby', function(bool, data, stats, bodyshot, weapon)
        if bool then
            FFA:open(false)
            FFA.isInFFA = true
            SetPedArmour(PlayerPedId(), 99)
            SetEntityHealth(PlayerPedId(), 200)
            Wait(100)
            if Config['SelectWeapon'] then
                CreateThread(function()
                    Wait(2500)
                    local ped = PlayerPedId()
                    SetCurrentPedWeapon(ped, GetHashKey(weapon), true)
                end)
            end
            CreateThread(function()
                while FFA.isInFFA do
                    local ped = PlayerPedId()
                    local coords = GetEntityCoords(ped)
                    local weapon = GetSelectedPedWeapon(ped)
                    if weapon and weapon ~= GetHashKey('WEAPON_UNARMED') then
                        FFA.lastWeapon = weapon
                    else
                        FFA.lastWeapon = nil
                    end
                    DisableControlAction(0, 73, true)
                    DisableControlAction(0, 38, true)
                    if bodyshot then
                        SetPedSuffersCriticalHits(PlayerPedId(), false)
                    end
                    DrawMarker(28, data.coords.x, data.coords.y, data.coords.z, 0, 0, 0, 0, 0, 0, data.distance, data.distance, data.distance, Config.ZoneColor.r, Config.ZoneColor.g, Config.ZoneColor.b, Config.ZoneColor.a or 200)
                    if IsPedArmed(ped, 1) == 1 then
                        DisablePlayerFiring(PlayerId(), true)
                        DisableControlAction(0, 140, true)
                    end
                    local dist = #(coords - data.coords)
                    if dist > data.distance then
                        SetEntityHealth(ped, 0)
                        Wait(6000)
                    end
                    local weaponHash = GetSelectedPedWeapon(ped)
                    if weaponHash ~= "WEAPON_UNARMED" then
                        local ammoCount = GetAmmoInPedWeapon(ped, weaponHash)
                        if ammoCount < 10 then
                            SetPedAmmo(ped, weaponHash, 250)
                        end
                    end
                    Wait(0)
                end
                SetPedSuffersCriticalHits(PlayerPedId(), true)
                if FFA.aufnahme then
                    SendNUIMessage({
                        action = 'ffa-aufnahme',
                        enable = false,
                    })
                    SetNuiFocus(false, false)
                    FFA.aufnahme = false
                    FFA.lastWeapon = nil
                end
            end)
            Wait(1000)
            SendNUIMessage({
                action = 'ffastats',
                enable = true,
                kills = stats.kills,
                deaths = stats.deaths,
                kd = FFA:GetKD(stats.kills, stats.deaths),
            })
            if Config['clip_require'] then
                SendNUIMessage({
                    action = 'ffa-aufnahme',
                    enable = true,
                })
                SetNuiFocus(true, true)
                FFA.aufnahme = true
                CreateThread(function()
                    while FFA.aufnahme do
                        Wait(0)
                        SetLocalPlayerAsGhost(true)
                        SetGhostedEntityAlpha(100)
                        SetEntityAlpha(PlayerPedId(), 150, false)
                        SetEntityInvincible(PlayerPedId(), true)
                    end
                    Wait(100)
                    SetLocalPlayerAsGhost(false)
                    SetGhostedEntityAlpha(255)
                    ResetEntityAlpha(PlayerPedId())
                    SetEntityInvincible(PlayerPedId(), false)
                end)
            end
        else
            SetPedSuffersCriticalHits(PlayerPedId(), true)
            FFA.isInFFA = false
            SendNUIMessage({
                action = 'ffastats',
                enable = false,
            })
        end
    end)
end

exports('isFFA', function()
    return FFA.isInFFA
end)

CreateThread(function()
    FFA:loadCode()
end)