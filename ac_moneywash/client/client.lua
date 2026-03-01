local MoneyWash = {}

function MoneyWash:loadCode()
    function self:Initialize()
        self.isUIOpen = false
        self.currentProcesses = {}
        self.markerId = nil
    end

    function self:OpenMoneyWashUI()
        if self.isUIOpen then return end
        TriggerServerEvent('ac_scripts:moneywash:requestUpdate')
        self:OpenNUI()
    end

    function self:OpenNUI()
        self.isUIOpen = true
        SetNuiFocus(true, true)
        SendNUIMessage({
            action = 'moneywash',
            enable = true,
            data = self.currentProcesses
        })
        CreateThread(function()
            while self.isUIOpen do
                TriggerServerEvent('ac_scripts:moneywash:requestUpdate')
                Wait(20 * 1000)
            end
        end)
    end

    function self:CloseNUI()
        self.isUIOpen = false
        SetNuiFocus(false, false)
        SendNUIMessage({
            action = 'moneywash',
            enable = false
        })
    end

    function self:UpdateUI()
        if self.isUIOpen then
            SendNUIMessage({
                action = 'updatemoneywash',
                data = self.currentProcesses
            })
        end
    end

    function self:StartMoneyWash(amount, fee)
        TriggerServerEvent('ac_scripts:moneywash:startmoneywash', {
            amount = amount,
            fee = fee
        })
    end

    function self:WithdrawMoney(processIndex)
        TriggerServerEvent('ac_scripts:moneywash:withdrawmoneywash', processIndex)
    end

    function self:SetupMoneyWashLocation()
        -- Blip erstellen
        if Config.blip.enable then
            AC:addBlip(
                Config.coords,
                Config.blip.type,
                Config.blip.color,
                Config.blip.size,
                Lang[Config.language]['blip_name']
            )
        end

        -- Marker Interaktion erstellen
        AC:createMarkerInteract({
            markertype = Config.marker.type,
            color = {
                r = Config.marker.r,
                g = Config.marker.g,
                b = Config.marker.b,
                a = Config.marker.a
            },
            scale = Config.marker.size,
            vehicleonly = false,
            playeronly = true,
            visibledistance = 20.0,
            animation = {
                camfollow = false,
                bump = false,
                rotate = true
            },
            coords = { Config.coords }
        }, function(markerId)
            self.markerId = markerId
            
            if not self.isUIOpen then
                Config.help_notify(Lang[Config.language]['interact'])
                
                if IsControlJustPressed(0, 38) then
                    self:OpenMoneyWashUI()
                end
            else
                AC:hideMarkerInteract(markerId)
            end
        end)
    end

    RegisterNUICallback('moneywash', function(data, cb)
        if data.type == 'close' then
            self:CloseNUI()
        elseif data.type == 'deposit' then
            self:StartMoneyWash(data.amount, data.fee)
        elseif data.type == 'withdraw' then
            self:WithdrawMoney(data.processIndex)
        end
        cb('ok')
    end)

    -- Server Events
    RegisterNetEvent('ac_scripts:moneywash:updateMoneywash')
    AddEventHandler('ac_scripts:moneywash:updateMoneywash', function(processes)
        self.currentProcesses = processes or {}
        self:UpdateUI()
    end)

    self:Initialize()
    self:SetupMoneyWashLocation()
end

CreateThread(function()
    MoneyWash:loadCode()
end)