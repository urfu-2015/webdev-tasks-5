var express = require('express');
var path = require('path');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var todos = require('./routes/todos');
var appendDefaultData = require('./scripts/appendDefaultData.js');

var app = express();

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

app.use('/', todos);

appendDefaultData();

app.use(function (err, req, res, next) {
    res.status(err.status || 500);
    if (res.status === 500) {
        res.render('error', {
            message: err.message,
            error: app.get('env') === 'development' ? err : {}
        });
    } else {
        next(err);
    }
});

module.exports = app;
