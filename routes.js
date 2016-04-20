
const pages = require('./controllers/pages');
const tasks = require('./controllers/tasks');

module.exports = function (app) {
    app.get('/', pages.index);
    app.get('/tasks', tasks.getAll);
    app.post('/tasks', tasks.postOne);
    app.patch('/tasks/:id', tasks.patchOne);
    app.delete('/tasks/:id', tasks.deleteOne);
    app.all('*', pages.error404);

    app.use((err, req, res) => {
        console.error(err);
        res.sendStatus(500);
    });
};
