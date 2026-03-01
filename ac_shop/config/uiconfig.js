// the texts from the ui
const labels = {
    server1: 'AC-Scripts',
    server2: 'Roleplay',
    exit: 'Exit',
    cart: 'Warenkorb',
    products: 'Produkte',
    price: 'Gesamt Preis',
    black_money: 'SCHWARZGELD',
    bank: 'BANK',
    money: 'BARGELD',
    addcart: 'Add to Cart'
}

// currency format
Number.prototype.formatMoney = function() {
    return new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD',
        minimumFractionDigits: 0
    }).format(this);
};

// Font Settings
// -> html/css/font.css
// -> just replace the urls with your own files

// CSS Settings
UI.Css(`
    :root {
        --clr-bg: radial-gradient(50.29% 34.31% at 25.03% 99.92%, rgba(77, 41, 255, 0.23) 3.63%, rgba(0, 0, 0, 0.00) 100%), radial-gradient(47.61% 26% at 50% 0%, rgba(66, 41, 255, 0.36) 0%, rgba(0, 0, 0, 0.00) 100%), radial-gradient(43.41% 39.75% at 100% 50%, rgba(66, 41, 255, 0.15) 0%, rgba(0, 0, 0, 0.00) 100%), radial-gradient(56.02% 43.37% at 50% 108.85%, rgba(66, 41, 255, 0.15) 0%, rgba(0, 0, 0, 0.00) 100%), radial-gradient(37.95% 38.8% at 0.69% 50%, rgba(45, 41, 255, 0.15) 0%, rgba(0, 0, 0, 0.00) 100%), radial-gradient(50% 50% at 50% 50%,rgb(1, 0, 22) 0%,rgb(3, 2, 7) 100%);
        
        --clr-server-text-1:rgb(255, 255, 255);
        --clr-server-text-1-shadow: rgba(255, 255, 255, 0.5);

        --clr-server-text-2:rgb(66, 41, 255);
        --clr-server-text-2-shadow: rgba(48, 41, 255, 0.5);

        --clr-title-button-active: rgba(14, 0, 138, 0.3);
        --clr-title-button-active-border:rgb(26, 22, 255);

        --quader-bg: linear-gradient(135deg,rgb(55, 41, 255) 0%, rgba(66, 41, 255, 0.27) 109.38%);
        --quader-border:rgb(55, 41, 255);
        --quader-shadow: rgba(70, 41, 255, 0.25);

        --clr-payout-1-bg: linear-gradient(135deg, rgba(5, 3, 19, 0.46), rgb(70, 41, 255), rgba(4, 3, 19, 0.46));
        --clr-payout-1-shadow1:  rgba(84, 41, 255, 0.46);
        --clr-payout-1-shadow2:rgb(66, 41, 255);
        --clr-payout-1-border:rgb(61, 22, 255);

        --clr-payout-2-bg: linear-gradient(135deg, rgba(5, 3, 19, 0.46), rgb(70, 41, 255), rgba(4, 3, 19, 0.46));
        --clr-payout-2-shadow1:  rgba(84, 41, 255, 0.46);
        --clr-payout-2-shadow2:rgb(66, 41, 255);
        --clr-payout-2-border:rgb(61, 22, 255);

        --clr-shop-item-bg:rgba(255, 255, 255, 0.02);
        --clr-shop-item-border:rgba(62, 41, 255, 0.18);

        --clr-add-cart-bg: linear-gradient(135deg, rgba(5, 3, 19, 0.46), rgb(70, 41, 255), rgba(4, 3, 19, 0.46));
        --clr-add-cart-shadow1:  rgba(84, 41, 255, 0.46);
        --clr-add-cart-shadow2:rgb(66, 41, 255);
        --clr-add-cart-border:rgb(61, 22, 255);

        --clr-shop-item-line:rgb(91, 41, 255);

        --clr-shop-cart-line:rgb(91, 41, 255);

        --clr-price-bg: rgba(59, 41, 255, 0.15);
        --clr-price-text: rgb(59, 41, 255);
        --clr-price-shadow: rgba(255, 20, 24, 0.25);

        --clr-cart-button-bg: linear-gradient(135deg, rgba(5, 3, 19, 0.46), rgb(70, 41, 255), rgba(4, 3, 19, 0.46));
        --clr-cart-button-shadow1:  rgba(84, 41, 255, 0.46);
        --clr-cart-button-shadow2:rgb(66, 41, 255);
        --clr-cart-button-border:rgb(61, 22, 255);
    }       
`)