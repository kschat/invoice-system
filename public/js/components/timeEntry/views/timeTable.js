import React from 'react';
import R from 'ramda';
import jobActions from '../../job/jobActions';
import StageTextInput from '../../common/inputs/StageTextInput';

const TimeTable = React.createClass({
  getDefaultProps() {
    return {
      timeEntries: [],
      editMode: false
    };
  },

  handleInputChange(id, prop, value) {
    jobActions.updateEntry({ id, prop, value });
  },

  render() {
    const _props = {
      readOnly: !this.props.editMode
    };

    return (
      <table className="table table-striped">
        <tbody>
          <tr>
            <th>Date</th>
            <th>Time spent</th>
            <th>Summary of work</th>
          </tr>

          {this.props.timeEntries.map(entry => (
            <tr>
              <td>
                <StageTextInput {..._props}
                  value={entry.entryDate}
                  onSave={R.partial(this.handleInputChange, entry.id, 'entryDate')} />
              </td>

              <td>
                <StageTextInput {..._props}
                  value={entry.timeSpent}
                  onSave={R.partial(this.handleInputChange, entry.id, 'timeSpent')} />
              </td>

              <td>
                <StageTextInput {..._props}
                  value={entry.workSummary}
                  onSave={R.partial(this.handleInputChange, entry.id, 'workSummary')} />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    );
  }
});

export default TimeTable;
