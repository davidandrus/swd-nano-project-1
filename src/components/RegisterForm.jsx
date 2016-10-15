import React from 'react';
import { reduxForm, Field } from 'redux-form';
import RaisedButton from 'material-ui/RaisedButton';
import { TextField } from 'redux-form-material-ui';

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

console.log(passwordRules);

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

  // make sure the is required error passes through, before the specific password rules
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

function RegisterForm(props) {
  return (
    <form>
      <Field
        component={TextField}
        autoFocus
        fullWidth
        autoComplete="name"
        floatingLabelText="Full Name"
        hintText="Enter Your Full Name"
        name="name"
        type="text"
        required
      />
      <Field
        component={TextField}
        fullWidth
        autoComplete="email"
        floatingLabelText="Email"
        hintText="Enter Your Email"
        name="email"
        type="email"
      />
      <Field
        component={TextField}
        fullWidth
        floatingLabelText="Password"
        hintText="Enter Your Password"
        name="password"
        type="password"
      />
      <RaisedButton
        primary
        label="Create Account"
        style={{ margin: '10px 10px 0 0' }}
        type="submit"
      />
    </form>
  );
}

export default reduxForm({
  form: 'registerRequired',
  validate,
})(RegisterForm);
