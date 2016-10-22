import React, { PropTypes } from 'react';
import { reduxForm, Field } from 'redux-form';
import { TextField, SelectField, DatePicker, TimePicker } from 'redux-form-material-ui';
import MenuItem from 'material-ui/MenuItem';
import RaisedButton from 'material-ui/RaisedButton';
import Chip from 'material-ui/Chip';
import RequiredLabel from './RequiredLabel';

const nameMap = {
  'event-name': 'Event Name',
  'event-type': 'Event Type',
  'host': 'Host',
  'start-date': 'Start Date',
  'start-time': 'Start Time',
  'end-date': 'End Date',
  'end-time': 'End Time',
};

function validate(values) {
  const errors = [];

  // required fields;
  [
    'event-name',
    'event-type',
    'host',
    'start-date',
    'start-time',
    'end-date',
    'end-time',
  ].forEach(key => {
    if (!values[key]) {
      errors[key] = `${nameMap[key]} is required`;
    }
  });

  return errors;
}

const dateTimeWrapperStyle = {
  alignItems: 'flex-end',
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

export function CreateEventForm({ handleSubmit, submit }) {
  return (
    <form>
      <Field
        autoFocus
        fullWidth
        component={TextField}
        floatingLabelText={<RequiredLabel text={nameMap['event-name']} />}
        hintText="Enter the name of your event"
        name="event-name"
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
        <MenuItem
          value={1}
          primaryText="Birthday Party"
        />
        <MenuItem
          value={2}
          primaryText="Conference Talk"
        />
        <MenuItem
          value={3}
          primaryText="Wedding"
        />
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
        <Field
          fullWidth
          component={DatePicker}
          style={datePickerStyle}
          floatingLabelText={<RequiredLabel text={nameMap['start-date']} />}
          name="start-date"
        />
        <Field
          fullWidth
          component={TimePicker}
          floatingLabelText={<RequiredLabel text={nameMap['start-time']} />}
          style={timePickerStyle}
          name="start-time"
        />
      </div>
      <div style={dateTimeWrapperStyle}>
        <Field
          fullWidth
          component={DatePicker}
          floatingLabelText={<RequiredLabel text={nameMap['end-date']} />}
          name="end-date"
          style={datePickerStyle}
        />
        <Field
          fullWidth
          component={TimePicker}
          floatingLabelText={<RequiredLabel text={nameMap['end-time']} />}
          name="end-time"
          style={timePickerStyle}
        />
      </div>
      {/*
      <div>
        <h1>Guest List</h1>
        <h3>A guest List is required, you must add at least one guest to your list</h3>
        <Field
          component={TextField}
          floatingLabelText="Add Guest"
          hintText="Enter the name of your guest"
        />
        <RaisedButton secondary label="Add" />
      </div>
      <Chip onRequestDelete={() => {}}>email@email.com</Chip>
      */}
      <h1>Location</h1>
      <Field
        fullWidth
        component={TextField}
        autoComplete="street-address"
        floatingLabelText={<RequiredLabel text="Street Address" />}
        hintText="Enter Street Adress"
        name="location-address"
        type="text"
      />
      <Field
        fullWidth
        component={TextField}
        autoComplete="address-line2"
        floatingLabelText="Apt/Suite Number"
        hintText="Enter Apt/Suite Number"
        name="location-address-2"
        type="text"
      />
      <Field
        fullWidth
        component={TextField}
        autoComplete="address-level2"
        floatingLabelText={<RequiredLabel text="City" />}
        hintText="Enter City"
        name="city"
        type="text"
      />
      <Field
        fullWidth
        component={TextField}
        autoComplete="address-level1"
        floatingLabelText={<RequiredLabel text="State" />}
        hintText="Enter State"
        name="state"
        type="text"
      />
      <Field
        fullWidth
        component={TextField}
        autoComplete="postal-code"
        floatingLabelText={<RequiredLabel text="Zip Code" />}
        hintText="Enter Zip Code"
        name="postal-code"
        type="text"
      />
    </form>
  );
}

CreateEventForm.propTypes = {
  handleSubmit: PropTypes.func,
  onSubmit: PropTypes.func,
};

export default reduxForm({
  form: 'createEvent',
  validate,
})(CreateEventForm);
