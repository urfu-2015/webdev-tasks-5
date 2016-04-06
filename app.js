'use strict'
const path = require('path');
const express = require('express');
const app = express();

// const hbs = require('hbs');
const morgan = require('morgan');
const bodyParser = require('body-parser');

// const viewsDir = path.join(__dirname, 'bundles');
const publicDir = path.join(__dirname, 'public');

// app.set('views', viewsDir);
// app.set('view engine', 'hbs');

app.use(morgan('dev'));
app.use(express.static(publicDir));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: false
}));

app.use((err, req, res, next) => {
    console.error(err);
    console.log(err);
    next();
});


require('./routes/routes')(app);

// hbs.registerPartials(path.join(__dirname, 'blocks'));

app.listen(app.get('port'),
    () => console.log(`Listening on port ${app.get('port')}`));

module.exports = app;
