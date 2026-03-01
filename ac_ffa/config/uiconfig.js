// the texts from the ui
const labels = {
    server1: 'AC-Scripts',
    server2: 'Roleplay',
    tab_lobbys: "Lobbies",
    tab_custom: "Custom",
    tab_statics: "Statistics",
    exit: "Exit",
    create_custom: "Create a custom FFA",
    password_title: "FFA Password",
    join: "Join",
    custom_title: "Custom FFA",
    create_lobby: "Create Lobby",
    place: "Place",
    kills: "Kills",
    deaths: "Deaths",
    perm_clip: "A permanent recording requirement applies in the FFA.",
    accept: "Understood",
    bodyshot: "Bodyshot"
}

// the weapons that can be selected in custom lobbys
const customWeapons = [
    { name: 'weapon_pistol', label: 'Pistole' },
    { name: 'weapon_appistol', label: 'AP Pistole' },
    { name: 'weapon_carbinerifle', label: 'Karabiner Gewehr' },
]

// CSS Settings
UI.Css(`
    :root {
        --clr-bg: radial-gradient(50.29% 34.31% at 25.03% 99.92%, rgba(77, 41, 255, 0.23) 3.63%, rgba(0, 0, 0, 0.00) 100%), radial-gradient(47.61% 26% at 50% 0%, rgba(66, 41, 255, 0.36) 0%, rgba(0, 0, 0, 0.00) 100%), radial-gradient(43.41% 39.75% at 100% 50%, rgba(66, 41, 255, 0.15) 0%, rgba(0, 0, 0, 0.00) 100%), radial-gradient(56.02% 43.37% at 50% 108.85%, rgba(66, 41, 255, 0.15) 0%, rgba(0, 0, 0, 0.00) 100%), radial-gradient(37.95% 38.8% at 0.69% 50%, rgba(45, 41, 255, 0.15) 0%, rgba(0, 0, 0, 0.00) 100%), radial-gradient(50% 50% at 50% 50%,rgb(1, 0, 22) 0%,rgb(3, 2, 7) 100%);
        
        --clr-server-text-2:rgb(66, 41, 255);
        --clr-server-text-2-shadow: rgba(48, 41, 255, 0.5);

        --clr-title-button-active: rgba(14, 0, 138, 0.3);
        --clr-title-button-active-border:rgb(26, 22, 255);

        --player-count-bg: linear-gradient(135deg, rgba(5, 3, 19, 0.46), rgb(70, 41, 255), rgba(4, 3, 19, 0.46));
        --player-count-shadow1: rgba(80, 41, 255, 0.46);
        --player-count-shadow2:rgb(73, 41, 255); 

        --quader-bg: linear-gradient(135deg,rgb(55, 41, 255) 0%, rgba(66, 41, 255, 0.27) 109.38%);
        --quader-border:rgb(55, 41, 255);
        --quader-shadow: rgba(70, 41, 255, 0.25);

        --lobby-border:rgba(52, 41, 255, 0.18);

        --clr-custom-modal-bg: rgb(5, 0, 47);

        --clr-create-custom-bg: linear-gradient(135deg, rgba(5, 3, 19, 0.46), rgb(70, 41, 255), rgba(4, 3, 19, 0.46));
        --clr-create-custom-shadow1:  rgba(84, 41, 255, 0.46);
        --clr-create-custom-shadow2:rgb(66, 41, 255);
        --clr-create-custom-border:rgb(61, 22, 255);

        --clr-ffa-stat-line-default:rgb(91, 41, 255);

        --clr-ffa-stats-bg: linear-gradient(135deg, rgb(5, 3, 19), rgb(29, 10, 154), rgb(4, 3, 19)); 
        --clr-ffa-stats-shadow1:  rgba(84, 41, 255, 0.46);
        --clr-ffa-stats-shadow2:rgb(66, 41, 255);
    }       
`)