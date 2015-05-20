'use strict';

const gulp = require('gulp')
const utils = require('gulp-util')
const concat = require('gulp-concat')
const stylus = require('gulp-stylus')
const nodemon = require('gulp-nodemon')
const shell = require('gulp-shell')
const webpack = require('webpack')
const webpackConfig = require('./webpack.config')
const nib = require('nib')
const fs = require('fs')

const webpackCompiler = webpack(webpackConfig)
const paths = {
  stylus: './public/stylus/',
  scripts: './public/js/',
  dist: './dist/'
};

gulp.task('stylus', function() {
  gulp.src(paths.stylus + 'main.styl')
    .pipe(stylus({
      use: nib(),
      linenos: true
    }))
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

gulp.task('test', shell.task(['npm test']));

gulp.task('watch:test', function() {
  gulp.watch(paths.scripts + '**/*', ['test']);
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
    env: { NODE_ENV: 'development' },
    "execMap": {
      "js": "iojs"
    }
  });
});

gulp.task('run', ['watch', 'daemon']);
gulp.task('default', ['run']);
