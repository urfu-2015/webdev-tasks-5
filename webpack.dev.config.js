const autoprefixer = require('autoprefixer');
const cssnano = require('cssnano');
const path = require('path');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const webpack = require('webpack');

module.exports = {
    context: path.join(__dirname, 'server/views'),
    entry: {
        main: './main/main.js'
    },
    output: {
        path: path.join(__dirname, 'public'),
        filename: '[name].js'
    },
    module: {
        loaders: [
            {
                test: /\.css$/,
                loader: ExtractTextPlugin.extract("style-loader", "css-loader")
            },
            {
                test: /\.(jpe?g|png|gif|svg)$/i,
                loader: 'file-loader'
            },
            {
                test: /\.js$/,
                loader: 'babel',
                exclude: /node_modules/
            }
        ]
    },
    plugins: [
        new ExtractTextPlugin('[name].css')
    ],
    postcss: () => {
        return [autoprefixer, cssnano];
    }
};