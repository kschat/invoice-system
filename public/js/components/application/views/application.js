import React from 'react';
import Navigation from './navigation';
import Header from './header';
import JobContainer from '../../job/views/jobContainer';
import jobStore from '../../job/stores/jobStore';

const getStates = () => ({
  jobs: jobStore.jobs,
  selectedJob: jobStore.selectedJob,
  jobSaveStatus: jobStore.jobSaveStatus
});

const ApplicationView = React.createClass({
  getInitialState() {
    return getStates();
  },

  componentDidMount() {
    jobStore.addChangeListener(this.handleChange);
  },

  componentWillUnmount() {
    jobStore.removeChangeListener(this.handleChange)
  },

  render() {
    return (
      <div>
        <Navigation />
        <div className="container">
          <Header />
          <JobContainer
            jobs={this.state.jobs}
            selectedJob={this.state.selectedJob}
            jobSaveStatus={this.state.jobSaveStatus} />
        </div>
      </div>
    );
  },

  handleChange(e) {
    this.setState(getStates());
  }
});

export default ApplicationView;
