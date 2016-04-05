'use strict';

const pages = require('./controllers/pages');

module.exports = (app) => {
    app.get('/', pages.index);
    app.get('/notes', pages.getNotes);
    app.post('/notes', pages.changeNote);
    app.put('/notes', pages.addNote);
    app.delete('/notes', pages.removeNote);
    app.all('*', pages.error404);

    app.use((err, req, res, next) => {
        console.error(err);
        res.sendStatus(500);
    });
};
