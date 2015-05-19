'use strict';

const R = require('ramda');
const Sequelize = require('sequelize');

const builder = R.memoize(function init(settings) {
  const schema = builder.schema = new Sequelize(
    settings.database,
    settings.username,
    settings.password,
    R.omit(['database', 'username'], settings)
  );

  schema.sync();
});

builder.schema = builder.schema || null;

builder.static = Sequelize;

module.exports = builder;
