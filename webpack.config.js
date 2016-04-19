

const autoprefixer = require('autoprefixer');
const webpack = require('webpack');
const path = require('path');
const ExtractTextPlagin = require('extract-text-webpack-plugin');
const stylus = require('stylus');
const poststylus = require('poststylus');


module.exports = {
    context: path.join(__dirname, 'server'),
    entry: {
        remarks: './bundles/remark/remarks.jsx',
        index: './bundles/index/index.jsx',
        pictures: './pictures'
    },
    devtool: 'source-map',
    output: {
        path: path.join(__dirname, 'server', 'public'),
        filename: '[name].js',
        sourceMapFilename: '[name].map',
        publicPath: '/server/'
    },
    module: {
        loaders: [
            {
                test: /\.styl$/,
                loader: ExtractTextPlagin.extract('css-loader!stylus-loader')
            },
            {
                test: /\.jsx$/,
                loader: 'babel',
                exclude: /node_modules/
            },
            {
                test: /\.png$|\.ico$/,
                loader: 'file-loader?name=[name].[ext]'
            }
        ]
    },
    stylus: {
        use: [
            poststylus(['autoprefixer'])
        ]
    },
    plugins: [
        new ExtractTextPlagin("[name].css")
    ]
};
