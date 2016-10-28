import React from 'react';
import { Router, Route, browserHistory } from 'react-router';
import { syncHistoryWithStore } from 'react-router-redux';
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
import store from '../store/configureStore';
import { getters } from '../reducers';

injectTapEventPlugin();

const history = syncHistoryWithStore(browserHistory, store);

const isRegistered = () => getters.getRegister(store.getState());
const requireRegistration = (replace) => {
  if (!isRegistered()) replace(paths.register);
};

const requireCreateEvent = (replace) => {
  if (!getters.getCreateEvent(store.getState())) replace(paths.createEvent);
};

const requireCreateEventLocation = (replace) => {
  if (!getters.getCreateEventLocation(store.getState())) replace(paths.createEventLocation);
};

const enterHooks = {
  register(nextState, replace) {
    if (isRegistered()) {
      replace(paths.events);
    }
  },
  createProfile(nextState, replace) {
    // requireRegistration(replace);
  },
  createEvent(nextState, replace) {
    // requireRegistration(replace);
  },
  createEventLocation(nextState, replace) {
    // requireRegistration(replace);
    // requireCreateEvent(replace);
  },
  createEventGuests(nextState, replace) {
    // requireRegistration(replace);
    // requireCreateEvent(replace);
    // requireCreateEventLocation(replace);
  },
};

export default function App() {
  return (
    <MuiThemeProvider>
      <div>
        <AppBar
          showMenuIconButton={false}
          title="Meet-Up Event Planner"
        />
        <Router history={history}>
          <Route
            onEnter={enterHooks.register}
            component={Register}
            path={paths.register}
          />
          <Route
            onEnter={enterHooks.createProfile}
            component={CreateProfile}
            path={paths.createProfile}
          />
          <Route
            onEnter={enterHooks.createEvent}
            component={CreateEvent}
            path={paths.createEvent}
          />
          <Route
            onEnter={enterHooks.createEventLocation}
            component={CreateEventLocation}
            path={paths.createEventLocation}
          />
          <Route
            onEnter={enterHooks.createEventGuests}
            component={CreateEventGuests}
            path={paths.createEventGuests}
          />
          <Route
            component={EventList}
            path={paths.events}
          />
        </Router>
      </div>
    </MuiThemeProvider>
  );
}
