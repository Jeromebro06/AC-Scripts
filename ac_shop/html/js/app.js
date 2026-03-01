UI.Configurate(true);

let card = {};
let price = 0;
let allItems = [];

function formatNumberWithDots(number) {
    return number.toLocaleString('de-DE');
}

window.addEventListener('message', function(event){
    if (event.data.action === 'shop') {
        if (event.data.enable) {
            if (event.data.shoptype == 'blackmarket') {
                $('.shop-payout-buttons').empty();
                $('.shop-payout-buttons').prepend(`
                    <button class="shop-payout-button-2 ckeckout-buttons-black">${labels.black_money}</button>
                `);
            } else {
                $('.shop-payout-buttons').empty();
                $('.shop-payout-buttons').prepend(`
                    <button class="shop-payout-button ckeckout-buttons-card">${labels.bank}</button>
                    <button class="shop-payout-button ckeckout-buttons-bar">${labels.money}</button>
                `);
            }
            $('.itemlist').empty();
            allItems = [];
            event.data.items.forEach(item => {
                allItems.push(item);
            });
            initializeCategories(allItems);
            $('#shop').fadeIn(200);
        } else {
            $('#shop').fadeOut(200);
            card = {};
            price = 0;
            refreshcard();
        }
    }
});

function initializeCategories(items) {
    const categories = [...new Set(items.map(item => item.uitype))];
    const categoryButtonsContainer = $('.shop-header');
    categoryButtonsContainer.empty();

    categories.forEach((category, index) => {
        const button = $(`<button class="shop-category ${index === 0 ? 'active' : ''}">${category}</button>`);
        button.click(() => filterItemsByCategory(category));
        categoryButtonsContainer.append(button);
    });

    if (categories.length > 0) {
        filterItemsByCategory(categories[0]);
    }
}

function filterItemsByCategory(category) {
    const filteredItems = allItems.filter(item => item.uitype === category);
    renderItems(filteredItems);
    $('.shop-category').removeClass('active');
    $(`.shop-category:contains('${category}')`).addClass('active');
}

function refreshcard() {
    $('.shop-cart-list').empty();
    price = 0;
    for (const key in card) {
        if (card.hasOwnProperty(key)) {
            const element = card[key];
            price = price + element.totalprice;
            const content = $(`
                <div class="shop-cart-item">
                    <div class="shop-cart-item-left">
                        <div class="shop-cart-item-line"></div>
                        <img src="../item_images/${key}.png" class="shop-cart-item-image">
                        <div class="shop-cart-item-info">
                            <h4>${element.name}</h4>
                            <p>${formatNumberWithDots(element.count)}X</p>
                        </div>
                    </div>
                    <div class="shop-cart-item-right">
                        <div class="shop-cart-item-price">
                            <h4>${(element.count * element.price).formatMoney()}</h4>
                        </div>
                        <button class="shop-cart-add-button" onclick="additem('${key}')">
                            <i class="fa-solid fa-plus"></i>
                        </button>
                        <button class="shop-cart-minus-button" onclick="reduceitem('${key}')">
                            <i class="fa-solid fa-minus"></i>
                        </button>
                        <button class="shop-cart-remove-button" onclick="deleteitem('${key}')">
                            <i class="fa-regular fa-circle-xmark"></i>
                        </button>
                    </div>
                </div>
            `);
            $(".shop-cart-list").append(content);
        }
    }
    $('.shop-cart-total-price h4').text(price.formatMoney());
}

function additem(key) {
    if (typeof card[key] !== 'undefined') {
        card[key].count = card[key].count + 1;
        card[key].totalprice += card[key].price;
    }
    refreshcard();
}

function reduceitem(key) {
    if (typeof card[key] !== 'undefined' && card[key].count > 1) {
        card[key].count = card[key].count - 1;
        card[key].totalprice -= card[key].price;
    } else {
        delete card[key];
    }
    refreshcard();
}

function deleteitem(key) {
    delete card[key];
    refreshcard();
}

function addcard(price, showname, name) {
    if (typeof card[name] === 'undefined') {
        card[name] = {
            count: 1,
            name: showname,
            price: price,
            totalprice: price
        };
    } else {
        card[name].count += 1;
        card[name].totalprice += card[name].price; 
    }
    refreshcard();
}

$('.closeshop').click(function() { 
    $.post(`https://${GetParentResourceName()}/shop`, JSON.stringify({type:'close'}));
});

$(document).on('click', '.ckeckout-buttons-bar', function() { 
    $.post(`https://${GetParentResourceName()}/shop`, JSON.stringify({type:'buy', items: card, purchase: 'bar'}));
});

$(document).on('click', '.ckeckout-buttons-card', function() { 
    $.post(`https://${GetParentResourceName()}/shop`, JSON.stringify({type:'buy', items: card, purchase: 'karte'}));
});

$(document).on('click', '.ckeckout-buttons-black', function (e) { 
    $.post(`https://${GetParentResourceName()}/shop`, JSON.stringify({type:'buy', items: card, purchase: 'black'}));
});

function renderItems(filteredItems) {
    $('.shop-item-list').empty();
    filteredItems.forEach(item => {
        const content = $(`
            <div class="shop-item">
                <div class="shop-item-pattern">////////////////////////////////////</div>
                <div class="shop-item-body-item">
                    <div class="shop-item-header">
                        <div class="shop-item-name">
                            <h4>${item.label}</h4>
                            <p>${item.uitype}</p>
                        </div>
                        <div class="shop-item-price">
                            <h4>${item.price.formatMoney()}</h4>
                        </div>
                    </div>
                    <img src="../item_images/${item.name}.png" class="shop-item-image">
                    <button class="add-cart-button" onclick="addcard(${item.price}, '${item.label}', '${item.name}')">
                        <i class="fa-solid fa-cart-plus"></i>
                        <p>${labels.addcart}</p>
                    </button>
                </div>
                <div class="shop-item-line"></div>
            </div>
        `);
        $(".shop-item-list").append(content);
    });
}

UI.Create({
    id: "shop",
    html: `
        <div class="shop-pattern">////////////////////////////////////////////</div>
        <object class="shop-svg-oben" data="./svg/banking_oben.svg"></object>
        <div class="shop-head">
            <div class="ui-header-title">
                <img src="./img/logo.png" alt="" class="ui-header-logo">
                <div class="ui-header-title-text">
                    <h3>{{server1}}</h3>
                    <h4>{{server2}}</h4>
                </div>
            </div>
            <div class="ui-header-user-info">
                <div class="ui-header-info shop-header">
                    <button class="shop-category active">Food</button>
                    <button class="shop-category">Food</button>
                    <button class="shop-category">Food</button>
                </div>
            </div>
            <div class="ui-header-close closeshop">
                <div class="ui-header-exit">{{exit}}</div>
                <div class="ui-header-esc">ESC</div>
            </div>
        </div>
        <div class="shop-body">
            <div class="shop-item-body">
                <div class="shop-item-head">
                    <div class="quick-options-quader"></div>
                    <p>{{products}}</p>
                </div>
                <div class="shop-item-list">
                </div>
            </div>
            <div class="shop-cart-body">
                <div class="shop-cart-head">
                    <div class="quick-options-quader"></div>
                    <p>{{cart}}</p>
                </div>
                <div class="shop-cart-list">
                </div>
                <div class="shop-cart-payout">
                    <div class="shop-price">
                        <div class="shop-price-text">
                            <div class="quick-options-quader"></div>
                            <p>{{price}}:</p>
                        </div>
                        <div class="shop-cart-total-price">
                            <h4>${(0).formatMoney()}</h4>
                        </div>
                    </div>
                    <div class="shop-payout-buttons">
                    </div>
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
            margin-top: 10vh;
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

        #shop {
            position: fixed;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            width: 112vh;
            height: 70vh;
            background: var(--clr-bg);
            padding: 2vh 3vh;
            overflow: hidden;
            border-radius: 1vh;
            display: none;
        }

        .shop-pattern {
            margin: 0;
            margin-top: -12.5vh;
            color: #FFF;
            font-size: 20vh;
            font-weight: 700;
            letter-spacing: -5.5vh;
            mix-blend-mode: overlay;
            line-height: 2vh;
        }

        .shop-svg-oben {
            position: absolute;
            left: 50%;
            transform: translate(-50%);
            height: 10vh;
            fill: #FFF;
            mix-blend-mode: overlay;
            margin-top: 10vh;
        }

        .shop-head {
            position: fixed;
            display: flex;
            justify-content: space-between;
            align-items: self-start;
            margin-top: 11.5vh;
            width: 95%;
        }

        .shop-category {
            display: flex;
            height: 4.5vh;
            width: 12vh;
            justify-content: center;
            align-items: center;
            border-radius: 0.2vh;
            border: 0.1vh solid rgba(255, 255, 255, 0.10);
            background: rgba(255, 255, 255, 0.05);
            color: rgba(255, 255, 255, 0.75);
            font-family: 'Gilroy';
            font-size: 1.6vh;
            font-weight: 500;
            outline: none;

            &:hover,
            &.active {
                border: 0.1vh solid var(--clr-title-button-active-border);
                background: var(--clr-title-button-active);
                color: white;
            }
        }

        .shop-body {
            margin-top: 19vh;
            width: 100%;
            height: 86%;
            display: flex;
            align-items: center;
            justify-content: space-between;
            gap: 1vh;
        }

        .shop-item-head {
            display: flex;
            align-items: center;
            width: 70vh;
            height: 4.5vh;
            border: 0.2vh solid rgba(255, 255, 255, 0.15);
            border-radius: 0.5vh;
            gap: 1vh;

            p {
                font-family: 'Gilroy';
                text-shadow: 0 0 1vh white;
                font-size: 1.7vh;
            }
        }

        .shop-cart-head {
            display: flex;
            align-items: center;
            width: 40vh;
            height: 4.5vh;
            border: 0.2vh solid rgba(255, 255, 255, 0.15);
            border-radius: 0.5vh;
            gap: 1vh;

            p {
                font-family: 'Gilroy';
                text-shadow: 0 0 1vh white;
                font-size: 1.7vh;
            }
        }

        .shop-item-list {
            width: 70vh;
            height: 55vh;
            margin-top: 1vh;
            gap: 1vh;
            overflow-y: scroll;
            display: grid;
            grid-template-columns: 1fr 1fr 1fr;
            grid-gap: 1vh;

            &::-webkit-scrollbar {
                display: none;
            }
        }

        .shop-cart-list {
            width: 40vh;
            height: 44vh;
            margin-top: 1vh;
            display: flex;
            flex-direction: column;
            gap: 1vh;
            overflow-y: scroll;

            &::-webkit-scrollbar {
                display: none;
            }
        }

        .shop-cart-payout {
            margin-top: 1vh;
            height: 10vh;
        }

        .shop-payout-buttons {
            display: flex;
            align-items: center;
            justify-content: space-between;
            gap: 1vh;

            .shop-payout-button {
                height: 5vh;
                width: 50%;
                border: 0.1vh solid var(--clr-payout-1-border);
                background: var(--clr-payout-1-bg);
                box-shadow: 0px 10.45px 53.01px 0px var(--clr-payout-1-shadow1), 0px 0px 16.91px 0px var(--clr-payout-1-shadow2) inset;
                margin-bottom: 2vh;
                border-radius: 0.2vh;
                color: #FFF;
                font-family: 'Gilroy-Medium';
                font-size: 1.6vh;
                outline: none;
            }

            .shop-payout-button-2 {
                height: 5vh;
                width: 100%;
                border: 0.1vh solid var(--clr-payout-2-border);
                background: var(--clr-payout-2-bg);
                box-shadow: 0px 10.45px 53.01px 0px var(--clr-payout-2-shadow1), 0px 0px 16.91px 0px var(--clr-payout-2-shadow2) inset;
                margin-bottom: 2vh;
                border-radius: 0.2vh;
                color: #FFF;
                font-family: 'Gilroy-Medium';
                font-size: 1.6vh;
                outline: none;
            }
        }

        .shop-item-pattern {
            margin: 0;
            margin-top: -10.5vh;
            color: #FFF;
            font-size: 20vh;
            font-weight: 700;
            letter-spacing: -5.5vh;
            mix-blend-mode: overlay;
            line-height: 2vh;
        }

        .shop-item-header {
            display: flex;
            justify-content: space-between;
            align-items: center;
            width: 90%;
        }

        .shop-item-name {
            h4 {
                font-family: 'Gilroy';
                font-size: 1.5vh;
                color: #fff;
                margin: 0;
            }

            p {
                font-family: 'Gilroy-Medium';
                font-size: 1.5vh;
                color: #fff;
                margin: 0;
            }
        }

        .shop-item {
            width: 100%;
            height: 23vh;
            background: var(--clr-shop-item-bg);
            overflow: hidden;
            display: flex;
            align-items: center;
            justify-content: space-between;
            flex-direction: column;
            border: 0.1vh solid var(--clr-shop-item-border);
            border-radius: 0.5vh;
        }

        .shop-item-body-item {
            width: 100%;
            height: 20vh;
            display: flex;
            align-items: center;
            justify-content: space-between;
            flex-direction: column;
            gap: 1vh;
            margin-top: 9.5vh;
        }

        .shop-item-price {
            height: 3.5vh;
            width: 8vh;
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
        }

        .shop-item-image {
            max-height: 8vh;
            max-width: 80%;
        }

        .add-cart-button {
            height: 4.5vh;
            width: 90%;
            border: 0.1vh solid var(--clr-add-cart-border);
            background: var(--clr-payout-2-bg);
            box-shadow: 0px 10.45px 53.01px 0px var(--clr-add-cart-shadow1), 0px 0px 16.91px 0px var(--clr-add-cart-shadow2) inset;
            border-radius: 0.2vh;
            color: #FFF;
            font-family: 'Gilroy-Medium';
            font-size: 1.7vh;
            display: flex;
            align-items: center;
            justify-content: center;
            gap: 1vh;
            margin-top: 1vh;
        }

        .shop-item-line {
            width: 50%;
            height: 1vh;
            background: var(--clr-shop-item-line);
            margin-bottom: -0.8vh;
            border-radius: 2vh;
        }

        .shop-cart-item {
            width: 100%;
            height: 5vh;
            background: rgba(255, 255, 255, 0.04);
            display: flex;
            align-items: center;
            justify-content: space-between;
        }

        .shop-cart-item-left {
            width: max-content;
            display: flex;
            align-items: center;
            gap: 1vh;
        }

        .shop-cart-item-line {
            height: 4vh;
            width: 0.6vh;
            margin-left: -0.3vh;
            background: var(--clr-shop-cart-line);
            border-radius: 2vh;
        }

        .shop-cart-item-image {
            width: 4vh;
            height: 4vh;
        }

        .shop-cart-item-info {
            h4 {
                font-family: 'Gilroy-Medium';
                font-size: 1.5vh;
                color: #fff;
                margin: 0;
            }

            p {
                font-family: 'Gilroy';
                font-size: 1.5vh;
                color: #bcbcbc;
                margin: 0;
            }
        }

        .shop-cart-item-right {
            display: flex;
            align-items: center;
            gap: 0.5vh;
        }

        .shop-cart-item-price {
            height: 3.2vh;
            width: 8vh;
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
        }

        .shop-cart-add-button,
        .shop-cart-minus-button {
            height: 3vh;
            width: 3vh;
            border: 0.1vh solid var(--clr-cart-button-border);
            background: var(--clr-cart-button-bg);
            box-shadow: 0px 10.45px 53.01px 0px var(--clr-cart-button-shadow1), 0px 0px 16.91px 0px var(--clr-cart-button-shadow2) inset;
            border-radius: 0.2vh;
            color: #FFF;
            font-family: 'Gilroy-Medium';
            font-size: 1.4vh;
            display: flex;
            align-items: center;
            justify-content: center;
        }

        .shop-cart-remove-button {
            color: #c5c5c5;
            background: transparent;
            border: none;
            outline: none;
            margin-right: 1vh;
        }

        .shop-price {
            width: 100%;
            height: 5vh;
            background: rgba(255, 255, 255, 0.05);
            margin-bottom: 1vh;
            display: flex;
            align-items: center;
            justify-content: space-between;
        }

        .shop-price-text {
            display: flex;
            align-items: center;
            gap: 1vh;
            margin-left: 1vh;

            p {
                font-size: 1.8vh;
                font-family: 'Gilroy-Light';
            }
        }

        .shop-cart-total-price {
            height: 3.5vh;
            width: 12vh;
            margin-right: 1vh;
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
        }
    `
});

UI.BindData("shop", labels);

document.addEventListener("keydown", function(event) {
    if (event.key === "Escape") {
        $.post(`https://${GetParentResourceName()}/shop`, JSON.stringify({type:'close'}));
    }
});