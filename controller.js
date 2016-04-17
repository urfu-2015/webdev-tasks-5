'use strict';

const Task = require('./models/task');

module.exports.list = (req, res) => {
    const tasks = Task.findAll();
    const data = {tasks};
    res.render('index', Object.assign(data, req.commonData));
};

module.exports.getjson = (req, res) => {
    const tasks = Task.findAll();
    const data = {tasks};
    res.send(JSON.stringify(Object.assign(data, req.commonData)));
};

module.exports.create = (req, res) => {
    if (req.body.message != '') {
        var data = {
            text: req.body.message,
            createdAt: Date.now()
        };
        const note = new Task(data);
        note.save();
        res.sendStatus(204);
    } else {
        res.sendStatus(400);
    }
};

module.exports.update = (req, res) => {
    console.log(req.body.newText);
    if (req.body.newText != '') {
        Task.update(req.body.oldText, req.body.newText);
        res.sendStatus(204);
    } else {
        res.sendStatus(400);
    }
};

module.exports.delete = (req, res) => {
    Task.deleteTask(req.body.text);
    const tasks = Task.findAll();
    var data = {tasks};
    res.sendStatus(204);
};
