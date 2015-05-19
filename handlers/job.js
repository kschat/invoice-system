'use strict';

const Job = require('../models/job');
const R = require('ramda');

const validJobProperties = ['title', 'hourlyRate', 'taxRate'];
const validateJobProperties = R.pick(validJobProperties);

const getAll = function *(next) {
  const jobs = yield Job.findAllWithEntries();
  this.body = jobs;
};

const getOne = function *(next) {
  const job = yield Job.findByIdWithEntries(this.params.id);

  if(!job) { this.throw(404, 'Job not found'); }

  this.body = job;
};

const create = function *(next) {
  const jobInput = validateJobProperties(this.request.body);

  try {
    const job = yield Job.create(jobInput);
    this.status = 201;
    this.body = { id: job.id, message: 'Job created successfully' };
  }
  catch(ex) {
    const status = ex.name === 'SequelizeValidationError'
      ? 400
      : 500;

    this.throw(status, ex);
  }
};

const update = function *(next) {
  const jobInput = validateJobProperties(this.request.body);
  const job = yield Job.findByIdWithEntries(this.params.id);

  if(!job) { this.throw(404, 'Job not found') }

  try {
    const updatedJob = yield Job.updateById(jobInput, this.params.id);
    this.body = { id: updatedJob.id, message: 'Job updated successfully' };
  }
  catch(ex) {
    const status = ex.name === 'SequelizeValidationError'
      ? 400
      : 500;

    this.throw(status, ex);
  }
};

module.exports = { getAll, getOne, create, update };
