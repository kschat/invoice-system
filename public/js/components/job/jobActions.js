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
  }
}

export default JobActions;
