const webpack = require('webpack');
const webpackMerge = require('webpack-merge');
const path = require('path');
const commonConfig = require('./webpack.common.js');

module.exports = webpackMerge(commonConfig, {
  output: {
    path: path.resolve(__dirname, '../src'),
    publicPath: '/dist/',
    filename: '[name].bundle.js'
  },

  devServer: {
    historyApiFallback: true, 
    stats: 'minimal'
  }
});
