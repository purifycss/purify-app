// Used to proxy webpack bundles from webpack - dev - server to localhost
require("./register-babel");

var serve = require('koa-static');
var router = require('koa-router')();

var proxy = require('koa-proxy');
var bundle = require('./server/webpack.bundle');

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


// // Close the RethinkDB connection
// app.use(closeConnection);

// function* closeConnection(next) {
//     this._rdbConn.close();
// }

//INITIALIZE DATABASE
// r.connect(config.rethinkdb, function(err, conn) {
//     if (err) {
//         console.log("Could not open a connection to initialize the database");
//         console.log(err.message);
//         process.exit(1);
//     }

//     r.table('todos').indexWait('createdAt').run(conn).then(function(err, result) {
//         console.log("Table and index are available");
//     }).error(function(err) {
//         // The database/table/index was not available, create them
//         r.dbCreate(config.rethinkdb.db).run(conn).finally(function() {
//             return r.tableCreate('todos').run(conn)
//         }).finally(function() {
//             r.table('todos').indexCreate('createdAt').run(conn);
//         }).finally(function(result) {
//             r.table('todos').indexWait('createdAt').run(conn)
//         }).then(function(result) {
//             console.log("Table and index are available");
//             conn.close();
//         }).error(function(err) {
//             if (err) {
//                 console.log("Could not wait for the completion of the index `todos`");
//                 console.log(err);
//                 process.exit(1);
//             }
//             console.log("Table and index are available, starting koa...");
//             conn.close();
//         });
//     });
// });

/*
OPEN KOA CONNECTION
 */
var server = app.listen(port, function() {
  console.log('Listening on port %d', server.address().port);
});

// function startKoa() {
//     app.listen(config.koa.port);
//     console.log('Listening on port '+config.koa.port);
// }