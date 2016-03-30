'use strict';

var database = [];

exports.getAllTasks = function (req, res) {
	res.json(database);
};

exports.getTask = function (req, res) {
	var task = database.filter(task => task.id == req.params.id);
	if (task.length == 1) {
		res.json(task[0]);
	} else {
		res.status(404).json({ message: 'No task with this id'});
	}
};

exports.addTask = function (req, res) {
	if (!req.body.text) {
		return res.status(400).json({ message: 'No text' });
	}
	database.push({
		id: database.length + 1,
		text: req.body.text
	});
	res.status(201).json({ message: 'OK' });
};

exports.changeTask = function (req, res) {
	var task = database.filter(task => task.id == req.params.id);
	if (task.length == 1) {
		task[0].text = req.body.text;
		res.status(200).json({ message: 'OK' });
	} else {
		res.status(404).json({ message: 'No task with this id'});
	}
};