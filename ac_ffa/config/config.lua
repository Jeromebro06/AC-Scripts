Config = {
    ['language'] = 'en', -- en, de, fr

    ['join'] = vector3(-326.8855, -255.0001, 34.3909), -- the coords for the ffa join point

    ['quitcommand'] = 'quitffa', -- the command to leave the ffa

    ['revive_player'] = function(source)
        TriggerClientEvent('esx_ambulancejob:revive', source) -- your revive trigger
    end,

    ['player_death_event'] = 'esx:onPlayerDeath',

    ['notify'] = function(source, type, title, message)
        -- TriggerClientEvent('notifications', source, type, title, message) -- your notify trigger
        TriggerClientEvent("ESX:Notify", source, type, 3000, message)
    end,

    ['ESX'] = function()
        return exports["es_extended"]:getSharedObject() -- import ESX
    end,

    ['InSpecate'] = function(bool)
        -- bool = true / false
        -- this gets triggered if a player get in spectator mode
        -- this is to add anticheat bypass or what else (clientside)
    end,

    ['help_notify'] = function(message)
        ESX = exports["es_extended"]:getSharedObject()  -- this is here required because of ESX help notify
        ESX.ShowHelpNotification(message, true)   -- your help notification
    end,

    ['JoinMarker'] = {
        ['type'] = 21, -- the marker type from the join marker
        ['size'] = 0.8, -- the marker size from the join marker
        ['color'] = { -- color configuration from the join marker
            ['r'] = 153,
            ['g'] = 0,
            ['b'] = 255,
            ['a'] = 120
        },
        ['blip'] = {
            ['type'] = 119,
            ['color'] = 0,
            ['size'] = 0.7,
            ['title'] = 'FFA'
        }
    },

    ['ZoneColor'] = { -- the marker color from the zone
        ['r'] = 153,
        ['g'] = 0,
        ['b'] = 255,
        ['a'] = 120
    },

    ['MoneyPerKill'] = {
        ['enable'] = true, -- enable money per kill
        ['amount'] = 1000, -- amount of money
        ['account'] = 'money' -- bank, money, black_money
    },

    ['clip_require'] = true, -- on FFA join get messsage permanently 'bodycam' required
    ['SpectateKiller'] = true, -- spectate the killer on death for a few seconds
    ['SelectWeapon'] = true, -- select automaticly a gun by first spawn 
    ['RespawnWeapon'] = true, -- select weapon after death back to last one
    ['RespawnTime'] = 3, -- seconds to respawn

    ['lobbys'] = {

        --|-----------------Zone Part----------------|--
        ['Würfelpark'] = { -- ['Lobby-Name']
            ['slots'] = 20, -- max amount of players
            ['bodyshot'] = false,
            ['image'] = 'wurfelpark.png', -- image file name
            ['spawns'] = { -- spawn points in zone vector4(x, y, z, heading)
                vector4(184.2579, -945.7473, 30.0918, 100.0),
                vector4(247.9410, -898.6486, 29.1415, 249.1221),
                vector4(240.7922, -863.5466, 29.7145, 159.5375),
                vector4(189.2697, -859.9696, 31.4881, 332.1856),
                vector4(167.0549, -915.7651, 30.6922, 247.2459),
                vector4(219.7077, -951.7001, 30.0869, 57.9727),
            },
            ['loadout'] = { -- list of weapons for the zone
                'weapon_pistol',
                'weapon_pistol_mk2',
                'weapon_pistol50',
                'weapon_heavypistol'
            },
            ['zone'] = {
                ['coords'] = vector3(196.3679, -932.1178, 30.6857), -- zone middle point
                ['distance'] = 100.0, -- zone size
            }
        },
        --|----------------End of Part---------------|--

        --|-----------------Zone Part----------------|--
        ['Prison'] = {
            ['slots'] = 20,
            ['bodyshot'] = false,
            ['image'] = 'prison.webp',
            ['spawns'] = {
                vector4(1764.7885, 2531.4424, 45.5650, 38.9076),
                vector4(1763.2560, 2553.4250, 45.5650, 121.7557),
                vector4(1732.6573, 2562.9011, 45.5649, 168.3916),
                vector4(1716.9226, 2566.1565, 45.5648, 111.0418),
                vector4(1685.8013, 2538.0012, 45.5648, 174.2953),
                vector4(1655.4355, 2546.1545, 45.5649, 315.3325),
                vector4(1624.0801, 2577.4348, 45.5649, 180.0125),
                vector4(1605.7657, 2564.1418, 45.7493, 224.7105),
                vector4(1617.6793, 2536.9182, 45.5649, 232.4055),
                vector4(1614.7148, 2523.9341, 45.5649, 286.5724),
                vector4(1626.6919, 2492.0930, 45.5810, 317.7766),
                vector4(1662.9015, 2487.6389, 45.5649, 319.7039),
                vector4(1691.7200, 2472.3718, 45.5657, 350.8208),
                vector4(1722.1046, 2491.8074, 45.5649, 57.1818),
                vector4(1707.0499, 2521.0134, 45.5649, 306.0345),
                vector4(1686.3961, 2531.6550, 45.5649, 0.5090),
            },
            ['loadout'] = {
                'weapon_pistol',
                'weapon_pistol_mk2',
                'weapon_pistol50',
                'weapon_heavypistol',
            },
            ['zone'] = {
                ['coords'] = vector3(1707.1215, 2519.4641, 45.5648),
                ['distance'] = 130.0,
            }
        },
        --|----------------End of Part---------------|--

        --|-----------------Zone Part----------------|--
        ['Kirche'] = {
            ['slots'] = 20,
            ['bodyshot'] = false,
            ['image'] = 'kirche.webp',
            ['spawns'] = {
                vector4(-304.0580, 2766.1877, 63.4301, 7.4893),
                vector4(-323.3127, 2776.8650, 61.5352, 341.6882),
                vector4(-332.8414, 2804.5471, 58.6785, 53.6123),
                vector4(-333.9313, 2825.7249, 57.9410, 237.4211),
                vector4(-319.7876, 2833.1882, 57.8184, 272.8749),
                vector4(-314.4906, 2847.4895, 55.9841, 237.4157),
                vector4(-289.7539, 2848.3564, 54.4495, 173.7418),
                vector4(-270.2359, 2834.9082, 53.9721, 127.3224),
                vector4(-283.0835, 2805.3459, 57.9979, 73.6299)
            },
            ['loadout'] = {
                'weapon_pistol',
                'weapon_pistol_mk2',
                'weapon_pistol50',
                'weapon_heavypistol',
            },
            ['zone'] = {
                ['coords'] = vector3(-305.7100, 2803.4463, 59.4457),
                ['distance'] = 100.0,
            }
        },
        --|----------------End of Part---------------|--

        --|-----------------Zone Part----------------|--
        ['Ranch'] = {
            ['slots'] = 20,
            ['bodyshot'] = false,
            ['image'] = 'ffa_ranch.png',
            ['spawns'] = {
                vector4(1497.6454, 1125.3268, 114.3353, 30.0773),
                vector4(1485.7545, 1102.4264, 114.3349, 109.6565),
                vector4(1484.1816, 1117.9199, 114.4403, 77.7207),
                vector4(1414.1423, 1112.2771, 114.8248, 348.7367),
                vector4(1445.9617, 1149.0142, 114.3343, 271.1954),
                vector4(1425.6664, 1141.6394, 114.3342, 273.3122),
                vector4(1413.5336, 1185.3585, 113.9029, 86.8890),
                vector4(1449.4370, 1174.9240, 114.3344, 262.8668),
                vector4(1472.0891, 1172.0690, 114.3345, 180.5826),
            },
            ['loadout'] = {
                'weapon_pistol',
                'weapon_pistol_mk2',
                'weapon_pistol50',
                'weapon_heavypistol',
            },
            ['zone'] = {
                ['coords'] = vector3(1455.2336, 1154.3699, 133.1981),
                ['distance'] = 67.0,
            }
        },
        --|----------------End of Part---------------|--

        --|-----------------Zone Part----------------|--
        ['Windräder'] = {
            ['slots'] = 20,
            ['bodyshot'] = false,
            ['image'] = 'ffa_windraeder.png',
            ['spawns'] = {
                vector4(2015.9633, 2034.6421, 66.2684, 35.7711),
                vector4(2073.0381, 2033.6501, 81.5055, 88.6466),
                vector4(2123.6875, 2076.6326, 90.4488, 84.2904),
                vector4(2128.7642, 2139.4133, 114.9207, 102.1680),
                vector4(2101.2598, 2182.6189, 102.6665, 205.2399),
                vector4(2065.4221, 2208.8967, 92.4593, 205.9716),
                vector4(2035.5973, 2205.8340, 100.6799, 215.7256),
                vector4(1992.0648, 2194.7876, 104.8066, 290.4723),
                vector4(1987.8754, 2131.3525, 91.2022, 190.8013),
                vector4(1960.3873, 2067.8013, 84.7338, 269.4882),
            },
            ['loadout'] = {
                'weapon_pistol_mk2',
                'weapon_pistol',
                'weapon_pistol50',
            },
            ['zone'] = {
                ['coords'] = vector3(2041.9585, 2118.4709, 93.4982),
                ['distance'] = 105.0,
            }
        },
        --|----------------End of Part---------------|--

        --|-----------------Zone Part----------------|--
        ['Marktplatz'] = {
            ['slots'] = 20,
            ['bodyshot'] = false,
            ['image'] = 'ffa_marktplatz.png',
            ['spawns'] = {
                vector4(375.3084, -308.0070, 46.7195, 141.3896),
                vector4(358.9573, -326.0778, 46.6960, 254.8816),
                vector4(362.6864, -359.6863, 46.4433, 253.1711),
                vector4(395.9630, -326.9514, 46.9136, 157.6956),
                vector4(423.6242, -336.5213, 47.1783, 153.0501),
                vector4(440.1911, -321.0723, 48.5712, 88.6514),
                vector4(360.4262, -289.4375, 53.8227, 206.4235),
                vector4(343.8496, -370.0751, 44.9866, 309.2522),
                vector4(404.3954, -378.3699, 46.9139, 55.3209),
            },
            ['loadout'] = {
                'weapon_pistol_mk2',
                'weapon_pistol',
                'weapon_pistol50',
                'weapon_heavypistol',
            },
            ['zone'] = {
                ['coords'] = vector3(383.3887, -341.0875, 46.8131),
                ['distance'] = 70.0,
            }
        },
        --|----------------End of Part---------------|--

        --|-----------------Zone Part----------------|--
        ['Baustelle'] = {
            ['slots'] = 20,
            ['bodyshot'] = false,
            ['image'] = 'ffa_baustelle.png',
            ['spawns'] = {
                vector4(-152.6566, -945.4030, 269.1350, 187.9221),
                vector4(-144.6709, -979.7978, 269.1353, 30.2636),
                vector4(-161.5354, -963.7764, 264.2260, 249.3654),
                vector4(-161.5995, -964.1276, 259.2292, 233.7236),
                vector4(-139.1032, -950.6173, 259.1325, 144.8847),
                vector4(-140.1836, -951.9114, 254.1313, 160.3983),
                vector4(-152.7818, -1020.9097, 254.3519, 357.3044),
                vector4(-188.8786, -1010.4499, 254.3521, 296.7599),
                vector4(-171.1600, -966.0944, 254.3519, 231.0536),

            },
            ['loadout'] = {
                'weapon_pistol_mk2',
                'weapon_pistol',
                'weapon_pistol50',
                'weapon_heavypistol',
            },
            ['zone'] = {
                ['coords'] = vector3(-161.0324, -990.9240, 263.9138),
                ['distance'] = 60.0,
            }
        },
        --|----------------End of Part---------------|--

        --|-----------------Zone Part----------------|--
        ['Hood'] = {
            ['slots'] = 20,
            ['bodyshot'] = false,
            ['image'] = 'ffa_hood.png',
            ['spawns'] = {
                vector4(342.0677, -2064.3071, 20.9364, 307.7174),
                vector4(307.2774, -2037.5077, 20.4738, 325.5789),
                vector4(378.9610, -2051.2786, 21.7059, 50.8811),
                vector4(392.7574, -2017.2043, 23.4031, 63.0020),
                vector4(351.9110, -1992.1924, 24.0285, 153.4506),
                vector4(339.2763, -2014.4243, 25.7233, 326.5399),
                vector4(344.4153, -2029.0181, 22.3500, 139.2059),
                vector4(364.7274, -2042.2275, 25.6661, 110.9930),
                vector4(338.9283, -1981.2715, 27.6385, 216.7950),
                vector4(308.8391, -2047.8008, 24.2163, 336.9621),
                vector4(384.5344, -2062.3938, 21.2948, 343.6144),
                vector4(397.9407, -2009.6393, 23.3170, 57.1531),

            },
            ['loadout'] = {
                'weapon_pistol_mk2',
                'weapon_pistol',
                'weapon_pistol50',
                'weapon_heavypistol',
            },
            ['zone'] = {
                ['coords'] = vector3(349.1197, -2027.3809, 35.7323),
                ['distance'] = 57.0,
            }
        },
        --|----------------End of Part---------------|--

        --|-----------------Zone Part----------------|--
        ['Campus'] = {
            ['slots'] = 20,
            ['bodyshot'] = false,
            ['image'] = 'ffa_campus.png',
            ['spawns'] = {
                vector4(-2259.6030, 252.6875, 172.2022, 193.7036),
                vector4(-2253.6218, 234.0579, 174.6069, 359.1492),
                vector4(-2223.0159, 268.3033, 174.6016, 120.4056),
                vector4(-2228.1699, 221.9205, 175.0970, 309.7742),
                vector4(-2198.4014, 246.5630, 174.6068, 118.8583),
                vector4(-2291.0452, 316.2222, 184.5959, 269.8483),
                vector4(-2270.1689, 267.3556, 184.6017, 295.6013),
                vector4(-2293.5645, 332.0228, 174.6016, 211.5838),
                vector4(-2278.2480, 290.1328, 174.6018, 293.3594),
                vector4(-2269.8633, 344.7240, 174.6019, 181.0036),
                vector4(-2262.2737, 351.4555, 174.6019, 203.7584),
                vector4(-2232.1201, 330.3564, 174.6019, 111.2122),
                vector4(-2251.1172, 317.3132, 184.6014, 190.8478),
                vector4(-2225.4250, 306.2160, 184.5982, 189.1622),

            },
            ['loadout'] = {
                'weapon_pistol_mk2',
                'weapon_pistol',
                'weapon_pistol50',
                'weapon_heavypistol',
            },
            ['zone'] = {
                ['coords'] = vector3(-2247.2473, 276.6577, 192.7196),
                ['distance'] = 86.0,
            }
        },
        --|----------------End of Part---------------|--

        --|-----------------Zone Part----------------|--
        ['Motel'] = {
            ['slots'] = 20,
            ['bodyshot'] = false,
            ['image'] = 'ffa_sand_motel.png',
            ['spawns'] = {
                vector4(1512.4250, 3606.0496, 35.4985, 201.9491),
                vector4(1500.6721, 3585.1421, 38.9879, 265.5019),
                vector4(1513.3434, 3569.3281, 38.7365, 3.7569),
                vector4(1562.8763, 3574.8159, 33.7870, 91.9806),
                vector4(1567.0586, 3600.6316, 35.4321, 46.6799),
                vector4(1541.8987, 3595.0376, 35.4526, 303.7177),
                vector4(1529.7039, 3586.9941, 35.4566, 205.7548),
                vector4(1539.1011, 3593.4329, 38.7665, 144.9901),
                vector4(1555.4304, 3599.9766, 42.0307, 126.9004),
                vector4(1567.1604, 3600.2705, 38.7314, 218.7499),
                vector4(1560.5417, 3597.2356, 38.7752, 184.0407),

            },
            ['loadout'] = {
                'weapon_pistol_mk2',
                'weapon_pistol',
                'weapon_pistol50',
                'weapon_heavypistol',
            },
            ['zone'] = {
                ['coords'] = vector3(1537.9829, 3586.5725, 57.5748),
                ['distance'] = 45.0,
            }
        },
        --|----------------End of Part---------------|--

        --|-----------------Zone Part----------------|--
        ['Military'] = {
            ['slots'] = 20,
            ['bodyshot'] = false,
            ['image'] = 'ffa_military.png',
            ['spawns'] = {
                vector4(-1954.0062, 3297.0098, 32.9603, 46.4517),
                vector4(-1982.3979, 3298.2969, 40.2191, 56.5606),
                vector4(-1996.6877, 3322.4993, 32.9602, 225.5213),
                vector4(-1990.0255, 3337.2847, 32.9602, 238.6560),
                vector4(-1976.1804, 3357.0210, 32.9593, 221.8941),
                vector4(-1936.9254, 3333.3828, 32.9592, 171.9204),
                vector4(-1925.6232, 3348.5449, 40.2208, 62.1482),
                vector4(-1953.1042, 3369.4258, 32.8976, 131.2822),

            },
            ['loadout'] = {
                'weapon_pistol_mk2',
                'weapon_pistol',
                'weapon_pistol50',
                'weapon_heavypistol',
            },
            ['zone'] = {
                ['coords'] = vector3(-1966.0770, 3333.6184, 48.0851),
                ['distance'] = 60.0,
            }
        },
        --|----------------End of Part---------------|--

        --|-----------------Zone Part----------------|--
        ['Schrottplatz'] = {
            ['slots'] = 20,
            ['bodyshot'] = false,
            ['image'] = 'sschrott.webp',
            ['spawns'] = {
                vector4(2392.6279, 3123.9775, 48.1535, 256.1350),
                vector4(2405.5149, 3135.8457, 48.1532, 209.4599),
                vector4(2432.1372, 3098.8462, 48.7160, 17.9161),
                vector4(2408.8145, 3031.6172, 48.1526, 22.7809),
                vector4(2377.0950, 3034.6450, 48.1526, 356.1371),
                vector4(2348.6543, 3038.0278, 48.1846, 300.0404),
                vector4(2348.0618, 3072.6980, 48.1521, 293.2156),
                vector4(2360.6372, 3138.0930, 48.2088, 173.7315),
                vector4(2387.8726, 3138.9063, 47.6522, 197.5503),
            },
            ['loadout'] = {
                'weapon_pistol',
                'weapon_pistol_mk2',
                'weapon_pistol50',
                'weapon_heavypistol',
            },
            ['zone'] = {
                ['coords'] = vector3(2382.0378, 3105.3074, 48.1747),
                ['distance'] = 120.0,
            }
        },
        --|----------------End of Part---------------|--

        --|-----------------Zone Part----------------|--
        -- ['Custom-Lobby-Name'] = {
        --     ['slots'] = 20, -- max players
        --     ['image'] = 'wurfelpark.png', -- image file name
        --     ['spawns'] = {
        --         vector4(184.2579, -945.7473, 30.0918, 100.0), -- spawn points as vector 4 (x, y, z, heading)
        --     },
        --     ['loadout'] = { -- list of weapons that can be used
        --         'weapon_pistol',
        --         'weapon_pistol_mk2',
        --         'weapon_pistol50',
        --         'weapon_heavypistol'
        --     },
        --     ['zone'] = { -- zone settings
        --         ['coords'] = vector3(196.3679, -932.1178, 30.6857), -- middle point of the zone
        --         ['distance'] = 100.0, -- the size of the zone
        --     }
        -- },
        --|----------------End of Part---------------|--
        
    }
}