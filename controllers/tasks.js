'use strict';

const Task = require('../models/task');

exports.list = (req, res) => {
    var data = {
        list: Task.findAll()
    };
    res.render('list', data);
};

exports.add = (req, res) => {
    var newTask = new Task(req.body.text).save();
    res.sendStatus(200);
};

exports.remove = (req, res) => {
    var isRemoved = Task.remove(req.body.id);
    isRemoved ? res.sendStatus(200) : res.status(500).send('Incorrect id');
};

exports.edit = (req, res) => {
    var newText = req.body.text;
    Task.edit(req.body.id, newText);
    var data = {
        text: newText
    };
    res.status(200).send(data);
};
