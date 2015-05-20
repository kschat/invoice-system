'use strict';

import request from '../common/request';
import R from 'ramda';


const postDefaults = R.assocPath(['body'], R.__, { body: null, method: 'POST', status: 201 });

const addTimeEntryUrlBuilder = R.partialRight(
  ''.concat.bind('/api/job/'),
  '/time_entry'
);

const getAll = R.partial(request, '/api/job');

const add = R.compose(R.partial(request, '/api/job'), postDefaults);

const remove = R.useWith(
  R.partialRight(request, { method: 'DELETE', body: {} }),
  ''.concat.bind('/api/job/')
);

const addTimeEntry = R.useWith(request, addTimeEntryUrlBuilder, postDefaults);

export default { getAll, add, remove, addTimeEntry };
