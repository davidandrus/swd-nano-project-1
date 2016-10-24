import React, { PropTypes, Component } from 'react';
import IconButton from 'material-ui/IconButton';
import DateRange from 'material-ui/svg-icons/action/date-range';
import DatePickerDialog from 'material-ui/DatePicker/DatePickerDialog';

export default class DatePickerButton extends Component {
  constructor(...args) {
    super(...args);
    this._openDialog = this._openDialog.bind(this);
  }

  _openDialog() {
    this._dialog.show();
  }

  render() {
    const { onSelect, allowFutureDates } = this.props;

    return (
      <div>
        <IconButton onClick={this._openDialog}>
          <DateRange />
        </IconButton>
        <DatePickerDialog
          container="inline"
          firstDayOfWeek={1}
          onAccept={onSelect}
          maxDate={!allowFutureDates ? new Date() : undefined}
          ref={(dialog) => { this._dialog = dialog; }}
        />
      </div>
    );
  }
}

DatePickerButton.propTypes = {
  onSelect: PropTypes.func.isRequired,
  allowFutureDates: PropTypes.bool,
};
