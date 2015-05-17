import React from 'react';
import JobList from './jobList';
import JobInfo from './jobInfo';
import { Well } from 'react-bootstrap';

const JobContainer = React.createClass({
  render() {
    const mainContent = this.props.selectedJob
      ? <JobInfo job={this.props.selectedJob} />
      : <Well bsSize="large">No job selected</Well>;

    return (
      <div className="row">
        <div className="col-xs-4">
          <JobList jobs={this.props.jobs} selectedJob={this.props.selectedJob} />
        </div>

        <div className="col-xs-8">
          {mainContent}
        </div>
      </div>
    );
  }
});

export default JobContainer;
