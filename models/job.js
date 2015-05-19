'use strict';

const sequelize = require('../lib/databaseHandler');
const types = sequelize.static;
const TimeEntry = require('./timeEntry');
const R = require('ramda');

const includEntries = {
  include: [
    { all: true }
  ]
};

const validFields = {
  fields: ['title', 'hourlyRate', 'taxRate']
};

const findByIdQuery = R.assocPath(
  ['where', 'id'],
  R.__,
  R.merge({ where: { id: null } }, includEntries)
);

const updateByIdQuery = R.assocPath(
  ['where', 'id'],
  R.__,
  R.merge({ where: { id: null } }, validFields)
);

const Job = sequelize.schema.define('Job', {
  id: {
    type: types.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    allowNull: false
  },
  title: {
    type: types.TEXT,
    allowNull: false,
    validate: { notEmpty: true }
  },
  hourlyRate: {
    type: types.DECIMAL(12, 2),
    field: 'hourly_rate',
    allowNull: false,
    validate: { isDecimal: true }
  },
  taxRate: {
    type: types.DECIMAL(5, 5),
    field: 'tax_rate',
    allowNull: false,
    validate: { isDecimal: true }
  }
}, {
  tableName: 'job'
});

Job.hasMany(TimeEntry, { as: 'entries', foreignKey: 'job_id' });

Job.findAllWithEntries = R.partial(Job.findAll, includEntries);

Job.findByIdWithEntries = R.compose(Job.findOne, findByIdQuery);

Job.updateById = R.converge(Job.update, R.identity, R.flip(updateByIdQuery));

module.exports = Job;
