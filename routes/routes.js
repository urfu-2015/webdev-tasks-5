'use strict';

const notes = require('../controllers/notes');

module.exports = function (app) {
    app.get('/notes', notes.list);
    app.delete('/', notes.delete);
    app.post('/', notes.create, notes.list);
    app.all('*', notes.error404);
    app.use((err, req, res, next) => {
        console.error(err);

        res.sendStatus(500);
    });
};
