const path = require('path');
const autoprefixer = require('autoprefixer');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin');
const TerserPlugin = require('terser-webpack-plugin');
const { merge } = require('webpack-merge');

const getBabelConfig = require('./getBabelConfig');
const { getProjectPath, getPackageName } = require('./utils/projectUtils');

const entry = getProjectPath('src/index.ts');
const distDir = getProjectPath('dist');
const packageName = getPackageName();

function getWebpackConfig() {
    const commonConfig = {
        output: {
            path: distDir,
            filename: '[name].js',
            libraryTarget: 'umd'
        },
        devtool: 'source-map',
        module: {
            rules: [
                {
                    test: /.tsx?$/,
                    use: {
                        loader: 'babel-loader',
                        options: getBabelConfig()
                    }
                },
                {
                    test: /.less$/,
                    use: [
                        MiniCssExtractPlugin.loader,
                        {
                            loader: 'css-loader'
                        },
                        {
                            loader: 'postcss-loader',
                            options: {
                                postcssOptions: {
                                    plugins: [autoprefixer()]
                                }
                            }
                        },
                        {
                            loader: 'less-loader'
                        }
                    ]
                }
            ]
        },
        resolve: {
            extensions: ['.ts', '.tsx', '.js', '.jsx', '.json']
        },
        resolveLoader: {
            modules: [
                path.join(__dirname, '../node_modules'),
                path.join(process.cwd(), 'node_modules')
            ]
        },
        externals: {
            react: {
                root: 'React',
                commonjs2: 'react',
                commonjs: 'react',
                amd: 'react'
            },
            'react-dom': {
                root: 'ReactDOM',
                commonjs2: 'react-dom',
                commonjs: 'react-dom',
                amd: 'react-dom'
            }
        },
        plugins: [
            new MiniCssExtractPlugin({
                filename: '[name].css'
            })
        ]
    };

    const devConfig = merge(commonConfig, {
        entry: {
            [packageName]: entry
        },
        mode: 'development'
    });

    const prodConfig = merge(commonConfig, {
        entry: {
            [`${packageName}.min`]: entry
        },
        mode: 'production',
        optimization: {
            minimize: true,
            minimizer: [
                new TerserPlugin({
                    extractComments: false
                }),
                new CssMinimizerPlugin()
            ]
        }
    });

    return [devConfig, prodConfig];
}

module.exports = getWebpackConfig;
