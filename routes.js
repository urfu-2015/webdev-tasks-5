'use strict';

const pages = require('./controllers/pages');
const todos = require('./controllers/todos');

module.exports = function(app) {
    app.get('/todo', todos.list);
    app.post('/todo', todos.createTodo);
    app.delete('/todo', todos.deleteTodo);
    app.patch('/todo', todos.changeTodo);
    app.all('*', pages.error404)
};
