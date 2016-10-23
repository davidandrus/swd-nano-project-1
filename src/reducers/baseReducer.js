import { handleActions } from 'redux-actions';
import * as actionTypes from '../constants/actionTypes';

const INITIAL_STATE = {
  createEvent: null,
  createEventLocation: null,
  createEventGuests: null,
};

export default handleActions({
  [actionTypes.createEvent]: (state, action) => ({
    ...state,
    createEvent: action.payload,
  }),
  [actionTypes.createEventLocation]: (state, action) => ({
    ...state,
    createEventLocation: action.payload,
  }),
  [actionTypes.createEventGuests]: (state, action) => ({
    ...state,
    createEventGuests: action.payload,
  }),


}, INITIAL_STATE);
