'use strict';

const Task = require('../models/task');

exports.list = (req, res) => {
    res.send(Task.findAll());
};

exports.single = (req, res) => {
    const id = req.params.id;
    if (!id) {
        res.sendStatus(400);
        return;
    }
    const task = Task.find(id);
    if (!task) {
        res.sendStatus(400);
        return;
    }
    res.send(task);
};

exports.create = (req, res) => {
    const text = req.body.text;
    const task = new Task(text, 0);
    task.save();
    res.send(Task.find(task.id));
};

exports.delete = (req, res) => {
    const id = req.params.id;
    if (!Task.removeTask(id)) {
        res.sendStatus(400);
        return;
    }
    res.sendStatus(202);
};

exports.replace = (req, res) => {
    const id = req.params.id;
    const task = Task.find(id);
    if (!task) {
        res.sendStatus(400);
        return;
    }
    Task.removeTask(id);
    const text = req.body.text || task.text;
    let position = task.position;
    if (typeof position === 'number') {
        position = req.body.position;
    }
    const newTask = new Task(text, position).save();
    res.send(newTask);
};
