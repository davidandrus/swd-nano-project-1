import React from 'react';
import DatePickerButton from './DatePickerButton';
import PickerField from './PickerField';
import {
  modernDate,
  legacyDate,
} from '../constants/formats';

export default function DatePickerField(props) {
  return (
    <PickerField
      {...props}
      button={DatePickerButton}
      modernFormat={modernDate}
      legacyFormat={legacyDate}
      type="date"
    />
  );
}
