import React from 'react';
import R from 'ramda';
import jobActions from '../jobActions';
import {
    Panel,
    Button,
    ButtonGroup,
    ButtonToolbar,
    Alert
  } from 'react-bootstrap';

const JobInfo = React.createClass({
  getInitialState() {
    return {
      showDeleteAlert: false
    };
  },

  getDefaultProps() {
    return {
      job: {}
    };
  },

  handleDelete(jobId) {
    jobActions.deleteJob(jobId);
    this.toggleAlert();
  },

  renderHeader(job) {
    return (
      <div>
        {job.title}
        <ButtonGroup className="pull-right">
          <Button>
            <i className="fa fa-pencil" />
          </Button>

          <Button onClick={this.toggleAlert}>
            <i className="fa fa-trash-o" />
          </Button>
        </ButtonGroup>
      </div>
    );
  },

  renderDeleteAlert(job) {
    return (
      <Alert bsStyle="danger" onDismiss={this.toggleAlert}>
        <h4>Delete Job</h4>
        <p>Are you sure you want to delete "{job.title || 'this item'}"?</p>
        <p>
          <ButtonToolbar>
            <Button
              bsStyle="danger"
              onClick={R.partial(this.handleDelete, job.id)}>
              Yes
            </Button>

            <Button onClick={this.toggleAlert}>No</Button>
          </ButtonToolbar>
        </p>
      </Alert>
    );
  },

  render() {
    let job = this.props.job
      , showDeleteAlert = this.state.showDeleteAlert;

    return (
      <Panel header={this.renderHeader(job)}>
        {showDeleteAlert && this.renderDeleteAlert(job)}

        <dl className="dl-horizontal">
          <dt>Hourly rate</dt>
          <dd>$16.50</dd>

          <dt>Tax rate</dt>
          <dd>$1.50</dd>
        </dl>
      </Panel>
    );
  },

  toggleAlert() {
    this.setState({ showDeleteAlert: !this.state.showDeleteAlert });
  }
});

export default JobInfo;
