import React from 'react';

const StageInputStateMixin = {
  getInitialState() {
    return {
      value: this.props.value || ''
    };
  },

  _save() {
    this.props.onSave(this.state.value);
  },

  _onChange(e) {
    this.setState({
      value: e.target.value
    });
  }
};

export default StageInputStateMixin;
