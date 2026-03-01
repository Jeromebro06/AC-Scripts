// the texts from the ui
const labels = {
    server1: 'AC-Scripts',
    server2: 'Roleplay',
    tab_vehicles: 'Fahrzeuge',
    tab_favorites: 'Favoriten',
    exit: 'Exit',
    new_name: 'Neuer Name..',
    save: 'Speichern',
    parkout: 'Ausparken'
}

// CSS Settings
UI.Css(`
    :root {
        --clr-bg: radial-gradient(50.29% 34.31% at 25.03% 99.92%, rgba(77, 41, 255, 0.23) 3.63%, rgba(0, 0, 0, 0.00) 100%), radial-gradient(47.61% 26% at 50% 0%, rgba(66, 41, 255, 0.36) 0%, rgba(0, 0, 0, 0.00) 100%), radial-gradient(43.41% 39.75% at 100% 50%, rgba(66, 41, 255, 0.15) 0%, rgba(0, 0, 0, 0.00) 100%), radial-gradient(56.02% 43.37% at 50% 108.85%, rgba(66, 41, 255, 0.15) 0%, rgba(0, 0, 0, 0.00) 100%), radial-gradient(37.95% 38.8% at 0.69% 50%, rgba(45, 41, 255, 0.15) 0%, rgba(0, 0, 0, 0.00) 100%), radial-gradient(50% 50% at 50% 50%,rgb(1, 0, 22) 0%,rgb(3, 2, 7) 100%);
        
        --clr-server-text-1:#FFF;
        --clr-server-text-1-shadow: rgba(255, 255, 255, 0.25);

        --clr-server-text-2:rgb(66, 41, 255);
        --clr-server-text-2-shadow: rgba(48, 41, 255, 0.5);

        --clr-title-button-active: rgba(14, 0, 138, 0.3);
        --clr-title-button-active-border:rgb(26, 22, 255);

        --clr-vehicle-item-bg: rgba(255, 255, 255, 0.02);
        --clr-vehicle-item-border:rgba(84, 41, 255, 0.18);
        --clr-vehicle-item-line:rgb(41, 41, 255);

        --clr-edit-fav: rgb(187, 187, 187);
        --clr-edit-fav-active:  #FFAD14;

        --clr-parkout-button-bg: linear-gradient(135deg, rgba(5, 3, 19, 0.46), rgb(70, 41, 255), rgba(4, 3, 19, 0.46));
        --clr-parkout-button-shadow1:  rgba(84, 41, 255, 0.46);
        --clr-parkout-button-shadow2:rgb(66, 41, 255);
        --clr-parkout-button-border:rgb(61, 22, 255);

        --clr-modal-bg: rgba(5, 0, 47, 0.21);
        --clr-modal-box: rgb(5, 0, 47);

        --clr-save-button-bg: linear-gradient(135deg, rgba(5, 3, 19, 0.46), rgb(70, 41, 255), rgba(4, 3, 19, 0.46));
        --clr-save-button-shadow1:  rgba(84, 41, 255, 0.46);
        --clr-save-button-shadow2:rgb(66, 41, 255);
        --clr-save-button-border:rgb(61, 22, 255);
    }       
`);