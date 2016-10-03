const webpack = require('webpack');
const webpackMerge = require('webpack-merge');
const commonConfig = require('./webpack.common.js');
const path = require('path');

console.log("DIRNAME : ", __dirname);

module.exports = webpackMerge(commonConfig, {
  output: {
    path: path.resolve(__dirname, '..'),
    publicPath: '/dist/',
    filename: '[name].bundle.js'
  },

  devServer: {
    historyApiFallback: true, 
    stats: 'minimal'
  }
});
