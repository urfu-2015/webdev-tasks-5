'use strict';

const Task = require('../models/task');

exports.list = (req, res) => {
    var tasks = Task.getAllTasks();
    if (req.query.exclude) {
        var excluded = req.query.exclude.split(",").map(elem => parseInt(elem, 10));
        tasks = tasks.filter((elem) => {
            return excluded.indexOf(elem.id) === -1;
        })
    }
    res.json(tasks);
};

exports.addTask = (req, res) => {
    var text = Object.keys(req.body)[0];
    if (Object.keys(req.body).length === 0) {
        res.status(400).json({
            code: 400, 
            message: "Task is empty"
        });
        return;
    }

    var id = Task.addTask(text);
    // res.status(201).json({
    //     code: 201,
    //     message: "Task created",
    //     id: id
    // });
    res.redirect('/');
};

exports.deleteTask = (req, res) => {
    var id = parseInt(req.params.id, 10);
    if (isNaN(id)) {
        res.status(400).json({
            code: 400, 
            message: "Task id is incorrect"
        });
        return;
    }

    var deleted = Task.deleteTask(id);
    if (deleted) {
        res.status(200).json({
            code: 200,
            message: "Task deleted"
        });
    } else {
        res.status(404).json({
            code: 404, 
            message: "Task " + id + " not found"
        });
    }
};

exports.updateTask = (req, res) => {
    var id = parseInt(req.params.id, 10);
    if (isNaN(id)) {
        res.status(400).json({
            code: 400, 
            message: "Task id is incorrect"
        });
        return;
    }

    var text = Object.keys(req.body)[0];
    var updated = Task.updateTask(id, text);
    if (updated) {
        res.status(200).json({
            code: 200,
            message: "Task updated"
        });
    } else {
        res.status(404).json({
            code: 404, 
            message: "Task " + id + " not found"
        });
    }
};
