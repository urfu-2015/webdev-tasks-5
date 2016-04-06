

//let autoprefixer = require('autoprefixer');
const webpack = require('webpack');
const path = require('path');
//const react = require('react');

module.exports = {
    context: path.join(__dirname, 'server', 'bundles'),
    entry: {
        remarks: './remark/remarks.jsx'
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
                test: /\.jsx$/,
                loader: 'babel',
                exclude: /node_modules/
            }
        ]
    }
};
