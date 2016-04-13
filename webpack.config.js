module.exports = {
    entry: "./source/js/main.jsx",
    output: {
        path: __dirname + "/public",
        filename: 'main.js'
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
}


