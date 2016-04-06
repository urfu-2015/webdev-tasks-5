module.exports = {
    entry: "./js/main.jsx",
    output: {
        path: __dirname + "/public/javascripts",
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


