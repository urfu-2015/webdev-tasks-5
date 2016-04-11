'use strict';

var api = require('./apiRoutes');

module.exports = function (app) {
    app.get('/', (req, res) => {
        res.send(
            `<!DOCTYPE html>
             <html>
               <head>
                 <title>Todo</title>
                 <link rel="stylesheet" href="/static/main.css">
                 <meta name="viewport" content="width=device-width, initial-scale=1.0, user-scalable=yes">
               </head>
               <body>
                 <div id="root">
                 </div>
                 <script src="/static/main.js"></script>
               </body>
             </html>
             `
        )
    });

    app.use('/api/todos', api);

    // app.all('*', pages.error404);

    /* eslint no-unused-vars: 0 */
    /* eslint max-params: [2, 4] */
    app.use((err, req, res, next) => {
        console.error(err);

        res.sendStatus(500);
    });
};