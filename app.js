'use strict';

const express = require('express');
const app = express();
const bodyParser = require('body-parser');
var morgan = require('morgan');

app.use(express.static(__dirname + '/Public'));
app.use(morgan('dev'));
app.use(bodyParser.json());

app.set('port', (process.env.PORT || 8080));


require('./routes.js')(app);

app.listen(app.get('port'),
    () => console.log(`Listening on port ${app.get('port')}`));

module.exports = app;
