import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';
import base from './baseReducer';

const rootReducer = combineReducers({
  base,
  form: formReducer,
});

export default rootReducer;

export const getters = {
  getRegisterFormValues: state => state.form.register.values,
  getProfileFormValues: state => state.form.profile.values,
  getCreateFormValues: state => state.form.createEvent.values,
  getCreateLocationValues: state => state.form.createLocation.values,
  getCreateGuestsValues: state => state.form.createGuests.values,
  getEvents: state => state.base.events,
  getProfile: state => state.base.profile,
  getRegister: state => state.base.register,
};
