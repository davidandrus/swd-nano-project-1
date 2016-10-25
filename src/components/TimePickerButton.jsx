import React, { PropTypes } from 'react';
import Schedule from 'material-ui/svg-icons/action/schedule';
import TimePickerDialog from 'material-ui/TimePicker/TimePickerDialog';
import PickerButton from './PickerButton';

export default function TimePickerButton({ onSelect }) {
  return (
    <PickerButton
      icon={<Schedule />}
      dialog={<TimePickerDialog onAccept={onSelect} />}
    />
  );
}

TimePickerButton.propTypes = {
  onSelect: PropTypes.func.isRequired,
};
