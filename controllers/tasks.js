'use strict';

const Task = require('../models/task');

exports.list = (req, res) => {
    res.send(Task.findAll());
};

exports.add = (req, res) => {
    var text = req.body.text;
    var newTask = new Task(text).save();
    res.sendStatus(200);
};

exports.remove = (req, res) => {
    var id = req.body.id;
    Task.remove(id);
    res.sendStatus(200);
};

exports.edit = (req, res) => {
    var id = req.body.id;
    var newText = req.body.text;
    Task.edit(id, newText);
    var data = {
        text: newText
    };
    res.send(data, 200);
};