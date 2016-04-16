'use strict';

var database = [];

exports.getAllTasks = function (req, res) {
	res.json(database);
};

exports.getTask = function (req, res) {
	var task = database.filter(function (task) {
        return task.id == req.params.id;
    });
	if (task.length) {
		res.json(task[0]);
	} else {
		res.status(404).json({ message: 'No task with this id'});
	}
};

exports.addTask = function (req, res) {
	if (!req.body.text) {
		return res.status(400).json({ message: 'No text' });
	}
    var task = {
		id: Date.now(),
		text: req.body.text
	};
	database.push(task);
	res.status(201).json({ message: 'OK', task: task });
};

exports.changeTask = function (req, res) {
	var task = database.filter(function (task) {
        return task.id == req.params.id;
    });
	if (task.length) {
		task[0].text = req.body.text;
		res.status(200).json({ message: 'OK' });
	} else {
		res.status(404).json({ message: 'No task with this id'});
	}
};

exports.deleteTask = function (req, res) {
	var i = 0;
    while (i < database.length && database[i].id != req.params.id) {
        i++;
    }
	database.splice(i, 1);
	res.status(200).json({ message: 'OK' });
};
