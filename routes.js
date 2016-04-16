'use strict';

const notes = require('./controllers/notes');

module.exports = function (app) {
    app.get('/notes', notes.list);
    app.put('/notes', notes.update);
    app.delete('/notes', notes.remove);
    app.post('/notes', notes.create);

    /* eslint no-unused-vars: 0 */
    /* eslint max-params: [2, 4] */
    app.use((err, req, res, next) => {
        console.error(err);
        res.sendStatus(500);
    });
};
