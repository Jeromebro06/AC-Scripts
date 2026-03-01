Config = {
    ['language'] = 'de', -- en, de, fr

    ['exploit_ban'] = function(src) -- serverside ban 
        exports['rename']:anvil_ban_server(src, 'Banking Exploit')
    end,

    ['notify'] = function(source, type, title, message)
        -- TriggerClientEvent('notifications', source, type, title, message) -- your notify trigger
        TriggerClientEvent("ESX:Notify", source, type, 3000, message)
    end,

    ['ESX'] = function()
        return exports["es_extended"]:getSharedObject() -- import ESX
    end,

    ['help_notify'] = function(message)
        ESX = exports["es_extended"]:getSharedObject()  -- this is here required because of ESX help notify
        ESX.ShowHelpNotification(message, true)   -- your help notification
    end,

    ['marker_color'] = {
        ['r'] = 0,
        ['g'] = 0,
        ['b'] = 255,
        ['a'] = 120
    },

    ['blip'] = {
        ['enable'] = true,
        ['name'] = 'Banking',
        ['color'] = 69,
        ['size'] = 0.6,
        ['type'] = 108,
    },

    ['props'] = {
		'prop_fleeca_atm',
		'prop_atm_01',
		'prop_atm_02',
		'prop_atm_03'
	},

	['bankcoords'] = {
		vector3(150.266, -1040.203, 29.374),
		vector3(-1212.980, -330.841, 37.787),
		vector3(-2962.582, 482.627, 15.703),
		vector3(-112.202, 6469.295, 31.626),
		vector3(314.187, -278.621, 54.170),
		vector3(-351.534, -49.529, 49.042),
		vector3(1175.064, 2706.644, 38.094),
		vector3(242.2350, 224.7477, 106.2868)
	}
}