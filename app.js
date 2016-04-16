'use strict';

const path = require('path');
const express = require('express');
const app = express();

const morgan = require('morgan');
const bodyParser = require('body-parser');

const publicDir = path.join(__dirname, 'public');

app.use(morgan('dev'));
app.use(express.static(publicDir));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: false
}));

/* eslint max-params: [2, 4] */
app.use((err, req, res, next) => {
    console.error(err);
    next();
});

app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});

require('./routes')(app);

app.listen(app.get('port'),
    () => console.log(`Listening on port ${app.get('port')}`));

module.exports = app;
