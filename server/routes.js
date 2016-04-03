const pages = require('./controllers/pages');
const notes = require('./controllers/notes');

const todosRoute = require('./todosRoute');

module.exports = function (app) {
    app.get('/', notes.list);
    app.use('/todos', todosRoute);
    app.all('*', pages.error404);
};
