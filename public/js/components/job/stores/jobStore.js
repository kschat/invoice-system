import R from 'ramda';
import AppDispatcher from '../../application/appDispatcher';
import AppConstants from '../../application/appConstants';
import jobActions from '../jobActions';
import { EventEmitter } from 'events';

let _selected = null;

let _jobSaveStatus = null;

let _jobs = [
  {
    title: 'testing 1',
    id: 0,
    hourlyRate: '$25.00',
    taxRate: 0.07,
    entries: [
      {
        id: 0,
        timeSpent: 60,
        entryDate: Date.now(),
        workSummary: 'I did some work'
      },
      {
        id: 1,
        timeSpent: 120,
        entryDate: Date.now(),
        workSummary: 'I did other some work'
      }
    ]
  },
  {
    title: 'testing 2',
    id: 1,
    hourlyRate: '$15.00',
    taxRate: 0.10,
    entries: []
  },
];

const _idEq = R.propEq('id');

const _getJobById = R.compose(R.find(R.__, _jobs), _idEq);

const _getJobIndexById = R.compose(R.findIndex(R.__, _jobs), _idEq);

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
    _selected = _getJobById(action.data);
  },

  [AppConstants.DELETE_JOB]: action => {
    _jobs = R.remove(R.findIndex(_idEq(action.data), _jobs), 1, _jobs);
    _selected = null;
  },

  [AppConstants.UPDATE_JOB]: action => {
    _selected[action.data.prop] = action.data.value;
    actions[AppConstants.UPDATE_JOB_SUCCESS](action);
  },

  [AppConstants.UPDATE_TIME_ENTRY]: action => {
    const index = R.findIndex(_idEq(action.data.id), _selected.entries);
    _selected.entries[index][action.data.prop] = action.data.value;
    actions[AppConstants.UPDATE_JOB_SUCCESS](action);
  },

  [AppConstants.UPDATE_JOB_SUCCESS]: action => {
    _jobSaveStatus = {
      status: 'success',
      message: 'Update successful'
    };
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
