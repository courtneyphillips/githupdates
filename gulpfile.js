var jshint = require('gulp-jshint');
var concat = require('gulp-concat');
var browserify = require('browserify');

gulp.task('concatInterface', function(){
  return gulp.src(['./js/browser.js', './js/*-interface.js'])
    .pipe(concat('allConcat.js'))
    .pipe(gulp.dest('./tmp'));
});

gulp.task('jsBrowserify'j, ['concatInterface'], function(){
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
