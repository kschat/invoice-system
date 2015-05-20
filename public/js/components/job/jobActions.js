import AppDispatcher from '../application/appDispatcher';
import AppConstants from '../application/appConstants';

const handleActionBuilder = actionType => {
  return data => AppDispatcher.handleAction({ actionType, data });
};

const JobActions = {
  selectJob: handleActionBuilder(AppConstants.SELECT_JOB),

  deleteJob: handleActionBuilder(AppConstants.DELETE_JOB),

  updateJob: handleActionBuilder(AppConstants.UPDATE_JOB),

  updateEntry: handleActionBuilder(AppConstants.UPDATE_TIME_ENTRY),

  updateJobSuccess: handleActionBuilder(AppConstants.UPDATE_JOB_SUCCESS),

  receiveJobs: handleActionBuilder(AppConstants.RECEIVE_JOB_SUCCESS),

  addJob: handleActionBuilder(AppConstants.ADD_JOB),

  addJobSuccess: handleActionBuilder(AppConstants.ADD_JOB_SUCCESS),

  addTimeEntry: handleActionBuilder(AppConstants.ADD_TIME_ENTRY)
}

export default JobActions;
