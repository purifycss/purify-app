// Used to proxy webpack bundles from webpack - dev - server to localhost
var proxy = require('koa-proxy');
var bundle = require('./server/webpack.bundle.js');
var route = require('koa-route');
var common = require('koa-common');

var koa = require('koa');
var app = koa();

var port = 3000;

// enable logger middleware
app.use(common.logger('dev'));

// enable static middleware
app.use(common.static(__dirname));

//start webpack bundling process
bundle();

//route localhost:3000 request to localhost:8080 to fetch
//latest bundle
app.use(route.get('/build/bundle.js', proxy({
  url: 'http://localhost:8080/build/bundle.js'
})));


var server = app.listen(port, function() {
  console.log('Listening on port %d', server.address().port);
});