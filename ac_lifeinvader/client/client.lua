local LifeInvader = {}
local ESX = Config.ESX()

function LifeInvader:loadCode()
    self.lifeinvaderOpen = false
    RegisterNUICallback('lifeinvader', function(data)
        if self.lifeinvaderOpen then
            AC:switch(data.type)({
                close = function()
                    if self.lifeinvaderOpen then
                        self:lifeinvader(false)
                    end
                end,
                send = function()
                    AC:SendSecuredServerEvent('ac_scritps:lifeinvader', data)
                end,
                default = function()
                    print('error', '[LIFEINVADER] Invalid action')
                end
            }) 
        end
    end)

    function self:lifeinvader(bool)
        self.lifeinvaderOpen = bool
        SetNuiFocus(bool, bool) 
        if bool then
            ESX.TriggerServerCallback('lifeinvader', function(messages) 
                SendNUIMessage({
                    action = 'lifeinvader',
                    enable = true,
                    messages = messages,
                    price = Config['pricePerLetter']
                })
            end)
        else
            SendNUIMessage({
                action = 'lifeinvader',
                enable = false
            })
        end
    end

    RegisterNetEvent('ac_scritps:closeLifeinvader', function()
        if self.lifeinvaderOpen then
            self:lifeinvader(false)
        end
    end)

    RegisterNetEvent('ac_scritps:lifeinvader_message', function(data)
        PlaySoundFrontend(-1, "DELETE", "HUD_DEATHMATCH_SOUNDSET", 1)
        SendNUIMessage({
            action = 'lifeinvader-message',
            data = data
        })
    end)

    CreateThread(function()
        local coords = Config['coords']
        for i = 1, #coords do
            AC:addBlip(coords[i], Config['blip']['type'], Config['blip']['color'], Config['blip']['size'], Lang[Config.language]['blip_name'])
        end
        AC:createMarkerInteract({
            markertype = Config['marker']['type'],
            color = Config['marker']['MarkerColor'],
            scale = Config['marker']['scale'],
            vehicleonly = false,
            playeronly = true,
            visibledistance = 10.0,
            animation = {
                camfollow = false,
                bump = false,
                rotate = false
            },
            coords = coords
        }, function(markerId)
            if not self.lifeinvaderOpen then
                Config.help_notify(Lang[Config.language]['help_message'])
                if IsControlJustPressed(0, 38) then 
                    self:lifeinvader(true)
                end
            else
                AC:hideMarkerInteract(markerId)
            end
        end)
    end)
end

CreateThread(function()
    LifeInvader:loadCode()
end)