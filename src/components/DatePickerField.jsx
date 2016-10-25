import React from 'react';
import DatePickerButton from './DatePickerButton';
import PickerField from './PickerField';

export default function DatePickerField(props) {
  return (
    <PickerField
      {...props}
      button={DatePickerButton}
      modernFormat="YYYY-MM-DD"
      legacyFormat="MM/DD/YYYY"
      type="date"
    />
  );
}
