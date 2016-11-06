import React, { PropTypes } from 'react';
import get from 'lodash/get';
import { connect } from 'react-redux';
import { reduxForm, Field } from 'redux-form';
import RaisedButton from 'material-ui/RaisedButton';
import { TextField } from 'redux-form-material-ui';
import RequiredLabel from './RequiredLabel';
import DynamicValidator from './DynamicValidator';
import { emailRegExp } from '../constants/regex';
import {
  standardMarginBottom,
  standardMargin,
} from '../constants/styles';
import { getters } from '../reducers';
import { registerTrimmer } from '../utils/helpers';

const nameMap = {
  name: 'Full Name',
  email: 'Email',
  password: 'Password',
};

const specialChars = [
  '$',
  '^',
  '*',
  '@',
  '<',
  '>',
  '#',
  '&',
];
const specialCharsRegex = new RegExp(`[\\${specialChars.join('\\')}]`);
const isValidLength = value => value && value.length > 7;
const hasLowerCaseLetter = value => /[a-z]/.test(value);
const hasUpperCaseLetter = value => /[A-Z]/.test(value);
const hasNumber = value => /[0-9]/.test(value);
const hasSpecialCharacter = value => specialCharsRegex.test(value);

function validate(origValues) {
  const values = registerTrimmer(origValues);
  const errors = {};

  // required fields;
  ['name', 'email'].forEach((key) => {
    if (!values[key]) {
      errors[key] = `${nameMap[key]} is required`;
    }
  });

  if (!emailRegExp.test(values.email)) {
    errors.email = `${nameMap.email} is not a valid email address`;
  }

  if (!(isValidLength(values.password) &&
      hasLowerCaseLetter(values.password) &&
      hasUpperCaseLetter(values.password) &&
      hasNumber(values.password) &&
      hasSpecialCharacter(values.password))) {
    errors.password = ' '; // have to set error even though we dont want to display really
  }

  return errors;
}

export function RegisterForm({ handleSubmit, onSubmit, passwordValue, passwordBlurred }) {
  return (
    <form onSubmit={handleSubmit(onSubmit)} noValidate>
      <Field
        autoFocus
        fullWidth
        required
        autoComplete="name"
        component={TextField}
        floatingLabelText={<RequiredLabel text="Full Name" />}
        hintText="Enter Your Full Name"
        name="name"
        type="text"
      />
      <Field
        fullWidth
        required
        autoComplete="email"
        component={TextField}
        floatingLabelText={<RequiredLabel text="Email" />}
        hintText="Enter Your Email"
        name="email"
        type="email"
      />
      <Field
        fullWidth
        required
        autoComplete="new-password"
        component={TextField}
        floatingLabelText={<RequiredLabel text="Password" />}
        hintText="Enter Your Password"
        name="password"
        type="password"
      />
      <DynamicValidator
        hasBlurred={passwordBlurred}
        isValid={isValidLength(passwordValue)}
        label="Must be at least 8 characters log"
      />
      <DynamicValidator
        hasBlurred={passwordBlurred}
        isValid={hasLowerCaseLetter(passwordValue)}
        label="Must contain lowercase letter"
      />
      <DynamicValidator
        hasBlurred={passwordBlurred}
        isValid={hasUpperCaseLetter(passwordValue)}
        label="must contain uppercase letter"
      />
      <DynamicValidator
        hasBlurred={passwordBlurred}
        isValid={hasNumber(passwordValue)}
        label="must contain a number"
      />
      <DynamicValidator
        hasBlurred={passwordBlurred}
        isValid={hasUpperCaseLetter(passwordValue)}
        label="must contain a number"
      />
      <DynamicValidator
        hasBlurred={passwordBlurred}
        isValid={hasSpecialCharacter(passwordValue)}
        label={`Must contain one of the following special characters: ${specialChars.join(',')}`}
      />
      <RaisedButton
        primary
        label="Save Profile"
        type="submit"
        style={{ marginTop: standardMargin }}
      />
    </form>
  );
}

RegisterForm.propTypes = {
  handleSubmit: PropTypes.func,
  onSubmit: PropTypes.func,
  passwordValue: PropTypes.string,
  passwordBlurred: PropTypes.bool,
};

const formified = reduxForm({
  form: 'register',
  validate,
})(RegisterForm);

const mapStateToProps = (state) => {
  const touched = get(state, 'form.register.fields.password.touched');
  const visited = get(state, 'form.register.fields.password.visited');
  return {
    initialValues: getters.getRegister(state),
    passwordValue: get(state, 'form.register.values.password', ''),
    passwordBlurred: touched && visited,
  };
};

export default connect(mapStateToProps)(formified);
