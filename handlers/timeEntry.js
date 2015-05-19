'use strict';

const TimeEntry = require('../models/job');

const getAll = function *(next) {
  const timeEntries = yield TimeEntry.findAll();
  this.body = timeEntries;
};

const getOne = function *(next) {
  const timeEntry = yield TimeEntry.findById(this.params.id);

  if(!timeEntry) { this.throw(404, 'Time Entry not found'); }

  this.body = timeEntry;
};

module.exports = { getAll, getOne };
