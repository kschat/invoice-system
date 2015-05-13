'use strict';

var koa = require('koa')
  , hbs = require('koa-handlebars')

  , app = koa();

app.use(hbs({
  cache: app.env !== 'development',
  viewsDir: 'views',
  layoutsDir: 'views/layouts',
  partialsDir: 'views/partials',
  defaultLayout: 'main',
  helpers: require('./lib/helpers')
}));

app.use(function *() {
  yield this.render('home');
});

app.listen(3000);
