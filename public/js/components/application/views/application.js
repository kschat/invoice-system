'use strict';

import React from 'react';
import Header from './header';
import ContainerView from './container';
import JobContainer from '../../job/views/jobContainer';
import jobStore from '../../job/stores/jobStore';

let getStates = () => ({
  jobs: jobStore.jobs,
  selectedJob: jobStore.selectedJob
});

class ApplicationView extends React.Component {
  constructor(props) {
    super(props);

    this.state = getStates();
    this.handleChange = e => this.setState(getStates());
  }

  componentDidMount() {
    jobStore.addChangeListener(this.handleChange);
  }

  componentWillUnmount() {
    jobStore.removeChangeListener(this.handleChange)
  }

  render() {
    return (
      <div>
        <Header />
        <div className="container">
          <JobContainer jobs={this.state.jobs} selectedJob={this.state.selectedJob} />
        </div>
      </div>
    );
  }
}

export default ApplicationView;
