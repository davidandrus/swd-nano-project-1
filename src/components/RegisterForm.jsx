import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { reduxForm, Field } from 'redux-form';
import RaisedButton from 'material-ui/RaisedButton';
import { TextField } from 'redux-form-material-ui';
import RequiredLabel from './RequiredLabel';
import { emailRegExp } from '../constants/regex';
import { standardMarginBottom } from '../constants/styles';
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

// must contain uppercase letter, lowercase letter, number and special character
const passwordRules = [
  /[A-Z]/,
  /[a-z]/,
  /[0-9]/,
  new RegExp(`[\\${specialChars.join('\\')}]`),
];

function validate(origValues) {
  const values = registerTrimmer(origValues);
  const errors = {};

  console.log(values);

  // required fields;
  ['name', 'email', 'password'].forEach((key) => {
    if (!values[key]) {
      errors[key] = `${nameMap[key]} is required`;
    }
  });

  if (!emailRegExp.test(values.email)) {
    errors.email = `${nameMap.email} is not a valid email address`;
  }

  if (values.password && values.password.length < 8) {
    errors.password = `${nameMap.password} must be at least 8 characters`;
  }

  // make sure the required or length error passes through, before these specific password rules
  if (!errors.password) {
    passwordRules.forEach((rule) => {
      // not using trim values here since we want to capture spaces in password
      if (!rule.test(values.password)) {
        errors.password = `${nameMap.password} must contain at least one lowercase letter, an uppercase letter,
          a number and one of the following special characters ${specialChars.join(',')}`;
      }
    });
  }

  return errors;
}

export function RegisterForm({ handleSubmit, onSubmit }) {
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
        style={standardMarginBottom}
        type="password"
      />
      <RaisedButton
        primary
        label="Save Profile"
        type="submit"
      />
    </form>
  );
}

RegisterForm.propTypes = {
  handleSubmit: PropTypes.func,
  onSubmit: PropTypes.func,
};

const formified = reduxForm({
  form: 'register',
  validate,
})(RegisterForm);

const mapStateToProps = state => ({ initialValues: getters.getRegister(state) });
export default connect(mapStateToProps)(formified);
