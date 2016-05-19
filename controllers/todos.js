'use strict';

const Todo = require('../models/todo');

function list(request, response) {
    const todos = Todo.findAll();
    const data = {
        todoList: todos
    };

    response.set('Content-Type', 'application/json');
    response.json(Todo.findAll());
}

exports.createTodo = function (request, response) {
    const text = request.body.text;
    const todo = new Todo(text);
    todo.save();

    response.json(Todo.findAll());
};

exports.deleteTodo = function (request, response) {
    Todo.deleteTodo(request.body.num);

    response.json(Todo.findAll());
};

exports.changeTodo = function (request, response) {
    Todo.changeTodo(request.body.num, request.body.text);

    response.json(Todo.findAll());
};

exports.list = list;
