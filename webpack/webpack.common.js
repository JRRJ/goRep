const webpack = require('webpack');

module.exports = {
  entry: {
    main: './src/main.js'
  }, 

  resolve: {
    extensions: ['.js', '.jsx', '']
  },

  module: {
    loaders: [
      {
        test: '/\.jsx?$/',
        exclude: /node_modules/,
        query: {
          presets: ['es2015', 'react']
        }
      }
    ]
  },

  devtool: 'source-map'
}