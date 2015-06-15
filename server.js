//Require hook to compile all subsequent .js files to es6
require("./register-babel");

var serve = require('koa-static');
var router = require('koa-router')();

// Used to proxy webpack bundles from webpack - dev - server to localhost
var proxy = require('koa-proxy');
var bundle = require('./server/webpack.bundle');

var co = require('co');
var parse = require('co-body');
var logger = require('koa-logger');

//purify css module to remove unused css
var purifycss = require('purify-css');

//database
// var config = require('./config/rethink.js');
// var r = require('rethinkdbdash')(config.rethinkdb);

//initialize server
var koa = require('koa');
var app = module.exports = koa();

var isProduction = process.env.NODE_ENV === 'production';
var port = isProduction ? 8080 : 3000;
// var port = process.env.PORT || 3000;
var env = process.env.NODE_ENV || 'dev';

/*
ROUTING
 */

app.use(logger());

// serve static index.html
app.use(serve(__dirname));

// mount router
app.use(router.routes());

//start webpack bundling process if not in production
if(!isProduction){
  bundle();

  // route localhost:3000 request to localhost:8080 to fetch
  // latest webpack bundle
  router.all('/build/*', proxy({
    url: 'http://localhost:8090/build/bundle.js'
  }));
}

/*
RETHINKDB
 */
// //Initialize database
// co(function*() {
//   try {
//     console.log('Initializing database...');

//     var name = 'purify';

//     yield r.dbCreate(name).run();
//     console.log('Database `purify` created');

//     yield r.db(name).tableCreate("urls").run();
//     console.log('Table `urls` created');

//     yield r.db(name).table("urls")
//       .indexCreate("url").run();

//     console.log('Database created on port 8080');
//   } catch (err) {
//     if (err.message.indexOf("already exists") !== -1)
//       console.log(err.message);
//   }
// });

router.post('/api/purify', purify);

//receive data from client, remove unused css, and send message back to client
function* purify(next) {

  try {
    var input = yield parse.json(this);

    //initialize content and css string
    var content = "";
    var css = "";

    //concatenate content array to string
    input.content.forEach((function(item) {
      content += item.toString();
    }))

    //concatenate css array to string
    input.css.forEach((function(item) {
      css += item.toString();
    }))

    // purify css
    var uncss = purifycss(content, css, {
      write: false,
      minify: false
    });

    //css removal summary
    var before = 'css before purify: ' + css.length + ' chars long';
    var after = 'css after purify: ' + uncss.length + ' chars long';
    var compare = 'purified css is ' + (100-(100*Math.floor((uncss.length / css.length)*1000)/(1000))) + ' % smaller';

    var message = {
      before:before,
      after:after,
      compare:compare,
      purify: uncss
    }

    //send message back to client
    this.body = JSON.stringify(message);

  } catch (err) {
    this.status = 500;
    this.body = err.message || http.STATUS_CODES[this.status];
  }
  yield next;
}

/*
OPEN KOA CONNECTION
 */
var server = app.listen(port, function() {
  console.log('Listening on port %d', server.address().port);
});