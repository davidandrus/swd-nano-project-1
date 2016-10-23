import React, { PropTypes } from 'react';
import { reduxForm, Field } from 'redux-form';
import { TextField } from 'redux-form-material-ui';
import RaisedButton from 'material-ui/RaisedButton';
import Chip from 'material-ui/Chip';

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

export function CreateEventGuestsForm({ handleSubmit, onSubmit }) {
  return (

    <form onSubmit={handleSubmit(onSubmit)} noValidate>
      <div>
        <h3>A guest List is required, you must add at least one guest to your list</h3>

        <TextField
          floatingLabelText="Add Guest"
          hintText="Enter the name of your guest"
          name="add-guest"
        />
        <RaisedButton secondary label="Add" />
      </div>
      <Chip onRequestDelete={() => {}}>email@email.com</Chip>

      <RaisedButton
        primary
        label="Add Event"
        type="submit"
      />
    </form>
  );
}

CreateEventGuestsForm.propTypes = {
  handleSubmit: PropTypes.func,
  onSubmit: PropTypes.func,
};

export default reduxForm({
  form: 'createEventGuests',
  validate,
})(CreateEventGuestsForm);
