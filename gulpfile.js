var gulp = require('gulp');
var jshint = require('gulp-jshint');
var concat = require('gulp-concat');
var browserify = require('browserify');
var browserSync = require('browser-sync').create();

gulp.task('concatInterface', function(){
  return gulp.src(['./js/browser.js', './js/*-interface.js'])
    .pipe(concat('allConcat.js'))
    .pipe(gulp.dest('./tmp'));
});

gulp.task('jsBrowserify', ['concatInterface'], function(){
  return browserify({ entries: ['./tmp/allConcat.js'] })
  .bundle()
  .pipe(source('app.js'))
  .pipe(gulp.dest('./build/js'));
});

gulp.task('jshint', function(){
  return gulp.src(['js/*.js'])
  .pipe(jshint())
  .pipe(jshint.reporter('default'));
});

gulp.task('serve', function(){
  browserSync.init({
    server: {
      baseDir: './',
      index: 'index.html'
    }
  });
  gulp.watch(['js/*.js'], ['jsBuild']);
});
