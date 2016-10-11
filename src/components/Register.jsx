import React, { Component } from 'react';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';
import FlatButton from 'material-ui/FlatButton';
import { Stepper, Step, StepLabel } from 'material-ui/Stepper';

export default class Register extends Component {
  render() {
    return (
      <div>
        <Stepper style={{ maxWidth: 500, margin: '0 auto' }}>
          <Step>
            <StepLabel>Basic Info</StepLabel>
          </Step>
          <Step>
            <StepLabel>Optional Personal Info</StepLabel>
          </Step>
        </Stepper>
        <form>
          <TextField
            fullWidth
            hintText="Enter Your Full Name"
            floatingLabelText="Full Name"
            name="name"
            autoFocus
            autoComplete="name"
          />
          <TextField
            fullWidth
            hintText="Enter Your Email"
            floatingLabelText="Email"
            name="email"
            autoFocus
            autoComplete="email"
            type="email"
          />
          <TextField
            fullWidth
            hintText="Enter Your Password"
            floatingLabelText="Password"
            name="Password"
            autoFocus
            autoComplete="name"
            type="password"
          />
          <RaisedButton
            style={{ margin: '10px 10px 0 0' }}
            label="Create My Account"
            type="submit"
            primary
          />
          <FlatButton
            type="secondary"
            label="I already have an account"
          />
        </form>
      </div>
    )
  }
}
