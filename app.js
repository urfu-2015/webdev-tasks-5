'use strict';

const express = require('express');
const app = express();
const morgan = require('morgan');
const bodyParser = require('body-parser');
const path = require('path');
const hbs = require('hbs');
const argv = require('minimist')(process.argv.slice(2));
const cookieParser = require('cookie-parser');

const viewsDir = path.join(__dirname, 'server/bundles');
const publicDir = path.join(__dirname, 'public');

app.set('views', viewsDir);
app.set('view engine', 'hbs');

app.use(morgan('dev'));
app.use(express.static(publicDir));

hbs.registerPartials(path.join(__dirname, 'server/blocks'));

app.set('port', (process.env.PORT || 5000));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: false
}));

/* eslint max-params: [2, 4] */
app.use((err, req, res, next) => {
    console.error(err);
    next();
});

app.use((req, res, next) => {
    req.commonData = {
        meta: {
            description: 'ToDo-hi',
            charset: 'utf-8'
        },
        page: {
            title: 'ToDo-hi'
        },
        isDev: argv.NODE_ENV === 'development'
    };

    next();
});

app.use(cookieParser());
require('./server/routes.js')(app);

app.listen(app.get('port'),
    () => console.log(`Listening on port ${app.get('port')}`));

module.exports = app;
