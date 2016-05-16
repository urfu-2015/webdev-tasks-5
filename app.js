var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var hbs = require('hbs');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'server/bundles'));
app.set('view engine', 'hbs');

// uncomment after placing your favicon in /public
// app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
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
            description: 'Todos',
            charset: 'utf-8'
        },
        page: {
            title: 'Todos'
        },
        isDev: process.env.NODE_ENV === 'development'
    };

    next();
});

require('./server/routes')(app);

hbs.registerPartials(path.join(__dirname, 'server/blocks'));

app.listen(app.get('port'),
    () => console.log(`Listening on port ${app.get('port')}`));

module.exports = app;
