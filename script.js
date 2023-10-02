// навигация

// навигация, переменные

const navKomm = document.querySelector('.div-grid-komm');
const navLike = document.querySelector('.div-grid-like');
const blackLineKomm = document.querySelector('.blackLineKomm');
const navLikeNone = document.querySelector('.nav-like-non');

// навигация, события

navLike.addEventListener('click', active);
navKomm.addEventListener('click', activeKomm);

// переход на вкладку 'избранное'

function active() {
    if (navLike) {
        navKomm.className = 'notActiveKomm';
        navLike.className = 'nav-like-active';
        blackLineKomm.className = 'line-not-komm';
        navLikeNone.className = 'like-nav-non';
        strInput.className = 'strInputNot';
        containerKomment.className = 'containerKommentNot';
    }
}

// переход на вкладку 'комментарии'

function activeKomm() {
    if (navKomm) {
        navKomm.className = 'div-grid-komm';
        navLike.className = 'div-grid-like';
        blackLineKomm.className = 'blackLineKomm';
        navLikeNone.className = 'nav-like-non';
        strInput.className = 'section-four';
        containerKomment.className = 'container-komment';
    }
}

// вкладка со списком

const navList = document.querySelector('.div-grid-list');
const navListActive = document.querySelector('.div-sorting');
const lineList = document.querySelector('.lineListNon');
const triangleOne = document.querySelector('.rotate');
const triangle = document.querySelector('.triangle-not');

navList.addEventListener('mouseover', listActiveLine);
navList.addEventListener('mouseout', listNotLine);

function listActiveLine() {
    if (navListActive) {
        navList.className = 'divActiveList'; 
        lineList.className = 'lineList';
        triangleOne.className = 'triangle-not';
        triangle.className = 'triangle';
    }
}

function listNotLine() {
    if (navListActive) {
        navList.className = 'div-grid-list'; 
        lineList.className = 'lineListNon';
        triangle.className = 'triangle-not';
        triangleOne.className = 'triangle';
    }
}

// выпадающий список

// строка ввода, лимит

let txtSms = document.querySelector('#txtsms');
const smsLimit = document.querySelector('.p-limitation');
const strInput = document.querySelector('.section-four')

txtSms.oninput = function() {
    this.value = this.value.substr(0, 1000);

    if (this.value.length >= 1000) {
        smsLimit.className = 'p-limitation-max';
    }
}

// комментарий 

const containerKomment = document.getElementById('container-komment'); // контейнер с комментарием
const kommentButton = document.getElementById('comment-btn');
const containerAnswer = document.querySelector('.container-like-answer');
let comments = [];

document.getElementById('comment-btn').onclick = function commentBtn (event) {
    event.preventDefault();
    let nameComment = document.getElementById('name-komment');
    let txtComment = document.getElementById('txtsms');

    let comment = {
        name : nameComment.value,
        txt : txtComment.value,
        time : Math.floor(Date.now()/1000)
    }

    nameComment.value = '';
    txtComment.value = '';

    comments.push(comment);

    showComments();
    answer();
    saveComments();
}

kommentButton.addEventListener('click', answer);

function answer() {
    if (kommentButton) {
        containerAnswer.className = 'container-like-answer-two';
    }
}

function saveComments() {
    localStorage.setItem('comments', JSON.stringify(comments));
}

function showComments() {
    let commentField = document.querySelector('#container-komment');
    let out = '';

    comments.forEach(function(item) {
        out += `<div id="data-komment">${timeConverter(item.time)}</div>`;
        out += `<div class="name-komment">${item.name}</div>`;
        out += `<div id="txt-komment">${item.txt}</div>`;
        out += `<div id="answer-komment"><img src="img/arrow.svg" width="25px" height="25px"><p>Ответить</p></div>`;
        out += `<div id="like-container"><div id="container"></div><p class="text">В избранное</p><p class="text-izbr">В избранном</p></div>`;
        out += `<div id="div-counter"><div class="div-fon"><img src="img/minus.svg" class="img-minus"></div><p class="counter-input">6</p><div class="div-fon"><img src="img/plus.svg" class="img-plus"></div></div>`
    })

    commentField.innerHTML = out;

    // переменная contourLike (контур лайка)

    const contourLike = document.createElement('img');
    contourLike.src = 'like_fon.svg';
    contourLike.className = 'contour-like';
    const containercontourLike = document.querySelector('#container');
    containercontourLike.append(contourLike);

    // переменная redLike (лайк)

    const redLike = document.createElement('img');
    redLike.src = 'like2.svg';
    redLike.className = 'likeActiv';
    const containerRedLike = document.querySelector('#container');
    containerRedLike.append(redLike);

    // переменные favouritesLike ('в избранное'), textRedLike ('в избранном')

    const favouritesLike = document.querySelector('.text');
    const textRedLike = document.querySelector('.text-izbr');

    // события

    contourLike.addEventListener('click', like);
    redLike.addEventListener('click', notLike)

    // поставить лайк

    function like() {
        if (contourLike) {
            redLike;
            redLike.className = 'likeBlok';
            textRedLike.className = 'text';
            favouritesLike.className = 'txt-not';
        }
    }

    // убрать лайк

    function notLike() {
        if (redLike) {
            contourLike;
            redLike.className = 'likeNot';
            textRedLike.className = 'txt-not';
            favouritesLike.className = 'text';
        }
    }

    // счетчик лайков комментария

    const likePlus = document.querySelector('.img-plus');
    const likeMinus = document.querySelector('.img-minus');
    
    let output = document.querySelector('.counter-input');

    likePlus.addEventListener('click', plus);
    likeMinus.addEventListener('click', minus);

    function plus() {
        let result = Number(output.innerHTML) + 1;

        if (result >= 0) {
            output.innerHTML = result;
        }
    }

    function minus() {
        let result = Number(output.innerHTML) - 1;
        output.innerHTML = result;
    }
}

function timeConverter(UNIX_timestamp) {
    let a = new Date(UNIX_timestamp * 1000);
    let months = ['январь', 'февраль', 'март', 'апрель', 'май', 'июнь', 'июль', 'август', 'сентябрь', 'октябрь', 'ноябрь', 'декабрь'];
    let year = a.getFullYear();
    let month = months[a.getMonth()];
    let date = a.getDate();
    let hour = a.getHours();
    let min = a.getMinutes();
    let time = date + ' ' + month + ' ' + year + ' ' + hour + ':' + min;
    return time;
}