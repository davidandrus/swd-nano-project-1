import React, { PropTypes, Component } from 'react';
import IconButton from 'material-ui/IconButton';
import Schedule from 'material-ui/svg-icons/action/schedule';
import TimePickerDialog from 'material-ui/TimePicker/TimePickerDialog';

export default class TimePickerButton extends Component {
  constructor(...args) {
    super(...args);
    this._openDialog = this._openDialog.bind(this);
  }

  _openDialog() {
    this._dialog.show();
  }

  render() {
    const { onSelect } = this.props;

    return (
      <div>
        <IconButton onClick={this._openDialog}>
          <Schedule />
        </IconButton>
        <TimePickerDialog
          onAccept={onSelect}
          ref={(dialog) => { this._dialog = dialog; }}
        />
      </div>
    );
  }
}

TimePickerButton.propTypes = {
  onSelect: PropTypes.func.isRequired,
};
