'use strict';

let koa = require('koa')
  , hbs = require('koa-handlebars')
  , serve = require('koa-static')

  , app = koa();

app.use(hbs({
  cache: app.env !== 'development',
  viewsDir: 'views',
  layoutsDir: 'views/layouts',
  partialsDir: 'views/partials',
  defaultLayout: 'main',
  helpers: require('./lib/helpers')
}));

app.use(serve('./dist'));
app.use(serve('./public'));
app.use(require('./routes').routes());

app.listen(3000);
