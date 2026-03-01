UI.Configurate(true);

UI.Create({
    id: 'moneywash',
    html: `
        <div class="pattern">////////////////////////////////////////////</div>
        <div class="ui-header">
            <div class="ui-header-title">
                <img src="./img/logo.png" alt="" class="ui-header-logo">
                <div class="ui-header-title-text">
                    <h3>{{server1}}</h3>
                    <h4>{{server2}}</h4>
                </div>
            </div>
            <div class="ui-header-close closemoneywash">
                <div class="ui-header-exit">{{exit}}</div>
                <div class="ui-header-esc">ESC</div>
            </div>
        </div>
        <div class="moneywash-input-container">
            <input type="number" class="moneywash-amount-input" placeholder="{{ammount}}" />
            <button class="moneywash-deposit-btn">{{deposit}}</button>
        </div>
        <div class="moneywash-fee-container">
            <div class="moneywash-fee-buttons">
                <button class="moneywash-fee-btn active" data-fee="10">10%</button>
                <button class="moneywash-fee-btn" data-fee="25">25%</button>
                <button class="moneywash-fee-btn" data-fee="35">35%</button>
                <button class="moneywash-fee-btn" data-fee="50">50%</button>
            </div>
        </div>
        <div class="moneywash-processing-info">
            <p class="moneywash-processing-title">{{proccessingtime}}:</p>
            <div class="moneywash-processing-time">
                <span id="process-minutes">60</span> {{minutes}}
            </div>
            <p class="moneywash-processing-note">{{info}}</p>
        </div>
        <div class="moneywash-processes">
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
            margin-bottom: 9vh;
            color: #FFF;
            font-size: 20vh;
            font-weight: 700;
            letter-spacing: -5.5vh;
            mix-blend-mode: overlay;
            line-height: 2vh;
        }

        .ui-header {
            width: 100%;
            display: flex;
            align-items: center; 
            justify-content: space-between;

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

        #moneywash {
            position: fixed;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%) scale(90%);
            width: 63vh;
            padding: 4.5vh;
            gap: 2vh;
            border-radius: 1vh;
            background: var(--clr-bg);
            display: none;
            align-items: center;
            flex-direction: column;
            overflow: hidden;
        }

        .moneywash-processes {
            width: calc(100% - 2.2vh); 
            height: 23vh;
            margin-bottom: 2vh;
            overflow: hidden;
            display: flex;
            align-items: center;
            flex-direction: column;
            gap: 0.5vh; 
            justify-content: flex-start;
            padding: 1vh;
            border: 0.1vh solid rgba(255, 255, 255, .2);
            border-radius: 0.3vh;
        }

        .moneywash-process {
            width: calc(100% - 1.2vh);
            padding: 0.5vh;
            background-color: rgba(255, 255, 255, .1);
            border: 0.1vh solid rgba(255, 255, 255, .2);
            display:flex; 
            align-items: center;
            justify-content: space-between;
        }

        .moneywash-ammount {
            margin: 0;
            height: 3vh;
            width: 13vh;
            border-radius: 0.2vh;
            background: var(--clr-ammount-bg);
            display: flex;
            align-items: center;
            justify-content: center;
            text-shadow: 0px 0px 42.845px var(--clr-ammount-shadow);
            font-family: 'Gilroy-Bold';
            font-size: 1.8vh;
            overflow: hidden;
            color: var(--clr-ammount-text);
        }

        .moneywash-process-line-outer {
            height: 0.5vh;
            width: 50%;
            background-color: rgba(255, 255, 255, .3);
        }

        .moneywash-process-line-inner {
            height: 100%;
            width: 40%;
            background-color: var(--clr-progress-line);
        }

        .moneywash-auszahlen {
            height: 3vh;
            width: 20%;
            border: 0.1vh solid var(--clr-payout-border);
            background: var(--clr-payout-bg);
            box-shadow: 0px 10.45px 53.01px 0px var(--clr-payout-shadow1), 0px 0px 16.91px 0px var(--clr-payout-shadow2) inset;
            border-radius: 0.2vh;
            color: #FFF;
            font-family: 'Gilroy-Medium';
            font-size: 1.8vh;
            outline: none;
        }

        .moneywash-auszahlen:disabled {
            opacity: 0.5;
        }
            
        
        /* Input Area Styles */
        .moneywash-input-container {
            width: 100%;
            display: flex;
            justify-content: space-between;
            gap: 1vh;
        }
        
        .moneywash-amount-input {
            width: 70%;
            height: 4vh;
            background: rgba(255, 255, 255, 0.1);
            border: 0.1vh solid rgba(255, 255, 255, 0.2);
            border-radius: 0.3vh;
            color: white;
            font-family: 'Gilroy-Medium';
            font-size: 1.8vh;
            padding: 0 1vh;
            outline: none;
        }
        
        .moneywash-deposit-btn {
            width: 28%;
            height: 4.1vh;
            border: 0.1vh solid var(--clr-deposit-border);
            background: var(--clr-deposit-bg);
            box-shadow: 0px 10.45px 53.01px 0px var(--clr-deposit-shadow1), 0px 0px 16.91px 0px var(--clr-deposit-shadow2) inset;
            border-radius: 0.3vh;
            color: #FFF;
            font-family: 'Gilroy-Bold';
            font-size: 1.8vh;
            cursor: pointer;
            outline: none;
        }

        /* Fee Selection Styles */
        .moneywash-fee-container {
            width: 100%;
        }
        
        .moneywash-fee-buttons {
            display: flex;
            justify-content: space-between;
            width: 100%;
        }
        
        .moneywash-fee-btn {
            width: 24%;
            height: 3.5vh;
            border: 0.1vh solid rgba(255, 255, 255, 0.2);
            background: rgba(255, 255, 255, 0.1);
            border-radius: 0.3vh;
            color: #FFF;
            font-family: 'Gilroy-Bold';
            font-size: 1.6vh;
            cursor: pointer;
            transition: all 0.2s;
            color: var(--clr-fee-text);
            outline: none;
        }
        
        .moneywash-fee-btn.active {
            border: 0.1vh solid var(--clr-fee-active-border);
            background: var(--clr-fee-active-bg);
        }
        
        /* Processing Time Box Styles */
        .moneywash-processing-info {
            width: calc(100% - 3.2vh);
            background: rgba(55, 55, 55, 0.15);
            border: 0.1vh solid rgba(255, 255, 255, 0.15);
            border-radius: 0.5vh;
            padding: 1.5vh;
            text-align: center;
        }
        
        .moneywash-processing-title {
            font-family: 'Gilroy-Medium';
            font-size: 1.6vh;
            color: #fff;
            margin: 0 0 1vh 0;
        }
        
        .moneywash-processing-time {
            font-family: 'Gilroy-Bold';
            font-size: 2.5vh;
            color: var(--clr-processing-time);
            text-shadow: 0px 0px 15px var(--clr-processing-shadow);
            margin-bottom: 0.8vh;
        }
        
        .moneywash-processing-note {
            font-family: 'Gilroy-Medium';
            font-size: 1.4vh;
            color: rgba(255, 255, 255, 0.6);
            margin: 0;
        }
    `,
});

function updateProcessingTime(fee) {
    let minutes = 60;
    switch(parseInt(fee)) {
        case 10: minutes = times['10%']; break;
        case 25: minutes = times['25%']; break;
        case 35: minutes = times['35%']; break;
        case 50: minutes = times['50%']; break;
    }
    $('#process-minutes').text(minutes);
}

function renderMoneyWash(data) {
    const processesContainer = $('.moneywash-processes');
    processesContainer.empty();
    if (data && data.length > 0) {
        data.forEach((process, index) => {
            const progress = process.progress || 0;
            const formattedAmount = process.amount.formatMoney();
            const isCompleted = progress >= 100 || process.completed;
            const processElement = $(`
                <div class="moneywash-process">
                    <p class="moneywash-ammount">${formattedAmount}</p>
                    <div class="moneywash-process-line-outer">
                        <div class="moneywash-process-line-inner" style="width: ${progress}%"></div>
                    </div>
                    <button class="moneywash-auszahlen" data-index="${process.index || index}" ${!isCompleted ? 'disabled' : ''}>${labels.payout}</button>
                </div>
            `);
            
            processesContainer.append(processElement);
        });
        UI.ClickFunction('.moneywash-auszahlen:not([disabled])', function($element, data) {
            const processIndex = data.index;
            $element.prop('disabled', true);
            UI.PostRequest({
                action: 'moneywash',
                data: { 
                    type: 'withdraw',
                    processIndex: processIndex, 
                }
            });
        });
    } else {
        processesContainer.html('<div class="moneywash-empty">'+labels.noprocess+'</div>');
    }
}

UI.ClickFunction('.moneywash-fee-btn', function($element) {
    $('.moneywash-fee-btn').removeClass('active');
    $element.addClass('active');
    const fee = $element.data('fee');
    updateProcessingTime(fee);
});

UI.ClickFunction('.moneywash-deposit-btn', function() {
    const amount = $('.moneywash-amount-input').val().trim();
    if (!amount || isNaN(parseInt(amount)) || parseInt(amount) <= 0) {
        $('.moneywash-amount-input').css('border-color', 'red');
        setTimeout(() => {
            $('.moneywash-amount-input').css('border-color', 'rgba(255, 255, 255, 0.2)');
        }, 2000);
        return;
    }
    const selectedFee = $('.moneywash-fee-btn.active').data('fee');
    UI.PostRequest({
        action: 'moneywash',
        data: {
            type: 'deposit',
            amount: parseInt(amount),
            fee: selectedFee
        }
    });
    $('.moneywash-amount-input').val('');
});

window.addEventListener('message', function(event){
    if (event.data.action === 'moneywash') {
        if (event.data.enable) {
            renderMoneyWash(event.data.data);
            $('#moneywash').fadeIn(200).css('display', 'flex');
        } else {
            $('#moneywash').fadeOut(200);
        }
    } else if (event.data.action === 'updatemoneywash') {
        renderMoneyWash(event.data.data);
    }
});

document.addEventListener("keydown", function(event) {
    if (event.key === "Escape") {
        $.post(`https://${GetParentResourceName()}/moneywash`, JSON.stringify({type:'close'}));
    }
});

UI.ClickFunction('.closemoneywash', function() {
    $.post(`https://${GetParentResourceName()}/moneywash`, JSON.stringify({type:'close'}));
})

UI.BindData('moneywash', labels)