'use strict';

const Task = require('../models/task');

exports.error404 = (req, res) => {
    res.status(404).send("Not found.");
}

exports.index = (req, res) => {
	res.render('index', {
        tasks: Task.getAllTasks()
    });
};
