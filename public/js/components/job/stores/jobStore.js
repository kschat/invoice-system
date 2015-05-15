'use strict';

import AppDispatcher from '../../application/appDispatcher';
import AppConstants from '../../application/appConstants';
import { EventEmitter } from 'events';

let _selected = null;

let _jobs = [
  { title: 'testing 1', id: 1, body: 'My first job' },
  { title: 'testing 2', id: 2, body: 'My second job' }
];

let _setSelected = selected => {
  _selected = _jobs.filter(job => job.id === selected)[0];
};

class JobStore extends EventEmitter {
  get jobs() { return _jobs; }

  get selectedJob() { return _selected; }

  addChangeListener(callback) {
    this.on('change', callback);
  }

  removeChangeListener(callback) {
    this.removeListener('change', callback);
  }
}

let jobStore = new JobStore();

AppDispatcher.register(function(payload) {
  let action = payload.action;

  switch(action.actionType) {
    case AppConstants.SELECT_JOB:
      _setSelected(action.data);
      break;
    default:
      return true;
  }

  jobStore.emit('change');

  return true;
});

export default jobStore;
