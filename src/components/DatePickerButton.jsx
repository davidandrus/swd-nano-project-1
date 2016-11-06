import React, { PropTypes } from 'react';
import DateRange from 'material-ui/svg-icons/action/date-range';
import DatePickerDialog from 'material-ui/DatePicker/DatePickerDialog';
import PickerButton from './PickerButton';
import { getDateFromValue } from '../utils/date';

export default function DatePickerButton({
  onSelect,
  allowFutureDates,
  allowPastDates,
  currentValue,
}) {
  const currentDate = getDateFromValue(currentValue);

  return (
    <PickerButton
      icon={<DateRange />}
      title="Open Date Dialog"
      initialDate={currentDate && currentDate.toDate()}
      dialog={
        <DatePickerDialog
          firstDayOfWeek={1}
          onAccept={onSelect}
          minDate={!allowPastDates ? new Date() : undefined}
          maxDate={!allowFutureDates ? new Date() : undefined}
        />
      }
    />
  );
}

DatePickerButton.propTypes = {
  onSelect: PropTypes.func.isRequired,
  allowFutureDates: PropTypes.bool,
  allowPastDates: PropTypes.bool,
  currentValue: PropTypes.string,
};

DatePickerButton.defaultProps = {
  allowPastDates: true,
  allowFutureDates: true,
};
