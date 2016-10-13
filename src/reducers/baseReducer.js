import { handleActions } from 'redux-actions';

const INITIAL_STATE = {
  sweet: 'this is my state'
};

export default handleActions({}, INITIAL_STATE);
