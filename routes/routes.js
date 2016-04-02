'use strict';

const pages = require('../controllers/pages');
var api = require('./apiRoutes');

module.exports = function (app) {
    app.get('/', pages.index);
    
    app.use('/api/todos', api);

    app.all('*', pages.error404);

    /* eslint no-unused-vars: 0 */
    /* eslint max-params: [2, 4] */
    app.use((err, req, res, next) => {
        console.error(err);

        res.sendStatus(500);
    });
};