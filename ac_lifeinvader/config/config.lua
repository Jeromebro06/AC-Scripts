Config = {
    ['language'] = 'de', -- en, de, fr

    ['notify'] = function(source, type, title, message)
        TriggerClientEvent('notifications', source, type, title, message) -- your notify trigger
    end,

    ['ESX'] = function()
        return exports["es_extended"]:getSharedObject() -- import ESX
    end,

    ['getPhoneNumber'] = function(source, identifier, callback)
        MySQL.query('SELECT `phone_number` FROM `users` WHERE `identifier` = @identifier', {
            ['@identifier'] = identifier
        }, function(result)
            if result[1] and result[1]['phone_number'] then
                callback(result[1]['phone_number'])
            else
                callback('000-000')
            end
        end)
    end,

    ['help_notify'] = function(message)
        ESX = exports["es_extended"]:getSharedObject()  -- this is here required because of ESX help notify
        ESX.ShowHelpNotification(message, true)   -- your help notification
    end,

    ['blip'] = {
        ['type'] = 77,
        ['size'] = 0.6,
        ['color'] = 1
    },

    ['marker'] = {
        ['MarkerColor'] = {
            r = 153,
            g = 0,
            b = 255,
            a = 120
        },
        ['type'] = 21,
        ['scale'] = 0.9
    },

	['coords'] = {
        vector3(-1081.8344, -248.2028, 37.7633),
    },

	['pricePerLetter'] = 5,

	['cooldown'] = 15, -- minutes

    ['maxlenght'] = 500,
    
	['blacklisted'] = {
		'.gg',
		'http',
		'://',
		'.com',
		'.de',
		'.eu',
		'hitler',
        'hatler',
        'adolf',
        'nickg',
        'nigg',
        'nicka',
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
		'fett',
		'mutter',
		'hund',
		'hure',
		'ass',
		'arsch'
	}
}