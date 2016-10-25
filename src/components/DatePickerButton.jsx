import React, { PropTypes } from 'react';
import moment from 'moment';
import DateRange from 'material-ui/svg-icons/action/date-range';
import DatePickerDialog from 'material-ui/DatePicker/DatePickerDialog';
import PickerButton from './PickerButton';
import {
  modernDate,
  legacyDate,
} from '../constants/formats';

export default function DatePickerButton({ onSelect, allowFutureDates, currentValue }) {
  const currentLegacyDate = moment(currentValue, legacyDate);
  const currentModernDate = moment(currentValue, modernDate);

  let currentDate;
  if (currentLegacyDate.isValid()) { currentDate = currentLegacyDate; }
  if (currentModernDate.isValid()) { currentDate = currentModernDate; }

  return (
    <PickerButton
      icon={<DateRange />}
      dialog={
        <DatePickerDialog
          firstDayOfWeek={1}
          onAccept={onSelect}
          maxDate={!allowFutureDates ? new Date() : undefined}
          initialDate={currentDate && currentDate.toDate()}
        />
      }
    />
  );
}

DatePickerButton.propTypes = {
  onSelect: PropTypes.func.isRequired,
  allowFutureDates: PropTypes.bool,
  currentValue: PropTypes.string,
};
