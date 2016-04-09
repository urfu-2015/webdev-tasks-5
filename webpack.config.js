const webpackDevConfig = require('./webpack.dev.config');
const cssnano = require('cssnano');
const webpack = require('webpack');
const autoprefixer = require('autoprefixer');

webpackDevConfig.plugins.push(new webpack.optimize.UglifyJsPlugin());

webpackDevConfig.postcss = () => {
    return [autoprefixer, cssnano];
}

module.exports = webpackDevConfig;
