const autoprefixer = require('autoprefixer');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const path = require('path');
const webpack = require('webpack');

module.exports = {
    context: path.join(__dirname, 'views'),
    entry: {
        main: './main/main.js'
    },
    devtool: 'source-map',
    output: {
        path: path.join(__dirname, 'public'),
        filename: '[name].js',
        sourceMapFilename: '[name].map',
        publicPath: '/'
    },
    module: {
        loaders: [
            {
                test: /\.css$/,
                loader: ExtractTextPlugin.extract("style-loader", "css-loader")
            },
            {
                test: /\.jpe?g$|\.gif$|\.png$/i,
                loader: 'file-loader'
            },
            {
                test: /\.js?$/,
                exclude: /node_modules/,
                loader: 'babel'
            }
        ]
    },
    plugins: [
        new ExtractTextPlugin('[name].css'),
        new webpack.ProvidePlugin({
            'fetch': 'imports?this=>global!exports?global.fetch!whatwg-fetch'
        })
    ],
    postcss: () => {
        return [autoprefixer];
    }
};
