
const path = require('path');

module.exports = {
    context: path.join(__dirname, 'blocks'),
    entry: './mainPage.js',
    output: {
        path: path.join(__dirname, 'public'),
        filename: 'mainPage.bundle.js'
    },
    module: {
        loaders: [
            {
                test: /\.js$/,
                loader: 'babel',
                exclude: /node_modules/
            }
        ]
    }
};
