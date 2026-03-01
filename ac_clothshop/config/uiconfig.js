// the texts from the ui
const labels = {
    server1: 'AC - Scripts',
    server2: 'Roleplay',
    clothes: 'Kleidung',
    saved: 'Outfits',
    save: 'Speichern',
    dont_save: 'Nicht Speichern',
    save_question: 'Möchtest du das Outfit in der Garderobe speichern?',
    name_placeholder: 'Name',
    outfit_name_head: 'Outfit Name',
    use_outfit: 'Outfit Anziehen',
    color: 'Farbe',
    variation: 'Variation'
}

// change money format
Number.prototype.formatMoney = function() {
    return new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD',
        minimumFractionDigits: 0
    }).format(this);
};

// CSS Settings
UI.Css(`
    :root {
        --clr-bg: radial-gradient(50.29% 34.31% at 25.03% 99.92%, rgba(77, 41, 255, 0.23) 3.63%, rgba(0, 0, 0, 0.00) 100%), radial-gradient(47.61% 26% at 50% 0%, rgba(66, 41, 255, 0.36) 0%, rgba(0, 0, 0, 0.00) 100%), radial-gradient(43.41% 39.75% at 100% 50%, rgba(66, 41, 255, 0.15) 0%, rgba(0, 0, 0, 0.00) 100%), radial-gradient(56.02% 43.37% at 50% 108.85%, rgba(66, 41, 255, 0.15) 0%, rgba(0, 0, 0, 0.00) 100%), radial-gradient(37.95% 38.8% at 0.69% 50%, rgba(45, 41, 255, 0.15) 0%, rgba(0, 0, 0, 0.00) 100%), radial-gradient(50% 50% at 50% 50%,rgb(1, 0, 22) 0%,rgb(3, 2, 7) 100%);
        --clr-side: radial-gradient(169.47% 400% at 0% 50%, rgba(0, 0, 0, 0.95) 0%, rgba(2, 2, 11, 0.95) 37.69%, rgba(0, 0, 0, 0.00) 50%, rgba(0, 0, 0, 0.00) 100%);

        --clr-title-text: #3729ffff;
        --clr-title-shadow: rgba(55, 41, 255, 0.5);

        --selected-category-bg: linear-gradient(to bottom, #3b29ff24, rgba(0, 0, 0, 0));
        --selected-category-border: linear-gradient(to bottom, #ffffff00 0%, #ffffff00 50%, #3729ff24 100%);
        --selected-line: #3029ffff;

        --clr-payout-bg: linear-gradient(135deg, rgba(5, 3, 19, 0.46), rgb(70, 41, 255), rgba(4, 3, 19, 0.46));
        --clr-payout-shadow1:  rgba(84, 41, 255, 0.46);
        --clr-payout-shadow2:rgb(66, 41, 255);
        --clr-payout-border:rgb(61, 22, 255);

        --clr-selector-num-bg: rgba(59, 41, 255, 0.3);
        --clr-selector-num-text: #3e29ffff;
        --clr-selector-num-shadow: rgba(55, 41, 255, 0.25);
        --clr-selector-num-border: rgba(255, 255, 255, .1);
        
        --clr-selector-bg: linear-gradient(135deg, rgba(5, 3, 19, 0.46), rgb(70, 41, 255), rgba(4, 3, 19, 0.46));
        --clr-selector-shadow1:rgba(84, 41, 255, 0.46);
        --clr-selector-shadow2:rgb(66, 41, 255);

        --clr-accept-bg: linear-gradient(135deg, rgba(5, 3, 19, 0.46), rgb(70, 41, 255), rgba(4, 3, 19, 0.46));
        --clr-accept-shadow1:  rgba(84, 41, 255, 0.46);
        --clr-accept-shadow2:rgb(66, 41, 255);
        --clr-accept-border:rgb(61, 22, 255);

        --clr-saved-icon-bg: radial-gradient(50% 50% at 50% 50%, #3729ffff, #000);
        --clr-saved-icon-shadow1: rgba(84, 41, 255, 0.46);
        --clr-saved-icon-shadow2: rgb(66, 41, 255);

        --clr-saved-btn-bg: linear-gradient(135deg, rgba(5, 3, 19, 0.46), rgb(70, 41, 255), rgba(4, 3, 19, 0.46));
        --clr-saved-btn-shadow1:  rgba(84, 41, 255, 0.46);
        --clr-saved-btn-shadow2:rgb(66, 41, 255);
        --clr-saved-btn-border:rgb(61, 22, 255);
    }       
`)