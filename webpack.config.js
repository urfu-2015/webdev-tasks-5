const autoprefixer = require('autoprefixer');
const cssnano = require('cssnano');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const path = require('path');
const webpack = require('webpack');

module.exports = {
    context: path.join(__dirname, 'bundles'),
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
            }
        ]
    },
    plugins: [
        new ExtractTextPlugin('[name].css'),
        new webpack.optimize.UglifyJsPlugin()
    ],
    postcss: () => {
        return [autoprefixer, cssnano];
    }
};
