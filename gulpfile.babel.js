import gulp from 'gulp';
import gutil from 'gulp-util';
import eslint from 'gulp-eslint';
import excludeGitignore from 'gulp-exclude-gitignore';
import babel from 'gulp-babel';
// import nsp from 'gulp-nsp';
import mocha from 'gulp-mocha';
import istanbul from 'gulp-istanbul';
import { Instrumenter } from 'isparta';

gulp.task('default', gulp.series(eslintCheck, compileGenerators, gulp.series(istanbulCover, mochaTest)));
gulp.task('prepublish', compileGenerators);
// gulp.task('prepublish', compileGenerators, nodeSecurityProject));

function eslintCheck() {
  return gulp.src('**/*.js')
    .pipe(excludeGitignore())
    .pipe(eslint())
    .pipe(eslint.format())
    .pipe(eslint.failAfterError());
}

function istanbulCover() {
  return gulp.src('src/**/*.js')
    .pipe(istanbul({
      includeUntested: true,
      instrumenter: Instrumenter
    }))
    .pipe(istanbul.hookRequire());
}

function mochaTest() {
  return gulp.src('test/**/*.js')
    .pipe(mocha({reporter: 'spec'}))
    .on('error', function errorHandler(err) {
      gutil.log(gutil.colors.red('[Mocha]'), err.toString());
      this.emit('end');
    })
    .pipe(istanbul.writeReports());
}

function compileGenerators() {
  return gulp.src('src/generators/**/*.js')
    .pipe(babel())
    .pipe(gulp.dest('generators/'));
}

// function nodeSecurityProject(cb) {
//   nsp('package.json', cb);
// }
