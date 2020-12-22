const path = require('path');
const getBabelConfig = require('./getBabelConfig');
const autoprefixer = require('autoprefixer');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin');
const TerserPlugin = require('terser-webpack-plugin');
const { merge } = require('webpack-merge');

const getProjectPath = require('./utils/getProjectPath');

const entry = getProjectPath('src/index.js');
const distDir = getProjectPath('dist');

function getWepackConfig() {
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
            'rs-ui': entry
        },
        mode: 'development'
    });

    const prodConfig = merge(commonConfig, {
        entry: {
            [`rs-ui.min`]: entry
        },
        mode: 'production',
        optimization: {
            minimize: true,
            minimizer: [new TerserPlugin(), new CssMinimizerPlugin()]
        }
    });

    return [devConfig, prodConfig];
}

module.exports = getWepackConfig;
