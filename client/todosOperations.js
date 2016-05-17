'use strict';

import {editTodo, addTodo} from './actions';
import {getCurrentTranslate} from './cssHelper';
import apiProvider from './apiProvider';

exports.showEditForm = function (event) {
    if (event.target.style.transform !== "" && getCurrentTranslate(event.target) != 0) {
        event.preventDefault();
    }
    var editForm = event.target.parentElement.querySelector(".todo__edit-form");
    editForm.value = event.target.parentElement.querySelector(".todo__text").innerText;
};

exports.editTodoOnClick = function (store, id, event) {
    event.stopPropagation();
    event.preventDefault();
    var checkbox = event.target.parentElement.querySelector(".todo__edit-checkbox");
    checkbox.checked = false;
    var text = event.target.parentElement.querySelector(".todo__edit-form").value;
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
    var result = Math.max.apply(null, todos.map(todo => todo.id)) + 1;
    return Math.max.apply(null, todos.map(todo => todo.id)) + 1;
}


exports.createTodoOnClick = function (store, event) {
    event.stopPropagation();
    event.preventDefault();
    var targetElement = event.target;
    var todoId = getNextId(store);
    var textBox = targetElement.parentElement.querySelector('.todo__create-form');
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

