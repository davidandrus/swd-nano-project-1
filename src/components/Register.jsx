import React from 'react';
import { browserHistory } from 'react-router';
import { connect } from 'react-redux';
import { Stepper, Step, StepLabel } from 'material-ui/Stepper';
import LoginRegisterWrapper from './LoginRegisterWrapper';
import DatePicker from 'material-ui/DatePicker';
import RegisterForm from './RegisterForm';
import FlatButton from 'material-ui/FlatButton';

const goToLogin = () => browserHistory.push('/login');
//const handleRegisterSubmit = () => alert('handling register submit', arguments);

function Register({ route }) {
  return (
    <LoginRegisterWrapper activePath={route.path}>
      <Stepper activeStep={0}>
        <Step>
          <StepLabel>Basic Info</StepLabel>
        </Step>
        <Step>
          <StepLabel>Optional Personal Info</StepLabel>
        </Step>
      </Stepper>
      <RegisterForm />
      {/*
      <FlatButton
        onClick={goToLogin}
        label="I already have an account"
        type="secondary"
      />
      */}
      {/*
      <h2>Thanks for Signing up!</h2>
      <h3>Please share some info so people can know what you are all about.</h3>
      <form>
        <TextField
          fullWidth
          autoComplete="organization"
          floatingLabelText="Employer Name"
          hintText="Enter Employer Name"
          name="employer"
          type="text"
        />
        <TextField
          fullWidth
          autoComplete="organization-title"
          floatingLabelText="Job Title"
          hintText="Enter Your Job Title"
          name="title"
          type="text"
        />
        <DatePicker
          fullWidth
          disableYearSelection
          floatingLabelText="Birth Date"
          hintText="Select your BirthDate"
        />
        <TextField
          fullWidth
          multiLine
          autoComplete=""
          floatingLabelText="Bio"
          hintText="Tell us about yourself"
          name="bio"
          rows={2}
          type="text"
        />
      </form>
      */}
    </LoginRegisterWrapper>
  );
}

export default connect(state => state)(Register);
