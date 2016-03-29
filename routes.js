'use strict';

const pages = require('./controllers/pages');
const tasks = require('./controllers/tasks');

module.exports = function (app) {
    app.get('/tasks', tasks.list);
    app.post('/tasks', tasks.create);
    app.get('/tasks/:id', tasks.single);
    app.post('/tasks/:id', tasks.replace);
    app.delete('/tasks/:id', tasks.delete);

    app.all('*', pages.error404);

    /* eslint no-unused-vars: 0 */
    /* eslint max-params: [2, 4] */
    app.use((err, req, res, next) => {
        console.error(err);
        res.sendStatus(500);
    });
};
