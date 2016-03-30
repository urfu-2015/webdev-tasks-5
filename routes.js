'use strict';

const pages = require('./controllers/pages.js');

module.exports = function (app) {
    app.get('/tasks', pages.getTodos);
    app.post('/tasks', pages.addTodo);
    app.delete('/tasks', pages.deleteTodo);
    app.patch('/tasks', pages.changeTodo);
    app.all('*', pages.error404);
};
