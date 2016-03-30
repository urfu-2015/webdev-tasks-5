const tasks = require('../tasks/tasks.js')

exports.getAll = (req, res) => {
    res.status(200).send(JSON.stringify({tasks}));
};

exports.post = (req, res) => {
};

