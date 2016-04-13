import ReactDOM from 'react-dom';
import {getTodosList, createTodo} from './lib.jsx';
import React from 'react';
import TodosList from './todosList.jsx'

var todosList = [];

window.onload = function () {
    addEventListeners();
    updateTodos();
};

function addEventListeners() {
    var createButtton = document.querySelector('.create-block .button');
    createButtton.addEventListener('touchstart', function () {
        var textField = document.querySelector('.create-block .text');
        var text = textField.value;
        createTodo(text, function (err, id) {
            if (err) {
                return alert(err);
            }
            todosList.push({id, text});
            ReactDOM.render(<TodosList todoItems={todosList}/>, document.getElementsByClassName('target')[0]);
            textField.value = '';
        });
    });

    var content = document.getElementsByClassName('content')[0];
    content.style.top = '0px';
    var currentTop = 0;
    var startPoint = {};

    document.body.addEventListener('touchstart', function (event) {
        startPoint = event.changedTouches[0];
    });

    document.body.addEventListener('touchmove', function (event) {
        var newPoint = event.changedTouches[0];
        var dy = newPoint.pageY - startPoint.pageY;
        currentTop = Math.min(currentTop + dy, 60);
        currentTop = Math.max(currentTop, 0);
        startPoint = newPoint;
        content.style.top = currentTop + 'px';
    });

    document.body.addEventListener('touchend', function (event) {
        if (currentTop > 10) {
            updateTodos();
        }

        content.classList.add('content_slide-up');
        currentTop = 0;
        content.style.top = '0px';


        setTimeout(function () {
            content.classList.remove('content_slide-up');
        }, 300);
    });
}

function updateTodos() {
    getTodosList(function (err, todos) {
        todosList = todos;
        ReactDOM.render(<TodosList todoItems={todos}/>, document.getElementsByClassName('target')[0]);
    });
}
