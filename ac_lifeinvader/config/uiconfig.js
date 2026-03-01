// the texts from the ui
const labels = {
    server1: 'AC-Scripts',
    server2: 'Roleplay',
    broadcast: 'Öffentlich',
    anonym: 'Anonym',
    give_text: 'Gebe deinen Text ein...',
    exit: 'Exit',
    total_price: 'Total Price',
    send: 'Senden',
    last_messages: 'Letzte Nachrichten'
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
        
        --clr-server-text-2:rgb(66, 41, 255);
        --clr-server-text-2-shadow: rgba(48, 41, 255, 0.5);

        --clr-switch-button-active: rgba(14, 0, 138, 0.3);
        --clr-switch-button-active-border:rgb(26, 22, 255);

        --clr-total-price-bg: rgba(59, 41, 255, 0.15);
        --clr-total-price-text: rgb(59, 41, 255);
        --clr-total-price-shadow: rgba(255, 20, 24, 0.25);

        --clr-send-bg: linear-gradient(135deg, rgba(5, 3, 19, 0.46), rgb(70, 41, 255), rgba(4, 3, 19, 0.46));
        --clr-send-shadow1: rgba(80, 41, 255, 0.46);
        --clr-send-shadow2:rgb(73, 41, 255); 
        --clr-send-border:rgb(41, 22, 255);
        --clr-send-text: #fff;

        --clr-last-new-bg: linear-gradient(180deg,rgba(55, 41, 255, 0.43), rgba(0, 0, 0, 0.13), rgba(255, 255, 255, 0.041));
        --clr-last-new-line:rgb(41, 52, 255);

        --clr-last-new-user-bg: linear-gradient(135deg, rgba(4, 3, 19, 0.46),rgb(52, 41, 255), rgba(5, 3, 19, 0.46));
        --clr-last-new-user-shadow1: rgba(73, 41, 255, 0.46);
        --clr-last-new-user-shadow2:rgb(55, 41, 255);
        --clr-last-new-user-border:rgb(41, 22, 255);
        --clr-last-new-user-icon: #fff;

        --quader-bg: linear-gradient(135deg,rgb(55, 41, 255) 0%, rgba(66, 41, 255, 0.27) 109.38%);
        --quader-border:rgb(55, 41, 255);
        --quader-shadow: rgba(70, 41, 255, 0.25);

        --clr-lifeinvader-notify-bg: radial-gradient(50.29% 34.31% at 25.03% 99.92%, rgba(255, 41, 41, 0.23) 3.63%, rgba(0, 0, 0, 0.00) 100%), radial-gradient(47.61% 26% at 50% 0%, rgba(255, 41, 41, 0.36) 0%, rgba(0, 0, 0, 0.00) 100%), radial-gradient(43.41% 39.75% at 100% 50%, rgba(255, 41, 41, 0.15) 0%, rgba(0, 0, 0, 0.00) 100%), radial-gradient(56.02% 43.37% at 50% 108.85%, rgba(255, 41, 41, 0.15) 0%, rgba(0, 0, 0, 0.00) 100%), radial-gradient(37.95% 38.8% at 0.69% 50%, rgba(255, 41, 41, 0.15) 0%, rgba(0, 0, 0, 0.00) 100%), radial-gradient(50% 50% at 50% 50%, #160000 0%, #070202 100%);
        --clr-lifeinvader-notify-icon-bg: linear-gradient(135deg, rgba(14, 3, 19, 0.46), #ff2929, rgba(14, 3, 19, 0.46));
        --clr-lifeinvader-notify-icon-border: #ff1616;
        --clr-lifeinvader-notify-icon-shadow1: rgba(255, 41, 41, 0.46);
        --clr-lifeinvader-notify-icon-shadow2: #ff2929;
    }       
`)