import React, { Component, PropTypes } from 'react';

import Register from './Register';
import Login from './Login';
import CreateEvent from './CreateEvent';
import EventList from './EventList';

export default class AllViews extends Component {
  render() {
    return (
      <div style={{}}>

        <div style={{ maxWidth: '500px', margin: '0 auto', padding: '0 20px' }}>
          <Register />
          {/*
            <Login />
            <CreateEvent />
            <EventList />
          */}
        </div>
      </div>
    )
  }
}
