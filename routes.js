'use strict';

const notes = require('./controllers/notes');

module.exports = function (app) {
    app.get('/list', notes.list);
    app.post('/update', notes.update);
    app.post('/remove', notes.remove);
    app.post('/', notes.create);

    /* eslint no-unused-vars: 0 */
    /* eslint max-params: [2, 4] */
    app.use((err, req, res, next) => {
        console.error(err);
        res.sendStatus(500);
    });
};
