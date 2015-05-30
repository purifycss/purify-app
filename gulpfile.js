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

var jest = require('jest-cli');


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
// API Test
// ----------------------------------------------------------------------------
gulp.task('nodemon', function() {
  nodemon({
    script: 'server.js',
    env: {PORT: 8000},
    nodeArgs: ['--harmony']
  }).on('restart');
})


gulp.task('endpoint', function(){
  gulp.src(['test/server/*.js'])
    .pipe(mocha({
      reporter: 'nyan'
    }))
});

// ----------------------------------------------------------------------------
// Jest
// ----------------------------------------------------------------------------

gulp.task('jest', function (callback) {
  var onComplete = function (result) {
    if (result) {
    } else {
      console.log('!!! Jest tests failed! You should fix them soon. !!!');
    }
    callback();
  }
  jest.runCLI({}, __dirname, onComplete);
});


// ----------------------------------------------------------------------------
// Quality
// ----------------------------------------------------------------------------
gulp.task("style", ["jscs", "eslint"]);
gulp.task("style:ci", ["jscs", "eslint"]);
gulp.task("style:all", ["jscs", "eslint"]);

// ----------------------------------------------------------------------------
// Testing
// ----------------------------------------------------------------------------
gulp.task('test:client', ['jest']);
gulp.task('test:server', ['endpoint']);
gulp.task('test', ['jest','endpoint']);



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