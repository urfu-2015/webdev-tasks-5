'use strict';

import {editTodo, addTodo} from './actions';
import {getCurrentTranslate} from './cssHelper';
import apiProvider from './apiProvider';
const editFormClass = '.todo__edit-form';
const todoTextClass = '.todo__text';
const editCheckbox = '.todo__edit-checkbox';
const createForm = '.todo__create-form';

exports.showEditForm = function (event) {
    if (event.target.style.transform !== "" && getCurrentTranslate(event.target) != 0) {
        event.preventDefault();
    }
    var editForm = event.target.parentElement.querySelector(editFormClass);
    editForm.value = event.target.parentElement.querySelector(todoTextClass).innerText;
};

exports.editTodoOnClick = function (store, id, event) {
    event.stopPropagation();
    event.preventDefault();
    var checkbox = event.target.parentElement.querySelector(editCheckbox);
    checkbox.checked = false;
    var text = event.target.parentElement.querySelector(editFormClass).value;
    var todo = {id, text};
    apiProvider('/todos', 'put', todo)
        .then(function (data) {
            store.dispatch(editTodo(data));
        });
};

function getNextId(store) {
    var todos = store.getState().todos;
    if (todos.length == 0) {
        return 0;
    }
    return Math.max.apply(null, todos.map(todo => todo.id)) + 1;
}


exports.createTodoOnClick = function (store, event) {
    event.stopPropagation();
    event.preventDefault();
    var targetElement = event.target;
    var todoId = getNextId(store);
    var textBox = targetElement.parentElement.querySelector(createForm);
    var text = textBox.value;
    if (!text) {
        return;
    }
    var todo = {id: todoId, text};
    fetch('/todos', {
        method: 'post',
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify(todo)
    }).then(function () {
        store.dispatch(addTodo(todo));
    });

    textBox.value = "";
};

