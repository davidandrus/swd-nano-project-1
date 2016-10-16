import { browserHistory } from 'react-router';
import * as actionTypes from '../constants/actionTypes';
import { getters } from '../reducers';
import * as paths from '../constants/paths';

export const goToCreateProfile = () => browserHistory.push(paths.createProfile);
export const goToRegister = () => browserHistory.push(paths.register);
export const goToEvents = () => browserHistory.push(paths.events);

const registerSync = payload => ({
  payload,
  type: actionTypes.register,
});

const createProfileSync = payload => {
  console.log('profile Sync Payload', actionTypes.createProfile, payload);
  return {
    payload,
    type: actionTypes.createProfile
  };
}

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
