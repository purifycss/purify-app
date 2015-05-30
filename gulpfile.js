/**
 * Gulpfile
 */
var gulp = require("gulp");

var eslint = require("gulp-eslint");
var jscs = require("gulp-jscs");
var mdox = require("gulp-mdox");

var nodemon = require('gulp-nodemon');
var mocha = require('gulp-mocha-co');
var exit = require('gulp-exit');


// ----------------------------------------------------------------------------
// Constants
// ----------------------------------------------------------------------------
var JS_FILES = [
  "app/*.js",
  "server/*.js",
  "*.js"
];

// ----------------------------------------------------------------------------
// EsLint
// ----------------------------------------------------------------------------
gulp.task("eslint", function () {
  return gulp
    .src(JS_FILES)
    .pipe(eslint())
    .pipe(eslint.formatEach("stylish", process.stderr))
    .pipe(eslint.failOnError());
});

// ----------------------------------------------------------------------------
// JsCs
// ----------------------------------------------------------------------------
gulp.task("jscs", function () {
  return gulp
    .src(JS_FILES)
    .pipe(jscs());
});

// ----------------------------------------------------------------------------
// API TEST
// ----------------------------------------------------------------------------
gulp.task('nodemon', function() {
  nodemon({
    script: 'server.js',
    env: {PORT: 8000},
    nodeArgs: ['--harmony']
  }).on('restart');
})


gulp.task('test-endpoint', function(){
  gulp.src(['test/*.js'])
    .pipe(mocha({
      reporter: 'nyan'
    }))
    .pipe(exit());
});


// ----------------------------------------------------------------------------
// Quality
// ----------------------------------------------------------------------------
gulp.task('server', ['test-endpoint']);
gulp.task("check", ["jscs", "eslint"]);
gulp.task("check:ci", ["jscs", "eslint"]);
gulp.task("check:all", ["jscs", "eslint"]);

// ----------------------------------------------------------------------------
// Docs
// ----------------------------------------------------------------------------
// gulp.task("docs", function () {
//   return gulp
//     .src([
//       "lib/**/*.js"
//     ])
//     .pipe(mdox({
//       src: "./README.md",
//       name: "README.md",
//       start: "## Plugins",
//       end: "## Contributions"
//     }))
//     .pipe(gulp.dest("./"));
// });

// ----------------------------------------------------------------------------
// Aggregations
// ----------------------------------------------------------------------------
gulp.task('default', ['nodemon']);