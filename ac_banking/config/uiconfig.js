// the texts from the ui
const labels = {
    server1: 'AC-Scripts',
    server2: 'Roleplay',
    exit: 'Exit',
    bank_card: 'Bank Karte',
    transactions: 'Transaktionen',
    put_in: 'Einzahlen',
    put_out: 'Auszahlen',
    send: 'Überweisen',
    accept: 'Bestätigen',
    ammount: 'Betrag',
    transaction_put: 'Einzahlung',
    transaction_get: 'Auszahlung',
    transatcion_tra: 'Überweisung',
    transaction_getted: 'Erhalten',
    transaction_unknown: 'Unbekannter Transaktionstyp',
    card_text: 'LS-BANK'
}

// CSS Settings
UI.Css(`
    :root {
        --clr-bg: radial-gradient(50.29% 34.31% at 25.03% 99.92%, rgba(77, 41, 255, 0.23) 3.63%, rgba(0, 0, 0, 0.00) 100%), radial-gradient(47.61% 26% at 50% 0%, rgba(66, 41, 255, 0.36) 0%, rgba(0, 0, 0, 0.00) 100%), radial-gradient(43.41% 39.75% at 100% 50%, rgba(66, 41, 255, 0.15) 0%, rgba(0, 0, 0, 0.00) 100%), radial-gradient(56.02% 43.37% at 50% 108.85%, rgba(66, 41, 255, 0.15) 0%, rgba(0, 0, 0, 0.00) 100%), radial-gradient(37.95% 38.8% at 0.69% 50%, rgba(45, 41, 255, 0.15) 0%, rgba(0, 0, 0, 0.00) 100%), radial-gradient(50% 50% at 50% 50%,rgb(1, 0, 22) 0%,rgb(3, 2, 7) 100%);
        
        --clr-server-text-1:rgb(255, 255, 255);
        --clr-server-text-1-shadow: rgba(255, 255, 255, 0.5);

        --clr-server-text-2:rgb(66, 41, 255);
        --clr-server-text-2-shadow: rgba(48, 41, 255, 0.5);

        --quader-bg: linear-gradient(135deg,rgb(55, 41, 255) 0%, rgba(66, 41, 255, 0.27) 109.38%);
        --quader-border:rgb(55, 41, 255);
        --quader-shadow: rgba(70, 41, 255, 0.25);

        --banking-options-box: radial-gradient(75.85% 75.85% at 50% 0%, rgba(45, 41, 255, 0.67) 0%, rgba(0, 0, 0, 0.00) 100%);

        --banking-button-bg: linear-gradient(135deg, rgba(5, 3, 19, 0.46), rgb(70, 41, 255), rgba(4, 3, 19, 0.46));
        --banking-button-shadow1:  rgba(84, 41, 255, 0.46);
        --banking-button-shadow2:rgb(66, 41, 255);
        --banking-button-border:rgb(61, 22, 255);

        --transaction-value-bg: rgba(59, 41, 255, 0.15);
        --transaction-value-text: rgb(59, 41, 255);
        --transaction-value-shadow: rgba(255, 20, 24, 0.25);

        --transaction-icon-bg: linear-gradient(135deg, rgba(5, 3, 19, 0.46), rgb(70, 41, 255), rgba(4, 3, 19, 0.46));
        --transaction-icon-shadow1:  rgba(84, 41, 255, 0.46);
        --transaction-icon-shadow2:rgb(66, 41, 255);

        --card-bg: linear-gradient(45deg, rgba(255, 255, 255, 0.05), rgba(255, 255, 255, 0.09));

        --card-title-card-bg: linear-gradient(135deg, rgba(5, 3, 19, 0.46), rgb(70, 41, 255), rgba(4, 3, 19, 0.46));
        --card-title-card-shadow1:  rgba(84, 41, 255, 0.46);
        --card-title-card-shadow2:rgb(66, 41, 255);

        --card-balance: rgba(59, 41, 255, 0.15);
        --card-balance-text: rgb(59, 41, 255);
        --card-balance-shadow: rgba(255, 20, 24, 0.25);
    }       
`)