'use strict';

var express = require('express');
var router = express.Router();
var db = require('../db.js');

const todos = require('../controllers/todos');

router.use(function timeLog(req, res, next) {
    //console.log('Time: ', Date.now());
    console.log(db);
    next();
});

router.get('/', todos.all);
router.post('/', todos.add);

router.get('/:id', todos.getById);
router.put('/:id', todos.putById);
router.delete('/:id', todos.deleteById);


module.exports = router;