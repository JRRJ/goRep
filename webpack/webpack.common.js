const webpack = require('webpack')

module.exports = {
  name: 'javascript',
  
  entry: {
    main: './src/main.js'
  },

  resolve: {
    extensions: ['', '.js', '.jsx']
  },

  module: {
    loaders: [
      { test: /\.js?$/, 
        exclude: /node_modules/, 
        loader: 'babel-loader',
        query: {
          presets: ['es2015', 'react']
        }
      }
    ]
  }, 

  //helps separate dependencies out of bundles if you have multiple entry points 
  // plugins: [
  //   new webpack.optimize.CommonsChunkPlugin({
  //     name: ['main']
  //   })
  // ],

  devtool: 'source-map'
}