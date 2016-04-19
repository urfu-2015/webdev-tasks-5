var express = require('express');
var controller = require('./controller');

module.exports = function (app) {
    app.get('/', controller.list);
    app.get('/json', controller.getjson);
    app.post('/', controller.create);
    app.delete('/', controller.delete);
    app.put('/', controller.update);
};
