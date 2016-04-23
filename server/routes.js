'use strict';

const page = require('./controllers/page');

module.exports = function (app) {
    app.get('/', page.list);

    app.get('/list-notes', page.getList);

    app.post('/add-note', page.create);

    app.put('/change-note', page.change);

    app.put('/change-chain', page.changeChain);

    app.delete('/delete-note', page.deleteNote);

    app.all('*', page.error404);

    app.use((err, req, res, next) => {
        console.error(err);

        res.sendStatus(500);
    });
};
