'use strict';

const Todo = require('../models/todo.js');

exports.index = function (req, res) {
    res.render('index', { title: 'TODO-хи' });
};

exports.getList = function (req, res) {
    var listTodo = Todo.getAll();
    listTodo = listTodo.map(function (item) {
        return item.text;
    });

    res.send({
        status: 'OK. List TODO.',
        content: listTodo
    });
};

exports.itemAdd = function (req, res) {
    var todo = new Todo(req.body.content);
    todo.save();

    res.send({
        status: 'OK. Item added.'
    });
};

exports.itemDelete = function (req, res) {
    Todo.getById(req.body.id).delete();

    res.send({
        status: 'OK. Item deleted.'
    });
};

exports.itemChange = function (req, res) {
    Todo.setTextById(req.body.id, req.body.content);

    res.send({
        status: 'OK. Item changed.'
    });
};
