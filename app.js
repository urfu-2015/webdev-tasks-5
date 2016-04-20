var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var path = require('path');

const hbs = require('hbs');

app.set('views', path.join(__dirname, 'pages'));
app.set('view engine', 'hbs');

app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, 'public')));

require('./routes')(app);

hbs.registerPartials(path.join(__dirname, 'blocks'));

module.exports = app;
