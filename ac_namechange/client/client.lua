local Namechange = {}

function Namechange:loadCode()
    self.open = false

    function self:namechange(bool)
        if Player(GetPlayerServerId(PlayerId())) then
            self.open = bool
            SetNuiFocus(bool, bool)
            SendNUIMessage({
                type = 'namechange',
                enable = bool,
                name = Player(GetPlayerServerId(PlayerId())).state.name,
                price = Config['price'] 
            })
        else
            Config.notify_client('error', 'Information', Lang[Config['language'] or 'en']['error_occurred'])
        end
    end

    RegisterNUICallback('namechange', function(data)
        if data.type == 'close' and self.open then
            self:namechange(false)
        elseif data.type == 'change' and self.open then
            AC:SendSecuredServerEvent('ac_scripts:namechange:namechange', data)
        end
    end)

    RegisterNetEvent('ac_scripts:namechange:closenamechange')
    AddEventHandler('ac_scripts:namechange:closenamechange', function()
        if self.open then
            self:namechange(false)
        end
    end)

    CreateThread(function()
        local coords = Config['coords']
        if Config['blip']['enable'] then
            for i = 1, #coords do
                AC:addBlip(coords[i], Config['blip']['type'], Config['blip']['color'], Config['blip']['size'], Config['blip']['label'])
            end
        end
        AC:createMarkerInteract({
            markertype = 21,
            color = Config['marker_color'],
            scale = 0.8,
            vehicleonly = false,
            playeronly = true,
            visibledistance = 15.0,
            animation = {
                camfollow = false,
                bump = false,
                rotate = false
            },
            coords = coords
        }, function(markerId)
            if not self.open then
                Config.help_notify(Lang[Config['language'] or 'en']['interact']) 
                if IsControlJustPressed(0, 38) then 
                    self:namechange(true)
                end
            else
                AC:hideMarkerInteract(markerId)
            end
        end)
    end)
end

CreateThread(function()
    Namechange:loadCode()
end)