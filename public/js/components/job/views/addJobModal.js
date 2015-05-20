import React from 'react';
import { Modal, Button } from 'react-bootstrap';
import R from 'ramda';
import StageTextInput from '../../common/inputs/StageTextInput';
import jobActions from '../jobActions';

const AddJobModal = React.createClass({
  getInitialState() {
    return {
      title: '',
      hourlyRate: '',
      taxRate: ''
    };
  },

  handleInputChange(prop, value) {
    this.setState({ [prop]: value });
  },

  handleSubmit(e) {
    jobActions.addJob(this.state);
    this.props.onRequestHide();
  },

  render() {
    return (
      <Modal {...this.props} title="Add Job">
        <div className="modal-body">
          <form>
            <StageTextInput
              label="Title"
              placeholder="Job title"
              onSave={R.partial(this.handleInputChange, 'title')} />

            <StageTextInput
              label="Hourly Rate"
              placeholder="Rate in dollars"
              onSave={R.partial(this.handleInputChange, 'hourlyRate')} />

            <StageTextInput
              label="Tax Rate"
              placeholder="Tax as decimal"
              onSave={R.partial(this.handleInputChange, 'taxRate')} />
          </form>
        </div>

        <div className="modal-footer">
          <Button bsStyle="primary" onClick={this.handleSubmit}>Add</Button>
        </div>
      </Modal>
    );
  }
});

export default AddJobModal;
