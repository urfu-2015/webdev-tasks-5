'use strict';

const Todo = require('../models/todo.js');

module.exports.list = (req, res) => {
    let todos = Todo.findAll();

    todos = todos.filter((todo) => {

        return todo !== undefined;
    });

    todos = todos.map((todo) => {

        return {
            text: todo.text,
            order: todo.order,
            _id: todo._id
        };
    });

    res.json({
        todos: todos
    });
};

module.exports.create = (req, res) => {
    const todo = new Todo ({
       text: req.body.text
    });

    if (req.body.text === '') {
        res.sendStatus(406);

        return;
    }

    todo.save();

    res.json({
        text: todo.text,
        order: todo.order,
        _id: todo._id
    });
};

module.exports.item = (req, res) => {
    const todo = Todo.findById(req.params.id);

    if (!todo) {
        res.sendStatus(404);

        return;
    }

    res.json({
        text: todo.text,
        order: todo.order,
        _id: todo._id
    });

};

module.exports.patch = (req, res) => {
    const todo = Todo.findById(req.params.id);

    if (!todo) {
        res.sendStatus(404);

        return;
    }

    if (req.body.text === '') {
        res.sendStatus(406);

        return;
    }

    if (req.body.text !== undefined) {
        todo.text = req.body.text;
    }
    if (req.body.order !== undefined) {
        todo.order = req.body.order;
    }

    res.sendStatus(200);
};

module.exports.delete = (req, res) => {
    const todo = Todo.findById(req.params.id);

    todo.delete();

    res.sendStatus(200);
};