import { push } from 'react-router-redux';
import * as actionTypes from '../constants/actionTypes';
import { getters } from '../reducers';
import * as paths from '../constants/paths';
import store from '../store/configureStore';

export const goToCreateProfile = () => store.dispatch(push(paths.createProfile));
export const goToRegister = () => store.dispatch(push(paths.register));
export const goToEvents = () => store.dispatch(push(paths.events));
export const goToCreateEvent = () => store.dispatch(push(paths.createEvent));
export const goToCreateEventLocation = () => store.dispatch(push(paths.createEventLocation));
export const goToCreateEventGuests = () => store.dispatch(push(paths.createEventGuests));

const getStandardAction = name => payload => ({
  type: name,
  payload,
});

const registerSync = getStandardAction(actionTypes.register);
const createProfileSync = getStandardAction(actionTypes.createProfile);
const createEventSync = getStandardAction(actionTypes.createEvent);
const createEventLocationSync = getStandardAction(actionTypes.createEventLocation);
const createEventGuestsSync = getStandardAction(actionTypes.createEventGuests);
const addEvent = getStandardAction(actionTypes.addEvent);

export function register() {
  return (dispatch, getState) => {
    dispatch(registerSync(getters.getRegisterFormValues(getState())));
    goToCreateProfile();
  };
}

export function createProfile() {
  return (dispatch, getState) => {
    dispatch(createProfileSync(getters.getProfileFormValues(getState())));
    goToEvents();
  };
}

export function createEvent(values) {
  return (dispatch) => {
    dispatch(createEventSync(values));
    goToCreateEventLocation();
  };
}

export function createEventLocation(values) {
  return (dispatch) => {
    dispatch(createEventLocationSync(values));
    goToCreateEventGuests();
  };
}

export function addGuests(values) {
  return (dispatch) => {
    dispatch(createEventGuestsSync(values));
    dispatch(addEvent());
    goToEvents();
  };
}
