import React, { PropTypes } from 'react';
import Schedule from 'material-ui/svg-icons/action/schedule';
import TimePickerDialog from 'material-ui/TimePicker/TimePickerDialog';
import PickerButton from './PickerButton';
import { getTimeFromValue } from '../utils/date';

export default function TimePickerButton({ onSelect, currentValue }) {
  const currentTime = getTimeFromValue(currentValue);

  return (
    <PickerButton
      icon={<Schedule />}
      dialog={
        <TimePickerDialog
          format="ampm"
          onAccept={onSelect}
          initialTime={currentTime && currentTime.toDate()}
        />
      }
    />
  );
}

TimePickerButton.propTypes = {
  onSelect: PropTypes.func.isRequired,
  currentValue: PropTypes.string,
};
