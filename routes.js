'use strict';

const tasks = require('./server/controllers/tasks.js');

module.exports = (app) => {
    app.get('/', tasks.getTasks);
    app.delete('/', tasks.deleteTask);
    app.post('/', tasks.addTask);
    app.put('/', tasks.renameTask);
    app.patch('/', tasks.refreshTasks);
};
