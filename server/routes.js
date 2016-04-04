'use strict';

const pages = require('./controllers/pages.js');
const tasks = require('./controllers/tasks.js');

module.exports = function (app) {
    app.get('/tasks', tasks.getTodos);
    app.post('/tasks', tasks.addTodo);
    app.delete('/tasks/:id', tasks.deleteTodo);
    app.patch('/tasks/:id', tasks.changeTodo);
    app.all('*', pages.error404);
};
