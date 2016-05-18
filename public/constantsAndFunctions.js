'use strict';

const FORM = 'js-todo-list__form',
    TEXT = 'js-todo-list__text',
    DELETE = 'js-todo-list__delete',
    TEXTAREA = 'js-todo-list__textarea',
    pullDivide = document.documentElement.clientHeight, // докуда можно пальцем тянуть
    defaultTop = -52;

//функци, не относящиеся к самим компонентам, а лишь к элементам страницы
function isAddForm(classList) {
    return classList.contains(FORM + '-add');
}

function isEditForm(classList) {
    return classList.contains(FORM + '-edit');
}

function isText(classList) {
    return classList.contains(TEXT);
}

function makeVisible(element, param) {
    element.classList.remove('todo-list__' + param + '_hidden');
    element.classList.add('js-todo-list__' + param + '_visible');
}

function setFocus(element) {
    element.focus();
}

function setActiveAttribute(element) {
    element.dataset.active = '';
}

function getGrandParent(element, param) {
    return element.parentElement.parentElement.querySelector('.' + param);
}

function getTextArea(element) {
    return element.querySelector('.' + TEXTAREA);
}

function hideElement(param, element) {
    let elem = element || document.querySelector('.js-todo-list__' + param + '_visible');

    if (elem) {
        elem.classList.remove('js-todo-list__' + param + '_visible');
        elem.classList.add('todo-list__' + param + '_hidden');
    }
}

function defaultCondition(element) {
    let classList = element.classList,
        text = element.parentElement.querySelector('.' + TEXT);

    if (isAddForm(classList)) { //форма добавления
        hideElement('form');

        let textarea = getTextArea(element);

        textarea.value = '';
    } else if (isEditForm(classList)) { //форма изменения
        hideElement('form');

        let textarea = getTextArea(element);

        textarea.value = text.textContent;
        
        makeVisible(text, 'text');
    } else if (isText(classList)){
        makeVisible(element, 'text');
    } else {
        hideElement('delete');
    }
}

function hideOtherActiveElement() {
    let otherActiveElement = document.querySelector('[data-active]');

    if (otherActiveElement) {
        defaultCondition(otherActiveElement);
        otherActiveElement.removeAttribute('data-active');
    }
}

function showDeleteButton(event, startX, endX) {
    if (startX - endX > 50) {
        let element = event.target,
            deleteButton = getGrandParent(element, DELETE);

        setActiveAttribute(deleteButton);
        deleteButton.style.width = element.clientHeight + 'px';
        makeVisible(deleteButton, 'delete');
    }
}

function showAddForm() {
    let addForm = document.querySelector('.' + FORM + '-add');

    setActiveAttribute(addForm);
    makeVisible(addForm, 'form');
    setFocus(getTextArea(addForm));
}

function showEditForm(event) {
    let element = event.target,
        editForm = getGrandParent(element, FORM + '-edit'),
        textarea = getTextArea(editForm);

    setActiveAttribute(editForm);
    makeVisible(editForm, 'form');
    hideElement('text', element);

    setFocus(textarea);
}

function xhr(requestType, url, func, data) {
    let xhr = new XMLHttpRequest();

    xhr.open(requestType, url, true);
    xhr.setRequestHeader('Content-Type', 'application/json');

    if (requestType === 'GET') {
        xhr.send();
    } else {
        xhr.send(JSON.stringify(data));
    }

    xhr.onreadystatechange = () => {
        if (xhr.readyState === 4 && xhr.status === 200) {
            let parsedResponse;

            try {
                parsedResponse = JSON.parse(xhr.response);
            } catch (err) {
                return;
            }

            func(parsedResponse);
        }
    };
}
