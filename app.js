'use strict';

const path = require('path');

const express = require('express');
const app = express();

const hbs = require('hbs');
const bodyParser = require('body-parser');

const viewsDir = path.join(__dirname, 'server/bundles');
const publicDir = path.join(__dirname, 'public');

app.set('views', viewsDir);
app.set('view engine', 'hbs');

if (process.env.NODE_ENV === 'development') {
    const morgan = require('morgan');
    app.use(morgan('dev'));
}

app.use(express.static(publicDir));

app.set('port', (process.env.PORT || 5000));

app.use(bodyParser.json());
app.use(
    bodyParser.urlencoded(
        {
            extended: false
        }
    )
);

app.use((err, req, res, next) => {
    console.error(err);

    next();
});

app.use((req, res, next) => {
    req.commonData = {
        meta: {
            description: 'Awesome ToDo-hi',
            charset: 'utf-8'
        },
        page: {
            title: 'Awesome todohi'
        },
        isDev: process.env.NODE_ENV === 'development'
    };

    next();
});

require('./server/routes')(app);

hbs.registerPartials(path.join(__dirname, 'server/blocks'));

app.listen(
    app.get('port'), () => console.log(`Listening on port ${app.get('port')}`)
);

module.exports = app;
