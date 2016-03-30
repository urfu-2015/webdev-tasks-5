const tasks = require('../tasks/tasks.js')

exports.index = (req, res) => {
    res.render('index/index', {tasks});
};

exports.error404 = (req, res) => {
    res.sendStatus(404);
};
