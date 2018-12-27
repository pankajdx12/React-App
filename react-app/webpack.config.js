const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const webpack = require('webpack');
// WE MOVED THE INSTANCE HERE, SO WE CAN USE IT
const extractPlugin = new ExtractTextPlugin({
    filename: './style.css'
});
module.exports = {
    entry: "./index.js",
    output: {
        filename: 'bundle.js',
        path: path.resolve(__dirname, 'public')
    },
    // presets: ['env', 'stage-0', 'react'],
    context: path.resolve(__dirname, 'src'),
    plugins: [
     new HtmlWebpackPlugin({
            template: 'index.html'
        }),
        // NEW LINE
        new ExtractTextPlugin({
            filename: './style.css'
           }),
        // WE JUST PASS IT HERE
        extractPlugin,
        new CleanWebpackPlugin(['public']),
    ],
    devServer: {
        contentBase: path.resolve(__dirname, 'public/assets'),
        stats: 'errors-only',
        open: true,
        port: 8080,
        compress: true
    },
    module: {
        rules: [{
            test: /\.(jpg|png|gif|svg)$/,
            use: [
            {
                loader: 'file-loader',
                options: {
                    name: '[name].[ext]',
                    outputPath: './assets/',
                }
            }]
        }, {
            //HERE ARE THE NEW LINES
            // test: /\.css$/,
            // use: ["style-loader", "css-loader"]
            test: /\.css$/,
            // AND WE USE IT HERE
            use: extractPlugin.extract({
             use: ["css-loader", "sass-loader", "postcss-loader"],
             fallback: 'style-loader'
            })
        },
        {
            test: /\.js$/,
            use: {
                loader: 'babel-loader',
                options: {
                    presets: ['env', 'stage-0', 'react']
                }
            }
        }]
    },
}