'use strict';

import Promise from 'Promise';
import R from 'ramda';

let getJobs = R.composeP(
  Promise.resolve,
  JSON.parse,
  localStorage.getItem.bind(localStorage, 'jobs')
);

export default { getJobs };
