// this is obviously gross
import find from 'lodash/find';
import includes from 'lodash/includes';
import store from './store/configureStore';
import { autocompletePlaces } from './actions';

let autocomplete;

function getLocationChunk(arr, type, pullKey) {
  const found = find(arr, component => includes(component.types, type));
  return found ? found[pullKey] : '';
}

function populateFields() {
  const { address_components } = autocomplete.getPlace();
  /**
   *  @NOTE - is important that the keys in the object map directly to the name
   *  attribute of the corresponding input
   */
  const addressObj = {
    'location-address': [
      getLocationChunk(address_components, 'street_number', 'long_name'),
      getLocationChunk(address_components, 'route', 'long_name'),
    ].join(' ').trim(),
    city: getLocationChunk(address_components, 'locality', 'long_name'),
    state: getLocationChunk(address_components, 'administrative_area_level_1', 'short_name'),
    'postal-code': getLocationChunk(address_components, 'postal_code', 'long_name'),
  };
  store.dispatch(autocompletePlaces(addressObj));
}

/* eslint-disable no-undef */
window.initAutocomplete = function initAutocomplete() {
  autocomplete = new google.maps.places.Autocomplete(

    document.getElementById('google-places-autocomplete'),
    { types: ['geocode'] }
  );

  // When the user selects an address from the dropdown, populate the address
  // fields in the form.
  autocomplete.addListener('place_changed', populateFields);
};
/* eslint-enable no-undef */
