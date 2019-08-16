const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin')
const webpack = require('webpack')
const merge = require('webpack-merge')

const baseConfig = require('./webpack.config.base')

module.exports = merge(baseConfig, { // первый аргумент базовый конфиг, вторым какие будут изменения
    mode: 'development',
    entry: './src/index.js', // точка входа
    output: {    // куда выкидывать готовые файлы
        filename: 'bundle.js',
        path: path.resolve(__dirname, 'public'),
        publicPath: '/'
    },

    // плагины
    plugins: [
        new HtmlWebpackPlugin({
            template: './index.html'
        }),

        new webpack.HotModuleReplacementPlugin()
    ],
    // server
    devServer: {
        contentBase: './public',
        hot: true,
        port: 3001,
        open: true,
        historyApiFallback: true
    },
    devtool: 'inline-source-map' // отладка в браузере
});