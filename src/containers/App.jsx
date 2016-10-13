import React, { Component } from 'react';

import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import AllViews from '../components/AllViews';
import injectTapEventPlugin from 'react-tap-event-plugin';
injectTapEventPlugin();

export default class App extends Component {
  render() {
    return (
      <MuiThemeProvider>
        <AllViews />
      </MuiThemeProvider>
    );
  }
}

// function select(state) {
//   return {
//     counter: state.counter,
//   };
// }
//
// export default connect(select)(App);
