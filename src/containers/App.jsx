import React, { Component } from 'react';

import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import AllViews from '../components/AllViews';

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
