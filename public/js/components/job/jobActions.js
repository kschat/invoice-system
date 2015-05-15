'use strict';

import AppDispatcher from '../application/appDispatcher';
import AppConstants from '../application/appConstants';

const JobActions = {
  selectJob(data) {
    AppDispatcher.handleAction({
      actionType: AppConstants.SELECT_JOB,
      data
    });
  }
}

export default JobActions;
