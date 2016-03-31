'use strict';

const pages = require('./controllers/pages.js');

module.exports = function (app) {
    app.get('/tasks', pages.getTodos);
    app.post('/tasks', pages.addTodo);
    app.delete('/tasks/:task_id', pages.deleteTodo);
    app.patch('/tasks/:task_id', pages.changeTodo);
    app.all('*', pages.error404);
};
