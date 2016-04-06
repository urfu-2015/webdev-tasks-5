'use strict';
const express = require('express');
const router = express.Router();
const todoes = require('../controllers/todo');

router.get('/', function(req, res, next) {
    res.render('index', {todoes: todoes.list()});
});
//----
router.post('/save', function(req, res, next) {
    res.render('index', todoes.save());
});
router.post('/delete', function(req, res, next) {
    res.render('index', todoes.delete());
});
//----
module.exports = router;
