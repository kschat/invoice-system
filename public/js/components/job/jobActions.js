import AppDispatcher from '../application/appDispatcher';
import AppConstants from '../application/appConstants';

const JobActions = {
  selectJob(data) {
    AppDispatcher.handleAction({
      actionType: AppConstants.SELECT_JOB,
      data
    });
  },

  deleteJob(data) {
    AppDispatcher.handleAction({
      actionType: AppConstants.DELETE_JOB,
      data
    });
  },

  updateJob(data) {
    AppDispatcher.handleAction({
      actionType: AppConstants.UPDATE_JOB,
      data
    });
  },

  updateEntry(data) {
    AppDispatcher.handleAction({
      actionType: AppConstants.UPDATE_TIME_ENTRY,
      data
    });
  },

  updateJobSuccess(data) {
    AppDispatcher.handleAction({
      actionType: AppConstants.UPDATE_JOB_SUCCESS,
      data
    });
  },

  receiveJobs(data) {
    AppDispatcher.handleAction({
      actionType: AppConstants.RECEIVE_JOB_SUCCESS,
      data
    });
  }
}

export default JobActions;
