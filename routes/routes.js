var express = require('express');
var index = require('../controllers/index');

module.exports = function (app) {
    app.get('/', index.index);
    app.get('/list', index.getList);
    app.post('/list', index.itemAdd);
    app.delete('/list', index.itemDelete);
    app.put('/list', index.itemChange);
};
