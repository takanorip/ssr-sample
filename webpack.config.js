'use strict';

const { resolve } = require('path');
const webpack = require('webpack');
const { smart } = require('webpack-merge');
const DotenvPlugin = require('webpack-dotenv-plugin');

const config =
  process.env.NODE_ENV !== 'production'
    ? require('./webpack.dev.config')
    : require('./webpack.prod.config');

const common = {
  mode: process.env.NODE_ENV === 'production' ? 'production' : 'development',
  output: {
    filename: '[name].bundle.js',
    path: resolve('dist'),
    publicPath: '/public/'
  },
  resolve: {
    extensions: ['.ts', '.tsx', '.js']
  },
  module: {
    rules: [
      {
        test: /\.ts|.tsx$/,
        use: 'awesome-typescript-loader'
      }
    ]
  },
  plugins: [
    new webpack.NamedModulesPlugin(),
    // new DotenvPlugin({
    //   sample: './.env',
    //   path: '.env'
    // }),
    new webpack.DefinePlugin({
      'process.env.BROWSER': JSON.stringify(true)
    })
  ]
};

module.exports = smart(common, config);
