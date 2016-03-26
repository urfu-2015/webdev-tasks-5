'use strict';

const express = require('express');
const app = express();
const path = require('path');
const publicDir = path.join(__dirname, 'views');
app.use(express.static(publicDir));

app.set('views', path.join(__dirname, 'views'));
app.engine('html', require('ejs').renderFile);
app.set('view engine', 'ejs');

app.use(require('cookie-parser')());

app.use(require('body-parser').urlencoded({extended: true}));

app.use(require('express-session')({
    secret: 'todo-hi',
    resave: false,
    saveUninitialized: false}));


app.set('port', (process.env.PORT || 5000));

app.use((err, req, res, next) => {
    console.error(err);
    next();
});

app.use((req, res, next) => {
    next();
});

require('./routes')(app);


app.listen(app.get('port'),
    () => console.log(`Listening on port ${app.get('port')}`));

module.exports = app;
