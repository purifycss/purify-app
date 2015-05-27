var webpack = require('webpack');

module.exports = {
  entry: ['./app/main.jsx'],
  output: {
    path: './build',
    filename: 'bundle.js'
  },
  module: {
    loaders: [
        {
      test: /\.js?$/,
      exclude: /(node_modules|bower_components)/,
      loader: 'babel'
    },
    {
      test: /\.jsx$/,
      loader: 'jsx-loader'
    }]
  }
};