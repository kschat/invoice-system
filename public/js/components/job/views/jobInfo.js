'use strict';

import React from 'react';
import { Panel, Well } from 'react-bootstrap';

class JobInfo extends React.Component {
  render() {
    let job = this.props.job
      , components = job
          ? <Panel header={this.props.job.title} bsStyle="primary">
              {this.props.job.body}
            </Panel>

          : <Well bsSize="large">No job selected</Well>;

    return components;
  }
}

export default JobInfo;
