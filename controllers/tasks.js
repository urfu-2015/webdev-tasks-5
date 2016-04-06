'use strict';

const Task = require('../models/task');
const fs = require('fs');

exports.list = (req, res) => {
    res.json({
        tasks: Task.findAll()
    });
};

exports.add = (req, res) => {
    var newTask = new Task(req.body.text).save();
    res.json({
        tasks: Task.findAll()
    });
};

exports.remove = (req, res) => {
    var isRemoved = Task.remove(req.body.id);
    res.json({
        tasks: Task.findAll()
    });
};

exports.edit = (req, res) => {
    var newText = req.body.text;
    Task.edit(req.body.id, newText);
    res.json({
        tasks: Task.findAll()
    });
};
