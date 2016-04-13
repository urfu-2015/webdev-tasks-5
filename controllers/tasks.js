'use strict';

const Task = require('../models/task');
const fs = require('fs');

exports.list = (req, res) => {
    res.json({tasks: Task.findAll()});
};

exports.add = (req, res) => {
    var isAdded = new Task(req.body.text).save();
    isAdded ? res.json({tasks: Task.findAll()}) :
              res.status(500).send('text of any task should not be empty :(');
};

exports.remove = (req, res) => {
    var isRemoved = Task.remove(req.body.id);
    isRemoved ? res.json({tasks: Task.findAll()}) :
                res.status(500).send('id is not correct :(');
};

exports.edit = (req, res) => {
    var isEdited = Task.edit(req.body.id, req.body.text);
    isEdited ? res.json({tasks: Task.findAll()}) :
               res.status(500).send('id is not correct or text is empty :(');
};
