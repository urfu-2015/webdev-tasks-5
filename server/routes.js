'use strict';

const pages = require('./controllers/pages');

module.exports = (app) => {
    app.get('/', pages.index);
    app.get('/api/notes', pages.getNotes);
    app.post('/api/notes', pages.changeNote);
    app.put('/api/notes', pages.addNote);
    app.delete('/api/notes', pages.removeNote);
    app.all('*', pages.error404);

    app.use((err, req, res, next) => {
        console.error(err);
        res.sendStatus(500);
    });
};
