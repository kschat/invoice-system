import R from 'ramda';
import AppDispatcher from '../../application/appDispatcher';
import AppConstants from '../../application/appConstants';
import jobActions from '../jobActions';
import { EventEmitter } from 'events';

let _selected = null;

let _jobSaveStatus = null;

let _jobs = [];

const _idEq = R.propEq('id');

const _getById = R.converge(R.find, R.nAry(1, _idEq), R.flip(R.identity));

const _getIndexById = R.converge(
  R.findIndex,
  R.nAry(1, _idEq),
  R.flip(R.identity)
);

class JobStore extends EventEmitter {
  get jobs() { return _jobs; }

  get selectedJob() { return _selected; }

  get jobSaveStatus() { return _jobSaveStatus; }

  addChangeListener(callback) {
    this.on('change', callback);
  }

  removeChangeListener(callback) {
    this.removeListener('change', callback);
  }
}

const jobStore = new JobStore();

const actions = {
  [AppConstants.SELECT_JOB]: action => {
    _selected = _getById(action.data, _jobs);
  },

  [AppConstants.DELETE_JOB]: action => {
    _jobs = R.remove(_getIndexById(action.data, _jobs), 1, _jobs);
    _selected = null;
  },

  [AppConstants.UPDATE_JOB]: action => {
    _selected[action.data.prop] = action.data.value;
    actions[AppConstants.UPDATE_JOB_SUCCESS](action);
  },

  [AppConstants.UPDATE_TIME_ENTRY]: action => {
    const index = _getIndexById(action.data.id, _selected.entries);
    _selected.entries[index][action.data.prop] = action.data.value;
    actions[AppConstants.UPDATE_JOB_SUCCESS](action);
  },

  [AppConstants.UPDATE_JOB_SUCCESS]: action => {
    _jobSaveStatus = {
      status: 'success',
      message: 'Update successful'
    };
  },

  [AppConstants.RECEIVE_JOB_SUCCESS]: action => {
    _jobs = action.data;
  },

  default: () => true
};

AppDispatcher.register(payload => {
  const actionDelegate = actions[payload.action.actionType];

  if(!actionDelegate) {
    return actions.default();
  }

  actionDelegate(payload.action);

  jobStore.emit('change');
});

export default jobStore;
