'use strict';

const R = require('ramda');
const Job = require('../models/job');

const getAll = function *(next) {
  this.body = yield Job.findAllWithEntries();
};

const getOne = function *(next) {
  const id = this.params.id;
  const job = yield Job.findByIdWithEntries(id);

  if(!job) { this.throw(404, `Job "${id}" not found`); }

  this.body = job;
};

const create = function *(next) {
  const jobInput = Job.sanitizeProperties(this.request.body);

  try {
    const job = yield Job.create(jobInput);
    this.status = 201;
    this.body = { id: job.id, message: `Job "${job.id}" created successfully` };
  }
  catch(ex) {
    const status = ex.name === 'SequelizeValidationError'
      ? 400
      : 500;

    this.throw(status, ex);
  }
};

const update = function *(next) {
  const id = this.params.id;
  const jobInput = Job.sanitizeProperties(this.request.body);
  const job = yield Job.findById(id);

  if(!job) { this.throw(404, `Job "${id}" not found`); }

  if(R.isEmptyObject(jobInput)) { this.throw(400, 'No valid arguments given'); }

  try {
    const updatedJob = yield job.update(jobInput);
    this.body = { id, message: `Job "${id}" updated successfully` };
  }
  catch(ex) {
    const status = ex.name === 'SequelizeValidationError'
      ? 400
      : 500;

    this.throw(status, ex);
  }
};

const remove = function *(next) {
  const id = this.params.id;
  const job = yield Job.findById(id);

  if(!job) { this.throw(404, `Job "${id}" not found`); }

  try {
    const handle = yield job.destroy();
    this.body = { id, message: `Job "${id}" was deleted successfully` };
  }
  catch(ex) {
    this.throw(status, ex);
  }
};

module.exports = { getAll, getOne, create, update, remove };
