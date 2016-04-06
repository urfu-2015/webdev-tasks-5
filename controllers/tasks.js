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
    var index = parseInt(Object.keys(req.body)[0]);
    Task.deleteTask(index);
    res.render('index', {
        tasks: Task.getAllTasks()
    });
};

exports.updateTask = (req, res) => {
    var key = Object.keys(req.body)[0];
    var indexComma = key.indexOf(',');
    var index = parseInt(key.substring(0, indexComma));
    var newText = key.substring(indexComma + 1, key.length);
    Task.updateTask(index, newText);
    res.render('index', {
        tasks: Task.getAllTasks()
    });
};

exports.refresh = (req, res) => {
    var texts = Object.keys(req.body)[0];
    var oldTasks = [];
    var oldTasksText = [];
    var index = texts.indexOf(',');
    if (index !== -1) {
        while (index !== -1) {
            var text = texts.substring(0, index);
            oldTasks.push({name: text});
            oldTasksText.push(text);
            texts = texts.substring(index + 1, texts.length);
            index = texts.indexOf(',');
        }
    }
    oldTasks.push({name: texts});
    oldTasksText.push(texts);
    var newTasks = Task.getAllTasks().filter(function (elem) {
        return oldTasksText.indexOf(elem.name) === -1;
    });
    var newTasks = newTasks.concat(oldTasks);
    Task.sortingTasks(newTasks);
    res.render('index', {
        tasks: newTasks
    });
};
