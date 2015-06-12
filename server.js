//Require hook to compile all subsequent .js files to es6
require("./register-babel");

// Used to proxy webpack bundles from webpack - dev - server to localhost
var serve = require('koa-static');
var router = require('koa-router')();

var proxy = require('koa-proxy');
var bundle = require('./server/webpack.bundle');

var parse = require('co-body');
var co = require('co');

var purifycss = require('purify-css');

var logger = require('koa-logger');

var config = require('./config/rethink.js');
var r = require('rethinkdbdash')(config.rethinkdb);

var koa = require('koa');
var app = module.exports = koa();

var port = process.env.PORT || 3000;
var env = process.env.NODE_ENV || 'dev';

/*
ROUTING
 */

app.use(logger());

// serve static index.html
app.use(serve(__dirname));

// mount router
app.use(router.routes());

//start webpack bundling process
bundle();

// route localhost:3000 request to localhost:8080 to fetch
// latest bundle
router.all('/build/*', proxy({
  url: 'http://localhost:8090/build/bundle.js'
}));

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

function* purify(next) {

  try {
    var input = yield parse.json(this);

    var content = "";
    var css = "";

    //concatenate content array to string
    input.content.forEach((function(item) {
      content += item.toString();
    }))

    input.css.forEach((function(item) {
      css += item.toString();
    }))

    // console.log('server js' + content);
    // console.log('server css' + css);

    // purify css
    var uncss = purifycss(content, css, {
      write: false,
      minify: false
    });

    var before = 'before purify: ' + css.length + ' chars long';
    var after = 'after purify: ' + uncss.length + ' chars long';
    var compare = 'uncss is ' + 100*Math.floor((uncss.length / css.length)*1000)/(1000) + ' % smaller';

    var message = before + '\n' + after + '\n' + compare;

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