'use strict';

const tasks = require('../models/tasks.js');

const getTasks = (req, res) => {
    res.render('main/main');
};

const deleteTask = (req, res) => {
    const id = req.body.id;

    if (tasks.removeTask(id)) {
        res.sendStatus(200);
    } else {
        res.sendStatus(400);
    }

};

const addTask = (req, res) => {
    const text = req.body.text;
    const id = tasks.add(text);

    if (typeof id !== 'undefined') {
        res.status(200).send({id, text});
    } else {
        res.sendStatus(400);
    }
};

const renameTask = (req, res) => {
    const id = req.body.id;
    const text = req.body.text;

    if (tasks.renameTask(id, text)) {
        res.status(200).send({text: text});
    } else {
        res.sendStatus(400);
    }
};

const refreshTasks = (req, res) => {
    res.status(200).send(tasks.getTasks());
};

module.exports = {
    getTasks,
    deleteTask,
    addTask,
    renameTask,
    refreshTasks
};
