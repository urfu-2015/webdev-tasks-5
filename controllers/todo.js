'use strict';
const Todo = require('../models/todo');

exports.list = (req, res) => {
    const todoes = Todo.getAll();
    return(todoes);
};

exports.save = (req, res) => {
    const newTodo = req.body.text;
    new Todo(newTodo).save();
};

exports.delete = (req, res) => {
    const id = req.body.id;
    Todo.delete(id);
};

