'use strict';

const path = require('path');

const express = require('express');
const app = express();
const hbs = require('hbs');
const bodyParser = require('body-parser');

const viewsDir = path.join(__dirname, 'views');

app.set('views', viewsDir);
app.set('view engine', 'hbs');
app.use(express.static(viewsDir));

app.use(bodyParser.json());

app.set('port', (process.env.PORT || 5000));

require('./routes')(app);

app.listen(app.get('port'),
    () => console.log(`Listening on port ${app.get('port')}`));

module.exports = app;
