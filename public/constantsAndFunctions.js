'use strict';

const FORM = 'todo-list__form';
const TEXT = 'todo-list__text';
const DELETE = 'todo-list__delete';
const TEXTAREA = 'todo-list__textarea';

let startY, startPageY, startX, endX, endY, endPageY, spinner = document.querySelector('.spinner');
const pullDivide = document.documentElement.clientHeight; // докуда можно пальцем тянуть
const defaultTop = -52;

//функци, не относящиеся к самим компонентам, а лишь к элементам страницы
function makeVisible(element, param) {
    element.classList.remove('todo-list__' + param + '_hidden');
    element.classList.add('todo-list__' + param + '_visible');
}

function makeHidden(param, element) {
    let elem = element || document.querySelector('.todo-list__' + param + '_visible');

    if (elem) {
        elem.classList.remove('todo-list__' + param + '_visible');
        elem.classList.add('todo-list__' + param + '_hidden');
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

function checkForActiveElement() {
    let otherActiveElement = document.querySelector('[data-active]');

    if (otherActiveElement) {
        defaultCondition(otherActiveElement);
        otherActiveElement.removeAttribute('data-active');
    }
}

function showDeleteButton(event) {
    if (startX - endX > 50) {
        checkForActiveElement();

        let deleteButton =
            event.target.parentElement.parentElement.querySelector('.' + DELETE);

        deleteButton.dataset.active = '';
        deleteButton.style.width = event.target.clientHeight + 'px';
        makeVisible(deleteButton, 'delete');
    }

    startX = undefined;
    endX = undefined;
}

function showAddForm() {
    checkForActiveElement();

    let addForm = document.querySelector('.' + FORM + '-add');

    addForm.dataset.active = '';
    makeVisible(addForm, 'form');
    addForm.querySelector('.' + TEXTAREA).focus();
}

function showEditForm(event) {
    checkForActiveElement();

    if (!event.target.classList.contains(TEXT)) {
        return;
    }

    let editForm = event.target.parentElement.parentElement.querySelector('.' + FORM);

    editForm.dataset.active = '';
    makeVisible(editForm, 'form');

    makeHidden('text', event.target);
    editForm.querySelector('.' + TEXTAREA).focus();
}
