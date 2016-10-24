import moment from 'moment';
import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { reduxForm, Field } from 'redux-form';
import { TextField, SelectField, TimePicker } from 'redux-form-material-ui';
import MenuItem from 'material-ui/MenuItem';
import RaisedButton from 'material-ui/RaisedButton';
import RequiredLabel from './RequiredLabel';
import DatePickerField from './DatePickerField';
import { getters } from '../reducers';


const nameMap = {
  'event-name': 'Event Name',
  'event-type': 'Event Type',
  host: 'Host',
  'start-date': 'Start Date',
  'start-time': 'Start Time',
  'end-date': 'End Date',
  'end-time': 'End Time',
};

const eventTypes = {
  'birthday-party': 'Birthday Party',
  'confererence-talk': 'Conference Talk',
  wedding: 'Wedding',
};

const eventTypeComponents = Object.keys(eventTypes).map(type => (
  <MenuItem
    key={type}
    value={type}
    primaryText={eventTypes[type]}
  />
));

const hasDateError = errors => !!(errors['start-date'] ||
  errors['start-time'] ||
  errors['end-date'] ||
  errors['end-time']);

function validate(values) {
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

  if (!hasDateError(errors)) {
    const startDate = moment(values['start-date']);
    const startTime = moment(values['start-time']);
    const endDate = moment(values['end-date']);
    const endTime = moment(values['end-time']);

    const startCombined = moment(startDate).set({
      hours: startTime.hours(),
      minutes: startTime.minutes(),
    });

    const endCombined = moment(endDate).set({
      hours: endTime.hours(),
      minutes: endTime.minutes(),
    });

    // dates out of order
    if (endCombined < startCombined) {
      errors['start-date'] = errors['start-time'] = 'Start cannot be later than End';
      errors['end-date'] = errors['end-time'] = 'End cannot be earlier than Start';
    }
  }

  return errors;
}

const dateTimeWrapperStyle = {
  display: 'flex',
  justifyContent: 'space-between',
  maxWidth: '100%',
};

const datePickerStyle = {
  flex: '0 0 48%',
};

const timePickerStyle = {
  flex: '0 0 48%',
};

export function CreateEventForm({ handleSubmit, onSubmit }) {
  return (
    <form onSubmit={handleSubmit(onSubmit)} noValidate>
      <Field
        autoFocus
        fullWidth
        component={TextField}
        floatingLabelText={<RequiredLabel text={nameMap['event-name']} />}
        hintText="Enter the name of your event"
        name="event-name"
        tabIndex={0}
        type="text"
      />
      {/*
        @TODO - https://github.com/callemall/material-ui/issues/714
        is not keyboard focusable, maybe make pr to fix, or make a work around with a offscreen text
        field that when focused will open the dropdown
      */}
      {/* @TODO - make more event types */}
      <Field
        fullWidth
        component={SelectField}
        floatingLabelText={<RequiredLabel text={nameMap['event-type']} />}
        name="event-type"
      >
        {eventTypeComponents}
      </Field>
      <Field
        fullWidth
        component={TextField}
        floatingLabelText={<RequiredLabel text={nameMap.host} />}
        hintText="Enter the name of your host"
        name="host"
        type="text"
      />
      <div style={dateTimeWrapperStyle}>
        <div style={datePickerStyle}>
          <DatePickerField
            floatingLabelText={<RequiredLabel text={nameMap['start-date']} />}
            name="start-date"
          />
        </div>
        <Field
          fullWidth
          component={TimePicker}
          floatingLabelText={<RequiredLabel text={nameMap['start-time']} />}
          style={timePickerStyle}
          name="start-time"
        />
      </div>
      <div style={dateTimeWrapperStyle}>
        <div style={datePickerStyle}>
          <DatePickerField
            floatingLabelText={<RequiredLabel text={nameMap['end-date']} />}
            name="end-date"
            style={datePickerStyle}
          />
        </div>
        <Field
          fullWidth
          component={TimePicker}
          floatingLabelText={<RequiredLabel text={nameMap['end-time']} />}
          name="end-time"
          style={timePickerStyle}
        />
      </div>
      <RaisedButton
        primary
        label="Continue"
        type="submit"
      />
    </form>
  );
}

CreateEventForm.propTypes = {
  handleSubmit: PropTypes.func,
  onSubmit: PropTypes.func,
};

const formified = reduxForm({
  form: 'createEvent',
  validate,
})(CreateEventForm);

const mapStateToProps = state => ({ initialValues: getters.getCreateEvent(state) });
export default connect(mapStateToProps)(formified);
