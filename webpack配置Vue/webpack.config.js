const path = require('path')
const isDev = process.env.NODE_ENV === 'development'
const HTMLPlugin = require('html-webpack-plugin')
const VueLoaderPlugin = require('vue-loader/lib/plugin')
const webpack = require('webpack')
module.exports = {
    entry: path.join(__dirname, 'src/index.js'),
    output: {
        filename: 'bundle.js',
        path: path.join(__dirname, 'dist')
    },
    module: {
        rules: [
            {
                test: /\.vue$/,
                loader: 'vue-loader'
            },
            {
                test: /\.css$/,
                use: [
                    'style-loader',
                    'css-loader'
                ]
            },
            {
                test: /\.(jpg|jpeg|svg|png|gif)$/,
                use: {
                    loader: 'url-loader',
                    options: {
                        limit: 1024,
                        filename: '[name].[ext]'
                    }
                }
            },
            {
                test: /\.styl$/,
                use: [
                    'style-loader',
                    'css-loader',
                    'stylus-loader'
                ]
            }
        ]
    },
    plugins: [
        new webpack.DefinePlugin({
            'process.env': {
                NODE_ENV: isDev ? '"development"' : '"production"'
            }
        }),
        new VueLoaderPlugin(),
        new HTMLPlugin()
    ]
}
// 如果是开发状态，启动以下设置
// if (isDev) {
//     config.devtool = '#cheap-module-eval-source-map'
//     config.devServer = {
//         port: 8080,
//         host: '0.0.0.0',
//         overlay: {
//             errors: true,
//             //热加载
//             hot: true
//         }
//     }
//     config.plugins.push(
//         new webpack.HotModuleReplacementPlugin(),
//         new webpack.NoEmitOnErrorsPlugin()
//     )
// }