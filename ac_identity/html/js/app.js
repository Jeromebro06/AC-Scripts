UI.Configurate(true);

UI.Create({
    id: 'identity',
    html: `
        <div class="identity">
            <div class="identity-left-side">
                <div class="charcreator-title">
                    <img src="./img/logo.png" alt="" class="charcreator-title-logo">
                    <div class="charcreator-title-text">
                        <h4>{{server1}}</h4>
                        <p>{{server2}}</p>
                    </div>
                </div>
                <div class="charcreator-body">
                    <div class="charcreator-pages">
                        <div class="charcreator-page selected"><i class="fa-solid fa-head-side"></i></div>
                        <div class="charcreator-page"><i class="fa-sharp fa-solid fa-mustache"></i></div>
                        <div class="charcreator-page"><i class="fa-solid fa-eye"></i></div>
                        <div class="charcreator-page"><i class="fa-sharp fa-solid fa-vest"></i></div>
                        <div class="charcreator-page"><i class="fa-sharp fa-solid fa-lips"></i></div>
                        <div class="charcreator-page"><i class="fa-sharp fa-solid fa-shirt"></i></div>
                    </div>
                    <div class="charcreator-items">

                        <div class="charcreator-item">
                            <div class="charcreator-head">
                                <div class="charcreator-head-text">
                                    <div class="quick-options-quader"></div>
                                    <p>Clothing color</p>
                                </div>
                                <div class="charcreator-item-num">555</div>
                            </div>
                            <div class="charcreator-selector">
                                <button class="charcreator-button-left">
                                    <i class="fa-light fa-chevron-left"></i>
                                </button>
                                <input type="range" class="charcreator-range" step="1">
                                <button class="charcreator-button-right">
                                    <i class="fa-light fa-chevron-right"></i>
                                </button>
                            </div>
                        </div>

                    </div>
                </div>
                <button class="charcreator-create-button">
                    {{idcard}}
                    <i class="fa-light fa-arrow-right"></i>
                </button>
            </div>
            <div id="move-identity-char" class="identity-char">
            </div>
            <div class="identity-controls">
                <div class="move-char-box char-move-left">
                    <i class="fa-sharp-duotone fa-regular fa-arrow-left"></i>
                </div>
                <div class="move-char-box">
                    <i class="fa-sharp fa-solid fa-arrow-pointer"></i>
                </div>
                <div class="move-char-box char-move-right">
                    <i class="fa-sharp-duotone fa-regular fa-arrow-right"></i>
                </div>
            </div>
            <div class="identity-right-side">
                <div class="identity-title">
                    <div class="identity-title-text">
                        <h4>{{server1}}</h4>
                        <p>{{server2}}</p>
                    </div>
                    <img src="./img/logo.png" alt="" class="identity-title-logo">
                </div>
                <div class="identity-inputs">
                    <div class="identity-error">
                        <p>{{error}}</p>
                    </div>
                    <div class="identity-input-box">
                        <div class="idenity-input-icon">
                            <i class="fa-light fa-user"></i>
                        </div>
                        <div class="identity-input-input">
                            <label>{{firstname}}</label>
                            <input type="text" placeholder="Max" class="identity-vorname">
                        </div>
                        <div class="identity-success-icon identity-vorname-success">
                            <i class="fa-solid fa-circle-xmark"></i>
                        </div>
                    </div>
                    <div class="identity-input-box">
                        <div class="idenity-input-icon">
                            <i class="fa-light fa-user"></i>
                        </div>
                        <div class="identity-input-input">
                            <label>{{lastname}}</label>
                            <input type="text" placeholder="Mustimann" class="identity-nachname">
                        </div>
                        <div class="identity-success-icon identity-nachname-success">
                            <i class="fa-solid fa-circle-xmark"></i>
                        </div>
                    </div>
                    <div class="identity-input-box">
                        <div class="idenity-input-icon">
                            <i class="fa-light fa-line-height"></i>
                        </div>
                        <div class="identity-input-input">
                            <label>{{size}}</label>
                            <input type="number" placeholder="189 cm" class="identity-size">
                        </div>
                        <div class="identity-success-icon identity-size-success">
                            <i class="fa-solid fa-circle-xmark"></i>
                        </div>
                    </div>            
                    <div class="identity-input-box">
                        <div class="idenity-input-icon">
                            <i class="fa-duotone fa-solid fa-calendar-lines-pen"></i>
                        </div>
                        <div class="identity-input-input">
                            <label>{{birthdate}}</label>
                            <input type="date" class="identity-date">
                        </div>
                        <div class="identity-success-icon identity-date-success">
                            <i class="fa-solid fa-circle-xmark"></i>
                        </div>
                    </div>  
                </div>       
                <div class="identity-buttons">
                    <button class="back-character-button">
                        <i class="fa-light fa-arrow-left"></i>
                        {{skinmenu}}
                    </button>
                    <button class="create-caracter-button">
                        {{create}}
                        <i class="fa-light fa-circle-check"></i>
                    </button>
                </div>
            </div>
        </div>
    `,
    css: `
    .identity {
        display: none;
        color: white;
        user-select: none;

        button {
            cursor: pointer;
        }

        &-left-side {
            position: fixed;
            height: 100%;
            width: 45%;
            background: var(--left-bg);
            animation: slideInLeft 0.5s ease forwards;
            display: flex;
            justify-content: space-between;
            flex-direction: column;
        }

        &-right-side {
            position: fixed;
            right: 0;
            height: 100%;
            width: 40%;
            background: var(--right-bg);
            display: none;
            align-items: end;
            justify-content: space-between;
            flex-direction: column;
            animation: slideInRight 0.5s ease forwards;
        }

        &-input-box {
            width: 35vh;
            margin-bottom: 1vh;
            border-radius: 0.2vh;
            background: rgba(255, 255, 255, 0.04);
            margin-right: 3vh;
            display: flex;
            align-items: center;
            justify-content: space-between;
            padding: 1vh;
        }

        &-input-input {
            display: flex;
            flex-direction: column;
            width: 75%;
            height: 100%;

            input {
                color: white;
                background: none;
                border: none;
                outline: none;
                padding: 0;
                margin: 0;
                width: 100%;
                font-size: 1.8vh;
                font-family: 'Gilroy-Medium';
            }

            label {
                color: rgba(255, 255, 255, 0.50);
                font-family: 'Gilroy-Regular';
                font-size: 1.6vh;
                font-weight: 400;
                line-height: 111.581%;
                letter-spacing: -0.1vh;
                margin-bottom: 0.2vh;
            }
        }

        &-success-icon {
            height: 3vh;
            width: 3vh;
            border-radius: 1.9px;
            display: flex;
            align-items: center;
            justify-content: center;
            font-size: 1.6vh;
            background: linear-gradient(135deg, rgba(14, 3, 19, 0.46), #ff2929, rgba(14, 3, 19, 0.46));
            box-shadow: 0px 10.45px 53.01px 0px rgba(255, 41, 41, 0.46), 0px 0px 16.91px 0px #ff2929 inset;
        }

        &-buttons {
            width: 37vh;
            margin-right: 3vh;
            display: flex;
            align-items: center;
            justify-content: space-between;
            margin-bottom: 3vh;

            button {
                height: 5vh;
                width: 48%;
                border: 0.1vh solid #bd16ff;
                background: linear-gradient(135deg, rgba(14, 3, 19, 0.46), #C329FF, rgba(14, 3, 19, 0.46));
                box-shadow: 0px 10.45px 53.01px 0px rgba(195, 41, 255, 0.46), 0px 0px 16.91px 0px #C329FF inset;
                margin-bottom: 2vh;
                border-radius: 0.2vh;
                color: #FFF;
                font-family: 'Gilroy-Medium';
                font-size: 1.5vh;
                display: flex;
                align-items: center;
                justify-content: center;
                gap: 1vh;
                outline: none;
            }
        }

        &-title {
            display: flex;
            align-items: center;
            gap: 1vh;
            font-size: 1.8vh;
            margin-right: 5vh;
            margin-top: 5vh;
            transform: scale(120%);

            &-logo {
                height: 5vh;
                width: 5vh;
            }

            &-text {
                margin-right: 1vh;

                h4 {
                    margin: 0;
                    color: #C329FF;
                    text-shadow: 0px 5px 49.9px rgba(195, 41, 255, 0.50);
                    font-family: 'Gilroy-Medium';
                    font-size: 4.5vh;
                    font-weight: 700;
                    letter-spacing: -0.4vh;
                    text-align: end;
                }

                p {
                    margin: 0;
                    margin-top: -3vh;
                    color: #FFF;
                    text-shadow: 0px 0px 53.3px rgba(255, 255, 255, 0.25);
                    font-family: "Shadows Highstter";
                    font-size: 4vh;
                    font-style: italic;
                    font-weight: 400;
                    letter-spacing: -0.5vh;
                    text-align: end;
                }
            }
        }

        &-inputs {
            margin-top: 10vh;
        }

        &-error {
            width: 35vh;
            margin-bottom: 1vh;
            border-radius: 0.2vh;
            background: rgba(255, 255, 255, 0.04);
            margin-right: 3vh;
            padding: 1vh;
            display: none;

            p {
                margin: 0;
                font-size: 1.7vh;
                font-family: 'Gilroy-Medium';
                color: #FF0000;
            }
        }

        &-char {
            position: fixed;
            left: 50%;
            top: 50%;
            transform: translate(-50%, -50%);
            height: 80vh;
            width: 60vh;

            &:hover {
                cursor: grab;
            }
        }

        &-controls {
            position: fixed;
            left: 50%;
            bottom: 2vh;
            transform: translate(-50%);
            display: flex;
            align-items: center;
            justify-content: space-between;
            gap: 1vh;
        }
    }

    .idenity-input-icon {
        height: 3.7vh;
        width: 3.7vh;
        border-radius: 1.9px;
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 1.8vh;
        color: rgb(179, 179, 179);
        background: linear-gradient(135deg, rgba(14, 3, 19, 0.46), #C329FF, rgba(14, 3, 19, 0.46));
        box-shadow: 0px 10.45px 53.01px 0px rgba(195, 41, 255, 0.46), 0px 0px 16.91px 0px #C329FF inset;
    }

    .valid-true {
        background: linear-gradient(135deg, rgba(3, 19, 4, 0.46), #50ff29, rgba(14, 3, 19, 0.46));
        box-shadow: 0px 10.45px 53.01px 0px rgba(48, 255, 41, 0.46), 0px 0px 16.91px 0px #4dff29 inset;
    }

    .charcreator {
        &-title {
            display: flex;
            align-items: center;
            gap: 1vh;
            font-size: 1.8vh;
            margin-left: 10vh;
            margin-top: 5vh;
            transform: scale(120%);

            &-logo {
                height: 5vh;
                width: 5vh;
            }

            &-text {
                margin-left: 1vh;

                h4 {
                    margin: 0;
                    color: #FFF;
                    text-shadow: 0px 0px 53.3px rgba(255, 255, 255, 0.25);
                    font-family: 'Gilroy-Medium';
                    font-size: 4.5vh;
                    font-weight: 700;
                    letter-spacing: -0.4vh;
                }

                p {
                    margin: 0;
                    margin-top: -4vh;
                    color: #C329FF;
                    text-shadow: 0px 5px 49.9px rgba(195, 41, 255, 0.50);
                    font-family: "Shadows Highstter";
                    font-size: 5vh;
                    font-style: italic;
                    font-weight: 400;
                    letter-spacing: -0.5vh;
                }
            }
        }

        &-create-button {
            width: 40%;
            height: 5vh;
            border: 0.1vh solid #bd16ff;
            background: linear-gradient(135deg, rgba(14, 3, 19, 0.46), #C329FF, rgba(14, 3, 19, 0.46));
            box-shadow: 0px 10.45px 53.01px 0px rgba(195, 41, 255, 0.46), 0px 0px 16.91px 0px #C329FF inset;
            margin-bottom: 2vh;
            border-radius: 0.2vh;
            margin-left: 3vh;
            color: #FFF;
            font-family: 'Gilroy-Medium';
            font-size: 1.5vh;
            display: flex;
            align-items: center;
            justify-content: center;
            gap: 1vh;
            outline: none;
        }

        &-body {
            margin-left: 3vh;
            height: 75%;
            width: 30vh;
        }

        &-pages {
            width: 100%;
            display: flex;
            align-items: center;
            justify-content: space-between;
        }

        &-page {
            height: 4vh;
            width: 4vh;
            display: flex;
            align-items: center;
            justify-content: center;
            border-radius: 0.5vh;
            background: rgba(255, 255, 255, 0.07);
            border: 0.1vh solid transparent;
            cursor: pointer;

            &:hover {
                background: rgba(255, 255, 255, 0.17);
            }

            &.selected {
                border: 0.1vh solid rgba(195, 41, 255, 0.55);
                background: rgba(195, 41, 255, 0.15);
            }
        }

        &-items {
            height: 90%;
            margin-top: 2vh;
            overflow: auto;
            scrollbar-width: 0;
            scroll-behavior: smooth;

            &::-webkit-scrollbar {
                display: none;
            }
        }

        &-item {
            border-radius: 0.5vh;
            background: rgba(255, 255, 255, 0.05);
            width: calc(100% - 2vh);
            padding: 1vh;
            margin-bottom: 1vh;

            &-num {
                height: 3.2vh;
                padding: 0 1vh;
                border-radius: 0.2vh;
                background: rgba(195, 41, 255, 0.15);
                display: flex;
                align-items: center;
                justify-content: center;
                color: #C329FF;
                text-shadow: 0px 0px 42.845px rgba(195, 41, 255, 0.25);
                font-family: 'Gilroy-Bold';
            }
        }

        &-head {
            border-radius: 0.3vh;
            background: rgba(0, 0, 0, 0.25);
            display: flex;
            align-items: center;
            justify-content: space-between;
            width: calc(100% - 2vh);
            height: max-content;
            padding: 1vh;

            &-text {
                display: flex;
                align-items: center;
                gap: 1vh;

                p {
                    margin: 0;
                    font-size: 1.5vh;
                    color: #FFF;
                    font-family: 'Gilroy-Medium';
                }
            }
        }

        &-selector {
            border-radius: 0.3vh;
            border: 0.1vh solid rgba(255, 255, 255, 0.08);
            width: calc(100% - 2vh);
            height: max-content;
            padding: 1vh;
            margin-top: 1vh;
            display: flex;
            align-items: center;
            justify-content: space-between;
        }

        &-button-left,
        &-button-right {
            background: linear-gradient(135deg, rgba(14, 3, 19, 0.46), #C329FF, rgba(14, 3, 19, 0.46));
            box-shadow: 0px 10.45px 53.01px 0px rgba(195, 41, 255, 0.46), 0px 0px 16.91px 0px #C329FF inset;
            display: flex;
            align-items: center;
            justify-content: center;
            height: 3.2vh;
            width: 3.2vh;
            border-radius: 0.5vh;
            color: white;
            border: none;
        }

        &-range {
            -webkit-appearance: none;
            appearance: none;
            width: 70%;
            height: 0.5vh;
            background: rgba(255, 255, 255, 0.15);
            outline: none;

            &::-webkit-slider-thumb {
                -webkit-appearance: none;
                appearance: none;
                border: 0;
                background-color: #fff;
                border-radius: 0.1rem;
                height: 1vh;
                width: 1vh;
            }
        }
    }

    .move-char-box {
        height: 4vh;
        width: 4vh;
        display: flex;
        align-items: center;
        justify-content: center;
        border-radius: 0.5vh;
        background: rgba(255, 255, 255, 0.07);
        border: 0.1vh solid transparent;
        cursor: pointer;
    }
    `
});

UI.BindData('identity', labels);

document.addEventListener("keydown", function(event) {
    if (event.key === "Escape") {
        $.post(`https://${GetParentResourceName()}/identity`, JSON.stringify({type:'close'}));
    } else if (event.key === "h") {
        $.post(`https://${GetParentResourceName()}/identity`, JSON.stringify({
            type: "hands",
        }));
    }
});

function loadIdentityOptions(items) {
    const container = $('.charcreator-items');
    const itemsLookup = {};
    items.forEach(item => {
        itemsLookup[item.name] = item;
    });

    function loadPage(pageIndex) {
        container.empty();
        const items = pages[pageIndex];
        if (items) {
            items.forEach(key => {
                const itemData = itemsLookup[key] || {};
                const value = itemData.value || 0;
                const max = itemData.max || 100;
                const min = itemData.min || 0;
                const name = itemData.name
                container.append(`
                    <div class="charcreator-item">
                        <div class="charcreator-head">
                            <div class="charcreator-head-text">
                                <div class="quick-options-quader"></div>
                                <p>${itemData.title || key.replace(/_/g, ' ')}</p>
                            </div>
                            <div class="charcreator-item-num" id="${name}-value">${value}</div>
                        </div>
                        <div class="charcreator-selector">
                            <button class="charcreator-button-left" data-key="${name}">
                                <i class="fa-light fa-chevron-left"></i>
                            </button>
                            <input type="range" class="charcreator-range" step="1" value="${value}" id="${name}" min="${min}" max="${max}">
                            <button class="charcreator-button-right" data-key="${name}">
                                <i class="fa-light fa-chevron-right"></i>
                            </button>
                        </div>
                    </div>
                `);
            });

            $('.charcreator-range').on('input', function () {
                const key = $(this).attr('id');
                const newValue = $(this).val();
                $(`#${key}-value`).text(newValue);
                $.post(`https://${GetParentResourceName()}/identity`, JSON.stringify({ type: 'change', key: key, value: newValue }));
            });

            $('.charcreator-button-left').click(function () {
                const key = $(this).data('key');
                const range = $(`#${key}`);
                let currentValue = parseInt(range.val());
                if (currentValue > parseInt(range.attr('min'))) {
                    currentValue -= 1;
                    range.val(currentValue).trigger('input');
                    $(`#${key}-value`).text(currentValue);
                }
            });
            
            $('.charcreator-button-right').click(function () {
                const key = $(this).data('key');
                const range = $(`#${key}`);
                let currentValue = parseInt(range.val());
                if (currentValue < parseInt(range.attr('max'))) {
                    currentValue += 1;
                    range.val(currentValue).trigger('input');
                    $(`#${key}-value`).text(currentValue);
                }
            });            
        }
    }

    $('.charcreator-page').click(function () {
        const pageIndex = $(this).index();
        $('.charcreator-page').removeClass('selected');
        $(this).addClass('selected');
        loadPage(pageIndex);
    });

    loadPage(0);
}

window.addEventListener('message', function(event){
    if (event.data.action == 'identity') {
        if (event.data.enable === true) {
            $('.identity-right-side').hide();
            $('.identity-left-side').css('display', 'flex');
            $('.identity').show();
            loadIdentityOptions(event.data.items);
        } else {
            $('.identity').fadeOut(400);
            setTimeout(() => {
                $(".identity-size").val("");
                $(".identity-vorname").val("");
                $(".identity-nachname").val("");
                $(".identity-date").val("");
                $('.identity-vorname-success').removeClass('valid-true');
                $('.identity-vorname-success').find('i').removeClass('fa-circle-check').addClass('fa-circle-xmark');
                $('.identity-nachname-success').removeClass('valid-true');
                $('.identity-nachname-success').find('i').removeClass('fa-circle-check').addClass('fa-circle-xmark');
                $('.identity-size-success').removeClass('valid-true');
                $('.identity-size-success').find('i').removeClass('fa-circle-check').addClass('fa-circle-xmark');
                $('.identity-date-success').removeClass('valid-true');
                $('.identity-date-success').find('i').removeClass('fa-circle-check').addClass('fa-circle-xmark');
            }, 400);
        }
    } else if (event.data.action == 'identity-error') {
        $('.identity-error').show();
        $('.identity-error p').text(event.data.error);
        setTimeout(() => {
            $('.identity-error').fadeOut(150);
        }, 8000);
    }
});

$('.charcreator-create-button').click(function (e) { 
    $('.identity-left-side').fadeOut(400);
    $('.identity-right-side').css('display', 'flex');
});

$('.back-character-button').click(function (e) { 
    $('.identity-right-side').fadeOut(400);
    $('.identity-left-side').css('display', 'flex');
});

function validateInput(selector, validationFn, successClass, successIcon, errorIcon) {
    $(selector).on('input', function () {
        const value = $(this).val().trim();
        const isValid = validationFn(value);

        const successElement = $(this).closest('.identity-input-box').find(successClass);

        if (isValid) {
            successElement.addClass('valid-true');
            successElement.find('i').removeClass(errorIcon).addClass(successIcon);
        } else {
            successElement.removeClass('valid-true');
            successElement.find('i').removeClass(successIcon).addClass(errorIcon);
        }
    });
}

$('.create-caracter-button').click(function (e) { 
    size = $(".identity-size").val();
    firstname = $(".identity-vorname").val();
    lastname = $(".identity-nachname").val();
    date = $(".identity-date").val();
    $.post(`https://${GetParentResourceName()}/identity`, JSON.stringify({ 
        type: 'save', 
        date: date, 
        size: size, 
        firstname: firstname, 
        lastname: lastname, 
    }));
});

const character = document.getElementById('move-identity-char');
let startX, initialX;

character.addEventListener('mousedown', (e) => {
    startX = e.clientX;
    initialX = character.offsetLeft;
    
    document.addEventListener('mousemove', handleDrag);
    document.addEventListener('mouseup', stopDrag);
});

character.addEventListener('wheel', (e) => {
    e.preventDefault();
    const scroll = e.deltaY < 0 ? 'up' : 'down';
    $.post(`https://${GetParentResourceName()}/identity`, JSON.stringify({
        type: "zoom",
        direction: scroll
    }));
});

function handleDrag(e) {
    const deltaX = e.clientX - startX;
    const direction = deltaX > 0 ? 'right' : 'left';
    
    $.post(`https://${GetParentResourceName()}/identity`, JSON.stringify({
      type: "move",
      move: direction
    }));
}

function stopDrag() {
    document.removeEventListener('mousemove', handleDrag);
    document.removeEventListener('mouseup', stopDrag);
}

$('.char-move-left').click(function (e) { 
    $.post(`https://${GetParentResourceName()}/identity`, JSON.stringify({
        type: "move",
        move: 'left'
    }));
});

$('.char-move-right').click(function (e) { 
    $.post(`https://${GetParentResourceName()}/identity`, JSON.stringify({
        type: "move",
        move: 'right'
    }));
});

onload();