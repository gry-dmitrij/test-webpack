const path = require('path');
const fs = require('fs');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const HtmlPlugin = require('html-webpack-plugin');
const {CleanWebpackPlugin} = require('clean-webpack-plugin');
const { VueLoaderPlugin } = require('vue-loader')

const inputDir = 'src/public';      // входная директория
const outputDir = 'dist/public';    // выходная директория

// генерирует конфигурации для html-webpack-pugin,
// проходя по всем html файлам в директории
function generateHTMLPlugins(inject = true) {
    const templateFiles = fs.readdirSync(path.resolve(__dirname, inputDir));
    return  templateFiles.filter(item => /\.html/i.test(path.extname(item)))
        .map(item => {
            return new HtmlPlugin({
                template: item,
                filename: item,
                inject: inject
            })
        })
}


module.exports = (env, options) => {
    const devMode = options.mode === 'development';
    return {
        context: path.resolve(__dirname, inputDir),
        entry: {
            main: ['@babel/polyfill', './index.js']
        },
        watch: devMode,
        output:
            {
                path: path.join(__dirname, outputDir),
                publicPath: "./",
                filename: "js/[name].js",
            },
        stats: {
            children: true,
            errorDetails:
                true
        },
        target: 'web',
        devtool: devMode ? 'eval' : 'source-map',
        module:
            {
                rules: [
                    {
                        test: /\.m?js$/i,
                        exclude: /node_models/,
                        use: {
                            loader: 'babel-loader',
                            options: {
                                presets: ['@babel/preset-env']
                            }
                        }
                    },
                    {
                        test: /\.(s[ac]|c)ss$/i,
                        use: [
                            devMode ? 'style-loader' :
                                {
                                loader: MiniCssExtractPlugin.loader,
                                options: {
                                    publicPath: '../',
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
                                    const hash = path.parse(url).name;
                                    const fileObj = path.parse(path.posix.relative(
                                        context.replace(/\\/g, '/'), resPath.replace(/\\/g, '/')));
                                    const name = devMode ?
                                        `${fileObj.name}.${hash + fileObj.ext}` :
                                        `${hash + fileObj.ext}`;
                                    return path.posix.join(fileObj.dir, name);
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
                    {
                        test: /\.html$/i,
                        use: [
                            {
                                loader: 'html-loader',
                                options: {
                                    attributes: {
                                        list: [
                                            '...',
                                            {
                                                // для ручного добавления тэгов link напрямую в html
                                                // без этого выдает ошибку
                                                // но импортировать нужно при этом отдельно
                                                tag: 'link',
                                                attribute: 'href',
                                                type: 'src',
                                                filter: (tag, attribute, attributes, resourcePath) => {
                                                    return tag !== 'link';
                                                }
                                            }
                                        ]
                                    }
                                }
                            },
                        ],
                    },
                    {
                        test: /\.vue$/,
                        loader: 'vue-loader'
                    }
                ]
            },
        plugins: [
            new MiniCssExtractPlugin({
                filename: 'css/style.css',

            }),
            new CleanWebpackPlugin(),
            new VueLoaderPlugin()
        ].concat(generateHTMLPlugins())
    }
}