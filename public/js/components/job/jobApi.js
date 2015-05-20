'use strict';

import request from '../common/request';
import R from 'ramda';

const getAllJobs = R.partial(request, '/api/job');

export default { getAllJobs };
