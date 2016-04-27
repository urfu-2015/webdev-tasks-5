'use strict';

const Todo = require('../models/todo');

function list(request, response) {
    const todos = Todo.findAll();
    const data = {
        todoList: todos
    };
    response.render('index', Object.assign(data, request.commonData));
}

exports.createTodo = function (request, response) {
    const text = request.body.text;
    const todo = new Todo(text);
    todo.save();

    response.redirect('/');
};

exports.deleteTodo = function (request, response) {
    // console.log('~~~', request.body);
    Todo.deleteTodo(request.body.num);

    response.sendStatus(200);
};

exports.changeTodo = function (request, response) {
    // console.log('~~~', request.body);
    Todo.changeTodo(request.body.num, request.body.text);

    response.sendStatus(200);
};

exports.list = list;
