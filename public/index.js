const FORM = 'todo-list__form';
const TEXT = 'todo-list__text';
const ITEM = 'todo-list__item';
const DELETE = 'todo-list__delete';
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

function removeClass(event, className = TEXTAREA + '_invalid') {
    let elementToChange = document.querySelector('.' + className);

    if (elementToChange) {
        elementToChange.classList.remove(className);
    }
}

function defaultCondition(element) {
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

function reload() {
    removeClass(null, 'spinner_hidden');
    location.reload();
}

function checkForActiveElement() {
    let otherActiveElement = document.querySelector('[data-active]');

    if (otherActiveElement) {
        defaultCondition(otherActiveElement);
        otherActiveElement.removeAttribute('data-active');
    }
}

function clickOnEmptySpace(event) {
    if (!event.target.classList.length) {
        checkForActiveElement();
    }
}

function checkData(event) {
    event = event || window.event;

    let textarea = event.target.parentElement.querySelector('.' + TEXTAREA);
    const text = textarea.value;

    if (!text.length) {
        event.preventDefault();
        textarea.classList.add(TEXTAREA + '_invalid');
    }
}

function showAddForm() {
    checkForActiveElement();

    let addForm = document.querySelector('.' + FORM + '-add');

    addForm.dataset.active = '';
    makeVisible(addForm, 'form');
    addForm.querySelector('.' + TEXTAREA).focus();
}

function showEditForm(event) {
    event = event || window.event;

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

function changeTodo(event) {
    event = event || window.event;
    
    let todoText = event.target.parentElement.parentElement.querySelector('.' + TEXTAREA).value;
    if (!todoText.length) {
        return;
    }

    let todoNum = event.target.parentElement.parentElement.getAttribute('data-id');

    let xhr = new XMLHttpRequest();

    xhr.open('PATCH', '/', true);
    xhr.setRequestHeader('Content-Type', 'application/json');
    xhr.send(JSON.stringify({num: todoNum, text: todoText}));

    xhr.onreadystatechange = function () {
        if (xhr.readyState === 4 && xhr.status === 200) {
            reload();
        }
    };
}

function showDeleteButton(event) {
    event = event || window.event;

    checkForActiveElement();

    let deleteButton;

    if (event.target.classList.contains(ITEM)) {
        deleteButton = event.target.querySelector('.' + DELETE);
    } else if (event.target.classList.contains(TEXT)) {
        deleteButton = event.target.parentElement.querySelector('.' + DELETE);
    } else {
        return;
    }
    deleteButton.dataset.active = '';
    deleteButton.style.width = event.target.clientHeight + 'px';
    makeVisible(deleteButton, 'delete');
}

function deleteTodo(event) {
    event = event || window.event;

    let todoNum = event.target.parentElement.getAttribute('data-id');

    let xhr = new XMLHttpRequest();

    xhr.open('DELETE', '/', true);
    xhr.setRequestHeader('Content-Type', 'application/json');
    xhr.send(JSON.stringify({num: todoNum}));

    xhr.onreadystatechange = function () {
        if (xhr.readyState === 4 && xhr.status === 200) {
            reload();
        }
    };
}

document.addEventListener('click', clickOnEmptySpace, false);

let textareas = document.querySelectorAll('.' + TEXTAREA);
for (let i = 0; i < textareas.length; i++) {
    textareas[i].addEventListener('input', removeClass, false);
}

let todos = document.querySelectorAll('.' + TEXT);
for (let i = 0; i < todos.length; i++) {
    todos[i].addEventListener('click', showEditForm, false);
}

let button = document.querySelector('.todo-list__add-button');
button.addEventListener('click', showAddForm, false);

let buttons = document.querySelectorAll('.todo-list__submit');
for (let i = 0; i < buttons.length; i++) {
    buttons[i].addEventListener('click', checkData, false);
}

let edtButtons = document.querySelectorAll('.todo-list__submit-edit');
for (let i = 0; i < edtButtons.length; i++) {
    edtButtons[i].addEventListener('click', changeTodo, false);
}

let deletes = document.querySelectorAll('.' + DELETE);
for (let i = 0; i < deletes.length; i++) {
    deletes[i].addEventListener('click', deleteTodo, false);
}

//react использовать

//TODO в модуль

let startY, endY, startX, endX;

document.addEventListener('touchstart', function (event) {
    event = event || window.event;

    startY = event.changedTouches[0].clientY;
    startX = event.changedTouches[0].clientX;
}, false);

document.addEventListener('touchmove', function (event) {
    event = event || window.event;

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
