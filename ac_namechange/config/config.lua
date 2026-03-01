Config = {
    ['language'] = 'de', -- en, de, fr

    ['notify'] = function(source, type, title, message)
        -- Config.notify(source, type, title, message) -- your notify trigger
        TriggerClientEvent("ESX:Notify", source, type, 3000, message)
    end,

    ['notify_client'] = function(type, title, message)
        -- TriggerEvent('notifications', type, title, message) -- your notify trigger
        TriggerEvent("ESX:Notify", type, 3000, message)
    end,

    ['ESX'] = function()
        return exports["es_extended"]:getSharedObject() -- import ESX
    end,

    ['help_notify'] = function(message)
        ESX = exports["es_extended"]:getSharedObject()  -- this is here required because of ESX help notify
        ESX.ShowHelpNotification(message, true)   -- your help notification
    end,

    ['marker_color'] = {
        ['r'] = 153,
        ['g'] = 0,
        ['b'] = 255,
        ['a'] = 120
    },

    ['blip'] = {
        ['enable'] = true,
        ['type'] = 764,
        ['color'] = 37,
        ['size'] = 0.6,
        ['label'] = 'Namensänderung'
    },

    ['price'] = 45000,

	['blnamestrings'] = {
		'hitler',
		'hatler',
		'adolf',
		'nickg',
		'nigg',
		'nicka',
		'nicke',
		'>',
		'<',
		'script',
		'discord',
		'oler',
		'modder',
		'cheat',
        "delete",
        "exploit",
        "hacker",
        "virus",
        "trojan",
        "malware",
        "phish",
        "attack",
        "spam",
        "abuse",
        "mutter",
        "administator",
        "system",
        "null"
    },
	['coords'] = {
		vector3(-545.0978, -204.0197, 38.2152),
	}
}