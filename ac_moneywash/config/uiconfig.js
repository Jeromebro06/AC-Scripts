// the texts from the ui
const labels = {
    server1: 'AC - Scripts',
    server2: 'Roleplay',
    noprocess: 'Keine aktiven Prozesse!',
    payout: 'Auszahlen',
    deposit: 'Einzahlen',
    proccessingtime: 'Process Länge',
    minutes: 'Minuten',
    info: 'Higher fees = faster processing',
    exit: 'Exit',
    ammount: 'Ammount..',
}

const times = {
    ['10%']: 60,
    ['25%']: 40,
    ['35%']: 30,
    ['50%']: 20,
}

// currency format
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
        
        --clr-server-text-1:#FFF;
        --clr-server-text-1-shadow: rgba(255, 255, 255, 0.25);

        --clr-server-text-2:rgb(66, 41, 255);
        --clr-server-text-2-shadow: rgba(48, 41, 255, 0.5);

        --clr-payout-bg: linear-gradient(135deg, rgba(5, 3, 19, 0.46), rgb(70, 41, 255), rgba(4, 3, 19, 0.46));
        --clr-payout-shadow1:  rgba(84, 41, 255, 0.46);
        --clr-payout-shadow2:rgb(66, 41, 255);
        --clr-payout-border:rgb(61, 22, 255);

        --clr-deposit-bg: linear-gradient(135deg, rgba(5, 3, 19, 0.46), rgb(70, 41, 255), rgba(4, 3, 19, 0.46));
        --clr-deposit-shadow1:  rgba(84, 41, 255, 0.46);
        --clr-deposit-shadow2:rgb(66, 41, 255);
        --clr-deposit-border:rgb(61, 22, 255);

        --clr-ammount-bg: rgba(59, 41, 255, 0.15);
        --clr-ammount-text: rgb(59, 41, 255);
        --clr-ammount-shadow: rgba(255, 20, 24, 0.25);

        --clr-progress-line: rgba(54, 41, 235, 0.9);

        --clr-fee-text: rgb(59, 41, 255);
        --clr-fee-active-border: #1a16ffff;
        --clr-fee-active-bg: rgba(62, 41, 255, 0.15);

        --clr-processing-time: rgb(59, 41, 255);
        --clr-processing-shadow: rgba(255, 20, 24, 0.25);
    }       
`)