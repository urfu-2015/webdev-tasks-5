'use strict';

const page = require('./controllers/page');
const todo = require('./controllers/todo');

module.exports = function (app) {
    app.get('/', todo.list);
    app.get('/todos/all', todo.asyncList);
    app.put('/todos/add', todo.add);
    app.delete('/todos/delete', todo.delete);
    app.post('/todos/edit', todo.edit);

    app.all('*', page.error404);

    /* eslint no-unused-vars: 0 */
    /* eslint max-params: [2, 4] */
    app.use((err, req, res, next) => {
        console.error(err);

        res.sendStatus(500);
    });
};
