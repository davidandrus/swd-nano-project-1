import React, { PropTypes } from 'react';
import { reduxForm, Field } from 'redux-form';
import { TextField } from 'redux-form-material-ui';
import RaisedButton from 'material-ui/RaisedButton';
import { emailRegExp } from '../constants/regex';
import { standardMarginBottom, standardMargin } from '../constants/styles';

const inlineInputWrapper = {
  display: 'flex',
  ...standardMarginBottom,
};

const inlineInput = {
  flex: '0 999 auto',
};

const inlineButton = {
  flex: '0 0 auto',
  marginLeft: standardMargin,
  paddingTop: '28px', // to offset hidden label area
};

function validate(values) {
  const errors = [];

  if (!emailRegExp.test(values['guest-email'])) {
    errors['guest-email'] = 'Guest Email is not a valid email address';
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
