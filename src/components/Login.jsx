
import React from 'react';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';
import FlatButton from 'material-ui/FlatButton';

export default function Login(props) {
  return (
    <form>
      <h1>Login</h1>
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
        label="Sign in"
        style={{ margin: '10px 10px 0 0' }}
        type="submit"
      />
      <FlatButton
        label="I already have an account"
        type="secondary"
      />
      <FlatButton
        label="Forgot Password?"
        type="plain"
      />
    </form>
  );
}
