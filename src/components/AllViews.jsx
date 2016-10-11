import React, { Component, PropTypes } from 'react';
import AppBar from 'material-ui/AppBar';
import { Tabs, Tab } from 'material-ui/Tabs';
import Register from './Register';

export default class AllViews extends Component {
  render() {
    return (
      <div>
        <AppBar title="Meet-Up Event Planner" />
        <Tabs>
          <Tab label="Register" />
          <Tab label="Login" />
        </Tabs>
        <Register />
      </div>
    )
  }
}
