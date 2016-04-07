'use strict';

const Task = require('../models/task');

exports.list = (req, res) => {
    res.render('index', {
        tasks: Task.getAllTasks()
    });
};

exports.addTask = (req, res) => {
    Task.addTask(req.body.task);
    res.redirect('/');
};

exports.deleteTask = (req, res) => {
    var index = parseInt(Object.keys(req.body)[0], 10);
    if (!isNaN(index)) {
        Task.deleteTask(index);
    }
    res.redirect('/');
};

exports.updateTask = (req, res) => {
    var keys = Object.keys(req.body);
    if (keys.length !== 0) {
        var key = keys[0];
        var indexAndText = key.split(',');
        Task.updateTask(indexAndText[0], indexAndText[1]);
    }
    res.render('index', {
        tasks: Task.getAllTasks()
    });
};

exports.refresh = (req, res) => {
    var texts = Object.keys(req.body)[0];
    var oldTasks = [];
    var index = texts.indexOf(',');
    if (index !== -1) {
        while (index !== -1) {
            var text = texts.substring(0, index);
            oldTasks.push(text);
            texts = texts.substring(index + 1, texts.length);
            index = texts.indexOf(',');
        }
    }
    oldTasks.push(texts);
    var tasks = Task.getAllTasks();
    if (oldTasks.length !== tasks.length) {
        tasks = Task.getSortingTasks(oldTasks);
    }
    res.render('index', {
        tasks: tasks
    });
};
