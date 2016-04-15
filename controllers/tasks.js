const tasksModel = require('../models/tasks');

exports.getAll = (req, res) => {
    var tasks = tasksModel(req.db);
    tasks.getAll().then(
        allTasks => {
            data = {allTasks};
            res.status(200).send(data);
        },
        error => res.status(400)
    );
};

exports.add = (req, res) => {
    var tasks = tasksModel(req.db);
    tasks.add(req.body).then(
        newTask => res.status(200).send(newTask),
        error => res.status(400)
    );
};

exports.remove = (req, res) => {
    var tasks = tasksModel(req.db);
    tasks.remove(req.body).then(
        deleted => res.status(200).send(deleted),
        error => res.status(400)
    );
};

exports.update = (req, res) => {
    var tasks = tasksModel(req.db);
    tasks.update(req.body).then(
        task => res.status(200).send(task),
        error => res.status(400)
    );
};

exports.order = (req, res) => {
    var tasks = tasksModel(req.db);
    tasks.changeOrder(req.body).then(
        () => res.status(200),
        error => res.status(400)
    );
};
