const tasks = require('../tasks/tasks.js')

exports.getAll = (req, res) => {
    res.status(200).json({tasks});
};

exports.postOne = (req, res) => {
    var id = tasks[tasks.length - 1] ? tasks[tasks.length - 1].id + 1 : 0;
    tasks.push({
        id,
        text: req.body.text
    });
    res.status(201).json({id});
};

exports.patchOne = (req, res) => {
    for (var i = 0; i < tasks.length; i++) {
        if (tasks[i].id === parseInt(req.params.id)) {
            tasks[i].text = req.body.text;
            res.status(200).json({id:tasks[i].id});
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
