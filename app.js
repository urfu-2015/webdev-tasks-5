'use strict';

const express = require('express');
const hbs = require('hbs');
const bodyParser = require('body-parser');

const app = express();
app.set('view engine', 'hbs');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: false
}));
app.set('views', __dirname + '/server/views');
app.use(express.static(__dirname + '/public'));
hbs.registerPartials(__dirname + '/server/blocks');
require('./routes.js')(app);
app.listen((process.env.PORT || 8080));
