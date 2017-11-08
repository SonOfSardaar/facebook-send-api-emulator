const webpack=require("webpack");
const path=require("path");
const HtmlWebpackPlugin=require("html-webpack-plugin");

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
        new HtmlWebpackPlugin({template:"./index.html"})
    ]
}