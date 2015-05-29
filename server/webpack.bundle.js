/*
@Webpack
@WebpackDevServer
@config

TODO
 */

import Webpack from 'webpack';
import WebpackDevServer from 'webpack-dev-server';
import config from './../webpack.config';

export default () => {

  // First we fire up Webpack and pass in the configuration we
  // created
  let start = null;
  let compiler = Webpack(config);

  // We give notice in the terminal when it starts bundling and
  // set the time it started
  compiler.plugin('compile', function() {
    console.log('Bundling...');
    start = Date.now();
  });

  // We also give notice when it is done compiling, including the
  // time it took. Nice to have
  compiler.plugin('done', function() {
    console.log('Bundled in ' + (Date.now() - start) + 'ms!');
  });

  let bundler = new WebpackDevServer(compiler, {

    // We need to tell Webpack to serve our bundled application
    // from the build path. When proxying:
    // http://localhost:3000/build -> http://localhost:8080/build
    publicPath: '/build/',

    // Configure hot replacement
    hot: true,

    // The rest is terminal configurations
    quiet: false,
    noInfo: true,
    stats: {
      colors: true
    }
  });

  // We fire up the development server and give notice in the terminal
  // that we are starting the initial bundle
  bundler.listen(8090, 'localhost', function() {
    console.log('Bundling project on localhost:8090, please wait...');
  });

};