'use strict';

const path = require('path');
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const morgan = require('morgan');
const hbs = require('hbs');
const argv = require('minimist')(process.argv.slice(2));
const viewsDir = path.join(__dirname, 'server/bundles');
const dir = path.join(__dirname, 'public2');

app.set('views', viewsDir);
app.set('view engine', 'hbs');
app.use(morgan('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: false
}));

app.use((req, res, next) => {
   req.commonData = {
       meta: {
           charset: 'utf-8',
           lang: 'ru'
       },
       page: {
           title: 'TODO-хи'
       },
       isDev: argv.NODE_ENV === 'development'
   };
    next();
});

app.use(express.static(dir));
hbs.registerPartials(path.join(__dirname, 'server/blocks'));

app.set('port', (process.env.PORT || 8080));

require('./server/routes.js')(app);

app.listen(app.get('port'),
    () => console.log(`Listening on port ${app.get('port')}`));

module.exports = app;
