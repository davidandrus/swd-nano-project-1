import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { routerMiddleware } from 'react-router-redux';
import { browserHistory } from 'react-router';
import rootReducer from '../reducers';

const router = routerMiddleware(browserHistory);
const enhancer = applyMiddleware(thunk, router);

function configureStore(initialState) {
  return createStore(rootReducer, initialState, enhancer);
}

export default configureStore();
