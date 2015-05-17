import R from 'ramda';
import AppDispatcher from '../../application/appDispatcher';
import AppConstants from '../../application/appConstants';
import { EventEmitter } from 'events';

let _selected = null;

let _jobs = [
  { title: 'testing 1', id: 1, body: 'My first job' },
  { title: 'testing 2', id: 2, body: 'My second job' }
];

const _idEq = R.propEq('id');

const _getJobById = R.compose(R.find(R.__, _jobs), _idEq);

const _getJobIndexById = R.compose(R.findIndex(R.__, _jobs), _idEq);

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

const jobStore = new JobStore();

AppDispatcher.register(payload => {
  const action = payload.action;

  switch(action.actionType) {
    case AppConstants.SELECT_JOB:
      _selected = _getJobById(action.data);
      break;
    case AppConstants.DELETE_JOB:
      _jobs = R.remove(R.findIndex(_idEq(action.data), _jobs), 1, _jobs);
      _selected = null;
      break;
    default:
      return true;
  }

  jobStore.emit('change');

  return true;
});

export default jobStore;
