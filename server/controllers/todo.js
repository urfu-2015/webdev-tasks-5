'use strict';

const Todo = require('../models/todo');

exports.emptyList = (req, res) => {
    res.render('main/main');
};

exports.list = (req, res) => {
    const todos = Todo.getAll();
    const data = {
        todos: todos
    };

    res.json(data);
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

    res.json(data);
};

exports.delete = (req, res) => {
    const delId = req.body.delId;

    Todo.del(delId);

    const data = {
        delId: delId
    };

    res.json(data);
};

exports.edit = (req, res) => {
    const data = {
        id: req.body.id,
        editText: req.body.editText
    };

    Todo.edit(data.id, data.editText);

    res.json(data);
};
