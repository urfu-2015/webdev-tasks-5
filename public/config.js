'use strict';

const FORM = 'todo-list__form';
const TEXT = 'todo-list__text';
const ITEM = 'todo-list__item';
const DELETE = 'todo-list__delete';
const TEXTAREA = 'todo-list__textarea';

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

function reload() {
    let spinner = document.querySelector('.spinner_hidden');

    if (spinner) {
        spinner.classList.remove('spinner_hidden');
    }
    location.reload();
}
