import React, { Component, PropTypes } from 'react';
import AppBar from 'material-ui/AppBar';
import { Tabs, Tab } from 'material-ui/Tabs';
import Register from './Register';
import Login from './Login';

export default class AllViews extends Component {
  render() {
    return (
      <div>
        <AppBar title="Meet-Up Event Planner" />
        <Tabs>
          <Tab label="Register" />
          <Tab label="Login" />
        </Tabs>
        <div style={{ maxWidth: '500px', margin: '0 auto' }}>
          <Register />
          <Login />
        </div>
      </div>
    )
  }
}
