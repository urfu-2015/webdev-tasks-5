'use strict';

const pages = require('./controllers/pages');

module.exports = function (app) {
    app.get('/', pages.getTodos);
    app.post('/', pages.addTodo);
    app.delete('/:todo_id', pages.deleteTodo);
    app.all('*', pages.error404);
};
