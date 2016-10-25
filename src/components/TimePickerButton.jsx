import React, { PropTypes } from 'react';
import moment from 'moment';
import Schedule from 'material-ui/svg-icons/action/schedule';
import TimePickerDialog from 'material-ui/TimePicker/TimePickerDialog';
import PickerButton from './PickerButton';

export default function TimePickerButton({ onSelect, currentValue }) {
  const currentDate = moment(currentValue, 'HH:mm');
  const dateIsValid = currentDate.isValid();
  return (
    <PickerButton
      icon={<Schedule />}
      dialog={
        <TimePickerDialog
          format="ampm"
          onAccept={onSelect}
          initialTime={dateIsValid ? currentDate.toDate() : undefined}
        />
      }
    />
  );
}

TimePickerButton.propTypes = {
  onSelect: PropTypes.func.isRequired,
  currentValue: PropTypes.string,
};
