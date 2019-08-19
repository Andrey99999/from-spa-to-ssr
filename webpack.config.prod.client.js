const path = require('path');
const UglifyJSPlugin = require('uglifyjs-webpack-plugin') // сжимает js
const CompressionPlugin = require('compression-webpack-plugin') // сжимает в архив gzip
const { CleanWebpackPlugin } = require('clean-webpack-plugin') // очищает папку dist перед каждым новым build 
const webpack = require('webpack')
const merge = require('webpack-merge')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const { StatsWriterPlugin } = require('webpack-stats-plugin') // создает json файл, статистику builda, нужен для ssr, чтобы в script подключался правильный chunk

const baseConfig = require('./webpack.config.base')

module.exports = merge(baseConfig, {
    mode: 'production',
    entry: './src/index.js', // точка входа
    output: { // куда выкидывать готовые файлы
        filename: 'bundle.[chunkhash].js', // chunkhash чтобы не кешировались фвйлы при изменении 
        path: path.resolve(__dirname, 'dist'),
        publicPath: '/'
    },

    module: {
        rules: [
            {
                test: /\.scss$/,
                use: [MiniCssExtractPlugin.loader, 'css-loader', 'sass-loader']
            }
        ]
    },

    optimization: {
        minimizer: [
            new UglifyJSPlugin({
                cache: true,
                parallel: true,
                uglifyOptions: {
                    compress: false,
                    ecma: 6,
                    mangle: true
                },
                sourceMap: false
            }),
        ],
    },

    // плагины
    plugins: [
        new CompressionPlugin(), 
        new CleanWebpackPlugin(), // очистка директории
        new webpack.DefinePlugin({
            'process.env': {
                'NODE_ENV': JSON.stringify('production')
            }
        }),
        new StatsWriterPlugin({
            // filename: 'stats.json'
            stats: {
                all: false,
                assets: true
            }
        }),
        new MiniCssExtractPlugin({
            filename: 'styles.[chunkhash].css'
        })
    ],

    devtool: 'inline-source-map' // отладка в браузере
});