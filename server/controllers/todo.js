'use strict';

const Todo = require('../models/todo');

exports.list = (req, res) => {
    res.render('todos/todos', req.commonData);
};

exports.apiList = (req, res) => {
    res.json({todos: Todo.findAll()});
};

exports.create = (req, res) => {
    const todo = new Todo(
        req.body.id,
        req.body.text
    );
    console.log(todo);
    todo.save();
    res.status(200).send();
};

exports.edit = (req, res) => {
    if (Todo.updateById(req.body.id, req.body)) {
        res.json({id: req.body.id, text: req.body.text});
    } else {
        res.status(400).send();
    }
};

exports.delete = (req, res) => {
    var todoId = req.body.id;
    var result = Todo.deleteById(todoId);
    if (result) {
        res.json({id: todoId});
    } else {
        res.status(400).send();
    }
};
