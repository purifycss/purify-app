var Webpack = require('webpack');
var path = require('path');

var buildPath = path.resolve(__dirname, 'build');
var mainPath = path.resolve(__dirname, 'app', 'App.jsx');

module.exports = {
  entry: mainPath,

  output: {
    path: buildPath,
    filename: 'bundle.js',
    publicPath: "/build"
  },
  module: {
    loaders: [{
      test: /\.js?$/,
      exclude: /(node_modules|bower_components)/,
      loader: 'babel'
    }, {
      test: /\.jsx$/,
      loader: 'jsx-loader'
    }],
    plugins: [new Webpack.HotModuleReplacementPlugin()]
  }
};