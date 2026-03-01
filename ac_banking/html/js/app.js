UI.Configurate(true);

function formatNumberWithDots(number) {
    return number.toLocaleString('de-DE');
}

Number.prototype.formatMoney = function() {
    return new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD',
        minimumFractionDigits: 0
    }).format(this);
};

String.prototype.formatTransaction = function () {
    switch (this.toLowerCase()) {
        case 'einzahlen':
            return labels.transaction_put;
        case 'auszahlen':
            return labels.transaction_get;
        case 'transfer':
            return labels.transaction_tra;
        case 'erhalten':
            return labels.transaction_getted;
        default:
            return labels.transaction_unknown;
    }
};

function setTransActions(transactions) {
    $('.transactions-list').empty();
    for (let i = transactions.length - 1; i >= 0; i--) {
        const transaction = transactions[i];
        var content = `
            <div class="transactions-item">
                <div class="transactions-desc">
                    <div class="transactions-dollar">
                        <i class="fa-sharp-duotone fa-regular fa-dollar-sign"></i>
                    </div>
                    <div class="transactions-text">
                        <p class="transactions-type">${transaction.type.formatTransaction()}</p>
                        <p class="transactions-date">${transaction.date}</p>
                    </div>
                </div>
                <p class="transaction-value">${transaction.money.formatMoney()}</p>
            </div>`;
        $('.transactions-list').append(content);
    }
}

window.addEventListener('message', function (event) {
    if (event.data.type === 'banking') {
        if (event.data.enable) {
            $('.card-balance p').text(event.data.balance.formatMoney());
            $('.banking-name').text(event.data.name);
            $('.banking-user-image').attr('src', event.data.img);
            setTransActions(event.data.transactions);
            $('#banking').fadeIn(200).css('display', 'flex');
        } else {
            $('#banking').fadeOut(200);
            $('.bank-einzahlen-amount').val("");
            $('.bank-auszahlen-amount').val("");
        }
    } else if (event.data.type === 'banking_update') {
        $('.card-balance p').text(event.data.balance.formatMoney());
        setTransActions(event.data.transactions);
    }
});

function einzahlen(amount) {
    $.post(`https://${GetParentResourceName()}/banking`, JSON.stringify({ type: 'moneyself', amount: amount, action: 'einzahlen' }));
}

function auszahlen(amount) {
    $.post(`https://${GetParentResourceName()}/banking`, JSON.stringify({ type: 'moneyself', amount: amount, action: 'auszahlen' }));
}

$(document).on('click', '.bank-einzahlen', function () {
    einzahlen(parseFloat($('.bank-einzahlen-amount').val()));
});

$(document).on('click', '.bank-auszahlen', function () {
    auszahlen(parseFloat($('.bank-auszahlen-amount').val()));
});

$(document).on('click', '.bank-transfer', function () {
    var amount = parseFloat($('.bank-transfer-amount').val());
    var target = parseFloat($('.bank-transfer-id').val());
    $.post(`https://${GetParentResourceName()}/banking`, JSON.stringify({ type: 'transfer', amount: amount, target: target }));
});

$(document).on('click', '.closebanking', function() { 
    $.post(`https://${GetParentResourceName()}/banking`, JSON.stringify({type:'close'}));
});

document.addEventListener("keydown", function(event) {
    if (event.key === "Escape") {
        $.post(`https://${GetParentResourceName()}/banking`, JSON.stringify({type:'close'}));
    }
});

UI.Create({
    id: 'banking',
    html: `
        <div class="pattern">////////////////////////////////////////////</div>
        <object class="banking-svg-oben" data="./svg/banking_oben.svg"></object>
        <div class="banking-head">
            <div class="ui-header-title">
                <img src="./img/logo.png" alt="" class="ui-header-logo">
                <div class="ui-header-title-text">
                    <h3>{{server1}}</h3>
                    <h4>{{server2}}</h4>
                </div>
            </div>
            <div class="ui-header-close closebanking">
                <div class="ui-header-exit">{{exit}}</div>
                <div class="ui-header-esc">ESC</div>
            </div>
        </div>
        <div class="banking-body">
            <div class="banking-list">
                <div class="card-frame">
                    <div class="card-frame-line-1">
                        <div class="card-frame-title">
                            <p class="letter-space">{{card_text}}</p>
                        </div>
                        <div class="card-frame-titlecard">
                            <p>{{bank_card}}</p>
                            <i class="fa-sharp fa-solid fa-money-check-dollar"></i>
                        </div>
                    </div>
                    <p class="card-frame-line-2">7475 5631 7810 4324</p>
                    <div class="card-frame-line-3">
                        <p>Current Balance</p>
                        <div class="card-balance">
                            <p>$15.000.000</p>
                        </div>
                    </div>
                    <div class="card-frame-line-4">
                        <div class="card-values">
                            <div class="card-value-text">
                                <p>EXP: <span>04/28</span></p>
                            </div>
                            <div class="card-value-text">
                                <p>CVV <span>779</span></p>
                            </div>
                        </div>
                        <i class="fa-duotone fa-thin fa-piggy-bank"></i>
                    </div>
                </div>
                <div class="transactions-frame">
                    <div class="transactions-title">
                        <div class="quick-options-quader"></div>
                        <p>{{transactions}}</p>
                    </div>
                    <div class="transactions-list">
                    </div>
                </div>
            </div>
            <div class="banking-options">
                <div class="banking-options-box">
                    <div class="banking-options-pattern">////////////////////////////////////</div>
                    <div class="bank-actions-title">
                        <div class="quick-options-quader"></div>
                        <p>{{put_in}}</p>
                    </div>
                    <input type="number" class="bank-anzahl bank-einzahlen-amount" placeholder="{{ammount}}">
                    <button class="bankbutton bank-einzahlen">
                        {{accept}}
                        <i class="fa-duotone fa-regular fa-check"></i>
                    </button>
                </div>
                <div class="banking-options-box">
                    <div class="banking-options-pattern">////////////////////////////////////</div>
                    <div class="bank-actions-title">
                        <div class="quick-options-quader"></div>
                        <p>{{put_out}}</p>
                    </div>
                    <input type="number" class="bank-anzahl bank-auszahlen-amount" placeholder="{{ammount}}">
                    <button class="bankbutton bank-auszahlen">
                        {{accept}}
                        <i class="fa-duotone fa-regular fa-check"></i>
                    </button>
                </div>
                <div class="banking-options-box">
                    <div class="banking-options-pattern">////////////////////////////////////</div>
                    <div class="bank-actions-title">
                        <div class="quick-options-quader"></div>
                        <p>{{send}}</p>
                    </div>
                    <div class="bankueberweisen">
                        <input type="number" class="bank-transfer-amount" placeholder="{{ammount}}">
                        <input type="number" class="bank-transfer-id" placeholder="ID">
                    </div>
                    <button class="bankbutton bank-transfer">
                        {{accept}}
                        <i class="fa-duotone fa-regular fa-check"></i>
                    </button>    
                </div>
            </div>
        </div>
        <div class="ui-pattern2">///////////////////////////////////////////</div>
    `,
    css: `
        body {
            color: white;
            font-family: 'Akrobat-ExtraBold';
            padding: 0;
            margin: 0;
            user-select: none;
        }

        button {
            cursor: pointer;
            outline: none;
        }

        .pattern {
            margin: 0;
            margin-top: -15vh;
            margin-bottom: 14vh;
            color: #FFF;
            font-size: 20vh;
            font-weight: 700;
            letter-spacing: -5.5vh;
            mix-blend-mode: overlay;
            line-height: 2vh;
        }

        .ui-header {
            &-title {
                display: flex;
                gap: 1vh;
            }

            &-logo {
                width: 4vh;
                height: 4vh;
            }

            &-title-text {
                h3 {
                    margin: 0;
                    color: var(--clr-server-text-1);
                    text-shadow: 0px 5px 49.9px var(--clr-server-text-1-shadow);
                    font-family: 'Gilroy-Medium';
                    font-size: 3vh;
                    font-weight: 700;
                    letter-spacing: -0.4vh;
                }

                h4 {
                    margin: 0;
                    margin-top: -3vh;
                    color: var(--clr-server-text-2);
                    text-shadow: 0px 5px 49.9px var(--clr-server-text-2-shadow);
                    font-family: "Shadows Highstter";
                    font-size: 5vh;
                    font-style: italic;
                    font-weight: 400;
                    letter-spacing: -0.5vh;
                }
            }

            &-info {
                display: flex;
                align-items: center;
                margin-left: 2vh;
                gap: 1vh;
                height: 80%;
            }

            &-info i {
                font-size: 2vh;
            }

            &-user-info {
                display: flex;
                align-items: center;
            }

            &-close {
                display: flex;
                align-items: center;
                z-index: 999;
            }

            &-exit {
                display: flex;
                justify-content: center;
                align-items: center;
                align-self: stretch;
                border-radius: 2px 0px 0px 2px;
                border: 0.1vh solid rgba(255, 255, 255, 0.15);
                font-family: 'Gilroy-Medium';
                font-size: 1.4vh;
                height: 3vh;
                width: 4.5vh;
            }

            &-esc {
                display: flex;
                justify-content: center;
                align-items: center;
                border-radius: 0px 1.9px 1.9px 0px;
                background: rgba(255, 255, 255, 0.10);
                font-family: 'Gilroy-Medium';
                font-size: 1.4vh;
                height: 3.2vh;
                width: 4.5vh;
            }
        }

        .ui-pattern2 {
            margin-bottom: -13.2vh;
            margin-top: 5vh;
            color: #FFF;
            font-size: 20vh;
            font-weight: 700;
            letter-spacing: -5.5vh;
            mix-blend-mode: overlay;
            line-height: 2vh;
            mix-blend-mode: overlay;
            -webkit-text-stroke: 0.03vh #ffffff;
            -webkit-text-fill-color: transparent;
        }
        
        .quick-options-quader {
            width: 1.05vh;
            height: 1.05vh;
            transform: rotate(45deg);
            border-radius: 0.3vh;
            border: 0.2vh solid var(--quader-border);
            background: var(--quader-bg);
            box-shadow: 0px 3.8px 14.82px 0px var(--quader-shadow);
            margin-left: 0.8vh;
        }

        #banking {
            position: fixed;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%) scale(90%);
            width: 100vh;
            padding: 4.5vh;
            gap: 2vh;
            border-radius: 1vh;
            background: var(--clr-bg);
            display: none;
            align-items: center;
            flex-direction: column;
            overflow: hidden;
        }

        .pattern {
            margin: 0;
            margin-top: -15vh;
            color: #FFF;
            font-size: 20vh;
            font-weight: 700;
            letter-spacing: -5.5vh;
            mix-blend-mode: overlay;
            line-height: 2vh;
        }

        .banking-svg-oben {
            height: 10vh;
            fill: #FFF;
            mix-blend-mode: overlay;
            margin-top: 3vh;
        }

        .banking-svg-unten {
            height: 13vh;
            fill: #FFF;
            mix-blend-mode: overlay;
            margin-bottom: -8vh;
        }

        .banking-head {
            display: flex;
            padding-bottom: 2vh;
            justify-content: space-between;
            align-items: flex-start;
            align-self: stretch;
            border-bottom: 0.1vh solid rgba(255, 255, 255, 0.15);
            margin-top: -4vh;
        }

        .banking-title {
            display: flex;
            gap: 1vh;
        }

        .banking-logo {
            width: 4vh;
            height: 4vh;
        }

        .banking-title-text h3{
            margin: 0;
            color: #FFF;
            text-shadow: 0px 0px 53.3px rgba(255, 255, 255, 0.25);
            font-family: 'Gilroy-Medium';
            font-size: 3vh;
            font-weight: 700;
            letter-spacing: -0.4vh;
        }

        .banking-title-text h4 {
            margin: 0;
            margin-top: -3vh;
            color: #C329FF;
            text-shadow: 0px 5px 49.9px rgba(195, 41, 255, 0.50);
            font-family: "Shadows Highstter";
            font-size: 5vh;
            font-style: italic;
            font-weight: 400;
            letter-spacing: -0.5vh;
        }

        .banking-user {
            display: flex;
            align-items: center;
            gap: 1vh;
            max-width: 25vh;
            overflow: hidden;
            height: 80%;
            padding-right: 2vh;
            border-right: 0.1vh solid rgba(255, 255, 255, 0.15);
        }

        .banking-user img {
            display: flex;
            width: 2.8vh;
            height: 2.8vh;
            padding: 0.2vh;
            flex-direction: column;
            align-items: flex-start;
            gap: 9.5px;
            border-radius: 0.2vh;
        }

        .banking-user-text p {
            margin: 0;
            color: rgba(255, 255, 255, 0.50);
            font-family: 'Gilroy-Medium';
            font-size: 1.8vh;
            font-weight: 600;
            letter-spacing: -0.1vh;
        }

        .banking-user-text h6 {
            margin: 0;
            color: #FFF;
            text-shadow: 0px 0px 21.9px rgba(255, 255, 255, 0.45);
            font-family: 'Gilroy-Medium';
            font-size: 1.8vh;
            font-weight: 600;
            letter-spacing: -0.1vh;
        }

        .banking-info {
            display: flex;
            align-items: center;
            margin-left: 2vh;
            gap: 1vh;
            height: 80%;
        }

        .banking-info i {
            font-size: 2vh;
        }

        .banking-user-info {
            display: flex;
            align-items: center;
        }

        .banking-close {
            display: flex;
            align-items: center;
        }

        .banking-exit {
            display: flex;
            justify-content: center;
            align-items: center;
            align-self: stretch;
            border-radius: 2px 0px 0px 2px;
            border: 0.1vh solid rgba(255, 255, 255, 0.15);
            font-family: 'Gilroy-Medium';
            font-size: 1.4vh;
            height: 3vh;
            width: 4.5vh;
        }

        .banking-esc {
            display: flex;
            justify-content: center;
            align-items: center;
            border-radius: 0px 1.9px 1.9px 0px;
            background: rgba(255, 255, 255, 0.10);
            font-family: 'Gilroy-Medium';
            font-size: 1.4vh;
            height: 3.2vh;
            width: 4.5vh;
        }

        .banking-body {
            height: max-content;
            width: 100%;
        }

        .banking-options {
            display: flex;
            align-items: center;
            justify-content: space-between;
            gap: 1vh;
            width: 100%;
            margin-bottom: 3vh;
        }

        .banking-options-box {
            width: 30%;
            border-radius: 3.8px;
            background: var(--banking-options-box);
            padding: 2vh;
            padding-bottom: 0;
            overflow: hidden;
        }

        .bankbutton {
            height: 5vh;
            width: 100%;
            border: 0.1vh solid var(--banking-button-border);
            background: var(--banking-button-bg);
            box-shadow: 0px 10.45px 53.01px 0px var(--banking-button-shadow1), 0px 0px 16.91px 0px var(--banking-button-shadow2) inset;
            margin-bottom: 2vh;
            border-radius: 0.2vh;
            color: #FFF;
            font-family: 'Gilroy-Medium';
            font-size: 1.8vh;
            outline: none;
        }

        .bankbutton i {
            color: rgba(255, 255, 255, 0.50);
            font-size: 1.5vh;
        }

        .bank-anzahl {
            height: 4vh;
            width: calc(100% - 0.5vh);
            border: 0.1vh solid rgba(255, 255, 255, 0.10);
            background: rgba(255, 255, 255, 0.05);
            text-align: center;
            outline: none;
            color: white;
            border-radius: 0.2vh;
            font-family: 'Gilroy-Regular';
            font-size: 1.8vh;
            margin-bottom: 1vh;
        }

        .bankueberweisen {
            display: flex;
            align-items: center;
            justify-content: space-between;
            gap: 1vh;
            width: 100%;
            margin-bottom: 1vh
        }

        .bankueberweisen input {
            height: 4vh;
            width: calc(50% - 0.5vh);
            border: 0.1vh solid rgba(255, 255, 255, 0.10);
            background: rgba(255, 255, 255, 0.05);
            text-align: center;
            outline: none;
            color: white;
            border-radius: 0.2vh;
            font-family: 'Gilroy-Regular';
            font-size: 1.8vh;
            -webkit-appearance: none;
        }

        .bank-actions-title {
            border-radius: 1.9px;
            background: rgba(0, 0, 0, 0.45);
            height: 4vh;
            width: calc(100% - 2vh);
            padding: 0 1vh;
            margin-bottom: 2vh;
            display: flex;
            align-items: center;
            justify-content: flex-start;
        }

        .bank-actions-title p {
            color: #FFF;
            text-shadow: 0px 0px 21.9px rgba(255, 255, 255, 0.45);
            font-family: 'Gilroy-Medium';
            font-size: 1.6vh;
            margin-left: 1vh;
        }

        .banking-options-pattern {
            margin: 0;
            color: #FFF;
            font-size: 20vh;
            font-weight: 700;
            letter-spacing: -5.5vh;
            mix-blend-mode: overlay;
            line-height: 2vh;
            margin-top: -12.8vh;
            line-height: 2vh;
            margin-bottom: 11vh;
            margin-left: -2.5vh;
        }

        .banking-list {
            display: flex;
            align-items: center;
            justify-content: space-between;
            width: 100%;
            margin-bottom: 2vh;
        }

        .card-frame {
            width: calc(38vh - 4vh);
            height: calc(28vh - 4vh);
            padding: 2vh;
            background: var(--card-bg);
        }

        .transactions-frame {
            width: 60vh;
            height: 28vh;
        }

        .transactions-title {
            border-radius: 0.2vh;
            border: 0.2vh solid rgba(255, 255, 255, 0.15);
            display: flex;
            align-items: center;
            gap: 1vh;
            padding: 1vh;
        }

        .transactions-title p {
            margin: 0;
            color: #FFF;
            font-family: 'Gilroy-Medium';
            font-size: 1.7vh;
            letter-spacing: -0.1vh;
        }

        .transactions-list {
            height: 22.5vh;
            margin-top: 1vh;
            display: flex;
            align-items: center;
            justify-content: space-between;
            flex-direction: column;
        }

        .transactions-item {
            height: calc(30% - 2vh);
            width: calc(100% - 2vh);
            border-radius: 0.2vh;
            background: rgba(255, 255, 255, 0.04);
            padding: 1vh;
            display: flex;
            align-items: center;
            justify-content: space-between;
        }

        .transaction-value {
            height: 4vh;
            width: 13vh;
            border-radius: 0.2vh;
            background: var(--transaction-value-bg);
            display: flex;
            align-items: center;
            justify-content: center;
            color: var(--transaction-value-text);
            text-shadow: 0px 0px 42.845px var(--transaction-value-shadow);
            font-family: 'Gilroy-Medium';
            font-size: 1.8vh;
            overflow: hidden;
        }

        .transactions-desc {
            display: flex;
            align-items: center;
            gap: 1vh;
        }

        .transactions-dollar {
            height: 4vh;
            width: 4vh;
            border-radius: 1.9px;
            display: flex;
            align-items: center;
            justify-content: center;
            font-size: 2vh;
            background: var(--transaction-icon-bg);
            box-shadow: 0px 10.45px 53.01px 0px var(--transaction-icon-shadow1), 0px 0px 16.91px 0px var(--transaction-icon-shadow2) inset;
        }

        .transactions-type {
            color: #FFF;
            text-shadow: 0px 0px 21.9px rgba(255, 255, 255, 0.45);
            font-family: 'Gilroy-Medium';
            font-size: 2vh;
            margin: 0;
        }

        .transactions-date {
            color: rgba(255, 255, 255, 0.50);
            text-shadow: 0px 0px 21.9px rgba(255, 255, 255, 0.45);
            font-family: 'Gilroy-Regular';
            font-size: 1.8vh;
            margin: 0;
        }

        .card-frame-line-1 {
            display: flex;
            justify-content: space-between;
        }

        .card-frame-title {
            color: #FFF;
            font-family: 'Gilroy-Bold';
            font-size: 4vh;
            margin: 0;
            height: max-content;
        }

        .letter-space {
            letter-spacing: -0.4vh;
            margin: 0;
        }

        .card-frame-titlecard {
            height: 4vh;
            width: 14vh;
            border-radius: 1.9px;
            display: flex;
            align-items: center;
            justify-content: center;
            gap: 1vh;
            background: var(--card-title-card-bg);
            box-shadow: 0px 10.45px 53.01px 0px var(--card-title-card-shadow1), 0px 0px 16.91px 0px var(--card-title-card-shadow2) inset;
        }

        .card-frame-titlecard p {
            margin: 0;
            font-size: 2vh;
        }

        .card-frame-titlecard i {
            margin: 0;
            font-size: 1.7vh;
        }

        .card-frame-line-2 {
            width: 100%;
            display: flex;
            align-items: center;
            justify-content: center;
            color: #ffffff7c;
            text-shadow: 0px 0px 42.845px rgba(255, 255, 255, 0.25);
            font-family: 'Gilroy-Medium';
            font-size: 2vh;
            font-style: normal;
            letter-spacing: 0.8vh;
        }

        .card-frame-line-3 {
            border-radius: 0.2vh;
            background: rgba(0, 0, 0, 0.35);
            width: calc(100% - 2vh);
            padding: 1vh;
            display: flex;
            align-items: center;
            justify-content: space-between;
        }

        .card-frame-line-3 p {
            color: #ffffff;
            font-family: 'Gilroy-Regular';
            font-size: 1.8vh;
            margin: 0;
        }

        .card-balance {
            height: 3vh;
            width: 13vh;
            border-radius: 0.2vh;
            background: var(--card-balance);
            display: flex;
            align-items: center;
            justify-content: center;
        }

        .card-balance p {
            text-shadow: 0px 0px 42.845px var(--card-balance-shadow);
            font-family: 'Gilroy-Medium';
            font-size: 1.8vh;
            overflow: hidden;
            color: var(--card-balance-text);
            margin: 0;
        }

        .card-frame-line-4 {
            display: flex;
            align-items: center;
            justify-content: space-between;
            gap: 1vh;
            margin-top: 1vh;
        }

        .card-frame-line-4 i {
            color: gray;
            font-size: 1.5vh;
            margin-right: 1vh;
        }

        .card-values {
            display: flex;
            align-items: center;
            justify-content: space-between;
            gap: 1vh;
        }

        .card-value-text {
            border-radius: 0.2vh;
            background: rgba(0, 0, 0, 0.35);
            width: calc(10vh - 2vh);
            padding: 1vh;
            display: flex;
            height: 2vh;
            align-items: center;
            justify-content: space-between;
        }

        .card-value-text p {
            color: #ffffff;
            font-family: 'Gilroy-Bold';
            font-size: 1.4vh;
            margin: 0;
        }
        .card-value-text p span {
            color: #9d9d9d;
            font-family: 'Gilroy-Regular';
            font-size: 1.4vh;
            margin: 0;
        }
    `
});

UI.BindData("banking", labels);