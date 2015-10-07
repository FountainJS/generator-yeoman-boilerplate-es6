import gulp from 'gulp';
import gutil from 'gulp-util';
import eslint from 'gulp-eslint';
import excludeGitignore from 'gulp-exclude-gitignore';
import babel from 'gulp-babel';
import nsp from 'gulp-nsp';
import mocha from 'gulp-mocha';
import istanbul from 'gulp-istanbul';
import { Instrumenter } from 'isparta';

gulp.task('static', () => {
  return gulp.src('src/**/*.js')
    .pipe(excludeGitignore())
    .pipe(eslint())
    .pipe(eslint.format())
    .pipe(eslint.failAfterError());
});

gulp.task('nsp', cb => {
  nsp('package.json', cb);
});

gulp.task('pre-test', () => {
  return gulp.src('src/**/*.js')
    .pipe(istanbul({
      includeUntested: true,
      instrumenter: Instrumenter
    }))
    .pipe(istanbul.hookRequire());
});

gulp.task('test', ['pre-test'], () => {
  return gulp.src('test/**/*.js')
    .pipe(mocha({reporter: 'spec'}))
    .on('error', function errorHandler(err) {
      gutil.log(gutil.colors.red('[Mocha]'), err.toString());
      this.emit('end');
    })
    .pipe(istanbul.writeReports());
});

gulp.task('babel', () => {
  return gulp.src(['src/index.js', 'src/generators/*/*.js'])
    .pipe(babel())
    .pipe(gulp.dest('generators/'));
});

// gulp.task('prepublish', ['nsp', 'babel']);
gulp.task('prepublish', ['babel']);
gulp.task('default', ['static', 'test']);
