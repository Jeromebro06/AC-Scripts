local isshopopen = false
local ESX = Config.ESX()
local Shop = {}

function Shop:loadCode()
    function OpenShop(bool, shoptype, items)
        isshopopen = bool
        SetNuiFocus(bool, bool)
        SendNUIMessage({
            action = 'shop',
            enable = bool,
            shoptype = shoptype,
            items = items
        })
    end

    RegisterNUICallback('shop', function(data)
        if data.type == "close" and isshopopen then
            OpenShop(false)
        elseif data.type == "buy" and isshopopen then
            AC:SendSecuredServerEvent('ac_scripts:shop_buy', data)
        end
    end)

    CreateThread(function()
        for index, value in pairs(Config['shoptypes']) do 
            local coords = value['positions']
            local blip = value['settings']['blip']
            if blip['enable'] then
                for i = 1, #coords do
                    AC:addBlip(coords[i], blip['type'], blip['color'], blip['scale'], blip['name'])
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
                    camfollow = true,
                    bump = false,
                    rotate = false
                },
                coords = coords
            }, function(markerId)
                if not isshopopen then
                    Config.help_notify(value['settings']['interact']) 
                    if IsControlJustPressed(0, 38) then
                        OpenShop(true, index, value['items'])
                    end
                else
                    AC:hideMarkerInteract(markerId)
                end
            end)
        end
    end)

    RegisterNetEvent('ac_scripts:close_shop', function()
        OpenShop(false)
    end)

    CreateThread(function()
        Wait(1000)
        if Config['blackmarket'] and Config['blackmarket']['enabled'] then
            ESX.TriggerServerCallback('ac_scripts:getSchwarzmarkt', function(index) 
                for i, market in pairs(Config['blackmarket']['positions']) do
                    AC:spawnPed(market['pedmodel'], market['pedcoords'])
                    AC:createMarkerInteract({
                        markertype = -1,
                        color = Config.MarkerColor,
                        scale = 1.5,
                        lenghtx = 0.9,
                        lenghty = 0.9,
                        vehicleonly = false,
                        playeronly = true,
                        visibledistance = 10.0,
                        animation = {
                            camfollow = false,
                            bump = false,
                            rotate = false
                        },
                        coords = { market['pedcoords'] }
                    }, function(markerId)
                        Config.help_notify(Config['blackmarket']['interact'])
                        if IsControlJustPressed(0, 38) then 
                            if i == index then
                                OpenShop(true, 'blackmarket', market['items'])
                            else
                                Config.notify_client('info', Lang[Config['language']]['info'], Lang[Config['language']]['blackmarket_unavailable'])
                            end
                        end
                    end)
                end
            end)
        end
    end)
end

CreateThread(function()
    Shop:loadCode()
end)