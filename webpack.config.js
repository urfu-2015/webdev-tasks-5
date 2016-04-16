module.exports = {
    entry: "./react/index.jsx",
    output: {
        path: __dirname + "/public",
        filename: 'index.js'
    },
    module: {
        loaders: [
            {
                test: /\.jsx$/,
                loader: 'babel',
                exclude: /node_modules/
            }
        ]
    },
    resolve: {
        extensions: ['', '.js', '.jsx']
    }
}
