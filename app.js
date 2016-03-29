'use strict';

const express = require('express');
const app = express();
const path = require('path');
const publicDir = path.join(__dirname, 'public');
const morgan = require('morgan');
const bodyParser = require('body-parser');

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');


app.use(morgan('dev'));
app.use(express.static(publicDir));

app.set('port', (process.env.PORT || 8080));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: false
}));

app.use((err, req, res, next) => {
    console.error(err);
    next();
});

app.use((req, res, next) => {
    req.commonData = {
        isDev: process.env.NODE_ENV === 'development',
        title: 'Todo-хи',
        meta: {
            description: 'todo app',
            charset: 'utf-8'
        }
    };
    next();
});

require('./routes')(app);

app.listen(app.get('port'),
    () => console.log(`Listening on port ${app.get('port')}`));

module.exports = app;
