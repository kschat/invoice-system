'use strict';

const sequelize = require('../lib/databaseHandler');
const R = require('ramda');

const types = sequelize.static;

const TimeEntry = sequelize.schema.define('TimeEntry', {
  id: {
    type: types.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  timeSpent: {
    type: types.INTEGER,
    field: 'time_spent',
    allowNull: false,
    validate: { isInt: true }
  },
  entryDate: {
    type: types.DATE,
    field: 'entry_date',
    allowNull: false,
    validate: { isDate: true }
  },
  workSummary: {
    type: types.TEXT,
    field: 'work_summary',
    allowNull: false,
    validate: { notEmpty: true }
  }
}, {
  tableName: 'time_entry'
});

// helpers

TimeEntry.validProperties = ['timeSpent', 'entryDate', 'workSummary'];

TimeEntry.sanitizeProperties = R.pick(TimeEntry.validProperties);

module.exports = TimeEntry;
