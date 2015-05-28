// Used to proxy webpack bundles from webpack - dev - server to localhost
var httpProxy = require('http-proxy');
var proxy = httpProxy.createProxyServer();
var bundle = require('./server/webpack.bundle.js')

var koa = require('koa');
var app = koa();
var common = require('koa-common');

var port = 3000;

// enable logger middleware
app.use(common.logger('dev'));

// enable static middleware
app.use(common.static(__dirname + '/build'));

//start webpack bundling process
bundle();

// Any requests to localhost:3000/build is proxied
// to webpack-dev-server
// app.all('/build/*', function(req, res) {
//   proxy.web(req, res, {
//     target: 'http://localhost:3000'
//   });
// });

var server = app.listen(port, function() {
  console.log('Listening on port %d', server.address().port);
});