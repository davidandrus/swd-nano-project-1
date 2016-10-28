import React, { PropTypes } from 'react';
import DateRange from 'material-ui/svg-icons/action/date-range';
import DatePickerDialog from 'material-ui/DatePicker/DatePickerDialog';
import PickerButton from './PickerButton';
import { getDateFromValue } from '../utils/date';


export default function DatePickerButton({ onSelect, allowFutureDates, currentValue }) {
  const currentDate = getDateFromValue(currentValue);

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
