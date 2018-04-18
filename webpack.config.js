const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const FaviconsWebpackPlugin = require('favicons-webpack-plugin');
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
const CompressionPlugin = require("compression-webpack-plugin");
const brotliCompress = require('iltorb').compress;
const CleanWebpackPlugin = require('clean-webpack-plugin');

module.exports = (env, options) => {
    return {
        context: path.resolve(__dirname, "src"),
        entry: {
            app: './index.jsx'
        },
        devtool: 'source-map',
        devServer: {
            historyApiFallback: true,
            contentBase: './dist'
        },
        plugins: [
            new webpack.NamedModulesPlugin(),
            new HtmlWebpackPlugin({
                title: 'Loading...'
            }),
            new webpack.IgnorePlugin(/^ws$/)
        ].concat(options.mode === 'production' ? [
            new CleanWebpackPlugin(['dist']),
            new FaviconsWebpackPlugin({
                logo: './assets/temp_icon.png',
                icons: {
                    android: false,
                    appleIcon: false,
                    appleStartup: false,
                    coast: false,
                    favicons: true,
                    firefox: false,
                    opengraph: false,
                    twitter: false,
                    yandex: false,
                    windows: false
                }
            }),
            new CompressionPlugin({
                asset: "[path].gz[query]",
                algorithm: "gzip",
                test: /\.(js)$/
            }),
            new CompressionPlugin({
                asset: "[path].br[query]",
                algorithm: function(buf, options, callback) {
                    brotliCompress(buf, {
                        mode: 0, // 0 = generic, 1 = text, 2 = font (WOFF2)
                        quality: 11, // 0 - 11
                        lgwin: 22, // window size
                        lgblock: 0 // block size
                    }, callback);
                },
                test: /\.js$/
            }),
            new BundleAnalyzerPlugin()
        ] : []),
        output: {
            publicPath: '/',
            filename: '[name].bundle.js',
            path: path.resolve(__dirname, 'dist')
        },
        resolve: {
            extensions: ['.js', '.jsx', '.less']
        },
        module: {
            rules: [{
                test: /\.jsx?$/,
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader',
                }
            }, {
                test: /\.css$/,
                use: ['style-loader', 'css-loader']
            }, {
                test: /\.less$/,
                use: [{
                    loader: "style-loader" // creates style nodes from JS strings
                }, {
                    loader: "css-loader" // translates CSS into CommonJS
                }, {
                    loader: "less-loader" // compiles Less to CSS
                }]
            }, {
                test: /\.(png|jpe?g|svg)$/,
                use: [{
                    loader: 'url-loader',
                    options: {
                        limit: 8000 // Convert images < 8kb to base64 strings
                    }
                }]
            }, {
                test: /\.(woff|woff2)(\?v=\d+\.\d+\.\d+)?$/,
                use: [{
                    loader: "url-loader",
                    options: {
                        limit: 8000,
                        mimetype: "application/font-woff"
                    }
                }]
            }, {
                test: /\.(ttf|eot)$/,
                use: [{
                    loader: "file-loader"
                }]
            }]
        }
    };
};
