'use strict';

const path = require('path');

const express = require('express');
var ExpressBem = require('express-bem');
const app = express();
var serveStatic = require('serve-static');

const morgan = require('morgan');
const bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');

var bem = ExpressBem({
    projectRoot: './',        // bem project root, used for bem make only
    path: './desktop.bundles' // path to your bundles
});

app.use(serveStatic(__dirname + '/desktop.bundles/index'));
app.use(serveStatic(__dirname + '/desktop.bundles/page'));
app.use(serveStatic(__dirname + '/libs'));

// here to lookup bundles at your path you need small patch
app.bem = bem.bindTo(app);

if (process.env.NODE_ENV !== 'production') {
    bem.usePlugin(process.env.EXPRESS_BEM_MAKER === 'enb' ? 'express-bem-enb-make' : 'express-bem-tools-make',
        {verbosity: 'debug'});
}

// register engines
bem.usePlugin('express-bem-bemtree'); // requires module express-bem-bemtree
bem.usePlugin('express-bem-bemhtml'); // ... express-bem-bemhtml


bem.engine('fullstack', '.bem', ['.bemhtml.js', '.bemtree.js'], function (name, options, cb) {
    var view = this;

    // pass options.bemjson directly to bemhtml
    if (options.bemjson) return view.thru('bemhtml');

    // return bemjson if requested
    if (options.raw === true) return view.thru('bemtree');

    // full stack
    view.thru('bemtree', name, options, function (err, bemjson) {
        if (err) return cb(err);

        options.bemjson = bemjson;
        view.thru('bemhtml', name, options, function (err, data) {
            if (err) return cb(err);
            cb(null, data);
        });
    });
});

// set default engine extension
app.set('view engine', '.bem');

app.use(morgan('dev'));

app.set('port', (process.env.PORT || 5000));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: false
}));

app.use(cookieParser());
app.use(require('./userToken'));

// Для тестов
app.use(function(req, res, next) {
    // res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    res.header('Access-Control-Allow-Methods', "GET,PUT,POST,DELETE");
    next();
});

/* eslint max-params: [2, 4] */
app.use((err, req, res, next) => {
    console.error(err);
    next();
});

app.use((req, res, next) => {
    req.commonData = {
        meta: {
            description: 'TODO',
            charset: 'utf-8'
        },
        page: {
            title: 'TODO'
        },
        isDev: process.env.NODE_ENV === 'development'
    };

    next();
});

require('./routes/routes')(app);

app.listen(app.get('port'),
    () => console.log(`Listening on port ${app.get('port')}`));

module.exports = app;
//////////////////////


// routes
// app.get('/', function (req, res) {
//     res.render('index', {
//         bemjson: {
//             block: 'page',
//             title: 'lolko',
//             head: [
//                 {elem: 'css', url: '_index.css'}
//             ],
//             scripts: [{elem: 'js', url: '_index.js'}],
//             mods: {theme: 'islands'},
//             content: [
//                 {
//                     block: 'hello',
//                     content: [
//                         {
//                             elem: 'greeting',
//                             content: 'Привет, %пользователь%!'
//                         },
//                         {
//                             block: 'input',
//                             mods: {theme: 'islands', size: 'm'},
//                             mix: {block: 'hello', elem: 'input'}, // подмешиваем элемент для добавления CSS-правил
//                             name: 'name',
//                             placeholder: 'Имя пользователя'
//                         },
//                         {
//                             block: 'button',
//                             mods: {theme: 'islands', size: 'm', type: 'submit'},
//                             text: 'Нажать'
//                         }
//                     ]
//                 }
//             ]
//         }
//     });
// });
// app.get('/a', function (req, res) {
//     res.render('page', {
//         bemjson: {
//             block: 'page',
//             title: 'TodoApp',
//             head: [
//                 { elem: 'css', url: '_page.css' }
//             ],
//             scripts: [{ elem: 'js', url: '_page.js' }],
//             content: [
//                 {
//                     block: 'todo-app'
//                 }
//             ]
//         }
//     });
// });