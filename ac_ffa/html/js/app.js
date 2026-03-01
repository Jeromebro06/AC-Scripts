UI.Create({
    id: 'ffa',
    html: `
        <div class="pattern">////////////////////////////////////////////</div>
        <div class="ffa-head">
            <div class="ui-header-title">
                <img src="./img/logo.png" alt="" class="ui-header-logo">
                <div class="ui-header-title-text">
                    <h3>{{server1}}</h3>
                    <h4>{{server2}}</h4>
                </div>
            </div>
            <div class="ui-header-user-info">
                <div class="ui-header-info">
                    <button class="ffa-button active" data-tab="lobbys">{{tab_lobbys}}</button>
                    <button class="ffa-button" data-tab="custom">{{tab_custom}}</button>
                    <button class="ffa-button" data-tab="statics">{{tab_statics}}</button>
                </div>
            </div>
            <div class="ui-header-close closeffa">
                <div class="ui-header-exit">{{exit}}</div>
                <div class="ui-header-esc">ESC</div>
            </div>
        </div>
        <div class="ffa-line"></div>
        <div class="ffa-body">
            <div class="ffa-lobbys">
            </div>
            <div class="ffa-custom">
                <button class="ffa-custom-create">
                    <p>{{create_custom}}</p>
                    <i class="fa-solid fa-plus"></i>
                </button>
                <div class="ffa-custom-password">
                    <div class="ffa-custom-title-bar">
                        <div class="ffa-custom-title">
                            <div class="quick-options-quader"></div>
                            <p>{{password_title}}</p>
                        </div>
                        <button class="ffa-custom-close">
                            <i class="fa-solid fa-times"></i>
                        </button>
                    </div>
                    <input type="text" class="custom-get-pw" placeholder="Password">
                    <button class="ffa-custom-join-lobby">
                        {{join}}
                        <i class="fa-solid fa-play"></i>
                    </button>
                </div>
                <div class="ffa-custom-popout">
                    <div class="ffa-custom-title-bar">
                        <div class="ffa-custom-title">
                            <div class="quick-options-quader"></div>
                            <p>{{custom_title}}</p>
                        </div>
                        <button class="ffa-custom-close">
                            <i class="fa-solid fa-times"></i>
                        </button>
                    </div>
                    <div class="custom-maps-wrapper">
                        <div class="custom-maps-selected" data-selected="">
                            <span class="selected-text">Map auswählen</span>
                            <i class="fa-solid fa-chevron-down"></i>
                        </div>
                        <ul class="custom-maps-dropdown">
                        </ul>
                    </div>
                    <input type="number" class="custom-slots" min=2 max=40 placeholder="Max Spieler" value=2>
                    <input type="text" class="custom-pw" placeholder="Password">
                    <ul class="custom-weapons">
                    </ul>
                    <div class="ffa-custom-bodyshot">
                        <input class="ffa-bodyshot" type="checkbox" name="ffa-bodyshot">
                        <label for="ffa-bodyshot">{{bodyshot}}</label>
                    </div>
                    <button class="ffa-custom-create-lobby">
                        {{create_lobby}}
                        <i class="fa-solid fa-plus"></i>
                    </button>
                </div>
                <div class="ffa-custom-lobbys">
                </div>
            </div>
            <div class="ffa-stats_2">
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
                    color: #FFF;
                    text-shadow: 0px 0px 53.3px rgba(255, 255, 255, 0.25);
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

        #ffa {
            position: fixed;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%) scale(90%);
            width: 93vh;
            padding: 4.5vh;
            gap: 2vh;
            border-radius: 1vh;
            background: var(--clr-bg);
            display: none;
            align-items: center;
            flex-direction: column;
            overflow: hidden;
        }

        .ffa-custom {
            display: none;
            width: 100%;
            height: 100%;
            flex-direction: column;
            align-items: center;
            justify-content: center;
        }

        .ffa-custom-lobbys {
            display: grid;
            grid-template-columns: 1fr 1fr 1fr;
            gap: 1vh;
            width: 100%;
            height: 56.5vh;
            overflow-y: auto;
        }

        .ffa-custom-lobbys::-webkit-scrollbar {
            display: none;
        }

        .ffa-lobbys::-webkit-scrollbar {
            display: none;
        }

        .ffa-stats_2::-webkit-scrollbar {
            display: none;
        }

        .ffa-custom-create {
            background: rgba(255, 255, 255, 0.2);
            border: none;
            outline: none;
            display: flex;
            align-items: center;
            justify-content: center;
            color: rgba(255, 255, 255, 0.5);
            font-size: 1.5vh;
            gap: 1vh;
            border-radius: 0.2vh;
            padding: 1vh;
        }

        .ffa-custom-create p {
            margin: 0;
        }

        .ffa-stats_2 {
            display: none;
            width: 100%;
            height: 60vh;
            gap: 1vh;
            align-items: center;
            flex-direction: column;
            overflow-y: auto;
        }

        .ffa-line {
            width: 100%;
            height: 0.1vh;
            background: rgba(255, 255, 255, 0.281);
        }

        .ffa-body {
            display: flex;
            align-items: center;
            justify-content: space-between;
            gap: 1vh;
            width: 100%;
        }

        .ffa-head {
            width: 100%;
            margin-top: -5vh;
            display: flex;
            align-items: center;
            justify-content: space-between;
        }

        .ffa-button {
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

        .ffa-lobby {
            height: 26vh;
            width: calc(100% - 0.4vh);
            background: rgba(255, 255, 255, 0.02);
            overflow: hidden;
            display: flex;
            align-items: center;
            justify-content: space-between;
            flex-direction: column;
            border: 0.1vh solid var(--lobby-border);
            border-radius: 0.5vh;

            &-image {
                width: 90%;
                height: 13vh;
                border-radius: 0.5vh;
            }

            &-button {
                width: 90%;
                display: flex;
                justify-content: space-between;
                align-items: center;
                margin-bottom: 1vh;
            }
        }

        .ffa-item-title {
            display: flex;
            align-items: center;
            margin-top: 10vh;
            gap: 1vh;
            width: calc(90% - 2vh);
            padding: 1vh;
            background: rgba(0, 0, 0, 0.38);
            border-radius: 0.2vh;

            p {
                margin: 0;
                color: #FFF;
                font-family: 'Gilroy-Medium';
                font-size: 1.7vh;
                letter-spacing: -0.1vh;
            }
        }

        .ffa-players {
            width: 18%;
            height: 4vh;
            border-radius: 1.9px;
            display: flex;
            align-items: center;
            justify-content: center;
            font-size: 2vh;
            background: var(--player-count-bg);
            box-shadow: 0px 10.45px 53.01px 0px var(--player-count-shadow1), 0px 0px 16.91px 0px var(--player-count-shadow2) inset;
            color: #FFF;
            text-shadow: 0px 0px 21.9px rgba(255, 255, 255, 0.45);
            font-family: 'Gilroy-Bold';
            font-size: 1.3vh;
        }

        .join-ffa-lobby {
            width: 80%;
            display: flex;
            align-items: center;
            justify-content: center;
            height: 4vh;
            border-radius: 0.2vh;
            border: 0.1vh solid rgba(255, 255, 255, 0.10);
            background: rgba(255, 255, 255, 0.05);
            color: rgba(255, 255, 255, 0.75);
            font-family: 'Gilroy';
            font-size: 1.6vh;
            font-weight: 500;
            outline: none;
        }

        .ffa-lobby-pattern {
            margin: 0;
            margin-top: -10.8vh;
            color: #FFF;
            font-size: 20vh;
            font-weight: 700;
            letter-spacing: -5.5vh;
            mix-blend-mode: overlay;
            line-height: 2vh;
        }

        .ffa-lobbys {
            display: grid;
            grid-template-columns: 1fr 1fr 1fr;
            gap: 1vh;
            width: 100%;
            height: 60vh;
            overflow-y: auto;
        }

        .ffa-custom-popout, .ffa-custom-password {
            position: fixed;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%) scale(100%);
            border: 0.1vh solid rgba(255, 255, 255, 0.17);
            background: var(--clr-custom-modal-bg);
            height: max-content;
            width: max-content;
            border-radius: 0.5vh;
            display: none;
            flex-direction: column;
            align-items: center;
            justify-content: space-between;
            padding: 1vh;
            width: 35vh;
            padding: 1vh;
            gap: 1vh;
        }

        .ffa-custom-title {
            display: flex;
            align-items: center;
            gap: 1vh;
            width: calc(100% - 2vh);
            background: rgba(0, 0, 0, 0.45);
            border-radius: 0.2vh;
            padding: 1vh;
        }

        .ffa-custom-title p {
            margin: 0;
            color: #FFF;
            font-family: 'Gilroy-Medium';
            font-size: 1.7vh;
            letter-spacing: -0.1vh;
        }

        .custom-slots, .custom-pw, .custom-get-pw {
            width: calc(100% - 2vh);
            padding: 1vh;
            outline: none;
            border: 0.1vh solid rgba(255, 255, 255, 0.12);
            color: white;
            background-color: rgba(255, 255, 255, 0.126);
            border-radius: 0.2vh;
            text-align: center;
        }

        .custom-weapons {
            width: calc(100% - 2vh);
            padding: 1vh;
            outline: none;
            border: 0.1vh solid rgba(255, 255, 255, 0.12);
            color: white;
            background-color: rgba(255, 255, 255, 0.126);
            border-radius: 0.2vh;
            list-style: none;
            margin: 0;
            max-height: 15vh;
        }

        .ffa-custom-create-lobby, .ffa-custom-join-lobby {
            height: 4.5vh;
            width: 100%;
            border: 0.1vh solid var(--clr-create-custom-border);
            background: var(--clr-create-custom-bg);
            box-shadow: 0px 10.45px 53.01px 0px var(--clr-create-custom-shadow1), 0px 0px 16.91px 0px var(--clr-create-custom-shadow2) inset;
            border-radius: 0.2vh;
            color: #FFF;
            font-family: 'Gilroy-Medium';
            font-size: 1.7vh;
            display: flex;
            align-items: center;
            justify-content: center;
            gap: 1vh;
        }

        .ffa-custom-bodyshot {
            width: calc(100% - 2vh);
            padding: 1vh;
            outline: none;
            border: 0.1vh solid rgba(255, 255, 255, 0.12);
            color: white;
            background-color: rgba(255, 255, 255, 0.126);
            border-radius: 0.2vh;
            list-style: none;
            margin: 0;
        } 

        .ffa-custom-title-bar {
            display: flex;
            width: 100%;
            height: 4vh;
            gap: 0.5vh;
            align-items: center;
            justify-content: space-between;
        }

        .ffa-custom-close {
            border: none;
            outline: none;
            width: 4.1vh;
            height: 4.1vh;
            background: rgba(0, 0, 0, 0.45);
            border-radius: 0.2vh;
            display: flex;
            align-items: center;
            justify-content: center;
            color: white;
            cursor: pointer;
        }

        .ffa-stat {
            width: 100%;
            height: 4vh;
            border-radius: 0.3vh;
            background-color: rgba(255, 255, 255, 0.1);
            display: flex;
            align-items: center;
            justify-content: space-between;
            gap: 1vh;
            padding: 1vh;
        }

        .ffa-stat-line {
            height: 100%;
            width: 0.5vh;
            border-radius: 100vh;
            background: var(--clr-ffa-stat-line-default);
        }

        .gold {
            background-color: #FFD700;
        }
        
        .silver {
            background-color: #C0C0C0;
        }

        .bronze {
            background-color: #CD7F32;
        }

        .ffa-stat-content {
            width: 99%;
            display: flex;
            align-items: center;
            justify-content: space-between;
            gap: 1vh;
            height: 100%;

            h6 {
                margin: 0;
                color: white;
                font-family: 'Gilroy-Medium';
                font-size: 2vh;
            }
        }

        .ffa-stats-data {
            width: max-content;
            display: flex;
            align-items: center;
            gap: 1vh;
            color: white;
            font-family: 'Gilroy';
            font-size: 1.8vh;
            margin-right: 1vh;

            p {
                width: 13vh;
                display: flex;
                align-items: center;
                justify-content: center;
                gap: 1vh;
                background-color: rgba(255, 255, 255, 0.1);
                height: 4vh;
                overflow: hidden;
            }
        }
    `
});

function renderLobbys(lobbys) {
    const normalLobbys = lobbys.filter(lobby => (lobby.ffatype || '').toLowerCase() !== 'custom');
    const customLobbys = lobbys.filter(lobby => (lobby.ffatype || '').toLowerCase() === 'custom');
    renderLobbySection(normalLobbys, '.ffa-lobbys', 'lobbys');
    renderLobbySection(customLobbys, '.ffa-custom-lobbys', 'customLobbys');
}

function renderLobbySection(lobbys, containerClass, sectionId) {
    UI.Empty(containerClass);
    UI.Destroy(sectionId);
    if (lobbys.length === 0) return;
    UI.ItemForEach({
        id: sectionId,
        appendTo: containerClass,
        template: `
            <div class="ffa-lobby">
                <div class="ffa-lobby-pattern">///////////////////</div>
                <div class="ffa-item-title">
                    <div class="quick-options-quader"></div>
                    <p>{{name}}</p>
                </div>
                <img src="./img/{{image}}" alt="" class="ffa-lobby-image">
                <div class="ffa-lobby-button">
                    <div class="ffa-players">
                        <p>{{players}} / {{slots}}</p>
                    </div>
                    <button class="join-ffa-lobby" data-lobby="{{key}}" data-pw="{{pw}}">
                        {{join}}
                    </button>
                </div>
            </div>
        `,
        data: lobbys.map(lobby => ({
            name: lobby.name,
            players: lobby.players.length,
            slots: lobby.slots,
            image: lobby.image,
            key: lobby.key,
            isfull: lobby.isfull == 1 ? 'active' : '',
            pw: lobby.password,
            join: labels.join
        })),
    });
}

function renderCustomMaps(maps) {
    UI.Empty('.custom-maps-dropdown');
    UI.ItemForEach({
        id: 'custom-maps-items',
        appendTo: '.custom-maps-dropdown',
        template: `
            <li data-value="{{value}}">{{name}}</li>
        `,
        data: maps,
    });
}

function renderStatics(statics) {
    const sortedStatics = [...statics].sort((a, b) => {
        return b.kills - a.kills || b.kd - a.kd;
    });
    const processedStatics = sortedStatics.map((stat, i) => {
        const rank = i + 1;
        let rankcolor = '';
        if (rank === 1) {
            rankcolor = 'gold';
        } else if (rank === 2) {
            rankcolor = 'silver';
        } else if (rank === 3) {
            rankcolor = 'bronze';
        }
        return {
            name: stat.name,
            index: rank,
            kills: stat.kills,
            deaths: stat.deaths,
            kd: stat.kd.toFixed(2),
            rankcolor: rankcolor
        };
    });
    UI.Empty('.ffa-stats_2')
    UI.ItemForEach({
        id: 'statics',
        appendTo: '.ffa-stats_2',
        template: `
            <div class="ffa-stat">
                <div class="ffa-stat-line {{rankcolor}}"></div>
                <div class="ffa-stat-content">
                    <h6>{{name}}</h6>
                    <div class="ffa-stats-data">
                        <p>${labels.place}: {{index}}</p>
                        <p>${labels.kills}: {{kills}}</p>
                        <p>${labels.deaths}: {{deaths}}</p>
                        <p>K/D: {{kd}}</p>
                    </div>
                </div>
            </div>
        `,
        data: processedStatics,
    })
}

window.addEventListener('message', function (event) {
    if (event.data.action === 'ffa') {
        if (event.data.enable) {
            renderLobbys(event.data.lobbys);
            renderStatics(event.data.stats);
            renderCustomMaps(event.data.maps);
            $('#ffa').fadeIn(200).css('display', 'flex');
        } else {
            $('#ffa').fadeOut(200);
        }
    } else if (event.data.action === 'updateffa') {
        renderLobbys(event.data.lobbys);
    } else if (event.data.action === 'ffastats') {
        if (event.data.enable) {
            UI.BindData("ffastats", { 
                kills: event.data.kills || 0,  
                deaths: event.data.deaths || 0, 
                kd: event.data.kd.toFixed(2) || 0.00
            });
            $('#ffastats').fadeIn(200).css('display', 'flex');
        } else {
            $('#ffastats').fadeOut(200);
            resetFFAForm();
        }
    } else if (event.data.action == 'updateFFAStats') {
        document.querySelector('.ffa-kills').innerHTML = event.data.kills;
        document.querySelector('.ffa-deaths').innerHTML = event.data.deaths;
        document.querySelector('.ffa-kd').innerHTML = event.data.kd.toFixed(2);        
    } else if (event.data.action == 'ffa-aufnahme') {
        if (event.data.enable) {
            $('#aufnahmepflicht').fadeIn(200).css('display', 'flex');
        } else {
            $('#aufnahmepflicht').fadeOut(200);
        }
    }
});

UI.ClickFunction('.join-ffa-lobby', function($button, data) {
    const key = data.lobby;
    const pw = data.pw;
    if (pw && pw !== '') {
        $('.ffa-custom-password').fadeIn(200).css('display', 'flex');
        $('.ffa-custom-join-lobby').data('lobby-key', key);
    } else {
        UI.PostRequest({
            action: 'ffa',
            data: {
                type: 'join',
                key: key
            },
        });
    }
});

UI.ClickFunction('.ffa-custom-join-lobby', function($button) {
    const key = $button.data('lobby-key');
    const password = $('.custom-get-pw').val();
    
    UI.PostRequest({
        action: 'ffa',
        data: {
            type: 'join',
            key: key,
            password: password
        },
    });
    $('.ffa-custom-password').fadeOut(200);
    $('.custom-get-pw').val('');
});

UI.ClickFunction('.ffa-custom-create', function() {
    $('.ffa-custom-popout').fadeIn(200).css('display', 'flex');
});

UI.ClickFunction('.closeffa', function() {
    UI.PostRequest({
        action: 'ffa',
        data: {
            type: 'close',
        },
    });
});

UI.ClickFunction('.ffa-button', function($button) {
    resetFFAForm();
    $('.ffa-button').removeClass('active');
    $button.addClass('active');
    $('.ffa-lobbys, .ffa-custom, .ffa-stats_2').hide();
    const tabType = $button.data('tab');
    switch(tabType) {
        case 'lobbys':
            $('.ffa-lobbys').css('display', 'grid');
            break;
        case 'custom':
            $('.ffa-custom').css('display', 'flex');
            break;
        case 'statics':
            $('.ffa-stats_2').css('display', 'flex');
            break;
        default:
            console.warn(`Unbekannter Tab-Typ: ${tabType}`);
    }
});

UI.ClickFunction('.ffa-custom-close', function() {
    $('.ffa-custom-popout').fadeOut(200);
    $('.ffa-custom-password').fadeOut(200);
    $('.custom-get-pw').val('');
});

UI.ClickFunction('.ffa-custom-create-lobby', function() {
    const selectedMap = $('.custom-maps-selected').data('selected');
    const slots = parseInt($('.custom-slots').val());
    const password = $('.custom-pw').val();
    const bodyshot = $('.ffa-bodyshot').is(":checked");
    const selectedWeapons = [];
    $('.ffa-slot:checked').each(function() {
        selectedWeapons.push($(this).val());
    });
    UI.PostRequest({
        action: 'ffa',
        data: {
            type: 'create',
            map: selectedMap,
            slots: slots,
            weapons: selectedWeapons,
            password: password,
            bodyshot: bodyshot || false,
        },
    });
    resetFFAForm();
});

function resetFFAForm() {
    $('.custom-maps-selected .selected-text').text('Map auswählen');
    $('.custom-maps-selected').data('selected', '').removeClass('open');
    $('.custom-maps-dropdown').fadeOut(200);
    $('.custom-maps-dropdown li').removeClass('selected');
    $('.custom-slots').val(2);
    $('.ffa-slot').prop('checked', false);
    $('.ffa-custom-popout').fadeOut(200);
    $('.ffa-custom-password').fadeOut(200);
    $('.custom-get-pw').val('');
    $('.custom-pw').val('');
    $('.ffa-bodyshot').prop('checked', false);
}

UI.ClickFunction('.custom-maps-selected', function($button) {
    const $wrapper = $button.closest('.custom-maps-wrapper');
    const $dropdown = $wrapper.find('.custom-maps-dropdown');
    const isOpen = $button.hasClass('open');
    if (isOpen) {
        $button.removeClass('open');
        $dropdown.fadeOut(200);
    } else {
        $button.addClass('open');
        $dropdown.fadeIn(200);
    }
});

UI.ClickFunction('.custom-maps-dropdown li', function($item) {
    const mapName = $item.text();
    const mapValue = $item.data('value');
    $('.custom-maps-dropdown li').removeClass('selected');
    $item.addClass('selected');
    $('.custom-maps-selected .selected-text').text(mapName);
    $('.custom-maps-selected').data('selected', mapValue);
    $('.custom-maps-selected').removeClass('open');
    $('.custom-maps-dropdown').fadeOut(200);
});
$(document).click(function(e) {
    if (!$(e.target).closest('.custom-maps-wrapper').length) {
        $('.custom-maps-selected').removeClass('open');
        $('.custom-maps-dropdown').fadeOut(200);
    }
});


UI.Create({
    id: 'ffastats',
    html: `
        <div class="ffa-statbox">
            <div class="ffa-stat-head">
                <i class="fa-solid fa-skull"></i>
                <p class="ffa-kills">{{kills}}</p>
            </div>
            <p>Kills</p>
        </div>
        <div class="ffa-statbox-2">
            <img src="./img/logo.png">
            <p class="ffa-kd">{{kd}}</p>
        </div>
        <div class="ffa-statbox-3">
            <div class="ffa-stat-head">
                <p class="ffa-deaths">{{deaths}}</p>
                <i class="fa-solid fa-skull"></i>
            </div>
            <p>Deaths</p>
        </div>
    `,
    css: `
        #ffastats {
            position: fixed;
            bottom: 2vh;
            right: 50%;
            transform: translateX(50%);
            display: none;
            align-items: center;
            animation: slideUp 1s ease forwards;
            background: var(--clr-ffa-stats-bg);
            box-shadow: 0px 10.45px 53.01px 0px var(--clr-ffa-stats-shadow1), 0px 0px 16.91px 0px var(--clr-ffa-stats-shadow2) inset;
            gap: 1vh;
            padding: 0.5vh 1vh;
            border-radius: 0.5vh;
        }

        .ffa-statbox {
            height: max-content;
            width: 6vh;
            display: flex;
            justify-content: center;
            flex-direction: column;
            align-items: flex-start;
        }

        .ffa-statbox-2 {
            height: 5vh;
            width: 6vh;
            display: flex;
            justify-content: center;
            flex-direction: column;
            align-items: center;
        }

        .ffa-statbox-3 {
            height: max-content;
            width: 6vh;
            display: flex;
            justify-content: center;
            flex-direction: column;
            align-items: flex-end;
        }

        .ffa-statbox p, .ffa-statbox-3 p {
            margin: 0;
            color: white;
        }

        .ffa-statbox-2 p {
            margin: 0;
            color: white;
            font-size: 1.7vh;
            margin-bottom: 3.5vh;
        }

        .ffa-statbox-2 img {
            height: 3vh;
            margin-bottom: 0.2vh;
        }

        .ffa-stat-head {
            display: flex;
            align-items: center;
            justify-content: center;
            gap: 1vh;
            font-size: 1.5vh;
        }

        .ffa-statbox i, .ffa-statbox-3 i {
            background: rgba(0, 0, 0, 0.45);
            padding: 0.4vh;
            font-size: 1.1vh;
            border-radius: 0.2vh;
        }
    `,
});

UI.Create({
    id: 'aufnahmepflicht',
    html: `
        <div id="aufnahmepflicht-pattern">///////////////////</div>
        <p>${labels.perm_clip}</p>
        <button class="aufnahme-btn">${labels.accept}</button>
    `,
    css: `
    #aufnahmepflicht {
        position: fixed;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        width: 35vh;
        padding: 2.5vh;
        gap: 2vh;
        border-radius: 1vh;
        background: var(--clr-bg);
        display: none;
        align-items: center;
        flex-direction: column;
        overflow: hidden;

        p {
            width: 100%;
            margin: 0;
            margin-top: 10vh;
            font-size: 2.5vh;
            color: rgba(255, 255, 255, 0.343);
            font-family: 'Gilroy-Bold';
            text-align: center;
        }

        button {
            height: 4.5vh;
            width: 100%;
            border: 0.1vh solid var(--clr-create-custom-border);
            background: var(--clr-create-custom-bg);
            box-shadow: 0px 10.45px 53.01px 0px var(--clr-create-custom-shadow1), 0px 0px 16.91px 0px var(--clr-create-custom-shadow2) inset;
            border-radius: 0.2vh;
            color: #ffffffa5;
            font-family: 'Gilroy-Bold';
            font-size: 2vh;
            display: flex;
            align-items: center;
            justify-content: center;
            gap: 1vh;
        }

        &-pattern {
            margin-top: -13vh;
            color: #FFF;
            font-size: 20vh;
            font-weight: 700;
            letter-spacing: -5.5vh;
            mix-blend-mode: overlay;
            line-height: 2vh;
        }
    }
    `
});

UI.ClickFunction('.aufnahme-btn', function() {
    UI.PostRequest({
        action: 'ffa',
        data: {
            type: 'aufnahme',
        },
    });
});

document.addEventListener("keydown", function(event) {
    if (event.key === "Escape") {
        $.post(`https://${GetParentResourceName()}/ffa`, JSON.stringify({type:'close'}));
    }
});

UI.ItemForEach({
    id: 'custom-weapons',
    template: `
        <li>
            <input class="ffa-slot" type="checkbox" name="ffa-slot" value='{{name}}'>
            <label for="ffa-slot">{{label}}</label>
        </li>
    `,
    data: customWeapons,
    appendTo: '.custom-weapons'
});

UI.BindData('ffa', labels);

UI.Css(`
    input[type="checkbox"] {
        appearance: none;
        width: 2vh;
        height: 2vh;
        border: 0.15vh solid rgba(255, 255, 255, 0.3);
        border-radius: 0.3vh;
        background-color: rgba(255, 255, 255, 0.05);
        cursor: pointer;
        position: relative;
        transition: all 0.3s ease;
        flex-shrink: 0;
    }

    input[type="checkbox"]:hover {
        border-color: var(--clr-title-button-active-border);
        background-color: rgba(255, 255, 255, 0.1);
        box-shadow: 0 0 0 0.1vh rgba(66, 41, 255, 0.2);
    }

    input[type="checkbox"]:checked {
        background-color: var(--clr-title-button-active);
        border-color: var(--clr-title-button-active-border);
        box-shadow: 0px 5px 15px rgba(66, 41, 255, 0.4);
    }

    input[type="checkbox"]:checked::after {
        content: '✓';
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        color: white;
        font-size: 1.2vh;
        font-weight: bold;
        text-shadow: 0 0 5px rgba(255, 255, 255, 0.8);
    }

    .ffa-custom-bodyshot label, .custom-weapons label {
        color: rgba(255, 255, 255, 0.85);
        font-family: 'Gilroy-Medium';
        font-size: 1.6vh;
        user-select: none;
        transition: color 0.2s ease;
        margin: 0;
    }

    .custom-weapons li, .ffa-custom-bodyshot {
        display: flex;
        align-items: center;
        gap: 1vh;
    }

    .custom-weapons::-webkit-scrollbar {
        width: 0.4vh;
    }

    .custom-weapons::-webkit-scrollbar-track {
        background: rgba(255, 255, 255, 0.05);
        border-radius: 1vh;
    }

    .custom-weapons::-webkit-scrollbar-thumb {
        background: var(--clr-title-button-active-border);
        border-radius: 1vh;
    }

    .custom-weapons::-webkit-scrollbar-thumb:hover {
        background: var(--clr-title-button-active);
    }

    .custom-maps-wrapper {
        position: relative;
        width: 100%;
    }

    .custom-maps-selected {
        width: calc(100% - 2vh);
        padding: 1vh;
        cursor: pointer;
        outline: none;
        border: 0.1vh solid rgba(255, 255, 255, 0.12);
        color: white;
        background-color: rgba(255, 255, 255, 0.126);
        border-radius: 0.2vh;
        font-family: 'Gilroy-Medium';
        font-size: 1.6vh;
        transition: all 0.3s ease;
        display: flex;
        justify-content: space-between;
        align-items: center;
    }

    .custom-maps-selected:hover {
        border-color: var(--clr-title-button-active-border);
        background-color: rgba(255, 255, 255, 0.15);
    }

    .custom-maps-selected i {
        transition: transform 0.3s ease;
    }

    .custom-maps-selected.open i {
        transform: rotate(180deg);
    }

    .custom-maps-dropdown {
        position: absolute;
        top: 100%;
        left: 0;
        width: 100%;
        max-height: 20vh;
        overflow-y: auto;
        background-color: var(--clr-custom-modal-bg);
        border: 0.1vh solid rgba(255, 255, 255, 0.12);
        border-top: none;
        border-radius: 0 0 0.2vh 0.2vh;
        list-style: none;
        margin: 0;
        padding: 0;
        z-index: 1000;
        display: none;
    }

    .custom-maps-dropdown li {
        padding: 1vh;
        font-family: 'Gilroy-Medium';
        font-size: 1.6vh;
        color: white;
        cursor: pointer;
        transition: background-color 0.2s ease;
        border-bottom: 0.05vh solid rgba(255, 255, 255, 0.05);
    }

    .custom-maps-dropdown li:last-child {
        border-bottom: none;
    }

    .custom-maps-dropdown li:hover {
        background-color: rgba(255, 255, 255, 0.1);
    }

    .custom-maps-dropdown li.selected {
        background-color: var(--clr-title-button-active);
        color: white;
    }

    .custom-maps-dropdown::-webkit-scrollbar {
        width: 0.4vh;
    }

    .custom-maps-dropdown::-webkit-scrollbar-track {
        background: rgba(255, 255, 255, 0.05);
    }

    .custom-maps-dropdown::-webkit-scrollbar-thumb {
        background: var(--clr-title-button-active-border);
        border-radius: 1vh;
    }
`)