const webpack = require("webpack");
const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const CopyWebpackPlugin = require("copy-webpack-plugin");
const excludePaths = /(node_modules|bower_components)/;

const ExtractTextPlugin = require("extract-text-webpack-plugin");
const contextPath = path.join(__dirname, "./ui")
const distPath = path.join(__dirname, "./dist")

module.exports = {
    context: contextPath,
    entry: "./entry.js",
    output: {
        path: distPath,
        filename: "[name].bundle.js"
    },
    resolve: {
        modules: ["node_modules"],
        alias: {
            jquery: "jquery/src/jquery"
        }
    },
    module: {
        rules: [
            {
                test: /\.css$/,
                use: ExtractTextPlugin.extract({fallback: "style-loader", use: "css-loader"})
            }, {
                test: /\.(woff|woff2|eot|ttf|svg)$/,
                loader: 'url-loader?limit=10240&name=/fonts/[name].[ext]'
            }, {
                test: /\.(jpe?g|gif|png)$/,
                loader: "file-loader?name=/images/[name].[ext]"
            }
        ]
    },
    plugins: [
        new ExtractTextPlugin("css/styles.min.css"),
        new HtmlWebpackPlugin({
            template: "./index.html",
            files: {
                js: "main.bundle.js"
            },
            inject: "head"
        }),
        new CopyWebpackPlugin([
            {
                from: 'static',
                to: "static"
            }, {
                from: 'templates',
                to: "templates"
            }, {
                from: 'favicon.ico'
            }
        ]),
        new webpack.ProvidePlugin({$: "jquery", jquery: "jQuery", "windows.jQuery": "jquery"})
    ]
}