import React, { Component } from 'react';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';
import FlatButton from 'material-ui/FlatButton';
import { Stepper, Step, StepLabel } from 'material-ui/Stepper';

export default class Register extends Component {
  render() {
    return (
      <div style={{ maxWidth: 500, margin: '0 auto' }}>
        <Stepper>
          <Step>
            <StepLabel>Basic Info</StepLabel>
          </Step>
          <Step>
            <StepLabel>Optional Personal Info</StepLabel>
          </Step>
        </Stepper>
        <form>
          <TextField
            autoFocus
            fullWidth
            autoComplete="name"
            floatingLabelText="Full Name"
            hintText="Enter Your Full Name"
            name="name"
            type="text"
          />
          <TextField
            autoFocus
            fullWidth
            autoComplete="email"
            floatingLabelText="Email"
            hintText="Enter Your Email"
            name="email"
            type="email"
          />
          <TextField
            autoFocus
            fullWidth
            autoComplete="name"
            floatingLabelText="Password"
            hintText="Enter Your Password"
            name="Password"
            type="password"
          />
          <RaisedButton
            primary
            label="Create My Account"
            style={{ margin: '10px 10px 0 0' }}
            type="submit"
          />
          <FlatButton
            label="I already have an account"
            type="secondary"
          />
        </form>
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
      </div>
    )
  }
}
