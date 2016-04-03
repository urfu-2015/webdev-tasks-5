'use strict';

const pages = require('./controllers/pages');
const tasks = require('./controllers/tasks');

module.exports = function (app) {
	app.get('/', pages.index);

    app.get('/api/tasks', (req, res) => {
        const Task = require('./models/task');
        const tasks = Task.findAll();

        res.json({
            tasks: tasks
        });
    });

    app.get('/list', tasks.list);
    app.post('/', tasks.add);
    app.delete('/', tasks.remove);
    app.put('/', tasks.edit);
    
    app.all('*', pages.error404);
    app.use((err, req, res, next) => {
        res.sendStatus(500);
        next();
    });
};
