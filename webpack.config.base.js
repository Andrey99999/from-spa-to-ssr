module.exports = {
    target: 'web',
     // для обработки sass, js файлов
     module: {
        rules: [
            {
                test: /\.scss$/,  // расширения каких файлов обрабатывать
                use: ['style-loader', 'css-loader', 'sass-loader'] // лоадеры
            },

            {
                test: /\.js?$/, // расширения каких файлов обрабатывать
                exclude: '/node_modules/', // исключаем node modules
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: [
                            '@babel/preset-react',
                            ['@babel/env', { targets: { browsers: ['last 7 versions'] }} ]
                        ]
                    }
                }
            }
        ]
    },
}