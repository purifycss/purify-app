var webpack = require('webpack');

module.exports = {
  entry: {
    app: ['webpack/hot/dev-server', './app/main.jsx'],
  },
  output: {
    path: './build',
    filename: 'bundle.js'
  },
  module: {
    loaders: [
        {
      test: /\.jsx?$/,
      exclude: /(node_modules|bower_components)/,
      loader: 'babel'
    },
    {
      test: /\.jsx$/,
      loader: 'jsx-loader'
    }]
  }
};