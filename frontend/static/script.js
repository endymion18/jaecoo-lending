// var button = document.getElementById('button-test-drive');

// button.addEventListener('click', function () {
//     alert('Запись на Тест-драйв');
// });

const avatar = `static/img/Ellipse 2.png`;
var step = {
    step1: 0,
    step2: 0,
    step3: 0,
    step4: 0,
    step5: 0,
    step6: 0,
    step7: 0,
};

var form = {
    car: "string",
    options: ["Опции не выбраны"],
    color: "string",
    payment_type: "string",
    contact_type: "string",
    number: "88005553535",
    client_name: "Name"
}

function delay(ms) {
    return new Promise(resolve => {
        setTimeout(resolve, ms);
    });
}

document.addEventListener('DOMContentLoaded', function () {
    //начало диалога
    const botMessage = document.getElementById('chat-bot');

    var text1 = `Здравствуйте!<br>
    Меня зовут Алексей. Я онлайн-консультант автосалона JAECOO.`
    var text2 = `Предлагаю Вам ответить на несколько вопросов, чтобы я смог подобрать для вас специальное предложение`;
    var text3 = `Выберите автомобиль:`;

    var textMessages = [text1, text2, text3]

    let time = 0;

    for (let text of textMessages) {
        setTimeout(function () {
            botMessage.insertAdjacentHTML("beforebegin", messageTextBot(text));

        }, time);
        time += 1000;
    }

    setTimeout(function () {
        botMessage.insertAdjacentHTML("beforebegin", selectionCars());
        //botMessage.insertAdjacentHTML("beforebegin", inputContact());
    }, time);
});

//выбор модели машины
function selectionCars() {
    //предложение модели от бота
    var imgCar = `static/img/jaecoo_j7 1.png`;

    var textMessage = `JAECOO J7`;

    return `
        <div class="chat-bot-message">
            ${avatarFunc()}
            <div class="selection-buttons">
                <div class="selection-button">
                    <button class="selection-button-car-text" onclick="carFunc('JAECOO J7')">
                        <img src="${imgCar}">
                        <p>${textMessage}</p>
                    </button>
                </div>
            </div>
        </div>
    `
}

function carFunc(input) {
    //выбор модели от пользователя
    form.car = input;
    step = 1;

    const botMessage = document.getElementById('chat-bot');
    var textMessage = `${input}`

    setTimeout(function () {
        botMessage.insertAdjacentHTML("beforebegin", messageTextUser(textMessage));
        botMessage.scrollIntoView({ behavior: 'smooth' });
    }, 0);

    setTimeout(function () {
        botMessage.insertAdjacentHTML("beforebegin", optionList());
        botMessage.scrollIntoView({ behavior: 'smooth' });
    }, 1000);
}

function optionList() {
    //предложение опций от бота

    var options = [
        "Двигатель 1.6 Turbo AWD",
        "Двигатель 1.6 Turbo AWD",
        "19-дюймовые алюминиевые литые диски",
        "Адаптивный круиз-контроль (ACC)",
        "Климат-контроль, 2 зоны",
        "Большой сенсорный дисплей 14.8",
    ];

    var list = `
        <div class="chat-bot-message">
            <div id="avatar">
                <img src="${avatar}">
            </div>
            <span class="comment-bot-text">
                <p>Выберите нужные опции:</p>
                <ul id="itemList">
                    <li><input type="checkbox" value="${options[0]}">${options[0]}</li>
                    <li><input type="checkbox" value="${options[1]}">${options[1]}</li>
                    <li><input type="checkbox" value="${options[2]}">${options[2]}</li>
                    <li><input type="checkbox" value="${options[3]}">${options[3]}</li>
                    <li><input type="checkbox" value="${options[4]}">${options[4]}</li>
                    <li><input type="checkbox" value="${options[5]}">${options[5]}</li>
                </ul>           
            </span>              
        </div>

        <div class="chat-bot-message">
            ${avatarFunc()}
            <div class="selection-colors">
                <div class="selection-color">
                    <button class="selection-button-text" onclick="choiceEquipment()"><p>Далее</p></button>
                </div>        
            </div>
        </div>
    `

    return list;
}

function choiceEquipment() {

    //выбор опций от пользователя
    const botMessage = document.getElementById('chat-bot');

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

    //предложение цвета от бота
    var text1 = `Выберите цвет автомобиля:`

    setTimeout(function () {
        botMessage.insertAdjacentHTML("beforebegin", messageTextBot(text1));
        botMessage.scrollIntoView({ behavior: 'smooth' });
    }, 1000);

    setTimeout(function () {
        botMessage.insertAdjacentHTML("beforebegin", selectionColors());
        botMessage.scrollIntoView({ behavior: 'smooth' });
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

    var buttons = `
        <div class="chat-bot-message">
            ${avatarFunc()}
            <div class="selection-colors">
                ${buttonColorFunc(textMessages[0], idColors[0])}
                ${buttonColorFunc(textMessages[1], idColors[1])}
                ${buttonColorFunc(textMessages[2], idColors[2])}
                ${buttonColorFunc(textMessages[3], idColors[3])}
                ${buttonColorFunc(textMessages[4], idColors[4])}
                ${buttonColorFunc(textMessages[5], idColors[5])}
                ${buttonColorFunc(textMessages[6], idColors[6])}
                ${buttonColorFunc(textMessages[7], idColors[7])}
            </div >
        </div >
    `

    return buttons;
}

function buttonColorFunc(color, idCololr) {
    return `
    <div div class="selection-color" >
        <button class="selection-color-text"
            onclick="colorFunc('${color}')">
            <div id="${idCololr}"></div>
            <p>${color}</p>
        </button>
    </div >
    `
}

function colorFunc(input) {
    form.color = input;

    const botMessage = document.getElementById('chat-bot');

    var text1 = `${input} `


    setTimeout(function () {
        botMessage.insertAdjacentHTML("beforebegin", messageTextUser(text1));

        botMessage.scrollIntoView({ behavior: 'smooth' });
    }, 0);

    var text2 = `Как планируете приобретать автомобиль ? `

    setTimeout(function () {
        botMessage.insertAdjacentHTML("beforebegin", messageTextBot(text2));

        botMessage.scrollIntoView({ behavior: 'smooth' });
    }, 1000);

    setTimeout(function () {
        botMessage.insertAdjacentHTML("beforebegin", selectionPay());

        botMessage.scrollIntoView({ behavior: 'smooth' });
    }, 2000);

}

function selectionPay() {
    var text1 = `Кредит`;
    var text2 = `Наличные`;
    var text3 = `Трейд-ин`;

    var buttons = `
    <div class="chat-bot-message">
        ${avatarFunc()}
        <div class="selection-colors">
            <div class="selection-color">
                <button class="selection-button-text" onclick="payFunc('Кредит')">
                    <p>${text1}</p>
                </button>
            </div>
            <div class="selection-color">
                <button class="selection-button-text" onclick="payFunc('Наличные')">
                    <p>${text2}</p>
                </button>
            </div>
            <div class="selection-color">
                <button class="selection-button-text" onclick="payFunc('Трейд-Ин')">
                    <p>${text3}</p>
                </button>
            </div>
        </div>
    </div >
    `

    return buttons;

}

function payFunc(input) {
    form.payment_type = input;



    const botMessage = document.getElementById('chat-bot');

    var text1 = `${input} `


    setTimeout(function () {
        botMessage.insertAdjacentHTML("beforebegin", messageTextUser(text1));

        botMessage.scrollIntoView({ behavior: 'smooth' });
    }, 0);

    //botMessage.insertAdjacentHTML("beforebegin", selectionPay());

    var text2 = `Вы хотите получить расчет стоимости автомобиля звонком по телефону или через WhatsApp ? `

    setTimeout(function () {
        botMessage.insertAdjacentHTML("beforebegin", messageTextBot(text2));


        botMessage.scrollIntoView({ behavior: 'smooth' });
    }, 1000);

    setTimeout(function () {

        botMessage.insertAdjacentHTML("beforebegin", selectionNumber());

        botMessage.scrollIntoView({ behavior: 'smooth' });
    }, 2000);



}

function selectionNumber() {
    var textMessage = [`Телефон`, `WhatsApp`];

    return `
    <div class="chat-bot-message">
        ${avatarFunc()}
        <div class="selection-colors">
            <div class="selection-color">
                <button class="selection-button-text" onclick="numberFunc('По телефону')">
                    <p>${textMessage[0]}</p>
                </button>
            </div>
            <div class="selection-color">
                <button class="selection-button-text" onclick="numberFunc('Через WhatsApp')">
                    <p>${textMessage[1]}</p>
                </button>
            </div>
        </div>
    </div>
    `
}

function numberFunc(input) {
    form.contact_type = input;

    console.log(form);

    outputJSON(form);

    const botMessage = document.getElementById('chat-bot');

    var text1 = `${input} `

    setTimeout(function () {
        botMessage.insertAdjacentHTML("beforebegin", messageTextUser(text1));

        botMessage.scrollIntoView({ behavior: 'smooth' });
    }, 0);

    var text2 = `Спасибо, это были все вопросы.Наш менеджер свяжется с Вами и предложит автомобили из наличия или под заказ.`
    var text3 = `Оставьте ваше имя и телефон: `

    var textMessages = [text2, text3]

    let time = 1000;

    for (let text of textMessages) {
        setTimeout(function () {
            botMessage.insertAdjacentHTML("beforebegin", messageTextBot(text));
            botMessage.scrollIntoView({ behavior: 'smooth' });

        }, time);
        time += 1000;

    }

    setTimeout(function () {
        botMessage.insertAdjacentHTML("beforebegin", inputContact());
        botMessage.scrollIntoView({ behavior: 'smooth' });

    }, time);


}

function inputContact() {
    return `
        <div class="chat-bot-message">
            ${avatarFunc()}
            <div class="selection-colors">
                <div class="selection-color">
                    <div class="inputName">
                        <input name="name" type="text" />
                    </div>
                </div>
            </div>
        </div>
        <div class="chat-bot-message">
            ${avatarFunc()}
            <div class="selection-colors">           
                <div class="selection-color">
                    <div class="inputPhone">
                        <input name="phone" type="text" />
                    </div>
                </div>
            </div>
        </div>

        <div class="chat-bot-message">
            ${avatarFunc()}
            <div class="selection-colors">
                <div class="selection-color">
                    <button class="selection-button-text" onclick="choiceEquipment()"><p>Далее</p></button>
                </div>        
            </div>
        </div>
    `

}

function outputJSON(form) {
    const jsonData = JSON.stringify(form);

    fetch('http://127.0.0.1:8000/send-email', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: jsonData, // JSON данные
    })
        .then(response => response.json())
        .catch(error => {
            console.error('Ошибка:', error);
        });
}



function messageTextBot(text) {
    return `
    <div class="chat-bot-message">
        <div id="avatar">
            <img src="${avatar}">
        </div>
        <span class="comment-bot-text">
            ${text}
        </span>
    </div>
    `
}

function messageTextUser(text) {
    return `
    <div id="chat-user-message">
        <span class="comment-user-text">
            ${text}
        </span>
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
