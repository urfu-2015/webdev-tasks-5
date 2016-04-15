'use strict';

const tasks = require('./controllers/tasks');
const pages = require('./controllers/pages');

module.exports = function(app) {
	app.get('/', pages.index);
    app.get('/api/tasks', tasks.list);
    app.post('/api/tasks', tasks.addTask);
    app.put('/api/tasks/:id', tasks.updateTask);
    app.delete('/api/tasks/:id', tasks.deleteTask);
    app.all('*', pages.error404);
};
