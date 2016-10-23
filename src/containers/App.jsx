import React from 'react';
import { Router, Route, browserHistory } from 'react-router';
import injectTapEventPlugin from 'react-tap-event-plugin';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import AppBar from 'material-ui/AppBar';
import Register from '../views/Register';
import CreateProfile from '../views/CreateProfile';
import CreateEvent from '../views/CreateEvent';
import CreateEventLocation from '../views/CreateEventLocation';
import CreateEventGuests from '../views/CreateEventGuests';
import EventList from '../views/EventList';
import * as paths from '../constants/paths';

injectTapEventPlugin();

export default function App() {
  return (
    <MuiThemeProvider>
      <div>
        <AppBar title="Meet-Up Event Planner" />
        <Router history={browserHistory}>
          <Route
            component={Register}
            path={paths.register}
          />
          <Route
            component={CreateProfile}
            path={paths.createProfile}
          />
          <Route
            component={EventList}
            path={paths.events}
          />
          <Route
            component={CreateEvent}
            path={paths.createEvent}
          />
          <Route
            component={CreateEventLocation}
            path={paths.createEventLocation}
          />
          <Route
            component={CreateEventGuests}
            path={paths.createEventGuests}
          />
        </Router>
      </div>
    </MuiThemeProvider>
  );
}
