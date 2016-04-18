'use strict';

const pages = require('./controllers/pages');
const todos = require('./controllers/todos');

module.exports = function(app) {
    app.get('/', todos.list);
    app.post('/', todos.createTodo);
    app.all('*', pages.error404)
};