var webpack = require('webpack');
var webpackDevMiddleware = require('webpack-dev-middleware');
var webpackHotMiddleware = require('webpack-hot-middleware');
var config = require('./webpack.config');
var express = require('express');
var app = express();

var compiler = webpack(config);
app.use(webpackDevMiddleware(compiler, { noInfo: true, publicPath: config.output.publicPath }));
app.use(webpackHotMiddleware(compiler));

app.set('port', (process.env.PORT || 3000));

app.use('/', function(req, res) {
    res.sendFile(__dirname + '/index.html');
});

app.listen(app.get('port'), (err) => {
    if (err) {
        console.error(err);
    } else {
        console.log('Server started: http://localhost:' + app.get('port') + '/');
    }
})
