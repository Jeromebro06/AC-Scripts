local AC_SCRIPTS = {}
local ESX = Config.ESX()

function AC_SCRIPTS:loadCode()
    function self:switch(case)
        return setmetatable({case = case}, {
            __call = function(self, cases)
                local action = cases[self.case] or cases.default
                if action then
                    return action()
                end
            end
        })
    end

    RegisterNetEvent('ac_scripts:shop_buy')
    AddEventHandler('ac_scripts:shop_buy', function(data)
        local s = source
        local xPlayer = ESX.GetPlayerFromId(s)
        if xPlayer then
            local paymethod = data.purchase
            local items = data.items
            local totalprice = 0
            if not items or not next(items) then
                return
            end
            
            for itemKey, itemData in pairs(items) do
                local itemName = itemKey
                local itemCount = itemData.count
                local itemPrice = nil
                for _, shopData in pairs(Config['shoptypes']) do
                    for _, shopItem in pairs(shopData.items) do
                        if shopItem.name == itemName then
                            itemPrice = shopItem.price
                            break
                        end
                    end
                    if itemPrice then break end
                end
                if not itemPrice then
                    for _, schwarzmarkt in pairs(Config['blackmarket']['positions']) do
                        for _, smItem in pairs(schwarzmarkt.items) do
                            if smItem.name == itemName then
                                itemPrice = smItem.price
                                break
                            end
                        end
                    end
                end
                if not itemPrice then
                    Config.notify(s, 'error', Lang[Config['language']]['info'], Lang[Config['language']]['item_price_not_found'])
                    return
                end
                totalprice = totalprice + (itemPrice * itemCount)
            end

            local function giveItems()
                for itemKey, itemData in pairs(items) do
                    local itemName = itemKey
                    local itemCount = itemData.count
                    if string.sub(itemName:lower(), 1, 7) == 'weapon_' then
                        xPlayer.addWeapon(itemName, 200)
                    elseif string.sub(itemName:lower(), 1, 7) == 'gadget_' then
                        xPlayer.addWeapon(itemName, 1)
                    else
                        xPlayer.addInventoryItem(itemName, itemCount)
                    end
                end
                Config.notify(s, 'success', Lang[Config['language']]['info'], Lang[Config['language']]['purchase_successful'])
                TriggerClientEvent('ac_scripts:close_shop', s)
            end

            self:switch(paymethod)({
                bar = function()
                    if xPlayer.getMoney() < totalprice then
                        Config.notify(s, 'error', Lang[Config['language']]['info'], Lang[Config['language']]['not_enough_cash'])
                        return
                    end
                    giveItems()
                    xPlayer.removeMoney(totalprice)
                end,
                karte = function()
                    if xPlayer.getAccount('bank').money < totalprice then
                        Config.notify(s, 'error', Lang[Config['language']]['info'], Lang[Config['language']]['not_enough_bank'])
                        return
                    end
                    giveItems()
                    xPlayer.removeAccountMoney('bank', totalprice)
                end,
                black = function()
                    if xPlayer.getAccount('black_money').money < totalprice then
                        Config.notify(s, 'error', Lang[Config['language']]['info'], Lang[Config['language']]['not_enough_black_money'])
                        return
                    end
                    giveItems()
                    xPlayer.removeAccountMoney('black_money', totalprice)
                end,
                default = function()
                    Config.notify(s, 'error', Lang[Config['language']]['info'], Lang[Config['language']]['unknown_payment_method'])
                end
            })
        end
    end)

    CreateThread(function()
        local marketKeys = {}
        for i, market in pairs(Config['blackmarket']['positions']) do
            table.insert(marketKeys, i)
        end
        local currentMarket = marketKeys[math.random(1, #marketKeys)]
    
        local function getItemPrice(item)
            local market = Config['blackmarket']['positions'][currentMarket]
            for i = 1, #market['items'] do
                local list = market['items'][i]
                if list.name == item then
                    return list.price, list.type
                end
            end
            return nil, nil
        end
    
        RegisterServerEvent('ac_scripts:schwarzmarkt', function(item)
            local s = source
            local xPlayer = ESX.GetPlayerFromId(s)
            if not xPlayer then
                Config.notify(s, 'error', Lang[Config['language']]['error'], Lang[Config['language']]['player_not_found'])
                return
            end
            local price, itemType = getItemPrice(item)
            if not price then
                Config.notify(s, 'error', Lang[Config['language']]['error'], Lang[Config['language']]['item_not_found'])
                return
            end
            if xPlayer.getAccount(Config['blackmarket']['account']).money >= price then
                xPlayer.removeAccountMoney(Config['blackmarket']['account'], price)
                if itemType == 'weapon' then
                    xPlayer.addWeapon(item, 0)
                    Config.notify(s, 'success', Lang[Config['language']]['success'], '+1 '.. ESX.GetWeaponLabel(item))
                elseif itemType == 'item' then
                    xPlayer.addInventoryItem(item, 1)
                    Config.notify(s, 'info', Lang[Config['language']]['success'], '+1 '.. ESX.GetItemLabel(item))
                else
                    Config.notify(s, 'error', Lang[Config['language']]['error'], Lang[Config['language']]['invalid_item_type'])
                end
            else
                Config.notify(s, 'error', Lang[Config['language']]['error'], Lang[Config['language']]['not_enough_money'])
            end
        end)
    
        ESX.RegisterServerCallback('ac_scripts:getSchwarzmarkt', function(source, cb)
            cb(currentMarket)
        end)
    end)
end

CreateThread(function()
    AC_SCRIPTS:loadCode()
end)