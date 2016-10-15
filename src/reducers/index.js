import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';
import base from './baseReducer';

const rootReducer = combineReducers({
  base,
  form: formReducer,
});

export default rootReducer;
