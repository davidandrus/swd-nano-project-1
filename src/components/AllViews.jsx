import React, { Component, PropTypes } from 'react';
import AppBar from 'material-ui/AppBar';
import { Tabs, Tab } from 'material-ui/Tabs';
import Register from './Register';
import Login from './Login';
import CreateEvent from './CreateEvent';

export default class AllViews extends Component {
  render() {
    return (
      <div style={{}}>
        <AppBar title="Meet-Up Event Planner" />
        <Tabs>
          <Tab label="Register" />
          <Tab label="Login" />
        </Tabs>
        <div style={{ maxWidth: '500px', margin: '0 auto', padding: '0 20px' }}>
          <Register />
          <Login />
          <CreateEvent />
        </div>
      </div>
    )
  }
}
