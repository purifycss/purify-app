var Webpack = require('webpack');
var path = require('path');

var build = path.resolve(__dirname, 'build');
var entry = path.resolve(__dirname, 'app', 'App.jsx');

module.exports = {
  entry: entry,

  output: {
    path: build,
    filename: 'bundle.js',
    publicPath: "/build"
  },
  module: {
    loaders: [{
      test: /\.(js|jsx)/,
      exclude: /(node_modules|bower_components)/,
      loader: 'babel'
    }],
    resolve: {
      extensions: ["", ".js", ".jsx"],
    },
    plugins: [new Webpack.HotModuleReplacementPlugin()]
  }
};