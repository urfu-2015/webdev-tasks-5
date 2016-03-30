'use strict';

const Task = require('./models/task');

module.exports.list = (req, res) => {
    const tasks = Task.findAll();
    const data = {tasks};
    res.render('index', Object.assign(data, req.commonData));
};

module.exports.create = (req, res) => {
    var data = {
        text: req.body.message,
        createdAt: Date.now()
    };
    const note = new Task(data);
    note.save();
    const tasks = Task.findAll();
    data = {tasks};
    res.render('index', Object.assign(data, req.commonData));
};

module.exports.update = (req, res) => {
    Task.update(req.body.oldText, req.body.newText);
    res.redirect('/');
};

module.exports.delete = (req, res) => {
    Task.deleteTaskById(req.body.id);
    const tasks = Task.findAll();
    var data = {tasks};
    res.redirect('/');
};
