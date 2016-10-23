import React, { PropTypes } from 'react';
import { Provider } from 'react-redux';
import App from './App';

export default function Root({ store }) {
  return (
    <Provider store={store}>
      <App />
    </Provider>
  );
}

Root.propTypes = {
  // eslint-disable-next-line react/forbid-prop-types
  store: PropTypes.any,
};
