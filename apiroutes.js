var express = require('express');
var router = express.Router();
var api = require('./controllers/api');

router.get('/task/:id', api.getTask); 
router.put('/task/:id', api.changeTask);
router.delete('/task/:id', api.deleteTask);
router.get('/task', api.getAllTasks);
router.post('/task', api.addTask);

module.exports = router;