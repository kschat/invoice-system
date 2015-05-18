import React from 'react';
import { Input } from 'react-bootstrap';
import StageInputMixin from '../mixins/StageInputStateMixin';

const StageTextInput = React.createClass({
  mixins: [StageInputMixin],

  render() {
    return (
      <Input
        {...this.props}
        type="text"
        onBlur={this._save}
        onChange={this._onChange}
        value={this.state.value} />
    );
  }
});

export default StageTextInput;
