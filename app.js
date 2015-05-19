'use strict';

const koa = require('koa');
const hbs = require('koa-handlebars');
const serve = require('koa-static');
const bodyParser = require('koa-bodyparser');
const R = require('ramda');

const settings = require('./config/settings');
const schema = require('./lib/databaseHandler')(settings.dataStore);
const routes = require('./routes');

const handlebarsSettings = R.merge(settings.viewEngine, R.__);
const app = koa();

const appUseRoute = R.compose(app.use.bind(app), R.invoke('routes', []));

app.use(hbs(handlebarsSettings({
  cache: app.env !== 'development',
  helpers: require('./lib/helpers')
})));

app.use(serve('./dist'));
app.use(serve('./public'));
app.use(bodyParser());

routes.map(appUseRoute);

app.listen(settings.port || 3000);
