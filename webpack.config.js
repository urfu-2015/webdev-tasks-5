const autoprefixer = require('autoprefixer');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const path = require('path');
const webpack = require('webpack');

module.exports = {
    context: path.join(__dirname, 'server/bundles'),
    entry: {
        main: './index/index.js'
    },
    output: {
        path: path.join(__dirname, 'public'),
        filename: 'index.js',
        publicPath: '/'
    },
    module: {
        loaders: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                loader: "babel-loader"
            }
        ]
    }
};
