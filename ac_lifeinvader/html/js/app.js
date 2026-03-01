UI.Configurate(true);

UI.Create({
    id: "lifeinvader",
    html: `
        <div class="lifeinvader">
            <div class="pattern">////////////////////////////////////////////</div>
            <object class="banking-svg-oben" data="./svg/banking_oben.svg"></object>
            <div class="lifeinvader-head">
                <div class="ui-header-title">
                    <img src="./img/logo.png" alt="" class="ui-header-logo">
                    <div class="ui-header-title-text">
                        <h3>{{server1}}</h3>
                        <h4>{{server2}}</h4>
                    </div>
                </div>
                <div class="ui-header-close closelifeinvader">
                    <div class="ui-header-exit">{{exit}}</div>
                    <div class="ui-header-esc">ESC</div>
                </div>
            </div>
            <div class="lifeinvader-line"></div>
            <div class="lifeinvader-body">
                <div class="lifeinvader-body-left">
                    <textarea class="lifeinvader-input" placeholder="{{give_text}}"></textarea>
                    <div class="lifeinvader-buttons">
                        <button class="lifeinvader-button active">
                            <i class="fa-solid fa-bullhorn"></i>
                            {{broadcast}}
                        </button>
                        <button class="lifeinvader-button">
                            <i class="fa-solid fa-user-secret"></i>
                            {{anonym}}
                        </button>
                    </div>
                    <div class="lifeinvader-price">
                        <div class="lifeinvader-preis-text">
                            <div class="quick-options-quader"></div>
                            <p>{{total_price}}:</p>
                        </div>
                        <p class="lifeinvader-total-preis"></p>
                    </div>
                    <button class="lifeinvader-send">
                        {{send}}
                        <i class="fa-solid fa-paper-plane"></i>
                    </button>
                </div>
                <div class="lifeinvader-body-right">
                    <div class="last-news-title">
                        <div class="quick-options-quader"></div>
                        <p>{{last_messages}}</p>
                    </div>
                    <div class="last-news-list">
                    </div>
                </div>
            </div>
            <div class="ui-pattern2">///////////////////////////////////////////</div>
        </div>
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
            margin-bottom: 12vh;
            color: #FFF;
            font-size: 20vh;
            font-weight: 700;
            letter-spacing: -5.5vh;
            mix-blend-mode: overlay;
            line-height: 2vh;
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

                i {
                    font-size: 2vh;
                }
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
            margin-top: 8vh;
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

        .lifeinvader {
            position: fixed;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%) scale(90%);
            width: 70vh;
            padding: 4.5vh;
            gap: 2vh;
            border-radius: 1vh;
            background: var(--clr-bg);
            display: none;
            align-items: center;
            flex-direction: column;
            overflow: hidden;

            &-head {
                width: 100%;
                margin-top: -5vh;
                display: flex;
                align-items: center;
                justify-content: space-between;
            }

            &-line {
                width: 100%;
                height: 0.1vh;
                background: rgba(255, 255, 255, 0.281);
            }

            &-body {
                display: flex;
                align-items: center;
                justify-content: space-between;
                gap: 1vh;
                width: 100%;

                &-left {
                    width: 50%;
                }

                &-right {
                    width: 50%;
                }
            }

            &-input {
                width: calc(100% - 3.4vh);
                height: 35vh;
                padding: 1.5vh;
                outline: none;
                border-radius: 0.2vh;
                background-color: rgba(255, 255, 255, 0.1);
                border: 0.1vh solid rgba(255, 255, 255, 0.2);
                font-family: 'Gilroy-Regular';
                color: white;
                font-size: 1.8vh;
                resize: none;
            }

            &-buttons {
                display: flex;
                width: 100%;
                display: flex;
                align-items: center;
                justify-content: space-between;
                gap: 1vh;
                margin-top: 1vh;
            }

            &-button {
                display: flex;
                height: 4.5vh;
                width: 50%;
                gap: 1vh;
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
                    border: 0.1vh solid var(--clr-switch-button-active-border);
                    background: var(--clr-switch-button-active);
                    color: white;
                    transition: 200ms;
                }
            }

            &-price {
                width: 100%;
                height: 5vh;
                background: rgba(255, 255, 255, 0.05);
                margin-bottom: 1vh;
                display: flex;
                align-items: center;
                justify-content: space-between;
                margin-top: 1vh;
            }

            &-preis-text {
                display: flex;
                align-items: center;
                gap: 1vh;
                margin-left: 1vh;

                p {
                    font-size: 1.8vh;
                    font-family: 'Gilroy-Light';
                }
            }

            &-total-preis {
                height: 3.5vh;
                width: 12vh;
                margin-right: 1vh;
                border-radius: 0.2vh;
                background: var(--clr-total-price-bg);
                display: flex;
                align-items: center;
                justify-content: center;
                color: var(--clr-total-price-text);
                text-shadow: 0px 0px 42.845px var(--clr-total-price-shadow);
                font-family: 'Gilroy-Medium';
                font-size: 1.8vh;
                overflow: hidden;
            }

            &-send {
                height: 5vh;
                width: 100%;
                border: 0.1vh solid var(--clr-send-border);
                background: var(--clr-send-bg);
                box-shadow: 0px 10.45px 53.01px 0px var(--clr-send-shadow1), 0px 0px 16.91px 0px var(--clr-send-shadow2) inset;
                border-radius: 0.2vh;
                color: var(--clr-send-text);
                font-family: 'Gilroy-Medium';
                font-size: 1.6vh;
                outline: none;
            }
        }

        .last-news {
            &-title {
                display: flex;
                gap: 1vh;
                align-items: center;

                p {
                    margin: 0;
                }
            }

            &-list {
                width: 100%;
                margin-top: 1vh;
                display: flex;
                align-items: center;
                flex-direction: column;
                overflow-y: auto;
                height: 52vh;
                gap: 1vh;
            }
        }

        .last-new {
            width: 100%;
            height: max-content;
            border-radius: 0.5vh;
            background: var(--clr-last-new-bg);
            overflow: hidden;
            display: flex;
            align-items: center;
            flex-direction: column;
            justify-content: space-between;

            &-pattern {
                margin: 0;
                margin-top: -10.5vh;
                margin-left: -1vh;
                color: #FFF;
                font-size: 20vh;
                font-weight: 700;
                letter-spacing: -5.8vh;
                mix-blend-mode: overlay;
                line-height: 2vh;
            }

            &-line {
                width: 40%;
                height: 1vh;
                background: var(--clr-last-new-line);
                margin-bottom: -0.6vh;
                border-radius: 2vh;
            }

            &-user {
                width: 100%;
                display: flex;
                align-items: center;
                gap: 1vh;
                margin-top: 10vh;
                margin-left: 2vh;

                &-icon {
                    height: 3vh;
                    width: 3vh;
                    border: 0.1vh solid var(--clr-last-new-user-border);
                    background: var(--clr-last-new-user-bg);
                    box-shadow: 0px 10.45px 53.01px 0px var(--clr-last-new-user-shadow1), 0px 0px 16.91px 0px var(--clr-last-new-user-shadow2) inset;
                    border-radius: 0.2vh;
                    color: var(--clr-last-new-user-icon);
                    font-family: 'Gilroy-Medium';
                    font-size: 1.4vh;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                }

                &-text {
                    h5 {
                        margin: 0;
                        font-size: 1.7vh;
                        font-family: 'Gilroy-Light';
                    }

                    p {
                        margin: 0;
                        font-size: 1.4vh;
                        font-family: 'Gilroy-Light';
                        color: gainsboro;
                        margin-top: 0.1vh;
                        display: flex;
                        align-items: center;
                        gap: 0.5vh;
                    }
                }
            }

            &-text {
                width: calc(100% - 2vh);
                margin: 1vh;

                p {
                    margin: 0;
                    font-size: 1.6vh;
                    font-family: 'Gilroy-Light';
                }
            }
        }

        .lifeinvader-notify {
            position: fixed;
            bottom: 25vh;
            height: 40vh;
            margin-left: 3vh;
            width: 25vh;
            display: flex;
            align-items: flex-end;
            justify-content: flex-end;
            gap: 1vh;

            &-item {
                width: 100%;
                height: max-content;
                border-radius: 0.5vh;
                background: var(--clr-lifeinvader-notify-bg);
                overflow: hidden;
                display: flex;
                align-items: center;
                flex-direction: column;
                justify-content: space-between;
                animation: slideIn 0.5s ease forwards;
                opacity: 0;

                &-pattern {
                    margin: 0;
                    margin-top: -11vh;
                    margin-left: -1vh;
                    color: #FFF;
                    font-size: 20vh;
                    font-weight: 700;
                    letter-spacing: -5.8vh;
                    mix-blend-mode: overlay;
                    line-height: 2vh;
                }

                &-user {
                    width: 100%;
                    display: flex;
                    align-items: center;
                    gap: 1vh;
                    margin-top: 10vh;
                    margin-left: 2vh;

                    &-icon {
                        height: 3vh;
                        width: 3vh;
                        border: 0.1vh solid var(--clr-lifeinvader-notify-icon-border);
                        background: var(--clr-lifeinvader-notify-icon-bg);
                        box-shadow: 0px 10.45px 53.01px 0px var(--clr-lifeinvader-notify-icon-shadow1), 0px 0px 16.91px 0px var(--clr-lifeinvader-notify-icon-shadow2) inset;
                        border-radius: 0.2vh;
                        color: #FFF;
                        font-family: 'Gilroy-Medium';
                        font-size: 1.4vh;
                        display: flex;
                        align-items: center;
                        justify-content: center;
                    }

                    &-text {
                        h5 {
                            margin: 0;
                            font-size: 1.7vh;
                            font-family: 'Gilroy-Light';
                        }

                        p {
                            margin: 0;
                            font-size: 1.4vh;
                            font-family: 'Gilroy-Light';
                            color: gainsboro;
                            margin-top: 0.1vh;
                            display: flex;
                            align-items: center;
                            gap: 0.5vh;
                        }
                    }
                }

                &-text {
                    width: calc(100% - 2vh);
                    margin: 1vh;

                    p {
                        margin: 0;
                        font-size: 1.6vh;
                        font-family: 'Gilroy-Light';
                    }
                }
            }
        }
    `,
});

UI.Create({
    id: 'lifeinvader-notify',
    html: `
        <div class="lifeinvader-notify"></div>
    `,
});

UI.BindData('lifeinvader', labels);

// JavaScript Variables and Functions
var pricePerLetter = 5;

function renderMessages(messages) {
    $('.last-news-list').empty();
    $.each(messages, function (k, v) {
        var content = `
        <div class="last-new">
            <div class="last-new-pattern">////////////////////</div>
            <div class="last-new-user">
                <div class="last-new-user-icon">
                    <i class="fa-solid fa-user"></i>
                </div>
                <div class="last-new-user-text">
                    <h5>${v.name}</h5>
                    <p><i class="fa-solid fa-phone-volume"></i><span class="last-news-number">${v.number}</span></p>
                </div>
            </div>
            <div class="last-new-text">
                <p>${v.message}</p>
            </div>
            <div class="last-new-line"></div>
        </div>
        `;
        $('.last-news-list').append(content);
    });
}

function updatePrice() {
    var messageLength = $('.lifeinvader-input').val().replace(/\s+/g, '').length;
    var price = messageLength * pricePerLetter;
    $('.lifeinvader-total-preis').text(price.formatMoney());
}

// Event Listeners
window.addEventListener('message', function(event){
    if (event.data.action === 'lifeinvader') {
        if (event.data.enable === true) {
            renderMessages(event.data.messages);
            pricePerLetter = event.data.price;
            updatePrice();
            $('.lifeinvader').fadeIn(200).css('display', 'flex');
        } else {
            $('.lifeinvader-input').val('');
            updatePrice();
            $('.lifeinvader').hide();
        }
    } else if (event.data.action === 'lifeinvader-message') {
        const content = $(`
            <div class="lifeinvader-notify-item">
                <div class="lifeinvader-notify-item-pattern">////////////////////</div>
                <div class="lifeinvader-notify-item-user">
                    <div class="lifeinvader-notify-item-user-icon">
                        <i class="fa-solid fa-user"></i>
                    </div>
                    <div class="lifeinvader-notify-item-user-text">
                        <h5>${event.data.data.name.toString()}</h5>
                        <p><i class="fa-solid fa-phone-volume"></i><span class="lifeinvader-notify-number">${event.data.data.number.toString()}</span></p>
                    </div>
                </div>
                <div class="lifeinvader-notify-item-text">
                    <p>${event.data.data.message.toString()}</p>
                </div>
            </div>
        `);
        $(".lifeinvader-notify").prepend(content);
        setTimeout(() => {
            content.fadeOut(500, () => content.remove());
        }, 9000);
    }
});

document.addEventListener("keydown", function(event) {
    if (event.key === "Escape") {
        $.post(`https://${GetParentResourceName()}/lifeinvader`, JSON.stringify({
            type: "close",
        }));
    }
});

$('.closelifeinvader').click(function (e) { 
    $.post(`https://${GetParentResourceName()}/lifeinvader`, JSON.stringify({
        type: "close",
    }));
});

$('.lifeinvader-input').on('input', function () {
    updatePrice();
});

$('.lifeinvader-send').click(function () { 
    var message = $('.lifeinvader-input').val();
    if (message.length > 0) {
        var selectedType = 'public';
        if ($('.lifeinvader-button').eq(1).hasClass('active')) {
            selectedType = 'private';
        }
        var messageLength = message.replace(/\s+/g, '').length;
        $.post(`https://${GetParentResourceName()}/lifeinvader`, JSON.stringify({
            type: "send",
            message: message,
            selectedType: selectedType,
            messageLength: messageLength
        }));
    }
});

$('.lifeinvader-button').click(function () {
    $('.lifeinvader-button').removeClass('active');
    $(this).addClass('active');
});