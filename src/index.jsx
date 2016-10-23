import React from 'react';
import { render } from 'react-dom';
import store from './store/configureStore';
import Root from './containers/Root';

render(
  <Root store={store} />,
  // eslint-disable-next-line no-undef
  document.getElementById('root')
);
