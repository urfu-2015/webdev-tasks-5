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
            order: todo.order
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
    todo.save();

    req.sendStatus(201);
};

module.exports.item = (req, res) => {
    const todo = Todo.findById(req.params.id);

    if (!todo) {
        res.sendStatus(404);

        return;
    }

    res.json({
        name: todo.name,
        order: todo.order
    });

};

module.exports.patch = (req, res) => {
    const todo = Todo.findById(req.params.id);

    if (!todo) {
        res.sendStatus(404);

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