import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { reduxForm, Field } from 'redux-form';
import { TextField, SelectField } from 'redux-form-material-ui';
import MenuItem from 'material-ui/MenuItem';
import RaisedButton from 'material-ui/RaisedButton';
import RequiredLabel from './RequiredLabel';
import { getters } from '../reducers';
import { standardMarginBottom } from '../constants/styles';
import states from '../constants/states';

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

const stateItems = Object.keys(states).map(type => (
  <MenuItem
    key={type}
    value={type}
    primaryText={states[type]}
  />
));


export function CreateEventLocationForm({ handleSubmit, onSubmit }) {
  return (
    <form onSubmit={handleSubmit(onSubmit)} noValidate>
      <Field
        fullWidth
        required
        autoComplete="address-line1"
        component={TextField}
        floatingLabelText={<RequiredLabel text={nameMap['location-address']} />}
        hintText="Enter Street Adress"
        name="location-address"
        type="text"
      />
      <Field
        fullWidth
        autoComplete="address-line2"
        component={TextField}
        floatingLabelText={nameMap['location-address-2']}
        hintText="Enter Apt/Suite Number"
        name="location-address-2"
        type="text"
      />
      <Field
        fullWidth
        required
        autoComplete="address-level2"
        component={TextField}
        floatingLabelText={<RequiredLabel text={nameMap.city} />}
        hintText="Enter City"
        name="city"
        type="text"
      />
      <Field
        fullWidth
        required
        autoComplete="address-level1"
        component={SelectField}
        floatingLabelText={<RequiredLabel text={nameMap.state} />}
        hintText="Enter State"
        name="state"
      >
        {stateItems}
      </Field>
      <Field
        fullWidth
        required
        autoComplete="postal-code"
        component={TextField}
        floatingLabelText={<RequiredLabel text={nameMap['postal-code']} />}
        hintText="Enter Zip Code"
        name="postal-code"
        type="text"
        style={standardMarginBottom}
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

const formified = reduxForm({
  form: 'createEventLocation',
  validate,
})(CreateEventLocationForm);

const mapStateToProps = state => ({ initialValues: getters.getCreateEventLocation(state) });
export default connect(mapStateToProps)(formified);
