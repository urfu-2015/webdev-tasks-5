var express = require('express');
var controller = require('./controller');

module.exports = function (app) {
    app.get('/', controller.list);
    app.post('/', controller.create);
    app.post('/deletion', controller.delete);
    app.post('/update', controller.update);
    app.all('*', (req, res) => {
        console.log(req.url);
        res.sendStatus(404);
    });
};
