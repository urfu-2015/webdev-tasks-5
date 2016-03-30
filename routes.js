'use strict';

const tasks = require('./controllers/tasks');
const pages = require('./controllers/pages');


module.exports = function(app) {
    app.get('/', pages.index);

    app.get('/task/list', tasks.list);

    app.post('/task/add/', tasks.create);
    app.delete('/task/delete/:id', tasks.delete);
    app.post('/task/shift/', tasks.shift);
    app.post('/task/change/', tasks.change);

    app.all('*', pages.error404);

    app.use((err, req, res, next) => {
        console.error(err);

        res.sendStatus(500);
    });
};