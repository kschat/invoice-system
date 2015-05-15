'use strict';

import React from 'react';
import { ListGroup, ListGroupItem } from 'react-bootstrap';
import jobActions from '../jobActions';

class JobList extends React.Component {
  constructor(props) {
    super(props);
    this.selectJob = jobActions.selectJob;
  }

  render() {
    return (
      <ListGroup>
        {this.props.jobs.map(job => {
          let selectedJob = this.props.selectedJob
            , selected = selectedJob && selectedJob.id === job.id;
          return (
            <ListGroupItem
              href="#"
              key={job.id}
              active={selected}
              onClick={this.selectJob.bind(this, job.id)}>
              {job.title}
            </ListGroupItem>
          );
        })}
      </ListGroup>
    );
  }
}

export default JobList;
