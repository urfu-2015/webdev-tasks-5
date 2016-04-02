const tasks = require('../tasks/tasks.js')

exports.getAll = (req, res) => {
    res.status(200).json({tasks});
};

exports.postOne = (req, res) => {

};

exports.patchOne = (req, res) => {
    var task = req.body;
    for (var i = 0; i < tasks.length; i++) {
        if (tasks[i].id === req.params.id) {
            tasks[i].text = req.body.text;
            res.status(200).send();
            break;
        }
    }
};

exports.deleteOne = (req, res) => {
    for (var i = 0; i < tasks.length; i++) {
        if (tasks[i].id === req.params.id) {
            tasks.splice(i, 1);
            res.status(200).send();
            break;
        }
    }
};
