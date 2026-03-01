UI.Configurate(true);

UI.Create({
    id: 'namechange',
    html: `
        <div class="namechange">
            <div class="namechange-header">
                <img src="./img/namechange.png" alt="">
                <div class="namechange-title">
                    <h4>{{title1}}</h4>
                    <p>{{title2}}</p>
                </div>
                <div class="namechange-header-close closenamechange">
                    <div class="namechange-header-exit">{{exit}}</div>
                    <div class="namechange-header-esc">ESC</div>
                </div>
            </div>
            <div class="namechange-body">
                <input type="text" placeholder="{{firstname}}" class="namechange-vorname">
                <input type="text" placeholder="{{lastname}}" class="namechange-nachname">
            </div>
            <div class="namechange-price">
                <p>{{price}}: <span class="namechange-priceval">100.000</span>$</p>
            </div>
            <div class="namechange-buttons">
                <button class="purchase-button namechange-bar">
                    <i class="fa-solid fa-money-bill"></i>
                    {{money}}
                </button>
                <button class="purchase-button namechange-card">
                    <i class="fa-solid fa-credit-card"></i>
                    {{card}}
                </button>
            </div>
        </div>
    `,
    css: `
        .namechange {
            position: fixed;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            width: 40vh;
            background: var(--clr-bg);
            padding: 2vh;
            padding-top: 0;
            border-radius: 0.5vh;
            font-family: 'Akrobat-ExtraBold';
            display: none;

            &-header {
                display: flex;
                justify-content: space-between;
                margin-bottom: 2vh;

                img {
                    height: 8vh;
                    margin-left: -2vh;
                }

                h4 {
                    font-size: 2.6vh;
                    margin: 0;
                    text-align: center;
                    margin-top: 1vh;
                    color: white;
                }

                p {
                    text-align: center;
                    color: gray;
                    font-family: 'Akrobat-Regular';
                    margin: 0;
                    font-size: 1.4vh;
                }

                &-close {
                    display: flex;
                    align-items: center;
                }

                &-exit {
                    color:white;
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    border-radius: 2px 0px 0px 2px;
                    border: 0.1vh solid rgba(255, 255, 255, 0.15);
                    font-family: 'Gilroy-Medium';
                    font-size: 1.4vh;
                    height: 3vh;
                    width: 4.5vh;
                }

                &-esc {
                    color:white;
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

            &-body {
                display: flex;
                align-items: center;
                justify-content: center;
                flex-direction: column;
                gap: 1vh;

                input {
                    width: 85%;
                    font-size: 1.8vh;
                    padding: 1.5vh 2vh;
                    outline: none;
                    border: 0.1vh solid rgba(255, 255, 255, 0.16);
                    color: white;
                    font-family: 'Akrobat-ExtraBold';
                    background-color: #b3b3b317;
                }
            }

            &-price {
                display: flex;
                align-items: center;
                justify-content: center;
                flex-direction: column;

                p {
                    height: 3.5vh;
                    width: 17vh;
                    border-radius: 0.2vh;
                    background: var(--clr-price-bg);
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    color: var(--clr-price-text);
                    text-shadow: 0px 0px 42.845px var(--clr-price-shadow);
                    font-family: 'Gilroy-Medium';
                    font-size: 1.8vh;
                    overflow: hidden;

                    span {
                        margin-left: 0.5vh;
                    }
                }
            }

            &-buttons {
                display: flex;
                align-items: center;
                justify-content: center;
                gap: 1vh;

                button {
                    height: 5vh;
                    width: 50%;
                    border: 0.1vh solid var(--clr-payout-border);
                    background: var(--clr-payout-bg);
                    box-shadow: 0px 10.45px 53.01px 0px var(--clr-payout-shadow1), 0px 0px 16.91px 0px var(--clr-payout-shadow2) inset;
                    border-radius: 0.2vh;
                    color: #FFF;
                    font-family: 'Gilroy-Medium';
                    font-size: 1.6vh;
                    outline: none;
                }
            }
        }
    `
});

UI.BindData("namechange", labels);

function splitName(fullName) {
    const [firstName, lastName] = fullName.split(' ');
    return {
        firstName: firstName,
        lastName: lastName
    };
}

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

window.addEventListener('message', function(event){
    if (event.data.enable) {
        var nameParts = splitName(event.data.name);
        $('.namechange-vorname').val(nameParts.firstName);
        $('.namechange-nachname').val(nameParts.lastName);
        $('.namechange-priceval').text(event.data.price.formatMoney());
        $('.namechange').fadeIn(200);
    } else {
        $('.namechange').fadeOut(200);
    }
});

$('.closenamechange').click(function (e) { 
    $.post(`https://${GetParentResourceName()}/namechange`, JSON.stringify({type:'close'}));
});

$('.namechange-bar').click(function (e) { 
    firstnamevalue = $('.namechange-vorname').val();
    lastnamevalue = $('.namechange-nachname').val();
    $.post(`https://${GetParentResourceName()}/namechange`, JSON.stringify({type:'change', method:'money', firstname: firstnamevalue, lastname: lastnamevalue}));
});

$('.namechange-card').click(function (e) { 
    firstnamevalue = $('.namechange-vorname').val();
    lastnamevalue = $('.namechange-nachname').val();
    $.post(`https://${GetParentResourceName()}/namechange`, JSON.stringify({type:'change', method:'bank', firstname: firstnamevalue, lastname: lastnamevalue}));
});

document.addEventListener("keydown", function(event) {
    if (event.key === "Escape") {
        $.post(`https://${GetParentResourceName()}/namechange`, JSON.stringify({type:'close'}));
    }
});