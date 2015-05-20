'use strict';

import React from 'react';
import R from 'ramda';
import ApplicationView from './components/application/views/application';
import appConstants from './components/application/appConstants';
import jobActions from './components/job/jobActions';
import jobApi from './components/job/jobApi';

const DOMReady = R.partial(window.addEventListener, 'DOMContentLoaded');

jobApi.getAllJobs()
  .then(jobs => new Promise(resolve => DOMReady(resolve(jobs))))
  .then(jobs => {
    jobActions.receiveJobs(jobs);
    React.render(<ApplicationView />, document.getElementById('content'));
  });
