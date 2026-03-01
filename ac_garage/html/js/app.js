UI.Configurate(true);

let allVehicles = [];
let Imound = false;
let ImoundPrice = 0;
function renderVehicles(vehicles, showFavorites = false) {
    const filteredVehicles = showFavorites 
        ? vehicles.filter(vehicle => vehicle.isfav == 1) 
        : vehicles;

    UI.Empty(`.garage-vehicles`);
    UI.Destroy(`vehicles`);
    UI.ItemForEach({
        id: 'vehicles',
        appendTo: `.garage-vehicles`,
        template: `
            <div class="garage-vehicle" data-plate="{{plate}}">
                <div class="garage-vehicle-pattern">///////////////////</div>
                <div class="garage-vehicle-head">
                    <div class="garage-vehicle-head-left">
                        <h4>{{name}}</h4>
                        <p>{{plate}}</p>
                    </div>
                    <div class="garage-vehicle-head-right">
                        <button class="vehicle-edit-btn">
                            <i class="fa-sharp-duotone fa-regular fa-pen-line"></i>
                        </button>
                        <button class="vehicle-fav {{isfavClass}}">
                            <i class="fa-solid fa-star"></i>
                        </button>
                    </div>
                </div>
                <div class="garage-vehicle-image">
                    <img src="../vehicle_images/{{modelname}}.png" alt="😢 | {{modelname}}">
                </div>
                <button class="parkout-vehicle">
                    <p>{{parkoutText}}</p>
                    <i class="fa-regular fa-circle-check"></i>
                </button>
                <div class="garage-vehicle-line"></div>
            </div>
        `,
        data: filteredVehicles.map(vehicle => ({
            name: vehicle.name,
            plate: vehicle.plate,
            modelname: vehicle.modelname,
            isfavClass: vehicle.isfav == 1 ? 'active' : '',
            parkoutText: (Imound && (ImoundPrice != 0)) ? (labels.parkout + " - " + ImoundPrice + "$") : labels.parkout
        })),
        css: `
            .garage-vehicles {
                display: grid;
                grid-template-columns: 1fr 1fr 1fr;
                gap: 1vh;
                width: 100%;
                height: 60vh;
                overflow-y: auto;

                &::-webkit-scrollbar {
                    display: none;
                }
            }

            .garage-vehicle {
                height: 28vh;
                width: calc(100% - 0.4vh);
                background: var(--clr-vehicle-item-bg);
                overflow: hidden;
                display: flex;
                align-items: center;
                justify-content: space-between;
                flex-direction: column;
                border: 0.1vh solid var(--clr-vehicle-item-border);
                border-radius: 0.5vh;

                &-pattern {
                    margin: 0;
                    margin-top: -10.8vh;
                    color: #FFF;
                    font-size: 20vh;
                    font-weight: 700;
                    letter-spacing: -5.5vh;
                    mix-blend-mode: overlay;
                    line-height: 2vh;
                }

                &-head {
                    display: flex;
                    justify-content: space-between;
                    width: 90%;
                    height: 8vh;
                    margin-top: 10.5vh;
                }

                &-line {
                    width: 40%;
                    height: 1vh;
                    background: var(--clr-vehicle-item-line);
                    margin-bottom: -0.4vh;
                    border-radius: 2vh;
                }

                &-image {
                    width: 90%;
                    height: 23vh;
                    overflow: hidden;
                    margin-bottom: 1vh;
                    margin-top: 1vh;
                    display: flex;
                    align-items: center;
                    justify-content: center;

                    img {
                        max-height: 100%;
                        max-width: 100%;
                    }
                }

                &-head-left {
                    h4 {
                        font-family: 'Gilroy-Regular';
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

                &-head-right {
                    display: flex;
                    justify-content: space-between;
                    width: max-content;
                    gap: 0.5vh;

                    button {
                        height: 3vh;
                        width: 3vh;
                        display: flex;
                        align-items: center;
                        justify-content: center;
                        background-color: #FFFFFF1A;
                        border: none;
                        font-size: 1.4vh;
                    }
                }
            }

            .parkout-vehicle {
                height: 5vh;
                width: 90%;
                border: 0.1vh solid var(--clr-parkout-button-border);
                background: var(--clr-parkout-button-bg);
                box-shadow: 0px 10.45px 53.01px 0px var(--clr-parkout-button-shadow1), 0px 0px 16.91px 0px var(--clr-parkout-button-shadow2) inset;
                margin-bottom: 1vh;
                border-radius: 0.2vh;
                color: #FFF;
                font-family: 'Gilroy-Medium';
                font-size: 1.6vh;
                outline: none;
                display: flex;
                align-items: center;
                justify-content: center;
                gap: 1vh;
            }

            .vehicle-edit-btn i {
                color: var(--clr-edit-fav);
            }

            .vehicle-fav i {
                color: var(--clr-edit-fav);
            }

            .vehicle-fav.active i {
                color: var(--clr-edit-fav-active);
            }
        `
    });
}

$(document).on('click', '.vehicle-fav', function () {
    let button = $(this);
    let vehicleDiv = button.closest('.garage-vehicle');
    let plate = vehicleDiv.data('plate');
    let enable = !button.hasClass('active');
    button.toggleClass('active');
    UI.PostRequest({
        action: 'garage',
        data: {
            type: 'toggle_fav',
            enable: enable,
            plate: plate
        },
    });
    allVehicles = allVehicles.map(vehicle => {
        if (vehicle.plate === plate) {
            vehicle.isfav = enable ? 1 : 0;
        }
        return vehicle;
    });
    if ($('.garage-button').eq(1).hasClass('active')) {
        renderVehicles(allVehicles, true);
    }
});

$(document).on('click', '.parkout-vehicle', function () {
    let button = $(this);
    let vehicleDiv = button.closest('.garage-vehicle');
    let plate = vehicleDiv.data('plate');
    if (Imound == true) {
        UI.PostRequest({
            action: 'garage',
            data: {
                type: 'impound',
                plate: plate
            },
        });
    } else {
        UI.PostRequest({
            action: 'garage',
            data: {
                type: 'parkout_vehicle',
                plate: plate
            },
        });
    }
});

$(document).on('click', '.garage-button', function () {
    $('.garage-button').removeClass('active');
    $(this).addClass('active');
    const showFavorites = $(this).text().trim() === "Favoriten";
    renderVehicles(allVehicles, showFavorites);
});

window.addEventListener('message', function (event) {
    if (event.data.action === 'garage') {
        if (event.data.enable) {
            Imound = event.data.imound ?? false;
            ImoundPrice = event.data.imoundprice;
            allVehicles = event.data.vehicles;
            renderVehicles(allVehicles);
            $('#garage').fadeIn(200).css('display', 'flex');
        } else {
            $('#garage').fadeOut(200);
            $('.vehicle-edit').hide();
        }
    }
});

$(document).on('click', '.closegarage', function () {
    UI.PostRequest({
        action: 'garage',
        data: { type: 'close' },
    });
});

$(document).on('click', '.vehicle-edit-btn', function () {
    let vehicleDiv = $(this).closest('.garage-vehicle');
    let plate = vehicleDiv.data('plate');
    $('.vehicle-edit-body input').val('');
    $('.vehicle-edit-title p').text(`${plate} bearbeiten`);
    $('.vehicle-edit').fadeIn(200);
    $('.vehicle-edit').data('plate', plate);
});

$(document).on('click', '.vehicle-edit-close', function () {
    $('.vehicle-edit').fadeOut(200);
});
    
$(document).on('click', '.vehicle-edit-save', function () {
    let newName = $('.vehicle-edit-body input').val();
    let plate = $('.vehicle-edit').data('plate');
    if (newName.length > 0 && newName.length < 35) {
        UI.PostRequest({
            action: 'garage',
            data: {
                type: 'edit',
                plate: plate,
                newName: newName
            }
        });
        allVehicles = allVehicles.map(vehicle => {
            if (vehicle.plate === plate) {
                vehicle.name = newName;
            }
            return vehicle;
        });
        renderVehicles(allVehicles, $('.garage-button').eq(1).hasClass('active'));
        $('.vehicle-edit').fadeOut(200);
    }
});

document.addEventListener("keydown", function(event) {
    if (event.key === "Escape") {
        $.post(`https://${GetParentResourceName()}/garage`, JSON.stringify({type:'close'}));
    }
});

UI.Create({
    id: 'garage',
    html: `
        <div class="pattern">////////////////////////////////////////////</div>
        <div class="garage-head">
            <div class="ui-header-title">
                <img src="./img/logo.png" alt="" class="ui-header-logo">
                <div class="ui-header-title-text">
                    <h3>{{server1}}</h3>
                    <h4>{{server2}}</h4>
                </div>
            </div>
            <div class="ui-header-user-info">
                <div class="ui-header-info">
                    <button class="garage-button active">{{tab_vehicles}}</button>
                    <button class="garage-button">{{tab_favorites}}</button>
                </div>
            </div>
            <div class="ui-header-close closegarage">
                <div class="ui-header-exit">{{exit}}</div>
                <div class="ui-header-esc">ESC</div>
            </div>
        </div>
        <div class="garage-line"></div>
        <div class="garage-body">
            <div class="garage-vehicles">
            </div>
        </div>
        <div class="vehicle-edit">
            <div class="vehicle-edit-box">
                <div class="vehicle-edit-title">
                    <p>X123ACS bearbeiten</p>
                    <button class="vehicle-edit-close">
                        <i class="fa-solid fa-times"></i>
                    </button>
                </div>
                <div class="vehicle-edit-body">
                    <input type="text" placeholder='{{new_name}}' maxlength="35" minlength="1">
                    <button class="vehicle-edit-save">{{save}}</button>
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
            margin-top: 6.5vh;
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

        #garage {
            position: fixed;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%) scale(90%);
            width: 83vh;
            padding: 4.5vh;
            gap: 2vh;
            border-radius: 1vh;
            background: var(--clr-bg);
            display: none;
            align-items: center;
            flex-direction: column;
            overflow: hidden;
            
            .garage-line {
                width: 100%;
                height: 0.1vh;
                background: rgba(255, 255, 255, 0.281);
            }
            
            .garage-body {
                display: flex;
                align-items: center;
                justify-content: space-between;
                gap: 1vh;
                width: 100%;
            }

            .garage-head {
                width: 100%;
                margin-top: -5vh;
                display: flex;
                align-items: center;
                justify-content: space-between;
            }

        }

        .garage-button {
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
            transition: 200ms;

            &:hover,
            &.active {
                border: 0.1vh solid var(--clr-title-button-active-border);
                background: var(--clr-title-button-active);
                color: white;
            }
        }

        .vehicle-edit {
            position: fixed;
            height: calc(100% + 5vh);
            width: 100%;
            background-color: var(--clr-modal-bg);
            border-radius: 1vh;
            display: none;
            margin-top: -5vh;

            &-box {
                position: absolute;
                top: 50%;
                left: 50%;
                transform: translate(-50%, -50%);
                background: var(--clr-modal-box);
                border: 0.1vh solid rgba(255, 255, 255, 0.17);
                width: 30vh;
                padding: 1vh;
                border-radius: 0.5vh;
            }

            &-title {
                display: flex;
                align-items: center;
                justify-content: space-between;
                width: 100%;
                margin-bottom: 1vh;

                p {
                    font-family: 'Gilroy-Medium';
                    font-size: 2vh;
                    color: #fff;
                    margin: 0;
                }
            }

            &-close {
                height: 2.5vh;
                width: 2.5vh;
                display: flex;
                align-items: center;
                justify-content: center;
                background-color: #FFFFFF1A;
                border: none;
                font-size: 1.2vh;
                cursor: pointer;
                color: rgb(187, 187, 187);
            }

            &-body {
                display: flex;
                align-items: center;
                justify-content: space-between;
                width: 100%;

                input {
                    width: 70%;
                    height: 2.8vh;
                    padding: 0.5vh 1vh;
                    outline: none;
                    border-top-left-radius: 0.2vh;
                    border-bottom-left-radius: 0.2vh;
                    background-color: rgba(255, 255, 255, 0.1);
                    border: 0.1vh solid rgba(255, 255, 255, 0.2);
                    font-family: 'Gilroy-Regular';
                    color: white;
                    font-size: 1.5vh;
                    resize: none;
                }

                button {
                    width: 30%;
                    height: 3.9vh;
                    border: 0.1vh solid var(--clr-save-button-border);
                    background: var(--clr-save-button-bg);
                    box-shadow: 0px 10.45px 53.01px 0px var(--clr-save-button-shadow1), 0px 0px 16.91px 0px var(--clr-save-button-shadow2) inset;
                    border-top-right-radius: 0.2vh;
                    border-bottom-right-radius: 0.2vh;
                    color: #FFF;
                    font-family: 'Gilroy-Medium';
                    font-size: 1.6vh;
                    outline: none;
                }
            }
        }
    `
});
UI.BindData("garage", labels);