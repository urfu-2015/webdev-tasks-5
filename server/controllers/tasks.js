"use strict";

const Task = require('../models/Task.js');

var storage = Task.getStorage();

exports.getTodos = (req, res) => {
    res.status(200).send({
        content: storage
    });
};

exports.addTodo = (req, res) => {
    console.log('req in addTodo:');
    console.log(req.body);
    var task = new Task(req.body);
    task.save();
    res.sendStatus(200);
};

exports.deleteTodo = (req, res) => {
    Task.removeTask(req.params.id);
    res.sendStatus(200);
};

exports.changeTodo = (req, res) => {
    console.log('req in changeTodo: ');
    console.log(req.body);
    var task = Task.changeTask(req.params.id, req.body.text);
    res.status(200).send(task);
};
