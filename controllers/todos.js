'use strict';

const Todo = require('../models/todo');

function list(request, response) {
    const todos = Todo.findAll();
    const data = {
        todoList: todos
    };
    //TODO должен отдавать статус и список json'ов
    response.set('Content-Type', 'application/json');
    response.json(Todo.findAll());
    // response.render('index', Object.assign(data, request.commonData));
}

exports.createTodo = function (request, response) {
    const text = request.body.text;
    const todo = new Todo(text);
    todo.save();
    //TODO должен отдавать статус и json
    response.json(Todo.findAll());
    // response.redirect('/');
};

exports.deleteTodo = function (request, response) {
    // console.log('~~~', request.body);
    Todo.deleteTodo(request.body.num);

    response.json(Todo.findAll());
    // response.sendStatus(200);
};

exports.changeTodo = function (request, response) {
    // console.log('~~~', request.body);
    Todo.changeTodo(request.body.num, request.body.text);
    //TODO должен отдавать статус и json
    response.json(Todo.findAll());
    // response.sendStatus(200);
};

exports.list = list;
