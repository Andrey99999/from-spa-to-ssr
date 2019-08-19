const path = require('path');
const merge = require('webpack-merge')
const webpackNodeExternals = require('webpack-node-externals')

const baseConfig = require('./webpack.config.base')

module.exports = merge(baseConfig, {
    mode: 'production',
    target: 'node',
    entry: './src/server.js', // точка входа
    externals: [webpackNodeExternals()],
    output: { // куда выкидывать готовые файлы
        filename: 'server.js', // chunkhash чтобы не кешировались фвйлы при изменении 
        path: path.resolve(__dirname, 'dist'),
    },

    module: {
        rules: [
            {
                test: /\.scss$/,
                use: 'null-loader'
            }
        ]
    },
});