'use strict';

const R = require('ramda');
const TimeEntry = require('../models/timeEntry');
const Job = require('../models/job');

const getAll = function *(next) {
  this.body = yield TimeEntry.findAll();
};

const getOne = function *(next) {
  const id = this.params.id;
  const timeEntry = yield TimeEntry.findById(id);

  if(!timeEntry) { this.throw(404, `Time Entry "${id}" not found`); }

  this.body = timeEntry;
};

const create = function *(next) {
  const jobId = this.params.job_id;
  const job = yield Job.findById(jobId);

  if(!job) { this.throw(404, `Job "${jobId}" not found`); }

  const timeEntryInput = R.merge(
    TimeEntry.sanitizeProperties(this.request.body),
    { job_id: jobId }
  );

  try {
    const timeEntry = yield TimeEntry.create(timeEntryInput);

    this.status = 201;
    this.body = {
      id: timeEntry.id,
      message: `Time Entry "${timeEntry.id}" created successfully`
    };
  }
  catch(ex) {
    const status = ex.name === 'SequelizeValidationError'
      ? 400
      : 500;

    this.throw(status, ex);
  }
};

const update = function *(next) {
  const jobId = this.params.job_id;
  const timeEntryId = this.params.time_entry_id;
  const job = yield Job.findById(jobId);

  if(!job) { this.throw(404, `Job "${jobId}" not found`); }

  const timeEntry = yield TimeEntry.findById(timeEntryId);

  if(!timeEntry) { this.throw(404, `Time Entry "${timeEntryId}" not found`); }

  const timeEntryInput = R.merge(
    TimeEntry.sanitizeProperties(this.request.body),
    { job_id: jobId }
  );

  if(R.isEmptyObject(R.omit(['job_id'], timeEntryInput))) {
    this.throw(400, 'No valid arguments given');
  }

  try {
    yield timeEntry.update(timeEntryInput);
    this.status = 200;
    this.body = {
      id: timeEntry.id,
      message: `Time Entry "${timeEntry.id}" updated successfully`
    };
  }
  catch(ex) {
    const status = ex.name === 'SequelizeValidationError'
      ? 400
      : 500;

    this.throw(status, ex);
  }
};

const remove = function *(next) {
  const jobId = this.params.job_id;
  const timeEntryId = this.params.time_entry_id;
  const job = yield Job.findById(jobId);

  if(!job) { this.throw(404, `Job "${jobId}" not found`); }

  const timeEntry = yield TimeEntry.findById(timeEntryId);

  if(!timeEntry) { this.throw(404, `Time Entry "${timeEntryId}" not found`); }

  try {
    yield timeEntry.destroy();
    this.status = 200;
    this.body = {
      id: timeEntry.id,
      message: `Time Entry "${timeEntry.id}" deleted successfully`
    };
  }
  catch(ex) {
    const status = ex.name === 'SequelizeValidationError'
      ? 400
      : 500;

    this.throw(status, ex);
  }
};

module.exports = { getAll, getOne, create, update, remove };
