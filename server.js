// Used to proxy webpack bundles from webpack - dev - server to localhost
var proxy = require('koa-proxy');
var bundle = require('./server/webpack.bundle.js');

var serve = require('koa-static');
var router = require('koa-router')();

var koa = require('koa');
var app = koa();

var port = 3000;

// serve static index.html
app.use(serve(__dirname));

//mount router
app.use(router.routes());

//start webpack bundling process
bundle();

//route localhost:3000 request to localhost:8080 to fetch
//latest bundle
router.all('/build/*',proxy({
  url: 'http://localhost:8080/build/bundle.js'
}));



var server = app.listen(port, function() {
  console.log('Listening on port %d', server.address().port);
});