var path = require('path');
var webpack = require('webpack');

module.exports = {
    devtool: 'eval-source-map',
    entry: [
        'webpack-hot-middleware/client',
        'babel-polyfill',
        './src/index'
    ],
    output: {
        path: path.join(__dirname, 'dist'),
        filename: 'bundle.js',
        publicPath: '/static/'
    },
    module: {
        loaders: [
            {
                loader: 'react-hot-loader',
                include: [
                    path.resolve(__dirname, 'src')
                ],
                test: /\.js$/,
                options: {
                    plugins: ['transform-runtime']
                }
            },
            {
                loader: 'babel-loader',
                include: [
                    path.resolve(__dirname, 'src')
                ],
                test: /\.js$/
            }
        ]
    },
    plugins: [
        new webpack.optimize.OccurrenceOrderPlugin(),
        new webpack.HotModuleReplacementPlugin()
    ]
}
