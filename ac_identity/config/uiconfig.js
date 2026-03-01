// the texts from the ui
const labels = {
    server1: 'AC-Scripts',
    server2: 'Roleplay',
    idcard: 'Gehe zur Ausweiserstellung',
    error: 'Es ist ein Fehler aufgetreten',
    firstname: 'Vorname',
    lastname: 'Nachname',
    size: 'Größe',
    birthdate: 'Geburtstag',
    skinmenu: 'Zurüch zur Skin erstellung',
    create: 'Erstelle Charakter'
}

// CSS Settings
UI.Css(`
    :root {
        --right-bg: radial-gradient(250% 350% at 100% 50%, rgba(0, 0, 0, 0.95) 0%, rgba(8, 2, 11, 0.95) 29.69%, rgba(0, 0, 0, 0.00) 40%, rgba(0, 0, 0, 0.00) 100%);
        --left-bg: radial-gradient(169.47% 400% at 0% 50%, rgba(0, 0, 0, 0.95) 0%, rgba(8, 2, 11, 0.95) 29.69%, rgba(0, 0, 0, 0.00) 50%, rgba(0, 0, 0, 0.00) 100%);
    }       
`)

// Page Settings
const pages = {
    0: ["sex", "face", "skin"], // kopf
    1: ["beard_1", "beard_2", "beard_3", "beard_4", "eyebrows_1", "eyebrows_2", "hair_1", "hair_2", "hair_color_1", "hair_color_2"], //bart
    2: ["eyebrows_3", "eyebrows_4", "glasses_1", "glasses_2", "makeup_1", "makeup_2", "makeup_3", "makeup_4"], // auge
    3: ["bproof_1", "bproof_2","decals_1", "decals_2", "helmet_1", "helmet_2", "bags_1", "bags_2"], // weste
    4: ["lipstick_1", "lipstick_2", "lipstick_3", "lipstick_4", "ears_1", "ears_2", "chain_1", "chain_2"], // mund
    5: ["tshirt_1", "tshirt_2", "torso_1", "torso_2", "arms", "pants_1", "pants_2", "shoes_1", "shoes_2"] // tshirt
};

function onload() {
    // Firstname-Validiate
    validateInput(
        '.identity-vorname',
        value => /^[a-zA-ZäöüÄÖÜß]{2,}$/.test(value),
        '.identity-vorname-success',
        'fa-circle-check',
        'fa-circle-xmark'
    );

    // Lastname-Validate
    validateInput(
        '.identity-nachname',
        value => /^[a-zA-ZäöüÄÖÜß]{2,}$/.test(value),
        '.identity-nachname-success',
        'fa-circle-check',
        'fa-circle-xmark'
    );

    // Size-Validate
    validateInput(
        '.identity-size',
        value => {
            const size = parseInt(value, 10);
            return size >= 50 && size <= 200;
        },
        '.identity-size-success',
        'fa-circle-check',
        'fa-circle-xmark'
    );

    // Date-Validate
    validateInput(
        '.identity-date',
        value => {
            const inputDate = new Date(value);
            const minDate = new Date('1900-01-01');
            const maxDate = new Date();
            return value && inputDate >= minDate && inputDate <= maxDate;
        },
        '.identity-date-success',
        'fa-circle-check',
        'fa-circle-xmark'
    );
}