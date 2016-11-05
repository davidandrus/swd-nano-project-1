import { handleActions } from 'redux-actions';
import uniq from 'lodash/uniq';
import * as actionTypes from '../constants/actionTypes';
import {
  registerTrimmer,
  trimValues,
} from '../utils/helpers';

const INITIAL_STATE = {
  events: [],
  createEvent: null,
  createEventLocation: null,
  createEventGuests: {
    emails: [],
    message: '',
  },
  profile: null,
  register: null,
};

export default handleActions({
  [actionTypes.createEvent]: (state, action) => ({
    ...state,
    createEvent: trimValues(action.payload),
  }),
  [actionTypes.createEventLocation]: (state, action) => ({
    ...state,
    createEventLocation: trimValues(action.payload),
  }),
  [actionTypes.register]: (state, action) => ({
    ...state,
    register: registerTrimmer(action.payload),
  }),
  [actionTypes.createProfile]: (state, action) => ({
    ...state,
    profile: trimValues(action.payload),
  }),

  [actionTypes.addEvent]: state => ({
    ...state,
    events: [...state.events, {
      creator: state.register.name,
      ...state.createEvent,
      ...state.createEventLocation,
      // wasn't previously trimmed so doing it here.
      ...trimValues(state.createEventGuests),
    }],
    createEvent: INITIAL_STATE.createEvent,
    createEventLocation: INITIAL_STATE.createEventLocation,
    createEventGuests: INITIAL_STATE.createEventGuests,
  }),

  [actionTypes.addGuest]: (state, action) => ({
    ...state,
    createEventGuests: {
      ...state.createEventGuests,
      emails: uniq([...state.createEventGuests.emails, action.payload]),
    },
  }),

  [actionTypes.removeGuest]: (state, action) => ({
    ...state,
    createEventGuests: {
      ...state.createEventGuests,
      emails: state.createEventGuests.emails.filter(email => email !== action.payload),
    },
  }),

  [actionTypes.updateMessage]: (state, action) => ({
    ...state,
    createEventGuests: {
      ...state.createEventGuests,
      message: action.payload,
    },
  }),

}, INITIAL_STATE);
