/* eslint-disable react/no-find-dom-node */
import moment from 'moment';
import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { reduxForm, Field } from 'redux-form';
import RaisedButton from 'material-ui/RaisedButton';
import { TextField } from 'redux-form-material-ui';
import { getters } from '../reducers';
import { standardMarginBottom } from '../constants/styles';
import DatePickerField from './DatePickerField';

function validate(values) {
  const errors = [];
  const birthDate = moment(values['birth-date']);

  if (!birthDate.isValid()) {
    errors['birth-date'] = 'Not a valid date';
  } else if (birthDate > moment()) {
    errors['birth-date'] = "Your birth date can't be in the future";
  }

  return errors;
}

function CreateProfileForm({ handleSubmit, onSubmit }) {
  return (
    <form onSubmit={handleSubmit(onSubmit)} noValidate>
      <Field
        autoFocus
        fullWidth
        autoComplete="organization"
        component={TextField}
        floatingLabelText="Employer Name"
        hintText="Enter Employer Name"
        name="employer"
      />
      <Field
        fullWidth
        autoComplete="organization-title"
        component={TextField}
        floatingLabelText="Job Title"
        hintText="Enter Your Job Title"
        name="title"
      />
      <DatePickerField
        autoComplete="bday"
        floatingLabelText="Birth Date mm/dd/yyyy"
        name="birth-date"
      />
      <Field
        fullWidth
        multiLine
        component={TextField}
        floatingLabelText="Bio"
        hintText="Tell us about yourself"
        name="bio"
        rows={2}
        style={standardMarginBottom}
        type="text"
      />
      <RaisedButton
        primary
        label="Save profile"
        type="submit"
      />
    </form>
  );
}

CreateProfileForm.propTypes = {
  handleSubmit: PropTypes.func,
  onSubmit: PropTypes.func,
};

const formified = reduxForm({
  form: 'profile',
  validate,
})(CreateProfileForm);

const mapStateToProps = state => ({ initialValues: getters.getProfile(state) });
export default connect(mapStateToProps)(formified);
