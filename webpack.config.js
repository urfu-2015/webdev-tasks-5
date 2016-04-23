'use strict';

const autoprefixer = require('autoprefixer');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const path = require('path');
const webpack = require('webpack');

module.exports = {
    context: path.join(__dirname, 'client'),
    entry: {
        main: './index.js'
    },
    devtool: 'source-map',
    output: {
        path: path.join(__dirname, 'public'),
        filename: 'index.js',
        sourceMapFilename: 'index.map',
        publicPath: '/'
    },
    module: {
        loaders: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                loader: "babel-loader"
            },
            {
                test: /\.styl$/,
                loader: ExtractTextPlugin.extract('style-loader', 'css-loader!postcss-loader!stylus-loader')
            },
            {
                test: /(\.png$)|(\.jpg$)|(\.jpeg$)/,
                loader: 'file-loader'
            }
        ]
    },
    plugins: [
        new ExtractTextPlugin('index.css')
    ],
    postcss: () => [autoprefixer({ browsers: ['Firefox > 43', 'Chrome > 46', 'iOS > 8']})]
};
