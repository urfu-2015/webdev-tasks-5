'use strict';
const pages = require('./controllers/pages');
const todoController = require('./controllers/todo');

module.exports = function (app) {
    app.get('/', pages.index);

    app.get('/api/todos', todoController.apiList);

    app.get('/todos', todoController.list);
    app.post('/todos', todoController.create);
    app.put('/todos', todoController.edit);
    app.delete('/todos', todoController.delete);
    app.all('*', pages.error404);

    /* eslint no-unused-vars: 0 */
    /* eslint max-params: [2, 4] */
    app.use((err, req, res) => {
        console.error(err);

        res.sendStatus(500);
    });
};
