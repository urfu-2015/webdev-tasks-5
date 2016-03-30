'use strict';

const pages = require('../controllers/pages');
const notes = require('../controllers/notes');

module.exports = function (app) {
    app.get('/', notes.list);
    app.post('/', notes.create);
    app.get('/:name', notes.item);

    app.all('*', pages.error404);

    app.use((err, req, res, next) => {
        console.error(err);

        res.sendStatus(500);
    });
};
