'use strict';

const pages = require('./controllers/pages');
const tasks = require('./controllers/tasks');

module.exports = function (app) {
    app.get('/', pages.main);
    app.post('/show-list', tasks.list);
    app.put('/add-to-list', tasks.add);
    app.delete('/remove-from-list', tasks.remove);
    app.post('/edit-list', tasks.edit);
    
    app.all('*', pages.error404);
    app.use((err, req, res) => {
        console.error(err);
        res.sendStatus(500);
    });
};
