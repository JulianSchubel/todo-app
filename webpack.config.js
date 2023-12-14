/* combine paths in an OS agnostic manner */
const path =  require('path');

module.exports = {
    entry: ["babel-polyfill", "./src/index.js"],
    output: {
        filename: "bundle.js",
        path: path.join(__dirname, "/public/scripts")
    },
    module: {
        rules: [{
            test: /\.js$/,
            exclude: /node_modules/,
            use: {
                loader: "babel-loader",
                options: {
                    presets: ["@babel/preset-env"]
                }
            }
        }]
    },
    devServer: {
        static: {
            directory: path.join(__dirname, "/public")
        },
        devMiddleware: {
            publicPath: "/scripts/"
        },
        port: 9000,
        hot: true
    },
    devtool: "source-map"
}
