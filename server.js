//Require hook to compile all subsequent .js files to es6
require("./register-babel");

// Used to proxy webpack bundles from webpack - dev - server to localhost
var serve = require('koa-static');
var router = require('koa-router')();

var proxy = require('koa-proxy');
var bundle = require('./server/webpack.bundle');

var co = require('co');

var config = require('./config/rethink.js');
var r = require('rethinkdbdash')(config.rethinkdb);

var koa = require('koa');
var app = koa();

var port = 3000;

/*
ROUTING
 */
// serve static index.html
app.use(serve(__dirname));

//mount router
app.use(router.routes());

//start webpack bundling process
bundle();

//route localhost:3000 request to localhost:8080 to fetch
//latest bundle
router.all('/build/*', proxy({
  url: 'http://localhost:8080/build/bundle.js'
}));

/*
RETHINKDB
 */
//Initialize database
co(function*() {
  try {
    console.log('Initializing database...');

    var name = 'purify';

    yield r.dbCreate(name).run();
    console.log('Database `purify` created');

    yield r.db(name).tableCreate("urls").run();
    console.log('Table `urls` created');

    yield r.db(name).table("urls")
      .indexCreate("url").run();

    console.log('Database created on port 8080');
  } catch (err) {
    if (err.message.indexOf("already exists") !== -1)
      console.log(err.message);
  }
});

router.get('/api/get', get);
router.post('/api/update', update);

function* get(next) {
  try {
    this.body =
      yield r.db("purify").table("urls").run();
  } catch (err) {
    this.status = 500;
    this.body = err.message || http.STATUS_CODES[this.status];
  }
  yield next;
}

function* update(next) {
  try {
    // Parse the POST data
    var url =
      yield parse(this);

    // Insert a new Todo
    this.body = yield r.db("purify").table('urls').insert({'url':url}).run();

    console.log('succesfully inserted');
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