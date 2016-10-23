import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { reduxForm, Field } from 'redux-form';
import RaisedButton from 'material-ui/RaisedButton';
import { TextField, DatePicker } from 'redux-form-material-ui';
import { getters } from '../reducers';
import { standardMarginBottom } from '../constants/styles';

export function CreateProfileForm({ handleSubmit, onSubmit }) {
  return (
    <form onSubmit={handleSubmit(onSubmit)} noValidate>
      <Field
        autoFocus
        fullWidth
        component={TextField}
        autoComplete="organization"
        floatingLabelText="Employer Name"
        hintText="Enter Employer Name"
        name="employer"
      />
      <Field
        fullWidth
        component={TextField}
        autoComplete="organization-title"
        floatingLabelText="Job Title"
        hintText="Enter Your Job Title"
        name="title"
      />
      <Field
        fullWidth
        autoComplete="bday"
        component={DatePicker}
        floatingLabelText="Birth Date"
        hintText="Select your BirthDate"
        maxDate={new Date(Date.now())}
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
        type="text"
        style={standardMarginBottom}
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
})(CreateProfileForm);

const mapStateToProps = state => ({ initialValues: getters.getProfile(state) });
export default connect(mapStateToProps)(formified);
