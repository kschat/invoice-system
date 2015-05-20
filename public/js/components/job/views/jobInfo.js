import React from 'react';
import cx from 'classnames';
import R from 'ramda';
import jobActions from '../jobActions';
import TimeTable from '../../timeEntry/views/timeTable';
import AddTimeEntryModal from '../../timeEntry/views/addTimeEntryModal';
import {
    Panel,
    Button,
    ButtonGroup,
    ButtonToolbar,
    Alert,
    Input,
    ModalTrigger
  } from 'react-bootstrap';

const JobInfo = React.createClass({
  getInitialState() {
    return {
      showDeleteAlert: false,
      editMode: false
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

  handleInputChange(id, prop, value) {
    jobActions.updateJob({ id, prop, value });
  },

  toggleAlert() {
    this.setState({ showDeleteAlert: !this.state.showDeleteAlert });
  },

  toggleEditMode() {
    this.setState({ editMode: !this.state.editMode });
  },

  renderHeader(job) {
    const lockClassNames = cx('fa', {
      'fa-lock': !this.state.editMode,
      'fa-unlock': this.state.editMode
    });

    return (
      <div>
        {job.title}
        <ButtonGroup className="pull-right">
          <Button onClick={this.toggleEditMode}>
            <i className={lockClassNames} />
          </Button>

          <Button onClick={this.toggleAlert}>
            <i className="fa fa-trash-o" />
          </Button>
        </ButtonGroup>
      </div>
    );
  },

  renderFooter(job) {
    const message = this.props.jobSaveStatus
      ? this.props.jobSaveStatus.message
      : '';

    return this.state.editMode && (
      <div className="clearfix">
        <span className="text-muted">{message}</span>
        <ModalTrigger modal={<AddTimeEntryModal jobId={job.id} />}>
          <Button className="pull-right">
            <i className="fa fa-clock-o" /> Log time
          </Button>
        </ModalTrigger>
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

  renderTimeEntries(job) {
    return (
      <TimeTable timeEntries={job.entries} editMode={this.state.editMode} />
    );
  },

  render() {
    const job = this.props.job;
    const showDeleteAlert = this.state.showDeleteAlert;
    const inputProps = {
      readOnly: !this.state.editMode,
      labelClassName: 'col-xs-3',
      wrapperClassName: 'col-xs-9'
    };

    return (
      <Panel header={this.renderHeader(job)} footer={this.renderFooter(job)}>
        {showDeleteAlert && this.renderDeleteAlert(job)}

        <form className="form-horizontal">
          <Input
            {...inputProps}
            type="text"
            label="Hourly rate"
            value={job.hourlyRate} />

          <Input
            {...inputProps}
            type="text"
            label="Tax rate"
            value={job.taxRate} />
        </form>

        {job.entries && !!job.entries.length && this.renderTimeEntries(job)}
      </Panel>
    );
  }
});

export default JobInfo;
