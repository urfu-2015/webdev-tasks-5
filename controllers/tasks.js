const tasksModel = require('../models/tasks')

module.exports.index = (req, res) => {
	var tasks = tasksModel(req.db);
	tasks.getAll().then(
		allTasks => {
			data = {tasks: allTasks};
			res.render('main/main',  Object.assign(data, req.commonData));
		},
		error => res.status(400)
	);
}

module.exports.add = (req, res) => {
	var tasks = tasksModel(req.db);
	tasks.add(req.body).then(
		newTask => res.status(200).send(newTask),
		error => res.status(400)
	)
}

module.exports.remove= (req, res) => {
	var tasks = tasksModel(req.db);
	tasks.remove(req.body).then(
		deleted => res.status(200).send(deleted),
		error => res.status(400)
	)
}

module.exports.update = (req, res) => {
	var tasks = tasksModel(req.db);
	tasks.update(req.body).then(
		task => res.status(200).send(task),
		error => res.status(400)
	)
}