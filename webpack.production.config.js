var Webpack = require('webpack');
var path = require('path');
var nodeModulesPath = path.resolve(__dirname, 'node_modules');

var build = path.resolve(__dirname, 'build');
var entry = path.resolve(__dirname, 'app', 'App.jsx');

var config = {

  // We change to normal source mapping
  devtool: 'source-map',
  entry: entry,
  output: {
    path: build,
    filename: 'bundle.js'
  },
  module: {
    loaders: [{
      test: /\.(js|jsx)/,
      exclude: /(node_modules|bower_components)/,
      loader: 'babel'
    },{
      test: /\.css$/,
      loader: 'style!css'
    }],
    resolve: {
      extensions: ["", ".js", ".jsx"],
    }
  }
};

module.exports = config;