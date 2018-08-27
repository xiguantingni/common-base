/**
 * Created by RCC on 2018/6/15.
 */

const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

module.exports = {
    entry: ['babel-polyfill', './src/index.js'],
    output: {
        path: path.resolve(__dirname, 'dist'), // 输出的路径
        //publicPath: '/',
        filename: 'bundle.js'  // 打包后文件
    },
    resolve: {
        alias: {
            '@src': path.resolve(__dirname, './src'),
            '@page': path.resolve(__dirname, './src/page'),
            '@util': path.resolve(__dirname, './src/util'),
            '@component': path.resolve(__dirname, './src/component'),
            '@image': path.resolve(__dirname, './src/image')
        }
    },
    module: {
        rules: [
            {
                test: /\.(js|jsx)$/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ['es2015', 'stage-0', 'react']
                        //按需导入样式文件
                        //plugins: [
                        //    ['import', { libraryName: 'antd', style: 'css' }]
                        //]
                    }
                },
                exclude: /node_modules/
            },
            {
                test: /\.html$/,
                use: [{
                    loader: 'html-loader',
                    options: {
                        root: `${__dirname}/src`,
                        attrs: ['img:src', 'link:href', 'script:src']
                    }
                }]
            },
            {
                test: /\.css$/,
                //use: [ 'style-loader', 'css-loader' ]
                use: [{
                    loader: "style-loader"
                }, {
                    loader: "css-loader"
                }]
            },
            {
                test: /\.less$/,
                use: [{
                    loader: "style-loader" // creates style nodes from JS strings
                }, {
                    loader: "css-loader" // translates CSS into CommonJS
                }, {
                    loader: "less-loader" // compiles Less to CSS
                }]
            },
            {
                test: /.(png|jpg|jpeg|gif|eot|ttf|woff|woff2|svg|svgz|tmpl)$/,
                use: ['url-loader?limit=8192&name=./[name].[ext]']
            }
        ]
    },
    plugins: [
        new HtmlWebpackPlugin({
            filename: 'index.html',
            template: path.resolve(__dirname, './public/index.html'),
            inject : true
        }),
        new ExtractTextPlugin("css/index.css")
    ],
    optimization: {
        splitChunks: {
            cacheGroups: {
                lib1: {
                    chunks: "initial",
                    enforce: true
                }
            }
        }
    },
    mode: 'production',
    devtool: 'source-map'
};
