const form = document.querySelector('.js-form'),
    input = form.querySelector('input'),
    greeting = document.querySelector('.js-greeting');

const USER_NAME = 'userName',
    SHOWING_CLASS = 'showing';

function removeAtLocalStorage(){
    localStorage.removeItem(USER_NAME);
}

function nameEdit(){
    removeAtLocalStorage();
    saveUserName();
    getUserName();
}

function paintGreeting(text){
    form.classList.remove(SHOWING_CLASS);
    greeting.classList.add(SHOWING_CLASS);
    greeting.innerText = `${text}님의 오늘의 할일`;

    //edit btn
    const editBtn = document.createElement('button');
    editBtn.innerText = '✏️';
    editBtn.addEventListener('click', nameEdit);
    greeting.appendChild(editBtn);
}

function saveUserName(text){
    localStorage.setItem(USER_NAME, text);
}

function handleSubmit(event){
    event.preventDefault();
    const inputValue = input.value;
    saveUserName(inputValue);
    paintGreeting(inputValue);
}

function getUserName(){
    form.classList.add(SHOWING_CLASS);
    greeting.classList.remove(SHOWING_CLASS);
    form.addEventListener('submit', handleSubmit);
}

function loadUserName(){
    const currentUserName = localStorage.getItem(USER_NAME);

    if(currentUserName === null){
        getUserName();
    } else if(currentUserName == 'undefined' || currentUserName === '') { 
        getUserName();
    } else {
        paintGreeting(currentUserName);
    }
}

function init(){
    loadUserName();
}

init();