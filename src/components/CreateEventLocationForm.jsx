import React, { PropTypes } from 'react';
import { reduxForm, Field } from 'redux-form';
import { TextField } from 'redux-form-material-ui';
import RaisedButton from 'material-ui/RaisedButton';
import RequiredLabel from './RequiredLabel';

const nameMap = {
  'location-address': 'Street Address',
  'location-address-2': 'Suite/Apt',
  city: 'City',
  state: 'State',
  'postal-code': 'Zip Code',
};

function validate(values) {
  const errors = [];

  // required fields
  [
    'location-address',
    'city',
    'state',
    'postal-code',
  ].forEach((key) => {
    if (!values[key]) {
      errors[key] = `${nameMap[key]} is required`;
    }
  });

  return errors;
}

export function CreateEventLocationForm({ handleSubmit, onSubmit }) {
  return (
    <form onSubmit={handleSubmit(onSubmit)} noValidate>
      <Field
        fullWidth
        component={TextField}
        autoComplete="street-address"
        floatingLabelText={<RequiredLabel text={nameMap['location-address']} />}
        hintText="Enter Street Adress"
        name="location-address"
        type="text"
      />
      <Field
        fullWidth
        component={TextField}
        autoComplete="address-line2"
        floatingLabelText={nameMap['location-address-2']}
        hintText="Enter Apt/Suite Number"
        name="location-address-2"
        type="text"
      />
      <Field
        fullWidth
        component={TextField}
        autoComplete="address-level2"
        floatingLabelText={<RequiredLabel text={nameMap.city} />}
        hintText="Enter City"
        name="city"
        type="text"
      />
      <Field
        fullWidth
        component={TextField}
        autoComplete="address-level1"
        floatingLabelText={<RequiredLabel text={nameMap.state} />}
        hintText="Enter State"
        name="state"
        type="text"
      />
      <Field
        fullWidth
        component={TextField}
        autoComplete="postal-code"
        floatingLabelText={<RequiredLabel text={nameMap['postal-code']} />}
        hintText="Enter Zip Code"
        name="postal-code"
        type="text"
      />

      <RaisedButton
        primary
        label="Continue"
        type="submit"
      />
    </form>
  );
}

CreateEventLocationForm.propTypes = {
  handleSubmit: PropTypes.func,
  onSubmit: PropTypes.func,
};

export default reduxForm({
  form: 'createEventLocation',
  validate,
})(CreateEventLocationForm);