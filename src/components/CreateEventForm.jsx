import moment from 'moment';
import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import {
  reduxForm,
  Field,
} from 'redux-form';
import get from 'lodash/get';
import { TextField } from 'redux-form-material-ui';
import RaisedButton from 'material-ui/RaisedButton';
import RequiredLabel from './RequiredLabel';
import DatePickerField from './DatePickerField';
import TimePickerField from './TimePickerField';
import SelectField from './SelectField';
import DateTime from './DateTime';
import { getters } from '../reducers';
import { standardMarginBottom } from '../constants/styles';
import eventTypes from '../constants/eventTypes';
import {
  getTimeFromValue,
  getDateFromValue,
} from '../utils/date';
import { trimValues } from '../utils/helpers';

const nameMap = {
  'event-name': 'Event Name',
  'event-type': 'Event Type',
  host: 'Host',
  'start-date': 'Start Date',
  'start-time': 'Start Time',
  'end-date': 'End Date',
  'end-time': 'End Time',
};

const eventTypeOptions = Object.keys(eventTypes).map(type => ({
  value: type,
  label: eventTypes[type],
}));

const hasStartDateError = errors => !!(errors['start-date'] || errors['start-time']);
const hasEndDateError = errors => !!(errors['end-date'] || errors['end-time']);
const hasDateError = errors => hasStartDateError(errors) || hasEndDateError(errors);

function validate(origValues) {
  const values = trimValues(origValues);
  const errors = [];

  // required fields
  [
    'event-name',
    'event-type',
    'host',
    'start-date',
    'start-time',
    'end-date',
    'end-time',
  ].forEach((key) => {
    if (!values[key]) {
      errors[key] = `${nameMap[key]} is required`;
    }
  });

  const startDate = getDateFromValue(values['start-date']);
  const startTime = getTimeFromValue(values['start-time']);
  const endDate = getDateFromValue(values['end-date']);
  const endTime = getTimeFromValue(values['end-time']);

  const notValidTime = 'Not a valid time format';
  const notValidDate = 'Not a valid date format';

  if (values['start-date'] && !startDate) {
    errors['start-date'] = notValidDate;
  }

  if (values['start-time'] && !startTime) {
    errors['start-time'] = notValidTime;
  }

  if (values['end-date'] && !endDate) {
    errors['end-date'] = notValidDate;
  }

  if (values['end-time'] && !endTime) {
    errors['end-time'] = notValidTime;
  }

  const now = moment();

  let startCombined;
  let endCombined;
  if (!hasStartDateError(errors)) {
    startCombined = moment(startDate).set({
      hours: startTime.hours(),
      minutes: startTime.minutes(),
    });

    if (startCombined <= now) {
      errors['start-date'] = errors['start-time'] = 'Start must be in the future';
    }
  }

  if (!hasEndDateError(errors)) {
    endCombined = moment(endDate).set({
      hours: endTime.hours(),
      minutes: endTime.minutes(),
    });
    if (endCombined <= now) {
      errors['end-date'] = errors['end-time'] = 'End must be in the future';
    }
  }

   // dates out of order
  if (!hasDateError(errors) && endCombined <= startCombined) {
    errors['start-date'] = errors['start-time'] = 'Start must be earlier than End';
    errors['end-date'] = errors['end-time'] = 'End must be later than Start';
  }

  return errors;
}

export function CreateEventForm({ handleSubmit, onSubmit, currentValues }) {
  return (
    <form onSubmit={handleSubmit(onSubmit)} noValidate>
      <Field
        fullWidth
        required
        component={TextField}
        floatingLabelText={<RequiredLabel text={nameMap['event-name']} />}
        hintText="Enter the name of your event"
        name="event-name"
        type="text"
      />
      <Field
        fullWidth
        required
        component={SelectField}
        floatingLabelText={<RequiredLabel text={nameMap['event-type']} />}
        hintText="Select an Event Type"
        name="event-type"
        options={eventTypeOptions}
      />
      <Field
        fullWidth
        component={TextField}
        required
        floatingLabelText={<RequiredLabel text={nameMap.host} />}
        hintText="Enter the name of your host"
        name="host"
        type="text"
      />
      <DateTime
        date={
          <DatePickerField
            required
            allowPastDates={false}
            floatingLabelText={<RequiredLabel text={`${nameMap['start-date']}: e.g. 01/01/2000`} />}
            name="start-date"
            currentValue={currentValues['start-date']}
          />
        }
        time={
          <TimePickerField
            required
            floatingLabelText={<RequiredLabel text={`${nameMap['start-time']} e.g. 01:00 PM`} />}
            name="start-time"
            currentValue={currentValues['start-time']}
          />
        }
      />
      <DateTime
        style={standardMarginBottom}
        date={
          <DatePickerField
            required
            allowPastDates={false}
            floatingLabelText={<RequiredLabel text={`${nameMap['end-date']} e.g. 01/01/2000`} />}
            name="end-date"
            currentValue={currentValues['end-date']}
          />
        }
        time={
          <TimePickerField
            required
            floatingLabelText={<RequiredLabel text={`${nameMap['end-time']} e.g. 01:00 PM`} />}
            name="end-time"
            currentValue={currentValues['end-time']}
          />
        }
      />
      <RaisedButton
        primary
        label="Continue"
        type="submit"
      />
    </form>
  );
}

CreateEventForm.propTypes = {
  // eslint-disable-next-line react/forbid-prop-types
  currentValues: PropTypes.object,
  handleSubmit: PropTypes.func,
  onSubmit: PropTypes.func,
};

const formified = reduxForm({
  form: 'createEvent',
  validate,
})(CreateEventForm);

const mapStateToProps = state => ({
  initialValues: getters.getCreateEvent(state),
  currentValues: get(getters.getForms(state), 'createEvent.values', {}),
});
export default connect(mapStateToProps)(formified);
