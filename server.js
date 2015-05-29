// Used to proxy webpack bundles from webpack - dev - server to localhost
require("./register-babel");

var serve = require('koa-static');
var router = require('koa-router')();

var proxy = require('koa-proxy');
var bundle = require('./server/webpack.bundle');

var co = require('co');

var r = require('rethinkdbdash')();
var config = require('./server/rethink.config.js');

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
router.all('/build/*',proxy({
  url: 'http://localhost:8080/build/bundle.js'
}));

/*
DATABASE
 */
//INITIALIZE DATABASE
co(function *() {
  try {
    console.log('Initializing database...');

    yield r.dbCreate("purify").run();
    yield r.db("purify").tableCreate("urls").run();
    yield r.db("purify").table("urls")
                       .indexCreate("url").run();
    console.log('Database created on port 8080');
  }
  catch (err) {
    if (err.message.indexOf("already exists") == -1)
      console.log(err.message);
  }
});

// router.get('/api/get', get);
// router.put('/api/new', create);
// // router.post('/api/update', update);
// // router.post('/api/delete', del);

// function* get(next) {
//     try{
//         var cursor = yield r.table('todos').orderBy({index: "createdAt"}).run(this._rdbConn);
//         var result = yield cursor.toArray();
//         this.body = JSON.stringify(result);
//     }
//     catch(e) {
//         this.status = 500;
//         this.body = e.message || http.STATUS_CODES[this.status];
//     }
//     yield next;
// }

// function* create(next) {
//     try{
//         // Parse the POST data
//         var todo = yield parse(this);
//         todo.createdAt = r.now(); // Set the field `createdAt` to the current time

//         // Insert a new Todo
//         var result = yield r.table('todos').insert(todo, {returnChanges: true}).run(this._rdbConn);

//         todo = result.new_val; // todo now contains the previous todo + a field `id` and `createdAt`
//         this.body = JSON.stringify(todo);
//     }
//     catch(e) {
//         this.status = 500;
//         this.body = e.message || http.STATUS_CODES[this.status];
//     }
//     yield next;
// }



/*
OPEN KOA CONNECTION
 */
var server = app.listen(port, function() {
  console.log('Listening on port %d', server.address().port);
});
