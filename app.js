var express = require('express');
var bodyParser = require('body-parser');
var app = express();
var path = require('path');
var hbs = require('hbs');
var projectPath = path.join(__dirname, 'public');

app.set('views', './views');
app.set('view engine', 'hbs');
hbs.registerPartials(projectPath);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(express.static(projectPath));

app.use((req, res, next) => {
    req.commonData = {
        meta: {
            description: 'TODOhi',
            charset: 'utf-8'
        },
        page: {
            title: 'TODOhi'
        },
        css: 'index.css'

    };
    next();
});

require('./routes')(app);

app.use(function (req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

module.exports = app;
