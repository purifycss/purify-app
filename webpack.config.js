var Webpack = require('webpack');
var path = require('path');
var nodeModulesPath = path.resolve(__dirname, 'node_modules');
var buildPath = path.resolve(__dirname, 'build');
var mainPath = path.resolve(__dirname, 'app', 'main.js');

module.exports = {
  entry: ['./app/main.jsx'],
  output: {
    path: buildPath,
    filename: 'bundle.js',
    publicPath: "http://localhost:8080/build/"
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
    }],
    plugins: [new Webpack.HotModuleReplacementPlugin()]
  }
};