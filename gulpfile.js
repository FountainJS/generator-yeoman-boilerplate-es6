var gulp = require('gulp');
var gutil = require('gulp-util');
var eslint = require('gulp-eslint');
var excludeGitignore = require('gulp-exclude-gitignore');
var babel = require('gulp-babel');
var nsp = require('gulp-nsp');
var mocha = require('gulp-mocha');
var istanbul = require('gulp-istanbul');
var isparta = require('isparta');

// Initialize the babel transpiler so ES2015 files gets compiled
// when they're loaded
require('babel-core/register');

gulp.task('static', function () {
  return gulp.src('src/**/*.js')
    .pipe(excludeGitignore())
    .pipe(eslint())
    .pipe(eslint.format())
    .pipe(eslint.failAfterError());
});

gulp.task('nsp', function (cb) {
  nsp('package.json', cb);
});

gulp.task('pre-test', function () {
  return gulp.src('src/**/*.js')
    .pipe(istanbul({
      includeUntested: true,
      instrumenter: isparta.Instrumenter
    }))
    .pipe(istanbul.hookRequire());
});

gulp.task('test', ['pre-test'], function () {

  return gulp.src('test/**/*.js')
    .pipe(mocha({reporter: 'spec'}))
    .on('error', function errorHandler(err) {
      gutil.log(gutil.colors.red('[Mocha]'), err.toString());
      this.emit('end');
    })
    .pipe(istanbul.writeReports());
});

gulp.task('babel', function () {
  return gulp.src(['src/index.js', 'src/generators/*/*.js'])
    .pipe(babel())
    .pipe(gulp.dest('generators/'));
});

// gulp.task('prepublish', ['nsp', 'babel']);
gulp.task('prepublish', ['babel']);
gulp.task('default', ['static', 'test']);
