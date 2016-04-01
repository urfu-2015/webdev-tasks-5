const pages = require('./controllers/pages');
const notes = require('./controllers/notes').list;

const todosRoute = require('./todosRoute');

module.exports = function (app) {
    app.get('/', notes);
    app.use('/todos', todosRoute);
    app.all('*', pages.error404);
};
