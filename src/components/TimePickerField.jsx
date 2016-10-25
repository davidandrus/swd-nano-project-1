import React from 'react';
import TimePickerButton from './TimePickerButton';
import PickerField from './PickerField';
import {
  modernTime,
  legacyTime,
} from '../constants/formats';

export default function TimePickerField(props) {
  return (
    <PickerField
      {...props}
      button={TimePickerButton}
      modernFormat={modernTime}
      legacyFormat={legacyTime}
      type="time"
    />
  );
}
