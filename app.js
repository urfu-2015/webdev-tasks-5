'use strict';

const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const path = require('path');

app.set('view engine', 'hbs');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: false
}));

app.use(function (err, req, res, next) {
    console.log(err);
    res.sendStatus(500);
});

app.use(express.static(path.join(__dirname, 'public')));

require('./routes')(app);

app.listen(8080, () => console.log('Listening on port 8080'));
