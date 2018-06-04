/**
 * Created by zlf on 2017/9/29.
 */
let path = require('path');
let webpack = require('webpack');
let UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');



module.exports = {
    mode: 'development' || 'production',
    entry: [path.resolve(__dirname, 'src/entry.js'), 'webpack-hot-middleware/client?path=/__webpack_hmr&timeout=2000&reload=true'],
    output: {
        path: path.resolve(__dirname, 'dist'),
        publicPath: '/',
        filename: 'demo.full.min.js'//'[name].[chunkhash].js'
    },

    module: {
        rules: [
            {
                test: /\.css$/,
                use: ['style-loader', 'file-loader', 'css-loader', 'resolve-url-loader']
            }/*,
             {
             test: /\.js$/,
             //exclude: /(node_modules|bower_components)/,
             use: {
             loader: 'babel-loader'
             }

             }*/

        ]
    },

    devtool:'cheap-eval-source-map'|| 'inline-source-map' || 'source-map',
    devServer: {
        contentBase: './dist',
        hot: true
    },

    plugins: [
        new webpack.BannerPlugin({banner: '/*Created by zlf*/', raw: true, entryOnly: true}),
        /* new webpack.DllReferencePlugin({
         context: __dirname,
         manifest: require('./pages/dist/vendors-manifest.json')
         }),*/

        new CleanWebpackPlugin(['./dist'], {
            exclude: ['vendors.dll.js', 'vendors.dll.js.map', 'vendors-manifest.json']
        }),
        new UglifyJsPlugin({
            sourceMap: true,
            uglifyOptions: {
                output: {
                    ascii_only: true
                }
            }
        }),
        new webpack.NamedModulesPlugin(),//热更新
        new webpack.HotModuleReplacementPlugin(),//热更新
        new HtmlWebpackPlugin({
            title: 'Caching',
            template: './demo.html'
        })

    ],

    // ----跨目录模块依赖相对路径不同，使用绝对路径----
    resolve: {
        alias: {
            main: path.resolve(__dirname, 'src/main'),
            phones: path.resolve(__dirname, 'src/phones')

        }
    }

};
