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

const findByIdQuery = R.assocPath(
  ['where', 'id'],
  R.__,
  R.merge({ where: { id: null } }, includEntries)
);

const Job = sequelize.schema.define('Job', {
  id: {
    type: types.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  title: types.TEXT,
  hourlyRate: {
    type: types.DECIMAL(12, 2),
    field: 'hourly_rate'
  },
  taxRate: {
    type: types.DECIMAL(5, 5),
    field: 'tax_rate'
  }
}, {
  tableName: 'job'
});

Job.hasMany(TimeEntry, { as: 'entries', foreignKey: 'job_id' });

Job.findAllWithEntries = R.partial(Job.findAll, includEntries);

Job.findByIdWithEntries = R.compose(Job.findOne, findByIdQuery);

module.exports = Job;
