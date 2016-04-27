'use strict';

const pages = require('./controllers/pages');
const tasks = require('./controllers/tasks');

module.exports = function (app) {
    app.get('/', pages.main);

    app.get('/tasks', tasks.list);
    app.post('/tasks', tasks.create);
    app.get('/tasks/:id', tasks.single);
    app.post('/tasks/:id', tasks.replace);
    app.delete('/tasks/:id', tasks.delete);

    app.all('*', pages.error404);

    app.use((err, req, res) => {
        console.error(err);
        res.sendStatus(500);
    });
};
