'use strict';

const pages = require('./controllers/pages');

module.exports = (app) => {
    app.get('/', pages.index);
    app.get('/notes', pages.getNotes);
    app.post('/changeNote', pages.changeNote);
    app.post('/addNote', pages.addNote);
    app.post('/removeNote', pages.removeNote);
    app.all('*', pages.error404);

    app.use((err, req, res, next) => {
        console.error(err);
        res.sendStatus(500);
    });
};
