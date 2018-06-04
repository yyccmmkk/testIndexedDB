/**
 * Created by zlf on 2017/9/25.
 */
const webpack = require('webpack');
const library = '[name]_lib';
const path = require('path');
var UglifyJSPlugin = require('uglifyjs-webpack-plugin');

module.exports = {
    entry: {
        vendors: ['jquery', 'artTemplate', 'jQueryUi']
    },

    output: {
        filename: '[name].dll.js',
        path: path.resolve(__dirname, 'pages/dist'),
        library: library

    },
    devtool: 'source-map',
    plugins: [
        new webpack.DllPlugin({
            path: path.join(__dirname, 'pages/dist/[name]-manifest.json'),
            // This must match the output.library option above
            name: library
        }),
        /* new UglifyJSPlugin({
         sourceMap: true,
         uglifyOptions:{
         ie8:true,
         warnings:true,
         compress:{
         properties: false
         },
         keep_fnames:true
         },
         output:{
         ascii_only:true,
         quote_keys: true

         },
         mangle: {
         screw_ie8: false
         }

         })*/

    ],
    resolve: {
        alias: {
            jquery: path.resolve(__dirname, 'extern/jquery-1.12.4.min'),
            artTemplate: path.resolve(__dirname, 'extern/template-web'),
            jQueryUi: path.resolve(__dirname, 'extern/jquery-ui.min'),
        }
    }

};