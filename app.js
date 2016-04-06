'use strict';
const hbs = require('hbs');
const express = require('express');
const app = express();
const path = require('path');
var socket = require('./server/views/socket.js');
const publicDir = path.join(__dirname, 'public');

app.set('views', path.join(__dirname, 'server/views'));
app.set('view engine', 'hbs');
app.use(express.static(publicDir));

app.use(require('body-parser').urlencoded({extended: true}));

app.set('port', (process.env.PORT || 5000));

app.use((err, req, res, next) => {
    console.error(err);
    next();
});

app.use((req, res, next) => {
    next();
});

require('./server/routes')(app);

hbs.registerPartials(path.join(__dirname, 'server/blocks'));

var server = app.listen(app.get('port'),
    () => console.log(`Listening on port ${app.get('port')}`));

var io = require('socket.io')(server);

io.sockets.on('connection', socket);

module.exports = app;
