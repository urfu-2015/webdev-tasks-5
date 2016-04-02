const tasks = require('./controllers/tasks');
const pages = require('./controllers/pages');

module.exports = function (app) {
    app.post('/updateTask', tasks.update)
    app.post('/removeTask', tasks.remove);
    app.post('/addTask', tasks.add);
    app.get('/', tasks.index);
    app.all('*', pages.error404);
    app.use((err, req, res) => {
        console.error(err);
        res.sendStatus(500);
    });
};
