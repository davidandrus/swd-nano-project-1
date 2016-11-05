import React, { PropTypes } from 'react';
import {
  reduxForm,
  Field,
} from 'redux-form';
import { TextField } from 'redux-form-material-ui';
import RaisedButton from 'material-ui/RaisedButton';
import { emailRegExp } from '../constants/regex';
import {
  standardMarginBottom,
  standardMargin,
} from '../constants/styles';
import { trimValues } from '../utils/helpers';

const inlineInputWrapper = {
  ...standardMarginBottom,
  display: 'flex',
};

const inlineInput = {
  flex: '0 999 auto',
};

const inlineButton = {
  flex: '0 0 auto',
  marginLeft: standardMargin,
  paddingTop: '28px', // to offset hidden label area
};

function validate(origValues) {
  const errors = [];
  const values = trimValues(origValues);

  if (!emailRegExp.test(values['guest-email'])) {
    errors['guest-email'] = 'Invalid email';
  }

  return errors;
}

function AddGuestForm({ handleSubmit, onSubmit }) {
  return (
    <form onSubmit={handleSubmit(onSubmit)} noValidate>
      <div style={inlineInputWrapper}>
        <Field
          autoFocus
          fullWidth
          component={TextField}
          floatingLabelText="Add Guest Email"
          hintText="Enter Guest Email"
          name="guest-email"
          style={inlineInput}
          type="email"
        />
        <div style={inlineButton}>
          <RaisedButton
            secondary
            label="Add"
            type="submit"
          />
        </div>
      </div>
    </form>
  );
}

AddGuestForm.propTypes = {
  handleSubmit: PropTypes.func,
  onSubmit: PropTypes.func,
};

export default reduxForm({
  form: 'createEventGuest',
  validate,
})(AddGuestForm);
