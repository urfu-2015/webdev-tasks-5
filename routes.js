'use strict';

const tasks = require('./controllers/tasks');
const pages = require('./controllers/pages');

module.exports = function(app) {
	app.get('/', tasks.list);
	app.post('/inserts', tasks.addTask);
	app.post('/updates', tasks.updateTask);
	app.post('/deletions', tasks.deleteTask);
	app.post('/', tasks.refresh);
	app.all('*', pages.error404);
};
