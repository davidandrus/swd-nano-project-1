import { combineReducers } from 'redux';
import get from 'lodash/get';
import { reducer as formReducer } from 'redux-form';
import { routerReducer } from 'react-router-redux';
import base from './baseReducer';

const rootReducer = combineReducers({
  base,
  form: formReducer,
  routing: routerReducer,
});

export default rootReducer;

export const getters = {
  getRegisterFormValues: state => get(state, 'form.register.values'),
  getProfileFormValues: state => get(state, 'form.profile.values'),
  getCreateFormValues: state => get(state, 'form.createEvent.values'),
  getCreateLocationValues: state => get(state, 'form.createLocation.values'),
  getCreateGuestsValues: state => get(state, 'form.createGuests.values'),
  getEvents: state => get(state, 'base.events'),
  getProfile: state => get(state, 'base.profile'),
  getRegister: state => get(state, 'base.register'),
  getCreateEvent: state => get(state, 'base.createEvent'),
  getCreateEventLocation: state => get(state, 'base.createEventLocation'),
  getCreateEventGuests: state => get(state, 'base.createEventGuests'),
};
