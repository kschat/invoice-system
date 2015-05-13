'use strict';

let settings = require('../config/settings.json')
  , schema = require('../lib/databaseSchema')(settings.dataStore);

module.exports = schema.define('TimeEntry', {
  id: { type: Number, unique: true },
  time_spent: { type: Number },
  entry_date: { type: Date, default: Date.now },
  work_summary: { type: String }
}, {
  table: 'time_entry'
});
