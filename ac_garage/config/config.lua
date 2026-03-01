Config = {
    ['language'] = 'de', -- en, de, fr

    ['ESX'] = function()
        return exports["es_extended"]:getSharedObject() -- import ESX
    end,

    ['help_notify'] = function(message)
        ESX = exports["es_extended"]:getSharedObject()  -- this is here required because of ESX help notify
        ESX.ShowHelpNotification(message, true)   -- your help notification
    end,

    ['notify_server'] = function(source, type, title, message)
        TriggerClientEvent('notifications', source, type, title, message) -- your serverside notify trigger
    end,

    ['notify_client'] = function(type, title, message)
        TriggerEvent('notifications', type, title, message) -- your clientside notify trigger
    end,

    ['ImoundPrice'] = 2000,

    ['GetMoneyForVeh'] = { -- get money if you park in a vehicle from other guys
        ['enabled'] = true,
        ['amount'] = 200,
        ['account'] = 'bank' -- bank, black_money, money
    },
    
    ['blacklisted_names'] = { -- names that cant be setted for vehicles
        'nigg',
        'nick',
        'adolf',
        'hitl',
        'batmobil',
        'gay',
        'mutter',
        'mother'
    },

    ['garages'] = { -- garage list

        -- | Garage Item | --
        ['Würfelpark'] = { -- garage label
            ['type'] = 'car',
            ['parkout'] = vector3(213.6241, -809.0486, 31.0149), -- pak out point (x, y, z)
            ['vehpoints'] = {
                vector4(221.7834, -804.0600, 29.0, 249.0), -- park in point (x, y, z, heading)
                vector4(219.8854, -809.1474, 29.0, 249.0), -- park in point (x, y, z, heading)
                vector4(223.8304, -799.2491, 29.0, 249.0)
            }
        },
        -- | End of Item | --

        -- | Garage Item | --
        ['Stadt Abschlepphof Garage'] = {
            ['type'] = 'car',
            ['parkout'] = vector3(393.0791, -1632.4767, 29.291),
            ['vehpoints'] = {
                vector4(395.1064, -1626.1683, 27.8799, 51.3665),
                vector4(399.0058, -1621.4104, 27.8802, 50.1185),
                vector4(403.0017, -1616.4918, 27.8801, 51.2423)
            }
        },
        -- | End of Item | --

        -- | Garage Item | --
        ['Würfelpark 2 Garage'] = {
            ['type'] = 'car',
            ['parkout'] = vector3(100.4774, -1073.5082, 29.3741),
            ['vehpoints'] = {
                vector4(108.1902, -1079.3553, 27.7809, 340.4550),
                vector4(117.6603, -1081.4436, 27.7811, 0.6551),
                vector4(110.6472, -1052.9690, 27.7927, 247.4059),
                vector4(111.53, -1080.54, 27.7927, 159.25),
                vector4(104.52, -1078.30, 27.7927, 340.08),
            }
        },
        -- | End of Item | --

        -- | Garage Item | --
        ['Hafen rechts Garage'] = {
            ['type'] = 'car',
            ['parkout'] = vector3(786.3384, -2967.7961, 6.0288),
            ['vehpoints'] = {
                vector4(781.6322, -2961.5842, 4.3889, 71.6421),
                vector4(781.5049, -2953.8118, 4.4075, 68.2669),
            }
        },
        -- | End of Item | --

        -- | Garage Item | --
        ['Hafen Einreise Garage'] = {
            ['type'] = 'car',
            ['parkout'] = vector3(-391.7176, -2263.9343, 7.6082),
            ['vehpoints'] = {
                vector4(-416.2664, -2266.9512, 6.1959, 270.1053),
                vector4(-387.5028, -2270.2556, 6.1966, 92.3139),
            }
        },
        -- | End of Item | --

        -- | Garage Item | --
        ['Strand Vagos Hood Garage'] = {
            ['type'] = 'car',
            ['parkout'] = vector3(-1184.0972, -1509.6364, 4.6493),
            ['vehpoints'] = {
                vector4(-1190.6669, -1503.7528, 2.9612, 305.5894),
                vector4(-1185.1803, -1493.4243, 2.9675, 124.0274),
            }
        },
        -- | End of Item | --

        -- | Garage Item | --
        ['Stadt Eclipse Medical Tower Garage'] = {
            ['type'] = 'car',
            ['parkout'] = vector3(-570.3146, 312.9742, 84.4843),
            ['vehpoints'] = {
                vector4(-562.4816, 318.6317, 82.9908, 84.3473),
                vector4(-577.2101, 314.1357, 83.2546, 354.4243),
            }
        },
        -- | End of Item | --

        -- | Garage Item | --
        ['Stadt Vinewood PD Garage'] = {
            ['type'] = 'car',
            ['parkout'] = vector3(596.7335, 91.4777, 93.1299),
            ['vehpoints'] = {
                vector4(598.3529, 98.3257, 91.4946, 248.5007),
                vector4(608.5179, 103.9040, 91.4026, 69.5347),
            }
        },
        -- | End of Item | --

        -- | Garage Item | --
        ['Stadt Mechaniker Garage'] = {
            ['type'] = 'car',
            ['parkout'] = vector3(-374.1488, -87.2771, 45.6634),
            ['vehpoints'] = {
                vector4(-369.3488, -99.1557, 44.2510, 339.9886),
                vector4(-362.6286, -101.4034, 44.2520, 339.5836),
                vector4(-352.6796, -104.8305, 44.2517, 339.2535),
            }
        },
        -- | End of Item | --

        -- | Garage Item | --
        ['Stadt Friedhof Garage'] = {
            ['type'] = 'car',
            ['parkout'] = vector3(-1642.3577, -216.4303, 55.1273),
            ['vehpoints'] = {
                vector4(-1630.3254, -205.9744, 53.6683, 157.0492),
                vector4(-1636.8505, -203.4879, 53.7241, 157.1732),
            }
        },
        -- | End of Item | --

        -- | Garage Item | --
        ['Stadt Little Seoul Garage'] = {
            ['type'] = 'car',
            ['parkout'] = vector3(-585.5960, -870.2023, 25.6683),
            ['vehpoints'] = {
                vector4(-589.5666, -860.3764, 24.4323, 206.6640),
                vector4(-582.3494, -859.2801, 24.6245, 179.3886),
            }
        },
        -- | End of Item | --

        -- | Garage Item | --
        ['Stadt Mirror Park Garage'] = {
            ['type'] = 'car',
            ['parkout'] = vector3(1036.4080, -763.1471, 57.9930),
            ['vehpoints'] = {
                vector4(1029.2435, -763.8984, 56.5684, 55.0272),
                vector4(1030.8323, -773.8082, 56.6480, 143.6887),
            }
        },
        -- | End of Item | --

        -- | Garage Item | --
        ['Highway Palomino Garage'] = {
            ['type'] = 'car',
            ['parkout'] = vector3(2563.7312, 306.4037, 108.6097),
            ['vehpoints'] = {
                vector4(2574.9797, 312.9841, 107.0467, 0.4873),
                vector4(2562.9758, 312.8516, 107.0485, 358.8375),
            }
        },
        -- | End of Item | --

        -- | Garage Item | --
        ['SG Garage'] = {
            ['type'] = 'car',
            ['parkout'] = vector3(1829.0809, 2555.4873, 47.2136),
            ['vehpoints'] = {
                vector4(1834.2120, 2542.1196, 44.4682, 269.9130),
                vector4(1854.9805, 2549.1655, 44.2598, 268.4377),
            }
        },
        -- | End of Item | --

        -- | Garage Item | --
        ['Fluss Military Garage'] = {
            ['type'] = 'car',
            ['parkout'] = vector3(-1135.0042, 2682.5232, 18.4056),
            ['vehpoints'] = {
                vector4(-1152.0437, 2679.3914, 16.6818, 220.9788),
                vector4(-1159.2096, 2673.5908, 16.6813, 223.0246),
            }
        },
        -- | End of Item | --

        -- | Garage Item | --
        ['Sandy links (Harmony) Garage'] = {
            ['type'] = 'car',
            ['parkout'] = vector3(180.5611, 2793.3523, 45.6552),
            ['vehpoints'] = {
                vector4(201.5291, 2784.4565, 44.2426, 11.8809),
                vector4(190.2748, 2787.0547, 44.1969, 278.6783),
            }
        },
        -- | End of Item | --

        -- | Garage Item | --
        ['Sandy rechts (Nowhere Road) Garage'] = {
            ['type'] = 'car',
            ['parkout'] = vector3(2048.4587, 3416.2183, 44.2738),
            ['vehpoints'] = {
                vector4(2062.9683, 3434.4316, 42.6227, 83.9655),
                vector4(2028.9205, 3422.1860, 42.9437, 310.3986),
            }
        },
        -- | End of Item | --

        -- | Garage Item | --
        ['Grapeseed Garage'] = {
            ['type'] = 'car',
            ['parkout'] = vector3(1820.0898, 4588.8076, 35.9918),
            ['vehpoints'] = {
                vector4(1801.4114, 4586.2891, 35.5896, 184.5686),
                vector4(1789.4590, 4585.2471, 35.9755, 183.3718),
            }
        },
        -- | End of Item | --

        -- | Garage Item | --
        ['Paleto rechts Garage'] = {
            ['type'] = 'car',
            ['parkout'] = vector3(1466.9175, 6541.2593, 14.0866),
            ['vehpoints'] = {
                vector4(1461.7738, 6547.9458, 13.0084, 86.5869),
            }
        },
        -- | End of Item | --

        -- | Garage Item | --
        ['Paleto links (Market) Garage'] = {
            ['type'] = 'car',
            ['parkout'] = vector3(-390.4915, 6050.3496, 31.5001),
            ['vehpoints'] = {
                vector4(-396.2964, 6058.5532, 30.0884, 201.7424),
            }
        },
        -- | End of Item | --

        -- | Garage Item | --
        ['Paleto linker Highway (Ranger Station) Garage'] = {
        ['type'] = 'car',
            ['parkout'] = vector3(-1494.0454, 4971.5684, 63.8790),
            ['vehpoints'] = {
                vector4(-1494.6003, 4981.1606, 61.6679, 354.3281),
            }
        },
        -- | End of Item | --

        -- | Garage Item | --
        ['linker Highway (Kleidungsladen) Garage'] = {
            ['type'] = 'car',
            ['parkout'] = vector3(-3148.8179, 1115.0610, 20.8504),
            ['vehpoints'] = {
                vector4(-3141.7871, 1117.0480, 19.2907, 280.6315),
                vector4(-3146.3381, 1106.5385, 19.2927, 280.3692),
            }
        },
        -- | End of Item | --

    },

    ['impound'] = {

        -- | Impound Item | --
        ['Stadt Main Abschlepper'] = {
            ['type'] = 'car',
            ['parkout'] = vector3(409.6352, -1623.4620, 29.2919),
            ['vehpoints'] = {
                vector4(420.6193, -1638.9750, 27.8801, 87.4922),
                vector4(419.6389, -1629.4934, 27.8798, 140.6491),
                vector4(408.2217, -1654.4086, 27.8802, 319.7582),
                vector4(398.5328, -1646.5432, 27.8796, 321.3419),
            }
        },
        -- |  End of Item | --

        -- | Impound Item | --
        ['Sandy Abschlepper'] = {
            ['type'] = 'car',
            ['parkout'] = vector3(2042.0637, 3186.5593, 45.1677),
            ['vehpoints'] = {
                vector4(2055.9504, 3179.0486, 43.7558, 65.9780),
                vector4(2053.1179, 3192.9729, 43.7742, 148.5361),
            }
        },
        -- |  End of Item | --

        -- | Impound Item | --
        ['Paleto Abschlepper'] = {
            ['type'] = 'car',
            ['parkout'] = vector3(-319.5711, 6086.6094, 31.4622),
            ['vehpoints'] = {
                vector4(-323.0648, 6094.0112, 30.0499, 227.8313),
                vector4(-320.2827, 6101.2754, 30.0513, 223.9697),
            }
        },
        -- |  End of Item | --

    },
    
    ['plane'] = {
        -- plane garage item
        ['Stadt Flughafen'] = {
            ['type'] = 'plane',
            ['parkout'] = vector3(-1299.4150, -3407.0640, 13.9401),
            ['vehpoints'] = {
                vector4(-1269.6160, -3377.3640, 12.5283, 329.9709),
            }
        },

        -- plane garage item
        ['Sandy Flughafen'] = {
            ['type'] = 'plane',
            ['parkout'] = vector3(1695.6073, 3280.7288, 41.1167),
            ['vehpoints'] = {
                vector4(1700.7092, 3249.8521, 39.5523, 105.5631),
            }
        },
    },

    ['blips'] = {
        -- garage blip
        ['car'] = {
            ['type'] = 473,
            ['label'] = 'Garage'
        },

        -- plane garage blip
        ['plane'] = {
            ['type'] = 1,
            ['label'] = 'Hangar'
        },

        -- impound blip
        ['impound'] = {
            ['type'] = 477,
            ['label'] = 'Abschlepphof'
        }
    },

    ['marker'] = {
        -- impound / garage marker type
        ['car'] = 36,

        -- plane garage marker type
        ['plane'] = 1,
    }
}