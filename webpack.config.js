const path = require('path');

module.exports = {
    context: path.join(__dirname, 'bundles'),
    entry: {
        index: './index.jsx'
    },
    output: {
        path: path.join(__dirname, 'public', 'javascripts'),
        filename: '[name].js',
        publicPath: '/'
    },
    module: {
        loaders: [
            {
                test: /\.jsx?$/,
                loader: 'babel',
                exclude: /node_modules/
            }
        ]
    }
};
