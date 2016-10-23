import { browserHistory } from 'react-router';
import * as actionTypes from '../constants/actionTypes';
import { getters } from '../reducers';
import * as paths from '../constants/paths';

export const goToCreateProfile = () => browserHistory.push(paths.createProfile);
export const goToRegister = () => browserHistory.push(paths.register);
export const goToEvents = () => browserHistory.push(paths.events);
export const goToCreateEvent = () => browserHistory.push(paths.createEvent);
export const goToCreateEventLocation = () => browserHistory.push(paths.createEventLocation);
export const goToCreateEventGuests = () => browserHistory.push(paths.createEventGuests);

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
