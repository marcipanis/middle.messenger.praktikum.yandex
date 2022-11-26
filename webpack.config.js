/*eslint-disable */
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin');
const FaviconsWebpackPlugin = require('favicons-webpack-plugin')
/* eslint-enable */
const development = process.env.NODE_ENV !== 'production';

module.exports = {
  mode: development ? 'development' : 'production',
  stats: 'minimal',
  entry: './src/index.ts',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: development ? '[name].[contenthash].js' : '[name].js',
    clean: true,
  },
  resolve: {
    extensions: ['.ts', '.tsx', '.js'],
    alias: {
      handlebars: 'handlebars/dist/handlebars.js',
    },
  },
  devServer: {
    static: {
      directory: path.join(__dirname, 'dist'),
    },
    hot: true,
    port: 3000,
    historyApiFallback: true,
    compress: true,
  },
  module: {
    rules: [
      {
        test: /\.ts$/,
        include: path.resolve(__dirname, 'src'),
        use: [
          {
            loader: 'ts-loader',
            options: {
              configFile: path.resolve(__dirname, 'tsconfig.json'),
            },
          },
        ],
        exclude: /(node_modules)/,
      },
      {
        test: /\.css$/i,
        use: [MiniCssExtractPlugin.loader, 'css-loader', 'postcss-loader'],
      },
    ],
  },
  optimization: {
    minimize: !development,
    minimizer: [
      new CssMinimizerPlugin(),
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: 'src/index.html',
    }),
    new MiniCssExtractPlugin({
      filename: development ? '[name].[contenthash].css' : '[name].css',
    }),
    new FaviconsWebpackPlugin('static/images/icons/favicon.ico'),
  ],
};
