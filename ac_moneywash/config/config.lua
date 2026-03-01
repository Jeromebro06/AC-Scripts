Config = {
    ['language'] = 'de', -- en, de, fr

    ['notify'] = function(source, type, title, message)
        -- Config.notify(source, type, title, message) -- your notify trigger
        TriggerClientEvent("ESX:Notify", source, type, 3000, message)
    end,

    ['ESX'] = function()
        return exports["es_extended"]:getSharedObject() -- import ESX
    end,

    ['help_notify'] = function(message)
        ESX = exports["es_extended"]:getSharedObject()  -- this is here required because of ESX help notify
        ESX.ShowHelpNotification(message, true)   -- your help notification
    end,

    ['marker'] = {
        ['type'] = 21,
        ['size'] = 1.0,
        ['r'] = 153,
        ['g'] = 0,
        ['b'] = 255,
        ['a'] = 120
    },

    ['blip'] = {
        ['enable'] = true,
        ['type'] = 374,
        ['color'] = 11,
        ['size'] = 0.6,
    },

    ['times'] = {
        [10] = 60, --10% = 60 minutes
        [25] = 40, --25% = 40 minutes 
        [35] = 30, --35% = 30 minutes
        [50] = 20  --50% = 20 minutes 
    }, 

    ['coords'] = vector3(-1101.2562, 2723.6895, 18.8004),
}