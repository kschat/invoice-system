import React from 'react';
import { Modal, Button } from 'react-bootstrap';
import R from 'ramda';
import StageTextInput from '../../common/inputs/StageTextInput';
import jobActions from '../../job/jobActions';

const AddTimeEntryModal = React.createClass({
  getInitialState() {
    return {
      id: this.props.jobId || 0,
      entryDate: '',
      timeSpent: '',
      workSummary: ''
    };
  },

  handleInputChange(prop, value) {
    this.setState({ [prop]: value });
  },

  handleSubmit(e) {
    jobActions.addTimeEntry(this.state);
    this.props.onRequestHide();
  },

  render() {
    return (
      <Modal {...this.props} title="Add Job">
        <div className="modal-body">
          <form>
            <StageTextInput
              label="Entry Date"
              placeholder="MM/DD/YYYY"
              onSave={R.partial(this.handleInputChange, 'entryDate')} />

            <StageTextInput
              label="Time Spent"
              placeholder="Time in minutes spent on work"
              onSave={R.partial(this.handleInputChange, 'timeSpent')} />

            <StageTextInput
              label="Work Summary"
              placeholder="Short description of what you did"
              onSave={R.partial(this.handleInputChange, 'workSummary')} />
          </form>
        </div>

        <div className="modal-footer">
          <Button bsStyle="primary" onClick={this.handleSubmit}>Add</Button>
        </div>
      </Modal>
    );
  }
});

export default AddTimeEntryModal;
