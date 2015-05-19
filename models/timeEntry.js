'use strict';

const sequelize = require('../lib/databaseHandler');
const types = sequelize.static;

const TimeEntry = sequelize.schema.define('TimeEntry', {
  id: {
    type: types.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  timeSpent: {
    type: types.INTEGER,
    field: 'time_spent'
  },
  entryDate: {
    type: types.DATE,
    field: 'entry_date'
  },
  workSummary: {
    type: types.TEXT,
    field: 'work_summary'
  }
}, {
  tableName: 'time_entry'
});

module.exports = TimeEntry;
