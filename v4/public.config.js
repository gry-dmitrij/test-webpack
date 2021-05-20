const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
// const CopyPlugin = require('copy-webpack-plugin');
// const HtmlPlugin = require('html-webpack-plugin');

module.exports = (env, options) => {
    const devMode = options.mode === 'development';
    return {
        entry: {
            // main: ["@babel/polyfill", "./src/public/index.js"]
            main: ["./src/public/index.js"]
        },
        watch: devMode,
        output:
            {
                path: path.join(__dirname, 'dist/public'),
                publicPath: "/",
                filename: "js/[name].js",
                // assetModuleFilename: '[name][ext]'
            },
        stats: {
            children: true,
            errorDetails:
                true
        },
        target: 'web',
        devtool:
            "source-map",
        module:
            {
                rules: [
                    {
                        test: /\.s[ac]ss$|\.css$/i,
                        use: [
                            {
                                loader: MiniCssExtractPlugin.loader,
                                options: {
                                    publicPath: '../'
                                }
                            },
                            'css-loader',
                            'sass-loader'
                        ]
                    },
                    {
                        test: /\.(png|jpe?g|svg|gif|ico)$/i,
                        use: {
                            loader: 'file-loader',
                            options: {
                                outputPath: (url, resPath, context) => {
                                    const relPath = path.relative(
                                        path.join(context, 'src', 'public'), resPath);
                                    return relPath;
                                },
                            }
                        }
                    },
                    {
                        test: /\.(woff(2)?|ttf|eot)(\?v=\d+\.\d+\.\d+)?$/,
                        loader: 'file-loader',
                        options: {
                            name: 'font/[name].[ext]'
                        },
                    },
                    // {
                    //     test: /\.html$/i,
                    //     type: 'asset/resource',
                    //     generator: {
                    //         filename: '[name][ext]',
                    //     }
                    // },
                    // {
                    //     test: /\.html$/i,
                    //     use: [
                    //         //'extract-loader',
                    //         // {
                    //         //     loader: 'file-loader',
                    //         //     options: {
                    //         //         name: '[name].[ext]'
                    //         //     }
                    //         // },
                    //         // 'null-loader',
                    //         'file-loader',
                    //         'extract-loader',
                    //         'ref-loader',
                    //         'html-loader'
                    //     ],
                    // }
                ]
            },
        plugins: [
            new MiniCssExtractPlugin({
                filename: 'css/style.css',
            }),
            // new CopyPlugin({
            //     patterns: [
            //         {
            //             from: "./src/public/css/",
            //             to: "./css/[name].css"
            //         },
            //
            //     ]
            // }),
            // new HtmlPlugin({
            //     template: 'src/public/',
            //     filename: '[name].html',
            // })
        ]
    }
}