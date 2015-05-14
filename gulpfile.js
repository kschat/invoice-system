'use strict';

let gulp = require('gulp')
  , utils = require('gulp-util')
  , concat = require('gulp-concat')
  , stylus = require('gulp-stylus')
  , nodemon = require('gulp-nodemon')
  , webpack = require('webpack')
  , webpackConfig = require('./webpack.config')
  , nib = require('nib')
  , fs = require('fs')

  , webpackCompiler = webpack(webpackConfig)
  , paths = {
      stylus: './public/stylus/',
      scripts: './public/js/',
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

gulp.task('scripts', function(cb) {
  webpackCompiler.run(function(err, stats) {
    if(err) { throw new utils.PluginError('webpack', err); }

    console.log(stats.toString({
      colors: utils.colors.supportsColor
    }));

    cb();
  });
});

gulp.task('watch', function() {
  gulp.watch(paths.stylus + '**/*', ['stylus']);
  gulp.watch(paths.scripts + '**/*', ['scripts']);
});

gulp.task('daemon', function() {
  nodemon({
    script: 'app.js',
    ext: 'js json',
    ignore: ['node_modules/**', 'public/**', 'dist/**'],
    env: { NODE_ENV: 'development' }
  });
});

gulp.task('run', ['watch', 'daemon']);
gulp.task('default', ['run']);
