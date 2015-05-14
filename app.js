'use strict';

let koa = require('koa')
  , hbs = require('koa-handlebars')
  , serve = require('koa-static')
  , R = require('ramda')

  , settings = require('./config/settings')
  , schema = require('./lib/databaseSchema')(settings.dataStore)
  , handlebarsSettings = R.merge(settings.viewEngine, R.__)
  , app = koa();

app.use(hbs(handlebarsSettings({
  cache: app.env !== 'development',
  helpers: require('./lib/helpers')
})));

app.use(serve('./dist'));
app.use(serve('./public'));
app.use(require('./routes').routes());

app.listen(settings.port || 3000);
