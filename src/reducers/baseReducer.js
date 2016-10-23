import { handleActions } from 'redux-actions';
import * as actionTypes from '../constants/actionTypes';

const INITIAL_STATE = {
  events: [],
  createEvent: null,
  createEventLocation: null,
  createEventGuests: null,
  profile: null,
  register: null,
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
  [actionTypes.register]: (state, action) => ({
    ...state,
    register: action.payload,
  }),
  [actionTypes.createProfile]: (state, action) => ({
    ...state,
    profile: action.payload,
  }),

  [actionTypes.addEvent]: state => ({
    ...state,
    events: [...state.events, {
      ...state.createEvent,
      ...state.createEventLocation,
      ...state.createEventGuests,
    }],
    createEvent: null,
    createEventLocation: null,
    createEventGuests: null,
  }),
}, INITIAL_STATE);
