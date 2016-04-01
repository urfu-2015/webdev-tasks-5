const tasks = require('../tasks/tasks.js')

exports.getAll = (req, res) => {
    res.status(200).json({tasks});
};

exports.post = (req, res) => {
    var task = req.body;
    tasks.forEach((_task) => {
        if (_task.id === task.id) {
            _task.text = task.text;
            res.status(201).json({tasks});
        }
    });
};

