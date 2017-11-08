const webpack=require("webpack");
const path=require("path");
const HtmlWebpackPlugin=require("html-webpack-plugin");
const CopyWebpackPlugin=require("copy-webpack-plugin");

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
    },
    plugins:[
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
        ])
    ]
}