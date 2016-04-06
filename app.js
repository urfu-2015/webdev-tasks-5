'use strict';

const express = require('express');
const app = express();

const hbs = require('hbs');
const morgan = require('morgan');
const bodyParser = require('body-parser');

const path = require('path');
const argv = require('minimist')(process.argv.slice(2));

const viewsDir = path.join(__dirname, '/server/views');
const publicDir = path.join(__dirname, 'public');

app.set('view engine', 'hbs');
app.set('views', viewsDir);

app.use(express.static(publicDir));

app.use(morgan('dev'));

app.set('port', (process.env.PORT || 8080));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: false
}));

app.use((req, res, next) => {
    req.commonData = {
        meta: {
            charset: 'utf-8',
            lang: 'ru'
        },
        page: {
            title: 'TODO-хи'
        },
        isDev: argv.NODE_ENV === 'development'
    };

    next();
});

require('./server/routes.js')(app);

app.listen(app.get('port'),
    () => console.log(`Listening on port ${app.get('port')}`));

module.exports = app;