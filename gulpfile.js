var gulp = require('gulp');
var eslint = require('gulp-eslint');
var babel = require('gulp-babel');
var nsp = require('gulp-nsp');
var excludeGitignore = require('gulp-exclude-gitignore');

gulp.task('static', function () {
  return gulp.src('**/*.js')
    .pipe(excludeGitignore())
    .pipe(eslint())
    .pipe(eslint.format())
    .pipe(eslint.failAfterError());
});

gulp.task('nsp', function (cb) {
  nsp('package.json', cb);
});

gulp.task('babel', function () {
  return gulp.src(['src/index.js', 'src/generators/*/*.js'])
    .pipe(babel())
    .pipe(gulp.dest('generators/'));
});

// gulp.task('prepublish', ['nsp', 'babel']);
gulp.task('prepublish', ['babel']);
gulp.task('default', ['static']);
