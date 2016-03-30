'use strict';

const Todo = require('../models/todo');

exports.list = (req, res) => {
    const todos = Todo.getAll();
    const data = {
        todos: todos
    };

    res.render('main/main', Object.assign(data, req.commonData));
};

exports.asyncList = (req, res) => {
    const todos = Todo.getAll();
    const data = {
        todos: todos
    };

    res.send(data);
};

exports.add = (req, res) => {
    const todo = new Todo({
        text: req.body.text
    });

    todo.save();

    const data = {
        id: todo.id,
        text: todo.text
    };

    res.send(data);
};

exports.delete = (req, res) => {
    const delId = req.body.id;

    Todo.del(delId);

    const data = {
        delId: delId
    };

    res.send(data);
};

exports.edit = (req, res) => {
    const data = {
        id: req.body.id,
        editText: req.body.editText
    };

    Todo.edit(data.id, data.editText);

    res.send(data);
};
