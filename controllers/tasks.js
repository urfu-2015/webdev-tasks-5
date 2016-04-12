'use strict';

const Task = require('../models/task');
const fs = require('fs');

exports.list = (req, res) => {
    res.json({
        tasks: Task.findAll()
    });
};

exports.add = (req, res) => {
    var result = 'ok';
    if (req.body.text.length == 0) {
        result = 'empty task';
    } else {
        var newTask = new Task(req.body.text).save();
    }
    res.json({
        tasks: Task.findAll(),
        message: result
    });
};

exports.remove = (req, res) => {
    var result = Task.remove(req.body.id);
    res.json({
        tasks: Task.findAll(),
        message: result
    });
};

exports.edit = (req, res) => {
    var newText = req.body.text;
    var result = Task.edit(req.body.id, newText);
    res.json({
        tasks: Task.findAll(),
        message: result
    });
};
