const avatar = `static/img/Ellipse 2.png`;
const botMessage = document.getElementById('chat-bot');


var step = {
    step1: 0,
    step2: 0,
    step3: 0,
    step4: 0,
    step5: 0,
    step6: 0,
};

var form = {
    car: "none",
    options: ["Опции не выбраны"],
    color: "none",
    payment_type: "none",
    contact_type: "none",
    number: "none",
    client_name: "none"
}

document.addEventListener('DOMContentLoaded', function () {
    //начало диалога
    var text1 = `Здравствуйте!<br>
    Меня зовут Алексей. Я онлайн-консультант автосалона JAECOO.`
    var text2 = `Предлагаю Вам ответить на несколько вопросов, чтобы я смог подобрать для вас специальное предложение`;
    var text3 = `Выберите автомобиль:`;
    var textMessages = [text1, text2, text3]

    let time = 0;
    for (let text of textMessages) {
        time += 1000;

        setTimeout(function () {
            botMessage.insertAdjacentHTML("beforebegin", botTypeFunc());
        }, time);

        time += 1000;

        setTimeout(function () {
            botTyingDelete();

            botMessage.insertAdjacentHTML("beforebegin", messageTextBot(text, 1));
        }, time);
    }

    setTimeout(function () {
        botMessage.insertAdjacentHTML("beforebegin", selectionCars());

        if (window.innerWidth > 900) {
            botMessage.scrollIntoView({ behavior: 'smooth' });
        }
        //botMessage.insertAdjacentHTML("beforebegin", inputContact());
    }, time);
});

//выбор модели машины
function selectionCars() {
    //предложение модели от бота
    var imgCar = `static/img/jaecoo_j7.png`;

    var textMessages = `JAECOO J7`;

    return `
        <div class="chat-bot-message" id="1">
            ${avatarFunc()}
            <div class="selection-buttons-car">
                <div class="selection-button-car">
                    <button id="button1" class="selection-button-car-text" onclick="carFunc('${textMessages}')">
                        <img src="${imgCar}">
                        <p>${textMessages}</p>
                    </button>
                </div>
            </div>
        </div>
    `
}

function carFunc(input) {
    //выбор модели от пользователя
    form.car = input;

    var textMessages = `${input}`

    setTimeout(function () {
        botMessage.insertAdjacentHTML("beforebegin", messageTextUser(textMessages));
        botMessage.scrollIntoView({ behavior: 'smooth' });
    }, 0);

    disableElement("button");

    if (step.step1 === 0) {
        step.step1 = 1;
    }
    else {
        deleteChat("1");
    }

    setTimeout(function () {
        botMessage.insertAdjacentHTML("beforebegin", botTypeFunc());
    }, 1000);

    setTimeout(function () {
        botTyingDelete();

        botMessage.insertAdjacentHTML("beforebegin", optionList());
        botMessage.scrollIntoView({ behavior: 'smooth' });

        enableElement("button");
    }, 2000);
}

function optionList() {
    //предложение опций от бота
    var options = [
        "Двигатель 1.6 Turbo 2WD",
        "Двигатель 1.6 Turbo AWD",
        "19-дюймовые алюминиевые литые диски",
        "Адаптивный круиз-контроль (ACC)",
        "Климат-контроль, 2 зоны",
        "Большой сенсорный дисплей 14.8",
    ];

    return `
        <div class="chat-bot-message" id="2">
            <div id="avatar">
                <img src="${avatar}">
            </div>
            <span class="message-bot-text">
                <p>Выберите нужные опции:</p>
                <ul id="itemList">
                    <li><input id="input1" type="checkbox" value="${options[0]}"> ${options[0]}</li>
                    <li><input id="input2" type="checkbox" value="${options[1]}"> ${options[1]}</li>
                    <li><input id="input3" type="checkbox" value="${options[2]}"> ${options[2]}</li>
                    <li><input id="input4" type="checkbox" value="${options[3]}"> ${options[3]}</li>
                    <li><input id="input5" type="checkbox" value="${options[4]}"> ${options[4]}</li>
                    <li><input id="input6" type="checkbox" value="${options[5]}"> ${options[5]}</li>
                </ul>           
            </span>              
        </div>

        <div class="chat-bot-message" id="2">
            ${avatarFunc()}
            <div class="selection-buttons">
                <div class="selection-button">
                    <button id="button2" class="selection-button-text" onclick="choiceEquipment()"><p>Далее</p></button>
                </div>        
            </div>
        </div>
    `
}

function choiceEquipment() {
    //выбор опций от пользователя
    const itemList = document.querySelectorAll('#itemList input[type="checkbox"]:checked');
    const selectedItems = Array.from(itemList).map(item => item.value);

    form.options = selectedItems;

    let selected = ``;

    for (let i = 0; i < selectedItems.length; i++) {
        selected += String(selectedItems[i]) + `<br>`;
    }

    setTimeout(function () {
        selected = selected.length ? selected : "Опции не выбраны";

        botMessage.insertAdjacentHTML("beforebegin", messageTextUser(selected));
        botMessage.scrollIntoView({ behavior: 'smooth' });
    }, 0);

    disableElement("button");

    if (step.step2 === 0) {
        step.step2 = 1;
    }
    else {
        deleteChat("2");
    }

    //предложение цвета от бота
    var text1 = `Выберите цвет автомобиля:`

    setTimeout(function () {
        botMessage.insertAdjacentHTML("beforebegin", botTypeFunc());
    }, 1000);

    setTimeout(function () {
        botTyingDelete();

        botMessage.insertAdjacentHTML("beforebegin", messageTextBot(text1, 3));
        botMessage.insertAdjacentHTML("beforebegin", selectionColors());

        botMessage.scrollIntoView({ behavior: 'smooth' });

        enableElement("button");
    }, 2000);
}

function selectionColors() {
    var textMessages = [`Белый`,
        `Черный`,
        `Серебристый`,
        `Серебристый с черной крышей`,
        `Серый`,
        `Серый с черной крышей`,
        `Зеленый`,
        `Зеленый с черной крышей`
    ];
    var idColors = [
        `color-white`,
        `color-black`,
        `color-silver`,
        `color-silver-balack-roof`,
        `color-grey`,
        `color-grey-balack-roof`,
        `color-green`,
        `color-green-balack-roof`
    ]

    return `
        <div class="chat-bot-message" id="3">
            ${avatarFunc()}
            <div class="selection-buttons">
                ${buttonColorFunc(textMessages[0], idColors[0], "button10")}
                ${buttonColorFunc(textMessages[1], idColors[1], "button11")}
                ${buttonColorFunc(textMessages[2], idColors[2], "button12")}
                ${buttonColorFunc(textMessages[3], idColors[3], "button13")}
                ${buttonColorFunc(textMessages[4], idColors[4], "button14")}
                ${buttonColorFunc(textMessages[5], idColors[5], "button15")}
                ${buttonColorFunc(textMessages[6], idColors[6], "button16")}
                ${buttonColorFunc(textMessages[7], idColors[7], "button17")}
            </div >
        </div >
    `
}

function buttonColorFunc(color, idCololr, buttonId) {
    return `
        <div div class="selection-button" >
            <button id="${buttonId}" class="selection-color-text"
                onclick="colorFunc('${color}')">
                <div id="${idCololr}"></div>
                <p>${color}</p>
            </button>
        </div>
    `
}

function colorFunc(input) {
    form.color = input;

    var text1 = `${input} `

    setTimeout(function () {
        botMessage.insertAdjacentHTML("beforebegin", messageTextUser(text1));
        botMessage.scrollIntoView({ behavior: 'smooth' });
    }, 0);

    disableElement("button");

    if (step.step3 === 0) {
        step.step3 = 1;
    }
    else {
        deleteChat("3");
    }

    var text2 = `Как планируете приобретать автомобиль? `

    setTimeout(function () {
        botMessage.insertAdjacentHTML("beforebegin", botTypeFunc());
    }, 1000);

    setTimeout(function () {
        botTyingDelete();

        botMessage.insertAdjacentHTML("beforebegin", messageTextBot(text2, 4));
        botMessage.insertAdjacentHTML("beforebegin", selectionPay());

        botMessage.scrollIntoView({ behavior: 'smooth' });

        enableElement("button");
    }, 2000);
}

function selectionPay() {
    var textMessages = [
        `Кредит`,
        `Наличные`,
        `Трейд-ин`
    ];

    return `
        <div class="chat-bot-message" id="4">
            ${avatarFunc()}
            <div class="selection-buttons">
                <div class="selection-button">
                    <button id="button4" class="selection-button-text" onclick="payFunc('${textMessages[0]}')">
                        <p>${textMessages[0]}</p>
                    </button>
                </div>
                <div class="selection-button">
                    <button id="button5" class="selection-button-text" onclick="payFunc('${textMessages[1]}')">
                        <p>${textMessages[1]}</p>
                    </button>
                </div>
                <div class="selection-button">
                    <button id="button6" class="selection-button-text" onclick="payFunc('${textMessages[2]}')">
                        <p>${textMessages[2]}</p>
                    </button>
                </div>
            </div>
        </div >
    `
}

function payFunc(input) {
    form.payment_type = input;

    var text1 = `${input} `

    setTimeout(function () {
        botMessage.insertAdjacentHTML("beforebegin", messageTextUser(text1));

        botMessage.scrollIntoView({ behavior: 'smooth' });
    }, 0);

    disableElement("button");

    if (step.step4 === 0) {
        step.step4 = 1;
    }
    else {
        deleteChat("4");
    }

    var text2 = `Вы хотите получить расчет стоимости автомобиля звонком по телефону или через WhatsApp ? `

    setTimeout(function () {
        botMessage.insertAdjacentHTML("beforebegin", botTypeFunc());
    }, 1000);

    setTimeout(function () {
        botTyingDelete();

        botMessage.insertAdjacentHTML("beforebegin", messageTextBot(text2, 5));
        botMessage.insertAdjacentHTML("beforebegin", selectionNumber());

        botMessage.scrollIntoView({ behavior: 'smooth' });

        enableElement("button");
    }, 2000);
}

function selectionNumber() {
    var textMessages = [`Телефон`, `WhatsApp`];

    return `
        <div class="chat-bot-message" id="5">
            ${avatarFunc()}
            <div class="selection-buttons">
                <div class="selection-button">
                    <button id="button7" class="selection-button-text" onclick="numberFunc('${textMessages[0]}')">
                        <p>${textMessages[0]}</p>
                    </button>
                </div>
                <div class="selection-button">
                    <button id="button8" class="selection-button-text" onclick="numberFunc('${textMessages[1]}')">
                        <p>${textMessages[1]}</p>
                    </button>
                </div>
            </div>
        </div>
    `
}

function numberFunc(input) {
    form.contact_type = input;

    var text1 = `${input} `

    setTimeout(function () {
        botMessage.insertAdjacentHTML("beforebegin", messageTextUser(text1));

        botMessage.scrollIntoView({ behavior: 'smooth' });
    }, 0);

    disableElement("button");

    if (step.step5 === 0) {
        step.step5 = 1;
        // console.log(step);
    }
    else {
        //location.reload();
        deleteChat("5");
    }

    var text2 = `Спасибо, это были все вопросы. Наш менеджер свяжется с Вами и предложит автомобили из наличия или под заказ.`
    var text3 = `Оставьте ваше имя и телефон: `

    var textMessages = [text2, text3]

    let time = 0;

    for (let text of textMessages) {
        time += 1000;

        setTimeout(function () {
            botMessage.insertAdjacentHTML("beforebegin", botTypeFunc());
        }, time);

        time += 1000;


        setTimeout(function () {
            botTyingDelete();

            botMessage.insertAdjacentHTML("beforebegin", messageTextBot(text, 6));
            botMessage.scrollIntoView({ behavior: 'smooth' });
        }, time);
    }

    setTimeout(function () {
        botMessage.insertAdjacentHTML("beforebegin", inputContact());
        botMessage.scrollIntoView({ behavior: 'smooth' });

        enableElement("button");
    }, time);
}

function inputContact() {
    return `
        <div class="chat-bot-message" id="6">
            ${avatarFunc()}
            <div class="selection-buttons">
                <div class="selection-button">
                    <div class="inputName">
                        <input 
                        name="name" 
                        type="text" 
                        id="nameInput"
                        utocomplete="name"
                        placeholder="Введите имя" />
                    </div>
                </div>
            </div>
        </div>
        <div class="chat-bot-message" id="6">
            ${avatarFunc()}
            <div class="selection-buttons">           
                <div class="selection-button">
                    <div class="inputPhone">
                        <input 
                            name="phone" 
                            type="text" 
                            id="phoneInput"
                            utocomplete="number"
                            placeholder="+7 (___) ___-__-__" />
                    </div>
                </div>
            </div>
        </div>

        <div class="chat-bot-message" id="6">
            ${avatarFunc()}
            <div class="selection-buttons">
                <div class="selection-button">
                    <button 
                        id="button9" 
                        class="selection-button-text" 
                        onclick="inputFunc()">
                            <p>Далее</p>
                    </button>
                </div>  
            </div>
        </div>
    `;
}

function inputFunc() {
    form.client_name = document.getElementById('nameInput').value;
    form.number = document.getElementById('phoneInput').value;

    var textMessages = `${form.client_name}<br>${form.number}`;

    setTimeout(function () {
        botMessage.insertAdjacentHTML("beforebegin", messageTextUser(textMessages));
        botMessage.scrollIntoView({ behavior: 'smooth' });
    }, 0);

    disableElement("button");

    if (step.step6 === 0) {
        step.step6 = 1;
        // console.log(step);
    }
    else {
        deleteChat("6");
    }

    console.log(form);

    setTimeout(function () {
        botMessage.insertAdjacentHTML("beforebegin", botTypeFunc());
    }, 1000);

    setTimeout(function () {
        botTyingDelete();

        botMessage.insertAdjacentHTML("beforebegin", messageTextBot("Спасибо! Мы скоро свяжемся с вами.", 7));
        botMessage.scrollIntoView({ behavior: 'smooth' });

        enableElement("button");
    }, 2000);

    //outputJSON(form);
}

function outputJSON(form) {
    const jsonData = JSON.stringify(form);

    fetch('http://127.0.0.1:8000/send-email', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: jsonData,
    })
        .then(response => response.json())
        .catch(error => {
            console.error('Ошибка:', error);
        });
}

function messageTextBot(text, id) {
    return `
        <div class="chat-bot-message" id="${id}">
            <div id="avatar">
                <img src="${avatar}">
            </div>
            <span class="message-bot-text">
                ${text}
            </span>
        </div>
    `
}

function messageTextUser(text) {
    return `
        <div class="chat-user-message">
            <div class="message-user-text">
                <span>${text}</span>
            </div>
        </div>
    `
}

function avatarFunc() {
    return `
        <div id="avatar">
            <img src="static/img/white-painted-wall-texture-background 1.png">
        </div>
    `
}

function botTypeFunc() {
    return `
    <span class="bot-typing-class" id="bot-typing">
        <i>Алексей печатает <span id="dot1">.</span><span id="dot2">.</span><span id="dot3">.</span></i>
    </span>`
}

function disableElement(elementId) {
    for (var i = 1; i <= 17; i++) {
        var elementId1 = "button" + i;

        var element = document.getElementById(elementId1);

        if (element) {
            element.setAttribute("disabled", "true");
        }
    }
}

function enableElement(elementId) {
    for (var i = 1; i <= 17; i++) {
        var elementId1 = "button" + i;

        var element = document.getElementById(elementId1);

        if (element) {
            element.removeAttribute("disabled");
        }
    }
}

function botTyingDelete() {
    const elementToRemove = document.getElementById("bot-typing");

    if (elementToRemove) {
        elementToRemove.parentNode.removeChild(elementToRemove);
    }
}

function deleteChat(id) {
    var chatElement = document.getElementById("chat");
    var elementsToDelete = [];
    var shouldDelete = false;

    for (var i = 0; i < chatElement.children.length; i++) {
        var child = chatElement.children[i];

        if (child.getAttribute("id") === id) {
            shouldDelete = true;
            continue;
        }

        if (shouldDelete) {
            if (child.classList.contains("chat-bot-message")
                || child.classList.contains("chat-user-message")
                || child.classList.contains("bot-typing-class")) {
                elementsToDelete.push(child);
            }
        }
    }

    elementsToDelete.forEach(function (element) {
        chatElement.removeChild(element);
    });
}

window.addEventListener('scroll', function () {
    const scrollBlock = document.getElementById('header-chat');
    const chatBlock = document.getElementById('chat');

    if (window.innerWidth > 900) {
        if (window.scrollY > 200) {
            scrollBlock.style.position = 'fixed';
            scrollBlock.style.top = '90px';
            chatBlock.style.paddingTop = '86px';

        } else {
            scrollBlock.style.position = 'relative';
            scrollBlock.style.top = '0px';
            chatBlock.style.paddingTop = '0px';
        }
    }
    else {
        scrollBlock.style.position = 'fixed';
        scrollBlock.style.top = '114px';
        chatBlock.style.paddingTop = '0px';
    }
});
