'use strict';

const express = require('express');
const app = express();
const path = require('path');
const morgan = require('morgan');
const viewsDir = path.join(__dirname, 'views');
const hbs = require('hbs');

app.set('views', viewsDir);
app.set('view engine', 'hbs');

app.use(express.static(viewsDir));

app.use(morgan('dev'));

app.set('port', (process.env.PORT || 8080));

const bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: false
}));

app.use((err, req, res, next) => {
    console.error(err);
    next();
});

app.use((req, res, next) => {
    next();
});

require('./routes')(app);

app.listen(app.get('port'),
    () => console.log(`Listening on port ${app.get('port')}`));

module.exports = app;
