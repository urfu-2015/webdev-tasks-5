'use strict';

const page = require('./controllers/page');
const todo = require('./controllers/todo');

module.exports = function (app) {
    app.get('/', todo.emptyList);
    app.get('/todos/all', todo.list);
    app.put('/todos/add', todo.add);
    app.delete('/todos/delete', todo.delete);
    app.post('/todos/edit', todo.edit);

    app.all('*', page.error404);

    /* eslint no-unused-vars: 0 */
    app.use((err, req, res, next) => {
        console.error(err);

        res.sendStatus(500);
    });
};
