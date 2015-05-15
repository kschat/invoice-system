'use strict';

import React from 'react';
import JobList from './jobList';
import JobInfo from './jobInfo';

class JobContainer extends React.Component {
  render() {
    return (
      <div className="row">
        <div className="col-xs-4">
          <JobList jobs={this.props.jobs} selectedJob={this.props.selectedJob} />
        </div>

        <div className="col-xs-8">
          <JobInfo job={this.props.selectedJob} />
        </div>
      </div>
    );
  }
}

export default JobContainer;
