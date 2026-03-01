Config = {
    ['language'] = 'de', -- en, de, fr

    ['notify'] = function(source, type, title, message)
        -- Config.notify(source, type, title, message) -- your notify trigger
        TriggerClientEvent("ESX:Notify", source, type, 3000, message)
    end,
    
    ['ESX'] = function()
        return exports['es_extended']:getSharedObject()
    end,

    ['flymode'] = true,

    ['Components'] = {
        {label = "Geschlecht", name = 'sex'},
        {label = "Gesicht", name = 'face'},
        {label = "Haut", name = 'skin'},
        {label = "Falten", name = 'age_1'},
        {label = "Faltenstärke", name = 'age_2'},
        {label = "Bartart", name = 'beard_1'},
        {label = "Bartgröße", name = 'beard_2'},
        {label = "Bartfarbe 1", name = 'beard_3'},
        {label = "Bartfarbe 2", name = 'beard_4'},
        {label = "Frisur 1", name = 'hair_1'},
        {label = "Frisur 2", name = 'hair_2'},
        {label = "Haarfarbe 1", name = 'hair_color_1'},
        {label = "Haarfarbe 2", name = 'hair_color_2'},
        {label = "Augenbrauengröße", name = 'eyebrows_2'},
        {label = "Augenbrauentyp", name = 'eyebrows_1'},
        {label = "Augenbrauenfarbe 1", name = 'eyebrows_3'},
        {label = "Augenbrauenfarbe 2", name = 'eyebrows_4'},
        {label = "Makeup-Typ", name = 'makeup_1'},
        {label = "Makeup-Stärke", name = 'makeup_2'},
        {label = "Makeup-Farbe 1", name = 'makeup_3'},
        {label = "Makeup-Farbe 2", name = 'makeup_4'},
        {label = "Lippenstift-Typ", name = 'lipstick_1'},
        {label = "Lippenstift-Stärke", name = 'lipstick_2'},
        {label = "Lippenstift-Farbe 1", name = 'lipstick_3'},
        {label = "Lippenstift-Farbe 2", name = 'lipstick_4'},
        {label = "Ohrringe", name = 'ears_1'},
        {label = "Ohrringfarbe", name = 'ears_2'},
        {label = "T-Shirt 1", name = 'tshirt_1'},
        {label = "T-Shirt 2", name = 'tshirt_2'},
        {label = "Oberteil 1", name = 'torso_1'},
        {label = "Oberteil 2", name = 'torso_2'},
        {label = "Abzeichen 1", name = 'decals_1'},
        {label = "Abzeichen 2", name = 'decals_2'},
        {label = "Arme", name = 'arms'},
        {label = "Hose 1", name = 'pants_1'},
        {label = "Hose 2", name = 'pants_2'},
        {label = "Schuhe", name = 'shoes_1'},
        {label = "Schuhfarbe", name = 'shoes_2'},
        {label = "Maske 1", name = 'mask_1'},
        {label = "Maske 2", name = 'mask_2'},
        {label = "Schutzweste 1", name = 'bproof_1'},
        {label = "Schutzweste 2", name = 'bproof_2'},
        {label = "Kette 1", name = 'chain_1'},
        {label = "Kette 2", name = 'chain_2'},
        {label = "Helm 1", name = 'helmet_1'},
        {label = "Helm 2", name = 'helmet_2'},
        {label = "Brille 1", name = 'glasses_1'},
        {label = "Brille 2", name = 'glasses_2'},
        {label = "Tasche", name = 'bags_1'},
        {label = "Taschenfarbe", name = 'bags_2'}
    },

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

    ['Permissions'] = {
        ['admin'] = true
    }
}