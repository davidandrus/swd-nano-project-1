import React from 'react';
import { Router, Route, browserHistory } from 'react-router';
import injectTapEventPlugin from 'react-tap-event-plugin';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import AppBar from 'material-ui/AppBar';
import Register from '../components/Register';
import Login from '../components/Login';

injectTapEventPlugin();

export default function App() {
  return (
    <MuiThemeProvider>
      <div>
        <AppBar title="Meet-Up Event Planner" />
        <Router history={browserHistory}>
          <Route
            path="/"
            component={Register}
          />
          <Route
            path="/login"
            component={Login}
          />
        </Router>
      </div>
    </MuiThemeProvider>
  );
}

// function select(state) {
//   return {
//     counter: state.counter,
//   };
// }
//
// export default connect(select)(App);
