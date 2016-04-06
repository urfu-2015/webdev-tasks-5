'use strict';

const pages = require('./controllers/pages.js');
const todos = require('./controllers/todos.js');

module.exports = (app) => {
    app.get('/', pages.index);

    app.get('/api/todos', todos.list);
    app.post('/api/todos', todos.create);
    app.get('/api/todos/:id', todos.item);
    app.patch('/api/todos/:id', todos.patch);
    app.delete('/api/todos/:id', todos.delete);

    app.get('*', pages.error404);
};