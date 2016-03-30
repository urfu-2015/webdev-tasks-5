'use strict';

const pages = require('./controllers/pages');
const tasks = require('./controllers/tasks');

module.exports = function (app) {
	app.get('/', pages.index);
    app.get('/list', tasks.list);
    app.post('/', tasks.add);
    app.delete('/', tasks.remove);
    app.put('/', tasks.edit);
    
    app.all('*', pages.error404);
    app.use((err, req, res) => {
        console.error(err);
        res.sendStatus(500);
    });
};
