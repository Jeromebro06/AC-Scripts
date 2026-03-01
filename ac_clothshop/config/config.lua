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

    ['hide_hud'] = function() -- gets triggered every frame while clotheshop is open
        -- here your export to hide hud
    end,

    ['marker_color'] = { 
        ['r'] = 0, -- red
        ['g'] = 0, -- green
        ['b'] = 255, -- blue
        ['a'] = 120 -- opacity
    },

    ['blip'] = {
        ['type'] = 73, -- type of blip
        ['color'] = 47, -- color of blip 
        ['size'] = 0.6, --size of blip
        ['label'] = 'Kleidungsladen' -- blip label on map
    },

    ['coords'] = {
        --- Clotheshop Coord 
        [vector3(72.3, -1399.1, 27.9)] = { -- (X, Y, Z) inside
            ['marker'] = {
                ['size'] = 2.0, -- marker size
                ['type'] = 1, -- marker type
            },
            ['blip'] = true
        },

        --- Clotheshop Coord 
        [vector3(-703.8, -152.3, 36.0)] = {
            ['marker'] = {
                ['size'] = 4.0,
                ['type'] = 1,
            },
            ['blip'] = true
        },

        --- Clotheshop Coord 
        [vector3(-167.9, -299.0, 38.2)] = {
            ['marker'] = {
                ['size'] = 2.0,
                ['type'] = 1,
            },
            ['blip'] = true
        },

        --- Clotheshop Coord 
        [vector3(428.7, -800.1, 28.1)] = {
            ['marker'] = {
                ['size'] = 2.0,
                ['type'] = 1,
            },
            ['blip'] = true
        },

        --- Clotheshop Coord 
        [vector3(-829.4, -1073.7, 9.9)] = {
            ['marker'] = {
                ['size'] = 2.0,
                ['type'] = 1,
            },
        },

        --- Clotheshop Coord 
        [vector3(-1447.8, -242.5, 48.4)] = {
            ['marker'] = {
                ['size'] = 2.0,
                ['type'] = 1,
            },
            ['blip'] = true
        },

        --- Clotheshop Coord 
        [vector3(11.6, 6514.2, 30.5)] = {
            ['marker'] = {
                ['size'] = 2.0,
                ['type'] = 1,
            },
            ['blip'] = true
        },

        --- Clotheshop Coord 
        [vector3(123.6, -219.4, 53.2)] = {
            ['marker'] = {
                ['size'] = 2.0,
                ['type'] = 1,
            },
            ['blip'] = true
        },

        --- Clotheshop Coord 
        [vector3(1696.3, 4829.3, 40.7)] = {
            ['marker'] = {
                ['size'] = 2.0,
                ['type'] = 1,
            },
            ['blip'] = true
        },

        --- Clotheshop Coord 
        [vector3(618.1, 2759.6, 40.7)] = {
            ['marker'] = {
                ['size'] = 2.0,
                ['type'] = 1,
            },
            ['blip'] = true
        },

        --- Clotheshop Coord 
        [vector3(1190.6, 2713.4, 36.8)] = {
            ['marker'] = {
                ['size'] = 2.0,
                ['type'] = 1,
            },
            ['blip'] = true
        },

        --- Clotheshop Coord 
        [vector3(-1193.4, -772.3, 15.9)] = {
            ['marker'] = {
                ['size'] = 2.0,
                ['type'] = 1,
            },
            ['blip'] = true
        },

        --- Clotheshop Coord 
        [vector3(-3172.5, 1048.1, 19.5)] = {
            ['marker'] = {
                ['size'] = 2.0,
                ['type'] = 1,
            },
            ['blip'] = true
        },

        --- Clotheshop Coord 
        [vector3(-1108.4, 2708.9, 17.7)] = {
            ['marker'] = {
                ['size'] = 2.0,
                ['type'] = 1,
            },
        },

        --- Clotheshop Coord 
        -- [vector3(X, Y, Z)] = {
        --     ['marker'] = {
        --         ['size'] = 2.0,
        --         ['type'] = 1,
        --     },
        --     ['blip'] = true
        -- },
    },

    ['price'] = 2500, -- price per new outfit
    ['account'] = 'money', -- money, bank_money, black_money

    ['saved_components'] = { -- these are the saved components by stored outfits
        ["tshirt_1"] = true,
        ["tshirt_2"] = true,
        ["torso_1"] = true,
        ["torso_2"] = true,
        ["decals_1"] = true,
        ["decals_2"] = true,
        ["arms"] = true,
        ["arms_2"] = true,
        ["pants_1"] = true,
        ["pants_2"] = true,
        ["shoes_1"] = true,
        ["shoes_2"] = true,
        ["bags_1"] = true,
        ["bags_2"] = true,
        ["chain_1"] = true,
        ["chain_2"] = true,
        ["helmet_1"] = true,
        ["helmet_2"] = true,
        ["glasses_1"] = true,
        ["glasses_2"] = true,
        ["watches_1"] = true,
        ["watches_2"] = true,
        ["sex"] = true,
    },

    ['category'] = { -- the avaliable items in clotheshop

        ["tshirt"] = { -- ['NAME'] -> needs to be compatible with skinchanger
            label = "T-Shirts", -- label / showed name
            img = "t-shirt.png", -- image name
            placement = 1, -- position in shop
            blacklisted = {100, 200} -- blacklisted variations {1, 2, 3} -> not selectable
        },

        ["torso"] = {
            label = "Oberteile",
            img = "oberteile.png",
            placement = 2,
            blacklisted = {}
        },

        ["decals"] = {
            label = "Tattoos / Abzeichen",
            img = "tattoo-abzeichen.png",
            placement = 3,
            blacklisted = {}
        },

        ["arms"] = {
            label = "Arme / Handschuhe",
            img = "arme-handschuhe.png",
            placement = 4,
            blacklisted = {}
        },

        ["pants"] = {
            label = "Hosen",
            img = "hosen.png",
            placement = 5,
            blacklisted = {}
        },

        ["shoes"] = {
            label = "Schuhe",
            img = "schuhe.png",
            placement = 6,
            blacklisted = {}
        },

        ["bags"] = {
            label = "Taschen / Rucksäcke",
            img = "taschen-rucksaecke.png",
            placement = 7,
            blacklisted = {}
        },

        ["chain"] = {
            label = "Ketten",
            img = "ketten.png",
            placement = 8,
            blacklisted = {}
        },

        ["helmet"] = {
            label = "Helme / Hüte",
            img = "helme-huete.png",
            placement = 9,
            blacklisted = {}
        },

        ["glasses"] = {
            label = "Brillen",
            img = "brillen.png",
            placement = 10,
            blacklisted = {}
        },

        ["watches"] = {
            label = "Uhren",
            img = "uhren.png",
            placement = 11,
            blacklisted = {}
        },
    }
}