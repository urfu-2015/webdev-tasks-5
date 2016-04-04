'use strict';

const pages = require('./controllers/pages.js');
const tasks = require('./controllers/tasks.js');

module.exports = function (app) {
    app.get('/tasks', tasks.getTodos);
    app.post('/tasks', tasks.addTodo);
    app.delete('/tasks', tasks.deleteTodo);
    app.patch('/tasks', tasks.changeTodo);
    app.all('*', pages.error404);
};
