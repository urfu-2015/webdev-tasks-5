var express = require('express');
var tasks = require('./controllers/tasks.js');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
    res.render('index', { title: 'Express' });
});

router.get('/task-list', tasks.getTaskList);

router.delete('/tasks/:id', tasks.deleteTask);

router.patch('/tasks/:id', tasks.changeTask);

router.post('/tasks', tasks.createTask);

module.exports = router;
