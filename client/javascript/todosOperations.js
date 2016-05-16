'use strict';

import {editTodo} from '../actions';
import {addTodo} from '../actions';

function sendRequest(body, method, action) {
    fetch('/todos', {
        method,
        headers: {
            "Content-type": "application/json"
        },
        body: JSON.stringify(body)
    })
        .then(data => {
            if (data.status !== 200) {
                return;
            }
            action();
        });
}

exports.showEditForm = function (event) {
    if (event.target.style.transform !== "" && parseInt(event.target.style.transform.split('(')[1], 10) != 0) {
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
    sendRequest(todo, 'put', () => store.dispatch(editTodo(todo)));
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
    var textBox = targetElement.parentElement.querySelector('.todo__create-form');
    var text = textBox.value;
    if (!text) {
        return;
    }
    var todo = {id: todoId, text};
    sendRequest(todo, 'post', () => store.dispatch(addTodo(todo)));
    textBox.value = "";
};

