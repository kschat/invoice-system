'use strict';

import React from 'react';
import JobContainer from '../../job/views/jobContainer';

class ContainerView extends React.Component {
  render() {
    return (
      <div className="container">
        <JobContainer />
      </div>
    );
  }
}

export default ContainerView;
