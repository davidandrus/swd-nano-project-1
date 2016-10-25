import React, { PropTypes } from 'react';
import moment from 'moment';
import Schedule from 'material-ui/svg-icons/action/schedule';
import TimePickerDialog from 'material-ui/TimePicker/TimePickerDialog';
import PickerButton from './PickerButton';
import {
  modernTime,
  legacyTime,
} from '../constants/formats';

export default function TimePickerButton({ onSelect, currentValue }) {
  const currentLegacyTime = moment(currentValue, legacyTime);
  const currentModernTime = moment(currentValue, modernTime);

  let currentTime;
  if (currentLegacyTime.isValid()) { currentTime = currentLegacyTime; }
  if (currentModernTime.isValid()) { currentTime = currentModernTime; }

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
