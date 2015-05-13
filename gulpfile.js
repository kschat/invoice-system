'use strict';

let gulp = require('gulp')
  , concat = require('gulp-concat')
  , stylus = require('gulp-stylus')
  , nib = require('nib')
  , fs = require('fs')

  , paths = {
      stylus: './public/stylus/',
      dist: './dist/'
    };

gulp.task('stylus', ['stylus:libs'], function() {
  gulp.src(paths.stylus + 'main.styl')
    .pipe(stylus({
      use: nib(),
      linenos: true
    }))
    .pipe(gulp.dest(paths.dist + 'css'));
});

gulp.task('stylus:libs', function() {
  if(fs.existsSync(paths.dist + 'css/libs.css')) { return; }

  gulp.src(paths.stylus + 'libs.styl')
    .pipe(stylus({ 'include css': true }))
    .pipe(concat('libs.css'))
    .pipe(gulp.dest(paths.dist + 'css'));
});
