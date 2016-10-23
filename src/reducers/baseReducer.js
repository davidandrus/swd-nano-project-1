import { handleActions } from 'redux-actions';
import uniq from 'lodash/uniq';
import * as actionTypes from '../constants/actionTypes';
import { getters } from '../reducers';

const testEvent = {"creator": "RIGHTON", "event-name":"My Cool Event","event-type":"wedding","host":"My Awesome Host","start-date":"2016-10-23T06:16:49.050Z","start-time":"2016-10-23T06:16:51.237Z","end-date":"2016-10-23T06:16:52.656Z","end-time":"2016-10-23T06:16:54.737Z","location-address":"1900 NE 48th St.","location-address-2":"Unit A-103","city":"Lynnwood","state":"Washington","postal-code":"98056","emails":["djskatan@yahoo.com"],"message":"test"};

const INITIAL_STATE = {
  events: [testEvent],
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
      creator: state.register.name,
      ...state.createEvent,
      ...state.createEventLocation,
      ...state.createEventGuests,
    }],
    createEvent: INITIAL_STATE.createEvent,
    createEventLocation: INITIAL_STATE.createEventLocation,
    createEventGuests: INITIAL_STATE.createEventGuests,
  }),

  [actionTypes.addGuest]: (state, action) => {
    return {
      ...state,
      createEventGuests: {
        emails: uniq([...state.createEventGuests.emails, action.payload]),
      },
    };
  },

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
