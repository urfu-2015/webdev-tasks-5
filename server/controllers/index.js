'use strict';

const Todo = require('../models/todo.js');

exports.index = function (req, res) {
    res.render('index', { title: 'TODO-хи' });
};

exports.getList = function (req, res) {
    var listTodo = Todo.getAll();

    res.status(200).json({
        msg: 'OK. List TODO.',
        content: listTodo
    });
};

exports.itemAdd = function (req, res) {
    var todo = new Todo(req.body.content);
    todo.save();

    res.status(200).json({
        msg: 'OK. Item added.',
        content: todo
    });
};

exports.itemDelete = function (req, res) {
    var todo = Todo.getTodoById(req.body.id);
    if (todo !== null) {
        todo.delete();
    }

    res.status(200).json({
        msg: 'OK. Item deleted.',
        content: {
            id: req.body.id
        }
    });
};

exports.itemChange = function (req, res) {
    Todo.setTextById(req.body.id, req.body.content);

    res.status(200).json({
        msg: 'OK. Item changed.',
        content: Todo.getTodoById(req.body.id)
    });
};
