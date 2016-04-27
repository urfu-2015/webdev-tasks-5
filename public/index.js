const FORM = 'todo-list__form';
const TEXT = 'todo-list__text';
const ITEM = 'todo-list__item';
const TEXTAREA = 'todo-list__textarea';

function makeHidden(param, element) {
    let elem = element || document.querySelector('.todo-list__' + param + '_visible');

    if (elem) {
        elem.classList.remove('todo-list__' + param + '_visible');
        elem.classList.add('todo-list__' + param + '_hidden');
    }
}

function makeVisible(element, param) {
    element.classList.remove('todo-list__' + param + '_hidden');
    element.classList.add('todo-list__' + param + '_visible');
}

function removeClass(event, className = '.' + TEXTAREA + '_invalid') {
    let elementToChange = document.querySelector(className);
    
    if (elementToChange) {
        elementToChange.classList.remove(className);
    }
}

function defaultCondition(element) {
    console.log('default');
    console.log(element);
    let classList = element.classList;
    if (classList.contains(FORM + '-add')) { //форма добавления
        makeHidden('form');

        let textarea = element.querySelector('.' + TEXTAREA);

        textarea.value = '';
        textarea.classList.remove(TEXTAREA + '_invalid');
    } else if (classList.contains(FORM + '-edit')) { //форма изменения
        makeHidden('form');

        let textarea = element.querySelector('.' + TEXTAREA);

        textarea.value = element.parentElement.querySelector('.' + TEXT).textContent;
        textarea.classList.remove(TEXTAREA + '_invalid');

        makeVisible(element.parentElement.querySelector('.' + TEXT), 'text');
    } else if (classList.contains(TEXT)){
        element.classList.remove(TEXT + '_hidden');
        element.classList.add(TEXT + '_visible');
    } else {
        makeHidden('delete');
    }
}

function checkData() {
    let textarea = event.target.parentElement.querySelector('.todo-list__textarea');
    const text = textarea.value;
    if (!text.length) {
        event.preventDefault();
        textarea.classList.add('todo-list__textarea_invalid');
    }
}

function reload() {
    removeClass(null, '.spinner_hidden');
    location.reload();
}

function checkForActiveElement() {
    let otherActiveElement = document.querySelector('[data-active]');

    if (otherActiveElement) {
        defaultCondition(otherActiveElement);
        otherActiveElement.removeAttribute('data-active');
    }
}

function clickOnEmptySpace() {
    if (!event.target.classList.length) {
        checkForActiveElement();
    }
}

function editTodo() {
    checkForActiveElement();

    if (!event.target.classList.contains(TEXT)) {
        return;
    }

    let editForm = event.target.parentElement.querySelector('.' + FORM);

    editForm.dataset.active = '';
    makeVisible(editForm, 'form');

    makeHidden('text', event.target);
    editForm.querySelector('.' + TEXTAREA).focus();
}

function addTodo() {
    checkForActiveElement();

    let addForm = document.querySelector('.' + FORM + '-add');

    addForm.dataset.active = '';
    makeVisible(addForm, 'form');
    addForm.querySelector('.' + TEXTAREA).focus();
}

function showDeleteButton() {
    checkForActiveElement();

    let deleteButton;

    if (event.target.classList.contains(ITEM)) {
        deleteButton = event.target.querySelector('.todo-list__delete');
    } else if (event.target.classList.contains(TEXT)) {
        deleteButton = event.target.parentElement.querySelector('.todo-list__delete');
    } else {
        return;
    }
    deleteButton.dataset.active = '';
    deleteButton.style.width = event.target.clientHeight + 'px';
    makeVisible(deleteButton, 'delete');
}

function deleteTodo() {
    event.stopPropagation();
    // console.log('pressed delete');
    let todoNum = event.target.parentElement.getAttribute('data-id');
    // let formData = new FormData();
    // formData.append('text', todoNum);

    let xhr = new XMLHttpRequest();

    xhr.open('DELETE', '/', true);
    // xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
    xhr.send(JSON.stringify({text: todoNum}));
}

document.addEventListener('click', clickOnEmptySpace, false);

let textareas = document.querySelectorAll('.' + TEXTAREA);
for (let i = 0; i < textareas.length; i++) {
    textareas[i].addEventListener('input', removeClass, false);
}

let todos = document.querySelectorAll('.' + TEXT);
for (let i = 0; i < todos.length; i++) {
    todos[i].addEventListener('click', editTodo, false);
}

let button = document.querySelector('.todo-list__add-button');
button.addEventListener('click', addTodo, false);

let buttons = document.querySelectorAll('.todo-list__submit');
for (let i = 0; i < buttons.length; i++) {
    buttons[i].addEventListener('click', checkData, false);
}

let deletes = document.querySelectorAll('.todo-list__delete');
for (let i = 0; i < deletes.length; i++) {
    deletes[i].addEventListener('click', deleteTodo, false);
}

let startY, endY, startX, endX;

document.addEventListener('touchstart', function () {
    startY = event.changedTouches[0].clientY;
    startX = event.changedTouches[0].clientX;
}, false);

document.addEventListener('touchmove', function () {
    endY = event.changedTouches[event.changedTouches.length - 1].clientY;
    endX = event.changedTouches[event.changedTouches.length - 1].clientX;
}, false);

document.addEventListener('touchend', function () {
    if (endY - startY > 50) {
        reload();
    }
    if (startX - endX > 50) {
        showDeleteButton();
    }
    startX = undefined;
    startY = undefined;
    endX = undefined;
    endY = undefined;
});
