import React from 'react';
import TimePickerButton from './TimePickerButton';
import PickerField from './PickerField';

export default function TimePickerField(props) {
  return (
    <PickerField
      {...props}
      button={TimePickerButton}
      modernFormat="HH:mm"
      legacyFormat="HH:mm A"
      type="time"
    />
  );
}
