import React, { PropTypes } from 'react';
import { reduxForm, Field } from 'redux-form';
import RaisedButton from 'material-ui/RaisedButton';
import { TextField } from 'redux-form-material-ui';
import RequiredLabel from './RequiredLabel';

const nameMap = {
  name: 'Full Name',
  email: 'Email',
  password: 'Password',
};

// http://stackoverflow.com/a/7786283/1830384 - using webkit regex
const emailRegExp = /[a-z0-9!#$%&'*+/=?^_`{|}~.-]+@[a-z0-9-]+(\.[a-z0-9-]+)*/;
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

const passwordRules = [
  /[A-Z]/,
  /[a-z]/,
  /[0-9]/,
  new RegExp(`[\\${specialChars.join('\\')}]`),
];

function validate(values) {
  const errors = {};

  // required fields;
  ['name', 'email', 'password'].forEach(key => {
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
  if (! errors.password) {
    passwordRules.forEach(rule => {
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
        autoComplete="name"
        component={TextField}
        floatingLabelText={<RequiredLabel text="Full Name" />}
        hintText="Enter Your Full Name"
        name="name"
        type="text"
        required
      />
      <Field
        fullWidth
        autoComplete="email"
        component={TextField}
        floatingLabelText={<RequiredLabel text="Email" />}
        hintText="Enter Your Email"
        name="email"
        type="email"
      />
      <Field
        fullWidth
        autocomplete="new-password"
        component={TextField}
        floatingLabelText={<RequiredLabel text="Password" />}
        hintText="Enter Your Password"
        name="password"
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

export default reduxForm({
  form: 'register',
  validate,
})(RegisterForm);
