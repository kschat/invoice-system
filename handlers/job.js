'use strict';

const Job = require('../models/job');

const getAll = function *(next) {
  const jobs = yield Job.findAllWithEntries();
  this.body = jobs;
};

const getOne = function *(next) {
  const job = yield Job.findByIdWithEntries(this.params.id);

  if(!job) { this.throw(404, 'Job not found'); }

  this.body = job;
};

module.exports = { getAll, getOne };
