var path = require("path");

module.exports = {

  entry: "./client/index.js",
  output: {
    path: path.join(__dirname, "app/js-dist"),
    filename: "bundle.js"
  },
  module: {
    loaders: [
      { test: /\.jsx$/, loader: "jsx-loader" }
    ]
  },
  resolve: {
    extensions: ["", ".js", ".jsx"]
  },

};