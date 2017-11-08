const webpack = require("webpack");
const path = require('path');
const CompressionPlugin = require("compression-webpack-plugin");

module.exports = {

    entry: "./index.js",
    devtool: "source-map",
    output: {
        path: path.join(__dirname, "./dist"),
        filename: "pouchdb.pouchdb-triplesec.min.js"
    },
    module: {
        loaders: [
            {
                exclude: /(node_modules)/,
                loader: "babel-loader",
                query: {
                    presets: ["es2015"]
                }
            }
        ]
    },
    plugins: [
        new webpack.LoaderOptionsPlugin({
            minimize: true
        }),
        new CompressionPlugin()
    ]
};