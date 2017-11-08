const webpack=require("webpack");
const path=require("path");
const HtmlWebpackPlugin=require("html-webpack-plugin");
const CopyWebpackPlugin=require("copy-webpack-plugin");
const excludePaths=/(node_modules|bower_components)/;

var ExtractTextPlugin = require("extract-text-webpack-plugin");
let sassLoader = new ExtractTextPlugin("app.min.css");
const contextPath=path.join(__dirname,"./ui")
const jsDistPath=path.join(__dirname,"./www")

module.exports={
    context:contextPath,
    entry:"./entry.js",    
    output:{
        path:jsDistPath,
        filename:"[name].bundle.js"
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
              test: /\.scss$/,
              exclude:excludePaths,
              loader: sassLoader.extract("css-loader!sass-loader")
           },
           { test: /\.css$/, loader: "style-loader!css-loader" },
           { test: /\.(png|woff|woff2|eot|ttf|svg)$/, loader: 'url-loader?limit=100000' },
           { 
               test: /\.(jpe?g|gif|png|svg|woff|ttf|wav|mp3|ico)$/, 
               loader: "file-loader?name=./images/[name].[ext]" 
          }
        ]
    },
    plugins:[
        sassLoader,
        new HtmlWebpackPlugin({
            template:"./index.html",
            files:{js:"main.bundle.js"},
            inject:"head"
        }),
        new CopyWebpackPlugin([
            { from: 'static',to:"static" },
            { from: 'styles',to:"styles" },
            { from: 'templates',to:"templates" },
            { from: 'favicon.ico'}
        ]),
        new webpack.ProvidePlugin({
            $: "jquery",
            jquery: "jQuery",
            "windows.jQuery": "jquery"
        })
    ]
}