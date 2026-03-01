local AC_SCRIPTS = {}
local ESX = Config.ESX()

function SendWebhook(webhook, title, description, fields)
    local embed = {
        {
            ['title'] = title,
            ['description'] = description,
            ['type'] = 'rich',
            ['color'] = Webhooks.Profile.color,
            ['fields'] = fields or {},
            ['footer'] = {
                ['text'] = os.date('%d.%m.%Y - %H:%M:%S'),
            },
        }
    }
    
    PerformHttpRequest(webhook, function(err, text, headers) end, 'POST', json.encode({
        username = Webhooks.Profile.username,
        avatar_url = Webhooks.Profile.avatar,
        embeds = embed
    }), {
        ['Content-Type'] = 'application/json'
    })
end

function AC_SCRIPTS:loadCode()
    function self:Initialize()
        self.processes = {}
        self:LoadProcessesFromDB()
        self:StartUpdateThread()
    end

    function self:CalculateProcessTime(feePercentage)
        local times = Config['times']
        return times[feePercentage] * 60 or times[10] * 60
    end

    function self:CalculateFeeAmount(amount, feePercentage)
        return math.floor(amount * (feePercentage / 100))
    end

    function self:CreateMoneyWashProcess(identifier, amount, fee)
        local feeAmount = self:CalculateFeeAmount(amount, fee)
        local cleanAmount = amount - feeAmount
        
        local process = {
            identifier = identifier,
            amount = amount,
            cleanAmount = cleanAmount,
            feeAmount = feeAmount,
            feePercentage = fee,
            neededtime = self:CalculateProcessTime(fee),
            processedtime = 0,
            completed = false,
            createdAt = os.time()
        }
        
        table.insert(self.processes, process)
        local index = #self.processes
        
        MySQL.Async.insert('INSERT INTO player_moneywash_processes (identifier, amount, clean_amount, fee_amount, fee_percentage, needed_time, processed_time, completed, created_at) VALUES (@identifier, @amount, @cleanAmount, @feeAmount, @feePercentage, @neededTime, @processedTime, @completed, @createdAt)', {
            ['@identifier'] = identifier,
            ['@amount'] = amount,
            ['@cleanAmount'] = cleanAmount,
            ['@feeAmount'] = feeAmount,
            ['@feePercentage'] = fee,
            ['@neededTime'] = process.neededtime,
            ['@processedTime'] = 0,
            ['@completed'] = 0,
            ['@createdAt'] = process.createdAt
        }, function(insertId)
            self.processes[index].dbId = insertId
        end)
        
        return index
    end

    function self:HasPlayerCapacity(identifier)
        local count = 0
        for _, process in ipairs(self.processes) do
            if process.identifier == identifier then
                count = count + 1
            end
        end
        return count < 5
    end

    function self:GetMoneyWashProcesses(identifier)
        local processes = {}
        for i, process in ipairs(self.processes) do
            if process.identifier == identifier then
                table.insert(processes, {
                    index = i,
                    process = process
                })
            end
        end
        return processes
    end

    function self:GetMoneyWashProcess(index)
        return self.processes[index]
    end

    function self:GetMoneyWashProcessesForUI(identifier)
        local playerProcesses = self:GetMoneyWashProcesses(identifier)
        local result = {}
        
        for _, data in ipairs(playerProcesses) do
            local process = data.process
            local progress = (process.processedtime / process.neededtime) * 100
            progress = math.min(math.floor(progress), 100)
            
            table.insert(result, {
                index = data.index,
                amount = process.cleanAmount,
                progress = progress,
                completed = process.completed,
            })
        end
        
        return result
    end

    function self:LoadProcessesFromDB()
        MySQL.Async.fetchAll('SELECT * FROM player_moneywash_processes', {}, function(results)
            if results and #results > 0 then
                for _, item in ipairs(results) do
                    local process = {
                        dbId = item.id,
                        identifier = item.identifier,
                        amount = item.amount,
                        cleanAmount = item.clean_amount,
                        feeAmount = item.fee_amount,
                        feePercentage = item.fee_percentage,
                        neededtime = item.needed_time,
                        processedtime = item.processed_time,
                        completed = item.completed == 1,
                        createdAt = item.created_at,
                    }
                    table.insert(self.processes, process)
                end
                print("[MONEYWASH] " .. #results .. " " .. Lang[Config.language]['db_processes_loaded'] .. "^7")
            else
                print("[MONEYWASH] " .. Lang[Config.language]['db_no_processes'] .. "^7")
            end
        end)
    end

    function self:SaveProcessesToDB()
        for i, process in ipairs(self.processes) do
            if process.dbId then
                MySQL.Async.execute('UPDATE player_moneywash_processes SET processed_time = @processedTime, completed = @completed WHERE id = @id', {
                    ['@id'] = process.dbId,
                    ['@processedTime'] = process.processedtime,
                    ['@completed'] = process.completed and 1 or 0,
                })
            end
        end
    end

    function self:StartUpdateThread()
        CreateThread(function()
            local saveInterval = 0
            while true do
                self:UpdateProcesses()
                
                saveInterval = saveInterval + 1
                if saveInterval >= 60 then
                    self:SaveProcessesToDB()
                    saveInterval = 0
                end
                
                Wait(2000)
            end
        end)
    end

    function self:UpdateProcesses()
        local notifications = {}
        
        for i, process in ipairs(self.processes) do
            if not process.completed then
                process.processedtime = process.processedtime + 1
                
                if process.processedtime >= process.neededtime then
                    process.completed = true
                    process.completedTime = os.time()
                    
                    if not notifications[process.identifier] then
                        notifications[process.identifier] = true
                    end
                end
            end
        end
        
        for identifier in pairs(notifications) do
            local xPlayer = ESX.GetPlayerFromIdentifier(identifier)
            if xPlayer then
                Config.notify(xPlayer.source, 'info', Lang[Config.language]['wash_complete'], Lang[Config.language]['wash_complete'])
                self:UpdatePlayerUI(xPlayer.source, identifier)
            end
        end
    end

    function self:UpdatePlayerUI(source, identifier)
        local processesData = self:GetMoneyWashProcessesForUI(identifier)
        TriggerClientEvent('ac_scripts:moneywash:updateMoneywash', source, processesData)
    end

    function self:WithdrawMoneyWashProcess(index)
        local process = self:GetMoneyWashProcess(index)
        if not process then 
            return false, Lang[Config.language]['process_not_found']
        end
        if not process.completed then
            return false, Lang[Config.language]['not_completed']
        end
        local payoutAmount = process.cleanAmount
        if process.dbId then
            MySQL.Async.execute('DELETE FROM player_moneywash_processes WHERE id = @id', {
                ['@id'] = process.dbId
            })
        end
        table.remove(self.processes, index)
        return true, payoutAmount
    end

    RegisterServerEvent('ac_scripts:moneywash:startmoneywash')
    AddEventHandler('ac_scripts:moneywash:startmoneywash', function(data)
        local s = source
        local amount = tonumber(data.amount)
        local fee = tonumber(data.fee)
        local xPlayer = ESX.GetPlayerFromId(s)
        
        if not xPlayer then
            Config.notify(s, 'error', 'Information', Lang[Config.language]['error_occurred'])
            return
        end
        
        local identifier = xPlayer.identifier
        
        if not self:HasPlayerCapacity(identifier) then
            Config.notify(s, 'error', 'Information', Lang[Config.language]['capacity_full'])
            return
        end
        
        if not amount or not fee then
            Config.notify(s, 'error', 'Information', Lang[Config.language]['missing_data'])
            return
        end
        
        if amount < 10 then
            Config.notify(s, 'error', 'Information', Lang[Config.language]['min_amount'])
            return
        end
        
        if xPlayer.getAccount('black_money').money >= amount then
            xPlayer.removeAccountMoney('black_money', amount)
            self:CreateMoneyWashProcess(identifier, amount, fee)
            Config.notify(s, 'info', 'Information', 
                string.format(Lang[Config.language]['deposit_success'], ESX.Math.GroupDigits(amount)))
            
            local feeAmount = self:CalculateFeeAmount(amount, fee)
            local cleanAmount = amount - feeAmount
            SendWebhook(Webhooks.URLS.moneywash, Lang[Config.language]['webhook_started_title'], 
                Lang[Config.language]['webhook_started_desc'], {
                {
                    ['name'] = Lang[Config.language]['webhook_player'],
                    ['value'] = GetPlayerName(s) .. ' (' .. identifier .. ')',
                    ['inline'] = true
                },
                {
                    ['name'] = Lang[Config.language]['webhook_black_money'],
                    ['value'] = '$' .. ESX.Math.GroupDigits(amount),
                    ['inline'] = true
                },
                {
                    ['name'] = Lang[Config.language]['webhook_fee'],
                    ['value'] = fee .. '% ($' .. ESX.Math.GroupDigits(feeAmount) .. ')',
                    ['inline'] = true
                },
                {
                    ['name'] = Lang[Config.language]['webhook_clean_money'],
                    ['value'] = '$' .. ESX.Math.GroupDigits(cleanAmount),
                    ['inline'] = true
                },
                {
                    ['name'] = Lang[Config.language]['webhook_wait_time'],
                    ['value'] = math.floor(self:CalculateProcessTime(fee) / 60) .. ' ' .. Lang[Config.language]['webhook_minutes'],
                    ['inline'] = true
                }
            })
            
            TriggerClientEvent('ac_scripts:moneywash:updateMoneywash', s, self:GetMoneyWashProcessesForUI(identifier))
        else
            Config.notify(s, 'error', 'Information', Lang[Config.language]['not_enough_black'])
        end
    end)

    RegisterServerEvent('ac_scripts:moneywash:withdrawmoneywash')
    AddEventHandler('ac_scripts:moneywash:withdrawmoneywash', function(processIndex)
        local s = source
        local xPlayer = ESX.GetPlayerFromId(s)
        
        if not processIndex or not xPlayer then
            Config.notify(s, 'error', 'Information', Lang[Config.language]['error_occurred'])
            return
        end
        
        local identifier = xPlayer.identifier
        local process = self:GetMoneyWashProcess(processIndex)
        
        if not process or process.identifier ~= identifier then
            Config.notify(s, 'error', 'Information', Lang[Config.language]['not_your_process'])
            return
        end
        
        local success, result = self:WithdrawMoneyWashProcess(processIndex)
        
        if success then
            xPlayer.addAccountMoney('money', result)
            Config.notify(s, 'success', 'Information', string.format(Lang[Config.language]['withdraw_success'], ESX.Math.GroupDigits(result)))
            
            -- Webhook: Geld abgehoben
            SendWebhook(Webhooks.URLS.moneywash, Lang[Config.language]['webhook_completed_title'], 
                Lang[Config.language]['webhook_completed_desc'], {
                {
                    ['name'] = Lang[Config.language]['webhook_player'],
                    ['value'] = GetPlayerName(s) .. ' (' .. identifier .. ')',
                    ['inline'] = true
                },
                {
                    ['name'] = Lang[Config.language]['webhook_received_amount'],
                    ['value'] = '$' .. ESX.Math.GroupDigits(result),
                    ['inline'] = true
                },
                {
                    ['name'] = Lang[Config.language]['webhook_original_amount'],
                    ['value'] = '$' .. ESX.Math.GroupDigits(process.amount),
                    ['inline'] = true
                },
                {
                    ['name'] = Lang[Config.language]['webhook_fee'],
                    ['value'] = process.feePercentage .. '% ($' .. ESX.Math.GroupDigits(process.feeAmount) .. ')',
                    ['inline'] = true
                }
            })
        else
            Config.notify(s, 'error', 'Information', result)
        end
        
        TriggerClientEvent('ac_scripts:moneywash:updateMoneywash', s, self:GetMoneyWashProcessesForUI(identifier))
    end)

    RegisterNetEvent('ac_scripts:moneywash:requestUpdate', function()
        local s = source
        local xPlayer = ESX.GetPlayerFromId(s)
        if xPlayer then
            TriggerClientEvent('ac_scripts:moneywash:updateMoneywash', s, self:GetMoneyWashProcessesForUI(xPlayer.identifier))
        else
            TriggerClientEvent('ac_scripts:moneywash:updateMoneywash', s, {})
        end
    end)
    
    AddEventHandler('onResourceStop', function(resourceName)
        if GetCurrentResourceName() == resourceName then
            self:SaveProcessesToDB()
        end
    end)

    MySQL.ready(function()
        self:Initialize()
    end)
end

CreateThread(function()
    AC_SCRIPTS:loadCode()

end)
