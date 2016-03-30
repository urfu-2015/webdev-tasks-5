'use strict';

const express = require('express');
const app = express();

app.set('port', (process.env.PORT || 8080));

require('./routes.js')(app);

app.listen(app.get('port'),
    () => console.log(`Listening on port ${app.get('port')}`));

module.exports = app;
