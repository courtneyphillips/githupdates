var gulp = require('gulp');
var mocha = require('gulp-mocha');
var browserify = require('browserify');
var source = require('vinyl-source-stream');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
var utilities = require('gulp-util');
var del = require('del');
var jshint = require('gulp-jshint');
var browserSync = require('browser-sync').create();
var sass = require('gulp-sass');
var sourcemaps = require('gulp-sourcemaps');

var buildProduction = false;
if(utilities.env.production === true){
  buildProduction = true;
};

gulp.task('jshint', function(){
  return gulp.src(['js/*.js', 'test/*.js'])
  .pipe(jshint())
  .pipe(jshint.reporter('default'));
});

gulp.task('test', ['jshint'], function(){
  return gulp.src('test/ping-pong-tests.js')
  .pipe(mocha({reporter: 'nyan'}));
});

gulp.task('concatInterface', function(){
  return gulp.src('./js/*-interface.js')
  .pipe(concat('allConcat.js'))
  .pipe(gulp.dest('./tmp'));
});

gulp.task('jsBrowserify', ['concatInterface'], function(){
  return browserify({ entries: ['./tmp/allConcat.js']})
  .bundle()
  .pipe(source('app.js'))
  .pipe(gulp.dest('./build/js'));
});

gulp.task('minifyScripts', ['jsBrowserify'], function(){
  return gulp.src('./build/js/app.js')
  .pipe(uglify())
  .pipe(gulp.dest("./build/js"));
});

gulp.task("build", ["clean"], function(){
  if (buildProduction){
    gulp.start('minifyScripts');
  } else {
    gulp.start('jsBrowserify');
  }
});

gulp.task("clean", function(){
  return del(['build', 'tmp']);
});

gulp.task('watchJs', function(){
  gulp.watch(['js/*.js', 'test/*.js'], ['test', 'jsBrowserify']);
});

gulp.task('serve', function(){
  browserSync.init({
    server: {
      baseDir: "./",
      index: "index.html"
    }
  });
  gulp.watch(['js/*.js', 'test/*.js', 'index.html', 'weather.html'], ['js-reload']);
  gulp.watch('app/scss/*.scss', ['buildCSS']);
});

gulp.task('buildCSS', function(){
  return gulp.src('scss/*.scss')
  .pipe(sourcemaps.init())
  .pipe(sass())
  .pipe(sourcemaps.write())
  .pipe(gulp.dest('css'))
  .pipe(browserSync.stream());
});

gulp.task('js-reload', ['build'], browserSync.reload);

gulp.task('default', ['watchJs']);
