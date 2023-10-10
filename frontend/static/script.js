
// var button = document.getElementById('button-test-drive');

// button.addEventListener('click', function () {
//     alert('Запись на Тест-драйв');
// });

const avatar = `static/img/Ellipse 2.png`;
var step = 0;

var form = {
    car: "string",
    options: [],
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
    }, time);



});

//выбор модели машины
function selectionCars() {
    //предложение модели от бота
    var imgCar = `static/img/jaecoo_j7 1.png`;

    var text1 = `JAECOO J7`;

    return `
        <div id="chat-bot-message">
            <div id="avatar">
                <img src="static/img/white-painted-wall-texture-background 1.png">
            </div>
            <div class="selection-buttons">
                <div class="selection-button">
                    <button class="selection-button-car-text" onclick="carFunc('JAECOO J7')">
                        <img src="${imgCar}">
                        <p>${text1}</p>
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
    var text1 = `${input}`

    setTimeout(function () {
        botMessage.insertAdjacentHTML("beforebegin", messageTextUser(text1));
        botMessage.scrollIntoView({ behavior: 'smooth' });
    }, 0);

    setTimeout(function () {
        botMessage.insertAdjacentHTML("beforebegin", optionList());
        botMessage.scrollIntoView({ behavior: 'smooth' });
    }, 1000);




}

function optionList() {
    //предложение опций от бота

    var list = `
        <div id="chat-bot-message">
            <div id="avatar">
                <img src="${avatar}">
            </div>
            <span class="comment-bot-text">
                <p>Выберите нужные опции:</p>
                <ul id="itemList">
                    <li><input type="checkbox" value="Двигатель 1.6 Turbo AWD">Двигатель 1.6 Turbo AWD</li>
                    <li><input type="checkbox" value="Двигатель 1.6 Turbo AWD">Двигатель 1.6 Turbo AWD</li>
                    <li><input type="checkbox" value="19-дюймовые алюминиевые литые диски">19-дюймовые алюминиевые литые диски</li>
                    <li><input type="checkbox" value="Адаптивный круиз-контроль (ACC)">Адаптивный круиз-контроль (ACC)</li>
                    <li><input type="checkbox" value="Климат-контроль, 2 зоны">Климат-контроль, 2 зоны</li>
                    <li><input type="checkbox" value="Большой сенсорный дисплей 14.8">Большой сенсорный дисплей 14.8</li>
                </ul>           
            </span>              
        </div>

        <div id="chat-bot-message">
            <div id="avatar">
                <img src="static/img/white-painted-wall-texture-background 1.png">
            </div>
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

    selected = selected.length ? selected : "Опции не выбраны";

    setTimeout(function () {
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
    var img1 = `https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTQovWiJ9FWftZUedKYufuUOo6xoj6ADQlOyA&usqp=CAU`;
    var img2 = `https://chat-jaecoo.okami.ru/img/models/jaecoo_j7.png`;

    var text1 = `Белый`;
    var text2 = `Черный`;
    var text3 = `Зеленый`;
    var text4 = `Зеленый с черной крышей`;
    var text5 = `Серебристый`;
    var text6 = `Серебристый с черной крышей`;
    var text7 = `Серый`;
    var text8 = `Серый с черной крышей`;

    var buttons = `
        <div id="chat-bot-message">
            <div id="avatar">
                <img src="static/img/white-painted-wall-texture-background 1.png">
            </div>
            <div class="selection-colors">

                <div class="selection-color">
                    <button class="selection-color-text" 
                        onclick="colorFunc('Белый')">
                        <div id="color-white"></div>
                        <p>${text1}</p>
                    </button>
                </div>

                <div class="selection-color">
                    <button class="selection-color-text" 
                        onclick="colorFunc('Черный')">
                        <div id="color-black"></div>

                        <p>${text2}</p>
                    </button>
                </div>

                <div class="selection-color">
                    <button class="selection-color-text" 
                    onclick="colorFunc('Серебристый')">
                        <div id="color-silver"></div>
                        <p>${text5}</p>
                    </button>
                </div>

                <div class="selection-color">
                    <button class="selection-color-text" 
                    onclick="colorFunc('Серебристый с черной крышей')">
                        <div id="color-silver-balack-roof"></div>

                        <p>${text6}</p>
                    </button>
                </div>
                <div class="selection-color">
                    <button class="selection-color-text" onclick="colorFunc('Серый')">
                        <div id="color-grey"></div>
                        
                        <p>${text7}</p>
                    </button>
                </div>

                <div class="selection-color">
                    <button class="selection-color-text" onclick="colorFunc('Серый с черной крышей')">
                        <div id="color-grey-balack-roof"></div>

                        <p>${text8}</p>
                    </button>
                </div>

                <div class="selection-color">
                    <button class="selection-color-text" 
                        onclick="colorFunc('Зеленый')">
                        <div id="color-green"></div>
                        
                        <p>${text3}</p>
                    </button>
                </div>

                <div class="selection-color">
                    <button class="selection-color-text" 
                        onclick="colorFunc('Зеленый с черной крышей')">
                        <div id="color-green-balack-roof"></div>

                        <p>${text4}</p>
                    </button>
                </div>

            </div>
        </div>
    `

    return buttons;

}

function colorFunc(input) {
    form.color = input;

    const botMessage = document.getElementById('chat-bot');

    var text1 = `${input}`


    setTimeout(function () {
        botMessage.insertAdjacentHTML("beforebegin", messageTextUser(text1));

        botMessage.scrollIntoView({ behavior: 'smooth' });
    }, 0);

    var text2 = `Как планируете приобретать автомобиль?`

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
    var img1 = `https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTQovWiJ9FWftZUedKYufuUOo6xoj6ADQlOyA&usqp=CAU`;
    var img2 = `https://chat-jaecoo.okami.ru/img/models/jaecoo_j7.png`;

    var text1 = `Кредит`;
    var text2 = `Наличные`;
    var text3 = `Трейд-Ин`;

    var buttons = `
        <div id="chat-bot-message">
            <div id="avatar">
                <img src="static/img/white-painted-wall-texture-background 1.png">
            </div>
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
        </div>
    `

    return buttons;

}

function payFunc(input) {
    form.payment_type = input;



    const botMessage = document.getElementById('chat-bot');

    var text1 = `${input}`


    setTimeout(function () {
        botMessage.insertAdjacentHTML("beforebegin", messageTextUser(text1));

        botMessage.scrollIntoView({ behavior: 'smooth' });
    }, 0);

    //botMessage.insertAdjacentHTML("beforebegin", selectionPay());

    var text2 = `Вы хотите получить расчет стоимости автомобиля звонком по телефону или через WhatsApp?`

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
    var img1 = `https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTQovWiJ9FWftZUedKYufuUOo6xoj6ADQlOyA&usqp=CAU`;
    var img2 = `https://chat-jaecoo.okami.ru/img/models/jaecoo_j7.png`;

    var text1 = `По телефону`;
    var text2 = `Через WhatsApp`;

    return `
        <div id="chat-bot-message">
            <div id="avatar">
                <img src="static/img/white-painted-wall-texture-background 1.png">
            </div>
            <div class="selection-colors">
                <div class="selection-color">
                    <button class="selection-button-text" onclick="numberFunc('По телефону')">
                        <p>${text1}</p>
                    </button>
                </div>    
                <div class="selection-color">
                    <button class="selection-button-text" onclick="numberFunc('Через WhatsApp')">
                        <p>${text2}</p>
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

    var text1 = `${input}`

    setTimeout(function () {
        botMessage.insertAdjacentHTML("beforebegin", messageTextUser(text1));

        botMessage.scrollIntoView({ behavior: 'smooth' });
    }, 0);

    var text2 = `Спасибо, это были все вопросы. Наш менеджер свяжется с Вами и предложит автомобили из наличия или под заказ.`
    var text3 = `Оставьте ваше имя и телефон:`

    var textMessages = [text2, text3]

    let time = 1000;

    for (let text of textMessages) {
        setTimeout(function () {
            botMessage.insertAdjacentHTML("beforebegin", messageTextBot(text));
            botMessage.scrollIntoView({ behavior: 'smooth' });

        }, time);
        time += 1000;

    }

    //botMessage.insertAdjacentHTML("beforebegin", selectionNumber());
}

function inputName() {


}

function inputPhone() {

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


    var message = `
        <div id="chat-bot-message">
            <div id="avatar">
                <img src="${avatar}">
            </div>
            <span class="comment-bot-text">
                ${text}
            </span>
        </div>
    `

    return message;
}

function messageTextUser(text) {
    var message = `
        <div id="chat-user-message">
            <span class="comment-user-text">
                ${text}
            </span>
        </div>
    `

    return message;
}

function sleep(millis) {
    var t = (new Date()).getTime();
    var i = 0;
    while (((new Date()).getTime() - t) < millis) {
        i++;
    }
}
