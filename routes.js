'use strict';

const pages = require('./controllers/pages');
const tasks = require('./controllers/tasks');

module.exports = function (app) {
    app.get('/api/tasks', tasks.list);
    app.post('/api/tasks', tasks.add);
    app.put('/api/tasks', tasks.edit);
    app.delete('/api/tasks', tasks.remove);
    
    app.all('*', pages.error404);
    app.use((err, req, res, next) => {
        res.sendStatus(500);
        next();
    });
};
