
const pages = require('./controllers/pages');
const tasks = require('./controllers/tasks');

module.exports = function (app) {
    app.get('/', pages.index);
    app.get('/tasks', tasks.getAll);
    app.post('/tasks', tasks.post);
    app.all('*', pages.error404);

    app.use((err, req, res) => {
        console.error(err);
        res.sendStatus(500);
    });
};
