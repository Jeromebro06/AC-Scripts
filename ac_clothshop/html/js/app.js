UI.Create({
    id: 'clotheshop',
    html: `
        <div class="clotheshop-side">
            <div class="clotheshop-title">
                <img src="./img/logo.png" alt="" class="clotheshop-title-logo">
                <div class="clotheshop-title-text">
                    <h4>${labels.server1}</h4>
                    <p>${labels.server2}</p>
                </div>
            </div>
            <div class="clotheshop-select">
                <button class="clotheshop-head-button selected" data-target="clotheshop-items">${labels.clothes}</button>
                <button class="clotheshop-head-button" data-target="clotheshop-saved">${labels.saved}</button>
            </div>
            <div class="clotheshop-body">
                <div class="clotheshop-items"></div>
                <div class="clotheshop-saved"></div>
            </div>
        </div>
        <div class="clotheshop-change-item">
            <div class="clotheshop-selector-item">
                <div class="clotheshop-selector-head">
                    <div class="clotheshop-selector-head-text">
                        <div class="quick-options-quader"></div>
                        <p>Clothing color</p>
                    </div>
                    <input type="number" class="clotheshop-selector-item-num variation-number" min="0" value="0">
                </div>
                <div class="clotheshop-selector-selector">
                    <button class="clotheshop-button-left">
                        <i class="fa-light fa-chevron-left"></i>
                    </button>
                    <input value="0" type="range" class="clotheshop-variation-range" step="1">
                    <button class="clotheshop-button-right">
                        <i class="fa-light fa-chevron-right"></i>
                    </button>
                </div>
            </div>
            <div class="clotheshop-selector-item">
                <div class="clotheshop-selector-head">
                    <div class="clotheshop-selector-head-text">
                        <div class="quick-options-quader"></div>
                        <p>Clothing color</p>
                    </div>
                    <input type="number" class="clotheshop-selector-item-num color-number" min="0" value="0">
                </div>
                <div class="clotheshop-selector-selector">
                    <button class="clotheshop-selector-button-left">
                        <i class="fa-light fa-chevron-left"></i>
                    </button>
                    <input value="0" type="range" class="clotheshop-selector-range" step="1">
                    <button class="clotheshop-selector-button-right">
                        <i class="fa-light fa-chevron-right"></i>
                    </button>
                </div>
            </div>
            <button class="clotheshop-save">${labels.save} - <span class="price">${(0).formatMoney()}</span></button>
        </div>
        <div class="clotheshop-char" id="clotheshop-char"></div>
        <div class="clotheshop-controls">
            <div class="move-clothshop-char-box clothshop-handsup">
                <i class="fa-sharp fa-light fa-hand-point-up"></i>
            </div>
            <div class="clotheshop-controls-2">
                <div class="move-clothshop-char-box clothshop-move-left">
                    <i class="fa-sharp-duotone fa-regular fa-arrow-left"></i>
                </div>
                <div class="move-clothshop-char-box">
                    <i class="fa-sharp fa-solid fa-arrow-pointer"></i>
                </div>
                <div class="move-clothshop-char-box clothshop-move-right">
                    <i class="fa-sharp-duotone fa-regular fa-arrow-right"></i>
                </div>
            </div>
        </div>
        <div class="clotheshop-save-modal">
            <p>${labels.save_question}</p>
            <input type="text" placeholder="${labels.name_placeholder}">
            <div class="clotheshop-save-buttons">
                <button class="clotheshop-save-btn clotheshop-save-no">${labels.dont_save}</button>
                <button class="clotheshop-save-btn clotheshop-save-yes">${labels.save}</button>
            </div>
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
            
        #clotheshop {
            position: fixed;
            display: none;
            align-items: end;
            height: 100%;
            width: 100%;
        }

        .clotheshop-save-modal {
            position: fixed;
            top: 50%;
            left: 50%;
            padding: 1vh;
            background: var(--clr-bg);
            transform: translate(-50%, -50%) scale(90%);
            width: 40vh;
            border-radius: 0.5vh;
            display: none;
            z-index: 10;

            p {
                margin: 0;
                text-align: center;
                font-size: 2vh;
                margin-bottom: 1vh;
                color: rgba(255, 255, 255, .6);
            }

            input {
                width: calc(100% - 1vh);
                border: 0.1vh solid rgba(255, 255, 255, .3);
                height: 4vh;
                background: rgba(255, 255, 255, .2);
                margin-bottom: 1vh;
                text-align: center;
                color: white;
                font-family: 'Gilroy-Bold';
                outline: none;
                border-radius: 0.3vh;
                font-size: 2vh;
            }
        }

        .clotheshop-save2-modal {
            position: fixed;
            top: 50%;
            left: 50%;
            padding: 1vh;
            background: var(--clr-bg);
            transform: translate(-50%, -50%) scale(90%);
            width: 40vh;
            border-radius: 0.5vh;
            display: none;
            z-index: 10;

            p {
                margin: 0;
                text-align: center;
                font-size: 2vh;
                margin-bottom: 1vh;
                color: rgba(255, 255, 255, .6);
            }

            input {
                width: calc(100% - 1vh);
                border: 0.1vh solid rgba(255, 255, 255, .3);
                height: 4vh;
                background: rgba(255, 255, 255, .2);
                margin-bottom: 1vh;
                text-align: center;
                color: white;
                font-family: 'Gilroy-Bold';
                outline: none;
                border-radius: 0.3vh;
                font-size: 2vh;
            }
        }

        .clotheshop-save-buttons {
            width: 100%;
            display: flex; 
            align-items: center;
            justify-content: space-between;
            gap: 1vh;
        }

        .clotheshop-save-btn {
            height: 5vh;
            width: 50%;
            border: 0.1vh solid var(--clr-accept-border);
            background: var(--clr-accept-bg);
            box-shadow: 0px 10.45px 53.01px 0px var(--clr-accept-shadow1), 0px 0px 16.91px 0px var(--clr-accept-shadow2) inset;
            border-radius: 0.2vh;
            color: #FFF;
            font-family: 'Gilroy-Medium';
            font-size: 1.8vh;
            outline: none;
        }

        .clotheshop-side {
            height: 100%;
            width: 40%;
            background: var(--clr-side);
            animation: slideInLeft 0.5s ease forwards;
            display: flex;
            flex-direction: column;
        }

        .clotheshop-title {
            display: flex;
            align-items: center;
            gap: 1vh;
            font-size: 1.8vh;
            margin-left: 2vh;
            margin-top: 3vh;
            transform: scale(90%);
            width: max-content;
            padding-bottom: 2vh;
            border-bottom: 0.1vh solid rgba(255, 255, 255, 0.273);

            &-logo {
                height: 5vh;
                width: 5vh;
            }

            &-text {
                margin-left: 1vh;

                h4 {
                    margin: 0;
                    color: #FFF;
                    font-family: 'Gilroy-Medium';
                    font-size: 4.5vh;
                    font-weight: 700;
                    letter-spacing: -0.4vh;
                }

                p {
                    margin: 0;
                    margin-top: -4vh;
                    color: var(--clr-title-text);
                    text-shadow: 0px 5px 49.9px var(--clr-title-shadow);
                    font-family: "Shadows Highstter";
                    font-size: 5vh;
                    font-style: italic;
                    font-weight: 400;
                    letter-spacing: -0.5vh;
                }
            }
        }

        .clotheshop-select {
            margin-left: 4vh;
            display: flex;
            align-items: center;
            justify-content: space-between;
            gap: 1vh;
            width: 40vh;
            margin-top: 2vh;
        }

        .clotheshop-head-button {
            border: 0.15vh solid rgba(255, 255, 255, 0.45);
            width: 50%;
            height: 4.5vh;
            color: rgba(255, 255, 255, 0.5);
            background-color: transparent;
            font-family: 'Gilroy-Medium';
            font-size: 1.8vh;
            border-radius: 0.3vh;
        }

        .clotheshop-head-button.selected, .clotheshop-head-button:hover {
            border: 0.15vh solid #ffffff;
            color: rgba(255, 255, 255, 0.749);
            background-color: rgba(255, 255, 255, 0.112);
            transition: 150ms;
        }

        .clotheshop-body {
            width: 40vh;
            margin-left: 4vh;
            height: 70%;
            margin-top: 2vh;
        }

        .clotheshop-items {
            max-height: 100%;
            width: 100%;
            display: grid;
            grid-template-columns: 1fr 1fr;
            overflow: auto;
            gap: 1vh;
            -webkit-appearance: none;
        }

        .clotheshop-items::-webkit-scrollbar {
            display:none;
        }

        .clotheshop-item {
            width: 100%;
            background: linear-gradient(to bottom, rgba(255, 255, 255, 0.093), rgba(0, 0, 0, 0));
            box-sizing: border-box;
            overflow: hidden;
            border-image: linear-gradient(to bottom, #ffffff00 0%, #ffffff00 50%, #ffffff2b 100%) 1;
            border-width: 0.2vh;
            border-style: solid;
            border-radius: 0.5vh;
            display: flex; 
            align-items:center;
            justify-content: space-between;
            flex-direction: column;
        }

        .clotheshop-pattern {
            margin: 0;
            color: #FFF;
            font-size: 10vh;
            font-weight: 700;
            letter-spacing: -3vh;
            mix-blend-mode: overlay;
            line-height: 2vh;
            margin-top: -5.3vh;
            margin-left: -0.5vh;
        }

        .clotheshop-item-title {
            background-color: rgba(0, 0, 0, 0.45);
            width: 90%;
            display: flex;
            align-items: center;
            margin-top: 5.5vh;
            border-radius: 0.3vh;
            gap: 1vh;
            padding: 1vh 0;

            p {
                color: white;
                margin: 0;
                font-size: 1.6vh;
            }
        }

        .clotheshop-bar {
            width: 60%;
            margin-bottom: -0.7vh;
            border-radius: 0.5vh;
            height: 1vh;
            background-color: white;
            margin-top: 1vh;
        }

        .clotheshop-img {
            height: 8.5vh;
            padding: 1vh;
        }

        .clotheshop-item-selected, .clotheshop-item:hover {
            background: var(--selected-category-bg);
            border-image: var(--selected-category-border) 1;
            transition: 150ms;
        }

        .clotheshop-item-selected > .clotheshop-bar, .clotheshop-item:hover > .clotheshop-bar {
            background-color: var(--selected-line);
        }

        .clotheshop-saved {
            max-height: 100%;
            width: 100%;
            display: none;
            grid-template-columns: 1fr;
            overflow: auto;
            gap: 1vh;

            &-item {
                width: 100%;
                border-radius: 0.3vh;
                background-color: rgba(255, 255, 255, 0.05);
                display: flex;
                flex-direction: column;
                align-items: flex-start;
                justify-content: flex-start;
                padding: 0.8vh;
                box-sizing: border-box;
                gap: 0.8vh;
                text-align: left;
            }

            &-title {
                width: 100%;
                border-radius: 0.3vh;
                background-color: rgba(0, 0, 0, 0.25);
                display: flex;
                align-items: center;
                justify-content: space-between;
                padding: 1vh 2vh;
                box-sizing: border-box;
            }

            &-name {
                display: flex;
                align-items: center;
                gap: 1vh;
            }

            &-icon {
                height: 3.7vh;
                width: 3.7vh;
                display: flex;
                align-items: center;
                justify-content: center;
                color: white;
                font-size: 1.5vh;
                box-shadow: 0px 0px 30.4px var(--clr-saved-icon-shadow1), 0px 0px 16.91px var(--clr-saved-icon-shadow2) inset;
                border-radius: 1.9px;
                background: var(--clr-saved-icon-bg);
            }

            &-name-text {
                h6 {
                    color: rgb(158, 158, 158);
                    margin: 0;
                    font-size: 1.5vh;
                    font-family: 'Gilroy-Regular';
                }

                p {
                    color: #fff;
                    margin: 0;
                    font-size: 1.5vh;
                    font-family: 'Gilroy-Regular';
                }
            }

            &-delete {
                height: 2.8vh;
                width: 2.8vh;
                display: flex;
                align-items: center;
                justify-content: center;
                box-shadow: 0px 8px 19.1px rgba(255, 41, 45, 0.35), 0px 0px 11.8px #ff292d inset;
                border-radius: 0.2vh;
                font-size: 1.5vh;
                background: radial-gradient(50% 50% at 50% 50%, #ff292d, #000);
            }

            &-button {
                height: 5vh;
                width: 100%;
                border: 0.1vh solid var(--clr-saved-btn-border);
                background: var(--clr-saved-btn-bg);
                box-shadow: 0px 10.45px 53.01px 0px var(--clr-saved-btn-shadow1), 0px 0px 16.91px 0px var(--clr-saved-btn-shadow2) inset;
                border-radius: 0.2vh;
                color: #FFF;
                font-family: 'Gilroy-Medium';
                font-size: 1.8vh;
                outline: none;
            }
        }

        .clotheshop-selector-item {
            animation: slideInRight 0.5s ease forwards;
            border-radius: 0.5vh;
            background: rgba(255, 255, 255, 0.05);
            width: calc(100% - 2vh);
            padding: 1vh;
            margin-bottom: 1vh;
            transition: margin-bottom 0.5s ease;
        }

        .clotheshop-selector-item.no-margin {
            margin-bottom: 1vh;
        }

        .clotheshop-selector-item.slide-out {
            animation: slideOutRight 0.5s ease forwards;
        }

        .clotheshop-selector-items::-webkit-scrollbar {
            display: none;
        }

        .clotheshop-selector-head {
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

        .clotheshop-selector-item-num {
            height: 3.2vh;
            width: 5vh;
            padding: 0 1vh;
            border-radius: 0.2vh;
            background: var(--clr-selector-num-bg);
            display: flex;
            align-items: center;
            justify-content: center;
            color: var(--clr-selector-num-text);
            text-shadow: 0px 0px 42.845px var(--clr-selector-num-shadow);
            font-family: 'Gilroy-Bold';
            outline: none;
            border: none;
            text-align: center;
            font-size: 1.6vh;
            -webkit-appearance: none;
            border: 0.1vh solid var(--clr-selector-num-border);
        }

        .clotheshop-selector-item-num::-webkit-outer-spin-button,
        .clotheshop-selector-item-num::-webkit-inner-spin-button {
            -webkit-appearance: none;
            margin: 0;
        }

        .clotheshop-selector-item-num[type=number] {
            -moz-appearance: textfield;
        }

        .clotheshop-selector-selector {
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

        .clotheshop-selector-button-left, .clotheshop-selector-button-right, .clotheshop-button-left, .clotheshop-button-right  {
            background: var(--clr-selector-bg);
            box-shadow: 0px 10.45px 53.01px 0px var(--clr-selector-shadow1), 0px 0px 16.91px 0px var(--clr-selector-shadow2) inset;
            display: flex;
            align-items: center;
            justify-content: center;
            height: 3.2vh;
            width: 3.2vh;
            border-radius: 0.5vh;
            color: white;
            border: none;
        }

        .clotheshop-selector-range {
            -webkit-appearance: none;
            appearance: none;
            width: 70%;
            height: 0.5vh;
            background: rgba(255, 255, 255, 0.15);  
            outline: none;
        }

        .clotheshop-selector-range::-webkit-slider-thumb {
            -webkit-appearance: none;
            appearance: none;
            border: 0;
            background-color: #fff;
            border-radius: 0.1rem;
            height: 1vh;
            width: 1vh;
        } 

        .clotheshop-variation-range {
            -webkit-appearance: none;
            appearance: none;
            width: 70%;
            height: 0.5vh;
            background: rgba(255, 255, 255, 0.15);  
            outline: none;
        }

        .clotheshop-variation-range::-webkit-slider-thumb {
            -webkit-appearance: none;
            appearance: none;
            border: 0;
            background-color: #fff;
            border-radius: 0.1rem;
            height: 1vh;
            width: 1vh;
        } 

        .clotheshop-change-item {
            position: fixed;
            right: 2vh;
            bottom: 2vh;
            width: 35vh;
        }

        .clotheshop-controls {
            position: fixed;
            left: 50%;
            bottom: 2vh;
            transform: translateX(-50%);
            display: flex;
            align-items: center;
            flex-direction: column;
            gap: 1vh;
            animation: slideUp 0.5s ease forwards;

            &-2 {
                display: flex;
                align-items: center;
                justify-content: space-between;
                gap: 1vh;
            }
        }

        .clotheshop-char {
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

        .move-clothshop-char-box {
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

        .clotheshop-save {
            height: 4.5vh;
            width: 100%;
            border: 0.1vh solid var(--clr-payout-border);
            background: var(--clr-payout-bg);
            box-shadow: 0px 10.45px 53.01px 0px var(--clr-payout-shadow1), 0px 0px 16.91px 0px var(--clr-payout-shadow2) inset;
            border-radius: 0.2vh;
            color: #ffffffa5;
            font-family: 'Gilroy-Bold';
            font-size: 1.7vh;
            display: flex;
            align-items: center;
            justify-content: center;
            gap: 1vh;
            animation: slideInRight 0.5s ease forwards;
        }
     `
});

let clothes = [];
let isSaveModalOpen = false;

function renderCategories(data) {
    $('.clotheshop-items').empty();
    data.sort((a, b) => a.placement - b.placement);
    clothes = data;
    
    data.forEach((item, index) => {
        const isSelected = index === 0 ? 'clotheshop-item-selected' : '';
        const html = `
            <div class="clotheshop-item ${isSelected}" data-name="${item.name}">
                <div class="clotheshop-pattern">////////////////////////////////////////////</div>
                <div class="clotheshop-item-title">
                    <div class="quick-options-quader"></div>
                    <p>${item.label}</p>
                </div>
                <img class="clotheshop-img" src="./img/${item.img}" alt="">
                <div class="clotheshop-bar"></div>
            </div>
        `;
        $('.clotheshop-items').append(html);
    });

    if (data.length > 0) {
        updateSliders(data[0]);

        UI.PostRequest({
            action: 'clotheshop',
            data: { type: 'changeCategory', category: data[0].name },
        });
    }
}

function renderOutfits(data) {
    $('.clotheshop-saved').empty();
    data.forEach((item) => {
        const html = `
            <div class="clotheshop-saved-item">
                <div class="clotheshop-saved-title">
                    <div class="clotheshop-saved-name">
                        <div class="clotheshop-saved-icon">
                            <i class="fa-sharp fa-solid fa-shirt"></i>
                        </div>
                        <div class="clotheshop-saved-name-text">
                            <h6>${labels.outfit_name_head}:</h6>
                            <p>${item.name}</p>
                        </div>
                    </div>
                    <div data-id="${item.id}" class="clotheshop-saved-delete">
                        <i class="fa-light fa-circle-xmark"></i>
                    </div>
                </div>
                <button class="clotheshop-saved-button" data-id="${item.id}">
                    ${labels.use_outfit}
                    <i class="fa-light fa-circle-check"></i>
                </button>
            </div>
        `;
        $('.clotheshop-saved').append(html);
    });
}

function updateSliders(item) {
    const variationSlider = $(".clotheshop-variation-range");
    const inputVariation = $(".variation-number")
    variationSlider.attr("max", item.maxVariation);
    inputVariation.attr("max", item.maxVariation);
    variationSlider.val(0);
    $(".variation-number").val(0);
    $(".clotheshop-selector-head-text p").eq(0).text(`${item.label} ${labels.variation}`);
    const firstSelector = $(".clotheshop-selector-item").eq(0);
    const secondSelector = $(".clotheshop-selector-item").eq(1);
    if (item.name === "arms") {
        secondSelector.removeClass('slide-in').addClass('slide-out');
        setTimeout(() => {
            firstSelector.addClass('no-margin');
            secondSelector.hide();
        }, 500);
    } else {
        firstSelector.removeClass('no-margin');
        secondSelector.removeClass('slide-out');
        secondSelector.show();
        void secondSelector[0].offsetWidth;
        const colorSlider = $(".clotheshop-selector-range");
        const inputColor = $(".color-number");
        colorSlider.attr("max", item.maxColor);
        inputColor.attr("max", item.maxColor);
        colorSlider.val(0);
        $(".color-number").val(0);
        $(".clotheshop-selector-head-text p").eq(1).text(`${item.label} ${labels.color}`);
    }
    window.currentCategory = item.name;
}

function toggleSaveModal(show) {
    isSaveModalOpen = show;
    $('.clotheshop-save-modal input').attr('placeholder', 'Name');
    $('.clotheshop-save-modal input').attr('type', 'text');
    if (show) {
        $('.clotheshop-save-modal').fadeIn(200);
        $('.clotheshop-save-modal input').val("").focus();
    } else {
        $('.clotheshop-save-modal').fadeOut(200);
        $('.clotheshop-save2-modal').fadeOut(200);
    }
}

$(document).ready(function () {
    $('.clotheshop-items, .clotheshop-saved').css('display', 'none');
    $('.clotheshop-head-button').click(function () {
        $('.clotheshop-head-button').removeClass('selected');
        $(this).addClass('selected');
        let target = $(this).data('target');
        $('.clotheshop-items, .clotheshop-saved').css('display', 'none');
        $('.' + target).css('display', 'grid');
    });
});

window.addEventListener('message', function (event) {
    const data = event.data;
    switch (data.action) {
        case 'clotheshop':
            if (data.enable) {
                $('.clotheshop-head-button').removeClass('selected');
                $('.clotheshop-head-button[data-target="clotheshop-items"]').addClass('selected');
                $('.clotheshop-saved').css('display', 'none');
                $('.clotheshop-items').css('display', 'grid');
                $('.price').text(data.price.formatMoney());
                renderCategories(data.clothes);
                $('#clotheshop').fadeIn(200).css('display', 'flex');
            } else {
                toggleSaveModal(false);
                $('#clotheshop').fadeOut(200);
            }
            break;

        case 'updateMaxColor':
            const colorSlider = $(".clotheshop-selector-range");
            colorSlider.attr("max", Number(data.max));
            colorSlider.val(0);
            $(".color-number").val(0);
            break;

        case 'setCategoryCurrentClothe':
            const colorSlider2 = $(".clotheshop-selector-range");
            colorSlider2.attr("max", Number(data.maxColor));
            colorSlider2.val(Number(data.color));
            
            const variationSlider = $(".clotheshop-variation-range");
            variationSlider.val(Number(data.variation));
            
            $(".variation-number").val(data.variation);
            $(".color-number").val(data.color);
            break;
            
        case 'addOutfits':
            renderOutfits(data.outfits);
            break;
    }
});

UI.ClickFunction('.clotheshop-button-left', function() {
    const slider = $(".clotheshop-variation-range");
    const currentVal = Number(slider.val());
    slider.val(currentVal - 1).trigger('input');
});

UI.ClickFunction('.clotheshop-button-right', function() {
    const slider = $(".clotheshop-variation-range");
    const currentVal = Number(slider.val());
    slider.val(currentVal + 1).trigger('input');
});

UI.ClickFunction('.clotheshop-selector-button-left', function() {
    const slider = $(".clotheshop-selector-range");
    const currentVal = Number(slider.val());
    slider.val(currentVal - 1).trigger('input');
});

UI.ClickFunction('.clotheshop-selector-button-right', function() {
    const slider = $(".clotheshop-selector-range");
    const currentVal = Number(slider.val());
    slider.val(currentVal + 1).trigger('input');
});

$(".clotheshop-variation-range").on("input", function() {
    const value = $(this).val();
    $(".variation-number").val(value);
    UI.PostRequest({
        action: 'clotheshop',
        data: { type: 'change', option: "variation", category: window.currentCategory, value: value },
    });
});

$(".clotheshop-selector-range").on("input", function() {
    const value = $(this).val();
    $(".color-number").val(value);
    UI.PostRequest({
        action: 'clotheshop',
        data: { type: 'change', option: "color", category: window.currentCategory, value: value },
    });
});

$(".variation-number").on("input", function() {
    const value = $(this).val();
    $(".clotheshop-variation-range").val(value);
    UI.PostRequest({
        action: 'clotheshop',
        data: { type: 'change', option: "variation", category: window.currentCategory, value: value },
    });
});

$(".color-number").on("input", function() {
    const value = $(this).val();
    $(".clotheshop-selector-range").val(value);
    UI.PostRequest({
        action: 'clotheshop',
        data: { type: 'change', option: "color", category: window.currentCategory, value: value },
    });
});

UI.ClickFunction('.clotheshop-item', function(element) {
    $('.clotheshop-item').removeClass('clotheshop-item-selected');
    element.addClass('clotheshop-item-selected');
    const categoryName = element.data('name');
    const categoryData = clothes.find(item => item.name === categoryName);
    if (categoryData) {
        updateSliders(categoryData);
    }
    UI.PostRequest({
        action: 'clotheshop',
        data: { type: 'changeCategory', category: categoryName },
    });
});

UI.ClickFunction('.clotheshop-saved-delete', function(element) {
    const outfitId = element.data('id');
    UI.PostRequest({
        action: 'clotheshop',
        data: { type: 'deleteOutfit', id: outfitId },
    });
});

const charContainer = document.getElementById('clotheshop-char');
let startX, isDragging = false;

charContainer.addEventListener('mousedown', (e) => {
    startX = e.clientX;
    isDragging = true;
    charContainer.style.cursor = 'grabbing';
    
    document.addEventListener('mousemove', handleDrag);
    document.addEventListener('mouseup', stopDrag);
});

function handleDrag(e) {
    if (!isDragging) return;
    
    const deltaX = e.clientX - startX;
    const direction = deltaX > 0 ? 'right' : 'left';
    
    UI.PostRequest({
        action: 'clotheshop',
        data: { type: 'move', move: direction },
    });
}

function stopDrag() {
    isDragging = false;
    charContainer.style.cursor = 'grab';
    document.removeEventListener('mousemove', handleDrag);
    document.removeEventListener('mouseup', stopDrag);
}

UI.ClickFunction('.clothshop-move-left', function(element) {
    UI.PostRequest({
        action: 'clotheshop',
        data: { type: 'move', move: 'left' },
    });
});

UI.ClickFunction('.clothshop-move-right', function(element) {
    UI.PostRequest({
        action: 'clotheshop',
        data: { type: 'move', move: 'right' },
    });
});

UI.ClickFunction('.clothshop-handsup', function() {
    UI.PostRequest({
        action: 'clotheshop',
        data: { type: 'handsup' },
    });
})

document.addEventListener("keydown", function(event) {
    if ($('#clotheshop').is(':visible')) {
        if (event.key === "Escape") {
            if (isSaveModalOpen) {
                toggleSaveModal(false);
                event.preventDefault();
            } else {
                $.post(`https://${GetParentResourceName()}/clotheshop`, JSON.stringify({type:'close'}));
            }
        } else if (event.key === "ArrowRight") {
            UI.PostRequest({
                action: 'clotheshop',
                data: { type: 'move', move: 'right' },
            });
        } else if (event.key === 'ArrowLeft') {
            UI.PostRequest({
                action: 'clotheshop',
                data: { type: 'move', move: 'left' },
            });
        } else if (event.key === "h") {
            UI.PostRequest({
                action: 'clotheshop',
                data: { type: 'handsup' },
            });
        }
    }
});

UI.ClickFunction('.clotheshop-save', function(element) {
    UI.PostRequest({
        action: 'clotheshop',
        data: { type: 'saverequest' },
        expectsResponse: true
    }).then(response => {
        if (response === 'changed') {
            toggleSaveModal(true);
        }
    }).catch(error => {
        console.error("Error in save request:", error);
    });
});

UI.ClickFunction('.clotheshop-save-yes', function(element) {
    const name = $('.clotheshop-save-modal input').val() || '';
    UI.PostRequest({
        action: 'clotheshop',
        data: { type: 'save', store: true, name: name },
    });
    toggleSaveModal(false);
});

UI.ClickFunction('.clotheshop-save-no', function(element) {
    toggleSaveModal(false);
    
    UI.PostRequest({
        action: 'clotheshop',
        data: { type: 'save', store: false },
    });
});

UI.ClickFunction('.clotheshop-saved-button', function(element) {
    const outfitId = element.data('id');
    UI.PostRequest({
        action: 'clotheshop',
        data: { type: 'loadOutfit', id: outfitId },
    })
});

UI.ClickFunction('.clotheshop-save-2', function(element) {
    toggleSaveModal(false);
    isSaveModalOpen = true;
    $('.clotheshop-save-modal').fadeIn(200);
    $('.clotheshop-save-modal input').val("").focus();
});