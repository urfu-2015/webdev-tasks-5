const tasks = require('../tasks/tasks.js');

exports.getAll = (req, res) => {
    if (req.headers['if-modified-since']) {
        var _tasks = tasks.filter((task) => {
            if (task.date >= Date.parse(req.headers['if-modified-since'])) {
                return true;
            }
            return false;
        });
        _tasks.length ?
            res.status(200).json({tasks: _tasks}) :
            res.status(304).send();
    } else {
        res.status(200).json({tasks: tasks});
    }
};

exports.postOne = (req, res) => {
    var id = tasks[0] ? tasks[0].id + 1 : 0;
    tasks.unshift({
        id,
        date: (new Date).getTime(),
        text: req.body.text
    });
    res.status(201).json({id});
};

exports.patchOne = (req, res) => {
    for (var i = 0; i < tasks.length; i++) {
        if (tasks[i].id === parseInt(req.params.id)) {
            tasks[i].date = (new Date).getTime();
            tasks[i].text = req.body.text;
            res.status(200).send();
            break;
        }
    }
};

exports.deleteOne = (req, res) => {
    for (var i = 0; i < tasks.length; i++) {
        if (tasks[i].id === parseInt(req.params.id)) {
            tasks.splice(i, 1);
            res.status(200).send();
            break;
        }
    }
};
