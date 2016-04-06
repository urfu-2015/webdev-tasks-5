'use strict';

const path = require('path');

const express = require('express');
const morgan = require('morgan');
const app = express();
const hbs = require('hbs');
const bodyParser = require('body-parser');

const viewsDir = path.join(__dirname, 'server/bundles');
const publicDir = path.join(__dirname, 'public');

app.set('views', viewsDir);
app.set('view engine', 'hbs');
app.use(morgan('dev'));
app.use(express.static(publicDir));

app.use(bodyParser.json());
app.set('port', (process.env.PORT || 5000));

require('./server/routes')(app);

app.listen(app.get('port'),
    () => console.log(`Listening on port ${app.get('port')}`));

module.exports = app;
