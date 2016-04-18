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
    // console.log(request.body.text, '~~~');
    const todo = new Todo(text);
    todo.save();

    const todos = Todo.findAll();
    // console.log(todos);
    const data = {
        todoList: todos
    };
    response.render('index', Object.assign(data, request.commonData));
    // response.send(text);
};

exports.list = list;
