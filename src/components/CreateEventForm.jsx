import React, { PropTypes } from 'react';
import { reduxForm, Field } from 'redux-form';
import { TextField, SelectField, DatePicker, TimePicker } from 'redux-form-material-ui';
import MenuItem from 'material-ui/MenuItem';
import RaisedButton from 'material-ui/RaisedButton';
import Chip from 'material-ui/Chip';

function validate(values) {
  const errors = [];
  return errors;
}

export function CreateEventForm({ handleSubmit, submit }) {
  return (
    <form>
      <Field
        autoFocus
        fullWidth
        component={TextField}
        floatingLabelText="Event Name"
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
        floatingLabelText="Event Type"
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
        floatingLabelText="Event Host"
        hintText="Enter the name of your host"
        name="host"
        type="text"
      />
      <div>
        <Field
          component={DatePicker}
          floatingLabelText="Start Date"
          name="start-date"
        />
        <Field
          component={TimePicker}
          hintText="Start Time"
          name="start-time"
        />
      </div>
      <div>
        <Field
          component={DatePicker}
          floatingLabelText="End Date"
          name="end-time"
        />
        <Field
          component={TimePicker}
          hintText="End Time"
          name="end-time"
        />
      </div>
      <div>
        <Field
          component={TextField}
          floatingLabelText="Add Guest"
          hintText="Enter the name of your guest"
        />
        <RaisedButton secondary label="Add" />
      </div>
      <Chip onRequestDelete={() => {}}>email@email.com</Chip>
      <h1>Location</h1>
      <Field
        fullWidth
        component={TextField}
        autoComplete="street-address"
        floatingLabelText="Street Address"
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
        floatingLabelText="City"
        hintText="Enter City"
        name="city"
        type="text"
      />
      <Field
        fullWidth
        component={TextField}
        autoComplete="address-level1"
        floatingLabelText="State"
        hintText="Enter State"
        name="state"
        type="text"
      />
      <Field
        fullWidth
        component={TextField}
        autoComplete="postal-code"
        floatingLabelText="Zip Code"
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
