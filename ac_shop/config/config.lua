Config = {
    ['language'] = 'de', -- en, de, fr

    ['notify'] = function(source, type, title, message)
        -- TriggerClientEvent('notifications', source, type, title, message) -- your notify trigger
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

    ['shoptypes'] = {

        ['normal'] = {
            ['settings'] = {
                ['interact'] = "UM DEN SHOP ZU ÖFFNEN", -- interact text
                ['blip'] = {
                    ['enable'] = true,                  -- enable blip on map
                    ['type'] = 52,                      -- type of blip
                    ['scale'] = 0.7,                    -- scale of blip
                    ['color'] = 2,                      -- color of blip
                    ['name'] = "Shop",                  -- blip label
                }
            },
            ['positions'] = { -- positions
                vector3(373.8, 325.8, 103.5),
                vector3(2557.4, 382.2, 108.6),
                vector3(-3038.9, 585.9, 7.9),
                vector3(-3241.9, 1001.4, 12.8),
                vector3(547.4, 2671.7, 42.1),
                vector3(1961.4, 3740.6, 32.3),
                vector3(2678.9, 3280.6, 55.2),
                vector3(1729.2, 6414.1, 35.0),
                vector3(25.6934, -1347.0614, 29.4970),
                vector3(-47.6581, -1757.0198, 29.4210),
                vector3(-707.9077, -913.6678, 19.2156),
                vector3(-2968.0217, 390.8192, 15.0433),
                vector3(1136.0077, -981.6351, 46.4158),
                vector3(-1223.3051, -907.1245, 12.3263),
                vector3(1163.2412, -322.9803, 69.2050),
                vector3(-1487.1230, -379.5088, 40.1634),
                vector3(-1820.9128, 792.6055, 138.1181)
            },
            ['items'] = {              -- item list
                {
                    name = "phone",    -- item name
                    price = 1500,      -- item price
                    label = "Handy",   -- item label
                    uitype = "Technik" -- category
                },
                {
                    name = "tablet",
                    price = 2500,
                    label = "Tablet",
                    uitype = "Technik"
                },
                {
                    name = "fixkit",
                    price = 1500,
                    label = "Repair Kit",
                    uitype = "Sonstiges"
                },
                {
                    name = "medikit",
                    price = 1250,
                    label = "Medi Kit",
                    uitype = "Sonstiges"
                },
                {
                    name = "bread",
                    price = 100,
                    label = "Brot",
                    uitype = "Essen"
                },
                {
                    name = "water",
                    price = 100,
                    label = "Wasser",
                    uitype = "Trinken"
                },
            }
        },

        ['weapon'] = {
            ['settings'] = {
                ['interact'] = "UM DEN WAFFENSHOP ZU ÖFFNEN",
                ['blip'] = {
                    ['enable'] = true,
                    ['type'] = 110,
                    ['scale'] = 0.6,
                    ['color'] = 59,
                    ['name'] = "Waffenshop",
                }
            },
            ['positions'] = {
                vector3(-662.1, -935.3, 20.8),
                vector3(810.2, -2157.3, 28.6),
                vector3(1693.4, 3759.5, 33.7),
                vector3(-330.2, 6083.8, 31.2),
                vector3(252.3, -50.0, 69.8),
                vector3(22.0, -1107.2, 29.8),
                vector3(2567.6, 294.3, 107.7),
                vector3(-1117.5, 2698.6, 18.5),
                vector3(842.4, -1033.4, 27.1),
                vector3(-1306.1855, -394.3519, 36.6958),
                vector3(-3171.6101, 1087.6642, 20.8388)
            },
            ['items'] = {
                {
                    name = "weapon_pistol",
                    price = 120000,
                    label = "Pistole",
                    uitype = "Waffe"
                },
                {
                    name = "weapon_knife",
                    price = 30000,
                    label = "Messer",
                    uitype = "Waffe"
                },
                {
                    name = "gadget_parachute",
                    price = 15000,
                    label = "Fallschirm",
                    uitype = "Gadgets"
                },
                {
                    name = "clip",
                    price = 10000,
                    label = "Magazin",
                    uitype = "Munition"
                },
                {
                    name = "ammobox",
                    price = 25000,
                    label = "Munitionsbox",
                    uitype = "Munition"
                }
            }
        },

        ['baumarkt'] = {
            ['settings'] = {
                ['interact'] = "UM DEN BAUMARKT ZU ÖFFNEN",
                ['blip'] = {
                    ['enable'] = true,
                    ['type'] = 544,
                    ['scale'] = 0.7,
                    ['color'] = 59,
                    ['name'] = "Baumarkt",
                }
            },
            ['positions'] = {
                vector3(2748.5244, 3472.4949, 55.6763),
            },
            ['items'] = {
                {
                    name = "kabelbinder",
                    price = 1200,
                    label = "Kabelbinder",
                    uitype = "Gegenstände"
                },
                {
                    name = "schere",
                    price = 1000,
                    label = "Schere",
                    uitype = "Gegenstände"
                },
                {
                    name = "head_bag",
                    price = 2500,
                    label = "Schere",
                    uitype = "Gegenstände"
                },
                {
                    name = "spray",
                    price = 2000,
                    label = "Sprühdose",
                    uitype = "Gegenstände"
                },
                {
                    name = "spray_remover",
                    price = 1000,
                    label = "Grafitti Entferner",
                    uitype = "Gegenstände"
                },
            }
        },

        ['Angelshop'] = {
            ['settings'] = {
                ['interact'] = "UM DEN ANGELSHOP ZU ÖFFNEN",
                ['blip'] = {
                    ['enable'] = true,
                    ['type'] = 780,
                    ['scale'] = 0.7,
                    ['color'] = 26,
                    ['name'] = "Angelshop",
                }
            },
            ['positions'] = {
                vector3(-1845.1249, -1249.5745, 8.6395),
            },
            ['items'] = {
                {
                    name = "rod",
                    price = 1000,
                    label = "Angel",
                    uitype = "Gegenstände"
                },
            }
        }

    },

    ['blackmarket'] = {
        ['enable'] = true,

        ['account'] = 'black_money', -- pay with??

        ['interact'] = 'UM DEM SCHWARZMARKT ZU ÖFFNEN', 

        ['positions'] = { -- every resource restart switch between this positions

            ['Schwarzmarkt 1'] = {
                ['pedcoords'] = vector4(-2085.2786, -1017.9245, 12.7819, 75.8934),
                ['pedmodel'] = 'a_f_m_fatcult_01',
                ['items'] = {
                    {
                        ['name'] = 'weapon_pistol',
                        ['label'] = 'Pistole',
                        ['uitype'] = 'Waffe',
                        ['price'] = 160000,
                        ['type'] = 'weapon'
                    },
                    {
                        ['name'] = 'weapon_pistol50',
                        ['label'] = '50er Pistole',
                        ['uitype'] = 'Waffe',
                        ['price'] = 200000,
                        ['type'] = 'weapon'
                    },
                    {
                        ['name'] = 'weapon_golfclub',
                        ['label'] = '7er-Eisen',
                        ['uitype'] = 'Sonstige',
                        ['price'] = 70000,
                        ['type'] = 'weapon'
                    },
                    {
                        ['name'] = 'weapon_wrench',
                        ['label'] = 'Schraubenschlüssel',
                        ['uitype'] = 'Waffe',
                        ['price'] = 70000,
                        ['type'] = 'weapon'
                    },
                    {
                        ['name'] = 'spritze',
                        ['label'] = 'Spritze',
                        ['uitype'] = 'Sonstige',
                        ['price'] = 50,
                        ['type'] = 'item'
                    },
                    {
                        ['name'] = 'thermal_charge',
                        ['label'] = 'Thermal Sprengsatz',
                        ['uitype'] = 'Sonstige',
                        ['price'] = 10000,
                        ['type'] = 'item'
                    },
                }
            },

            ['Schwarzmarkt 2'] = {
                ['pedcoords'] = vector4(-131.1519, 867.6832, 232.6931, 58.3551),
                ['pedmodel'] = 'g_f_y_vagos_01',
                ['items'] = {
                    {
                        ['name'] = 'weapon_snspistol',
                        ['label'] = 'SNS Pistole',
                        ['uitype'] = 'Waffe',
                        ['price'] = 120000,
                        ['type'] = 'weapon'
                    },
                    {
                        ['name'] = 'weapon_pistol_mk2',
                        ['label'] = 'MK II Pistole',
                        ['uitype'] = 'Waffe',
                        ['price'] = 240000,
                        ['type'] = 'weapon'
                    },
                    {
                        ['name'] = 'weapon_switchblade',
                        ['label'] = 'Klappmesser',
                        ['uitype'] = 'Waffe',
                        ['price'] = 70000,
                        ['type'] = 'weapon'
                    },
                    {
                        ['name'] = 'spritze',
                        ['label'] = '!Angebot! Spritze',
                        ['uitype'] = 'Sonstige',
                        ['price'] = 50,
                        ['type'] = 'item'
                    },
                    {
                        ['name'] = 'laptop_h',
                        ['label'] = 'Hacker Laptop',
                        ['uitype'] = 'Sonstige',
                        ['price'] = 20000,
                        ['type'] = 'item'
                    },
                }
            },

            ['Schwarzmarkt 3'] = {
                ['pedcoords'] = vector4(-777.8421, 2216.8706, 85.1180, 49.6032),
                ['pedmodel'] = 's_m_y_clown_01',
                ['items'] = {
                    {
                        ['name'] = 'weapon_heavypistol',
                        ['label'] = 'Heavy Pistole',
                        ['uitype'] = 'Waffe',
                        ['price'] = 250000,
                        ['type'] = 'weapon'
                    },
                    {
                        ['name'] = 'weapon_snspistol',
                        ['label'] = '!Angebot! SNS Pistole!',
                        ['uitype'] = 'Waffe',
                        ['price'] = 100000,
                        ['type'] = 'weapon'
                    },
                    {
                        ['name'] = 'weapon_machete',
                        ['label'] = 'Machete',
                        ['uitype'] = 'Waffe',
                        ['price'] = 70000,
                        ['type'] = 'weapon'
                    },
                    {
                        ['name'] = 'spritze',
                        ['label'] = 'Spritze',
                        ['uitype'] = 'Sonstige',
                        ['price'] = 50,
                        ['type'] = 'item'
                    },
                    {
                        ['name'] = 'lockpick',
                        ['label'] = 'Lockpick',
                        ['uitype'] = 'Sonstige',
                        ['price'] = 10000,
                        ['type'] = 'item'
                    },
                }
            }
        }

    }
}
