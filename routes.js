'use strict';

let router = require('koa-router')()
  , home = require('./handlers/home');

router.get('/', home.index);

module.exports = router;
