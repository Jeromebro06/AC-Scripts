local ClothShop = {}
local ESX = Config.ESX()

function ClothShop:loadCode()
    function self:filterSkinComponents(skin)
        local filteredSkin = {}
        for component, value in pairs(skin) do
            if Config.saved_components[component] then
                filteredSkin[component] = value
            end
        end
        return filteredSkin
    end

    function self:loadAnimDict(dict)
        while (not HasAnimDictLoaded(dict)) do
            RequestAnimDict(dict)
            Wait(5)
        end
    end

    function self:handsup()
        local playerPed = PlayerPedId()
        if not self.hu then
            self.hu = true
            self:loadAnimDict('random@mugging3')
            TaskPlayAnim(playerPed, 'random@mugging3', 'handsup_standing_base', 8.0, -8, -1, 49, 0, 0, 0, 0)
        else
            ClearPedTasks(playerPed)
            self.hu = false
        end
    end

    function self:skinCam(bool)
        local ped = PlayerPedId()
        if bool then
            local pedCoords = GetEntityCoords(ped)
            local pedHeading = GetEntityHeading(ped)
            local offset = 1.55
            local cameraPosition = vector3(
                pedCoords.x + math.cos(math.rad(pedHeading)) * offset,
                pedCoords.y + math.sin(math.rad(pedHeading)) * offset,
                pedCoords.z + 1.0
            )
            self.cam = CreateCam("DEFAULT_SCRIPTED_CAMERA", true)
            SetCamCoord(self.cam, cameraPosition.x, cameraPosition.y, cameraPosition.z - 0.6)
            PointCamAtCoord(self.cam, pedCoords.x, pedCoords.y, pedCoords.z)
            local dx = pedCoords.x - cameraPosition.x
            local dy = pedCoords.y - cameraPosition.y
            local targetHeading = math.deg(math.atan2(dy, dx)) + 90.0
            SetEntityHeading(ped, targetHeading)
            SetCamActive(self.cam, true)
            RenderScriptCams(true, false, 1000, true, true)
            ClearPedTasksImmediately(ped)
        else
            if self.cam then
                RenderScriptCams(false, true, 1000, true, true)
                Wait(1000)
                DestroyCam(self.cam, false)
                ClearPedTasksImmediately(ped)
                self.cam = nil
                self.hu = false
            end
        end
    end

    function self:open(bool)
        self.clotheopen = bool
        if bool then 
            self.purchased = false
            self:skinCam(true)
            self:loadSavedOutfits()
            TriggerEvent('skinchanger:getData', function(components, maxVals)
                local clothes = {}
                for k, v in pairs(Config.category) do 
                    local variationKey = k .. "_1"
                    local colorKey = k .. "_2"
                    if k == "arms" then
                        table.insert(clothes, {
                            name = k,
                            label = v.label,
                            img = v.img,
                            placement = v.placement,
                            maxVariation = maxVals["arms"] or 0,
                            maxColor = 0
                        })
                    else
                        table.insert(clothes, {
                            name = k,
                            label = v.label,
                            img = v.img,
                            placement = v.placement,
                            maxVariation = maxVals[variationKey] or 0,
                            maxColor = maxVals[colorKey] or 0
                        })
                    end
                end

                SendNUIMessage({
                    action = "clotheshop",
                    enable = true,
                    clothes = clothes,
                    price = Config['price']
                })
                SetNuiFocus(true, true)

                TriggerEvent('skinchanger:getSkin', function(skin)
                    self.standartSkin = skin
                end)
                
            end)
            CreateThread(function()
                while self.clotheopen do
                    local players = GetActivePlayers()
                    for i = 1, #players do
                        local currentplayer = players[i]
                        local ped = GetPlayerPed(currentplayer)
                        if ped ~= PlayerPedId() then
                            SetPlayerInvisibleLocally(currentplayer, true)
                        end
                    end
                    Config.hide_hud()
                    Wait(0)
                end
            end)
        else 
            SendNUIMessage({
                action = "clotheshop",
                enable = false
            })
            self:skinCam(false)
            SetNuiFocus(false, false)
            if not self.purchased then
                TriggerEvent('skinchanger:loadSkin', self.standartSkin)
            end
        end
    end

    function self:loadSavedOutfits()
        ESX.TriggerServerCallback('ac_scripts:clothshop:getOutfits', function(outfits)
            SendNUIMessage({
                action = "addOutfits",
                outfits = outfits
            })
        end)
    end

    function self:isBlacklistedClothe(category, number)
        local blacklisted = false
        for k,v in pairs(Config.category[category].blacklisted) do 
            if v == tonumber(number) then 
                blacklisted = true
            end
        end
        return blacklisted
    end

    RegisterNetEvent("ac_scripts:clothshop:updateOutfits", function()
        self:loadSavedOutfits()
    end)

    RegisterNUICallback('clotheshop', function(data, cb)
        if self.clotheopen then 
            AC:switch(data.type)({
                close = function()
                    self:open(false)
                end,
                change = function()
                    PlaySound(-1, "SELECT", "HUD_FRONTEND_DEFAULT_SOUNDSET", 0, 0, 1)
                    if data.option == "variation" then 
                        if data.category == "arms" then
                            local value = tonumber(data.value)
                            if not self:isBlacklistedClothe(data.category, data.value) then 
                                TriggerEvent('skinchanger:change', "arms", value)
                            end
                        else
                            local componentName = data.category .. "_1"
                            local value = tonumber(data.value)
                            if not self:isBlacklistedClothe(data.category, data.value) then 
                                TriggerEvent('skinchanger:change', componentName, value)
                            end
                            
                            TriggerEvent('skinchanger:getData', function(components, maxVals)
                                local textureKey = data.category .. "_2"
                                local maxTexture = maxVals[textureKey]
                                SendNUIMessage({
                                    action = "updateMaxColor",
                                    max = maxTexture
                                })
                            end)
                        end
                    else 
                        if data.category ~= "arms" then
                            TriggerEvent('skinchanger:change', data.category.."_2", tonumber(data.value))
                        end
                    end
                end,
                saverequest = function()
                    TriggerEvent('skinchanger:getSkin', function(currentSkin)
                        local hasChanged = false
                        for k, v in pairs(currentSkin) do
                            if self.standartSkin[k] ~= v then
                                hasChanged = true
                                break
                            end
                        end
                        if hasChanged then
                            cb('changed') 
                        else
                            self:open(false)
                            cb('false')
                        end
                    end)
                end,
                changeCategory = function()
                    TriggerEvent('skinchanger:getSkin', function(skin)
                        TriggerEvent('skinchanger:getData', function(components, maxVals)
                            if data.category == "arms" then
                                SendNUIMessage({
                                    action = "setCategoryCurrentClothe",
                                    variation = skin["arms"],
                                    color = 0,
                                    maxColor = 0
                                })
                            else
                                local textureKey = data.category .. "_2"
                                local maxTexture = maxVals[textureKey]
                                SendNUIMessage({
                                    action = "setCategoryCurrentClothe",
                                    variation = skin[data.category.."_1"],
                                    color = skin[data.category.."_2"],
                                    maxColor = maxTexture
                                })
                            end
                        end)
                    end)
                end,
                move = function()
                    local heading = GetEntityHeading(PlayerPedId())
                    if data.move == "left" then 
                        SetEntityHeading(PlayerPedId(), heading-5)
                    else 
                        SetEntityHeading(PlayerPedId(), heading+5)
                    end
                end,
                deleteOutfit = function()
                    AC:SendSecuredServerEvent('ac_scripts:clothshop:deleteOutfit', data.id)
                end,
                save = function()
                    local name = data.name or ""
                    local store = data.store or false
                    TriggerEvent('skinchanger:getSkin', function(currentSkin)
                        local clothingOnlySkin = self:filterSkinComponents(currentSkin)
                        ESX.TriggerServerCallback('ac_scripts:clothshop:buy', function(success) 
                            if success then
                                self.standartSkin = currentSkin
                                self.purchased = true
                                AC:SendSecuredServerEvent('esx_skin:save', clothingOnlySkin)
                                self:open(false)
                                if cb then cb('ok') end
                            else
                                TriggerEvent('skinchanger:loadSkin', self.standartSkin)
                                self:open(false)
                                if cb then cb('failed') end
                            end
                        end, store, name, clothingOnlySkin, (ESX.GetPlayerData().sex or 0))
                    end)
                end,
                loadOutfit = function()
                    ESX.TriggerServerCallback('ac_scripts:clothshop:getOutfitData', function(skinData) 
                        if skinData then
                            TriggerEvent('skinchanger:loadSkin', skinData)
                            self.standartSkin = skinData
                            self.purchased = true
                            AC:SendSecuredServerEvent('esx_skin:save', self.standartSkin)
                            self:open(false)
                            if cb then cb('ok') end
                        else
                            if cb then cb('failed') end
                        end
                    end, data.id)
                end,
                handsup = function()
                    self:handsup()
                end
            })
        end
    end)

    CreateThread(function()
        self.clotheopen = false
        self.cam = nil
        self.standartSkin = nil
        self.purchased = false
        self.hu = false
        local coords = Config['coords']
        
        for coord, data in pairs(coords) do
            if data['blip'] then
                AC:addBlip(coord, Config['blip']['type'], Config['blip']['color'], Config['blip']['size'], Config['blip']['label'])
            end
            AC:createMarkerInteract({
                markertype = data['marker']['type'],
                color = Config['marker_color'],
                scale = 1.0,
                lenghtx = data['marker']['size'],
                lenghty = data['marker']['size'],
                vehicleonly = false,
                playeronly = true,
                visibledistance = 12.0,
                animation = {
                    camfollow = false,
                    bump = false,
                    rotate = false
                },
                coords = {coord}
            }, function(markerId)
                if not self.clotheopen then 
                    Config.help_notify(Lang[Config['language'] or 'en']['interact']) 
                    if IsControlJustPressed(0, 38) then 
                        self:open(true)
                    end
                else 
                    AC:hideMarkerInteract(markerId)
                end
            end)
        end
    end)
end

CreateThread(function()
    ClothShop:loadCode()
end)