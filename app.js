'use strict';

const path = require('path');
// const swig = require('swig');
const bodyParser = require('body-parser');
const express = require('express');
const app = express();

const publicDir = path.join(__dirname, 'public');
const viewsDir = path.join(__dirname, 'views');

// app.engine('html', swig.renderFile);
// app.set('views', viewsDir);
// app.set('view engine', 'html');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(publicDir));
app.use('/', express.static(viewsDir));

app.use(function (request, response, next) {
    console.log(`→ ${request.method} ${request.originalUrl} ${request.body.text}`);
    next();
});

require('./routes')(app);

app.listen(process.env.PORT || 8080, function() {
    console.log('Server started');
});
