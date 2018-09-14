'use strict';

// *************************
//
// Run 'gulp' to watch directory for changes for images, fonts icons, Sass, etc.
// Or for full site testing run 'gulp test'
//
// *************************


// Include gulp.
const gulp = require('gulp');

// Include plug-ins.
const imagemin = require('gulp-imagemin');
const uglify = require('gulp-uglify');
const plumber = require('gulp-plumber'); // For error handling.
const gutil = require('gulp-util'); // For error handling.
const prefix        = require('gulp-autoprefixer');
const modernizr = require('gulp-modernizr');
const cleanCSS      = require('gulp-clean-css');
const clean         = require('gulp-clean');
const sass          = require('gulp-sass');

// ********************************************************************************************************************************************


// Error Handling to stop file watching from dying on an error (ie: Sass compiling).
var onError = function(err) {
  gutil.beep();
  console.log(err);
};


// JS minify.
gulp.task('scripts', function() {

  // gulp.src('node_modules/jquery/dist/jquery.min.js')
  //     .pipe(plumber({
  //       errorHandler: onError
  //     }))
  //     .pipe(gulp.dest('./vendors/js/'));

  return gulp.src('./src/js/**/*.js')
      .pipe(plumber({
        errorHandler: onError
      }))
      .pipe(uglify())
      // .pipe(rename({ extname: '.min.js' }))
      .pipe(gulp.dest('./build/js/'));
});


// Modernizr
gulp.task('modernizr', function() {
  gulp.src('./src/js/**/*.js')
      .pipe(modernizr())
      .pipe(gulp.dest('./build/js/'))
});


// Optimise images.
gulp.task('images', function() {
  return gulp.src('./src/img/**/*')
      .pipe(imagemin({
        optimizationLevel: 3,
        progressive: true,
        interlaced: true,
      }))
      .pipe(gulp.dest('./build/img'))
});


/**
 * @task sass
 * Compile files from scss
 */
gulp.task('styles', function () {

  /**
   * Match bootstrap upstream requirements.
   * @type Array
   */
  var prefixOptions = [
    "Android >= 5",
    "Chrome >= 49",
    "Firefox >= 35",
    "Explorer >= 10",
    "iOS >= 10",
    "Opera >= 40",
    "Safari >= 10"
  ];

  // gulp.src('node_modules/jquery.mmenu/dist/jquery.mmenu.all.css')
  //     .pipe(plumber({
  //       errorHandler: onError
  //     }))
  //     .pipe(gulp.dest('./css/'));

  return gulp.src('src/sass/**/*.scss') // the source .scss file
      .pipe(sass().on('error', sass.logError))
      .pipe(prefix({ browsers: prefixOptions, cascade: true })) // pass the file through autoprefixer
      .pipe(cleanCSS())
      .pipe(gulp.dest('./build/css/'))
  // .pipe(browserSync.stream()); // output .css file to css folder
});


// ********************************************************************************************************************************************


// Default gulp task.
gulp.task('default', ['images', 'scripts', 'modernizr', 'styles']);


// Watch changes.
gulp.task('watch', ['images', 'scripts', 'modernizr', 'styles'], function() {
  // Watch for img optim changes.
  gulp.watch('./src/img/**', function() {
    gulp.start('images');
  });
  // Watch for JS changes.
  gulp.watch('./src/js/**/*.js', function() {
    gulp.start('scripts');
  });
  // Watch for Sass changes.
  gulp.watch('./src/sass/**/*.scss', function() {
    gulp.start('styles');
  });
});
