import React, {
  Component,
  PropTypes,
} from 'react';
import { connect } from 'react-redux';
import {
  reduxForm,
  Field,
} from 'redux-form';
import { TextField } from 'redux-form-material-ui';
import RaisedButton from 'material-ui/RaisedButton';
import RequiredLabel from './RequiredLabel';
import SelectField from './SelectField';
import { getters } from '../reducers';
import { standardMarginBottom } from '../constants/styles';
import states from '../constants/states';
import { zipCodeRegExp } from '../constants/regex';
import { trimValues } from '../utils/helpers';
import {
  initAutocomplete,
  teardownAutocomplete,
} from '../handleGoogleAutoComplete';

const nameMap = {
  'location-address': 'Street Address',
  'location-address-2': 'Suite/Apt',
  city: 'City',
  state: 'State',
  'postal-code': 'Zip Code',
};

function validate(origValues) {
  const errors = [];
  const values = trimValues(origValues);

  // required fields
  [
    'location-address',
    'city',
    'state',
    'postal-code',
  ].forEach((key) => {
    if (!values[key]) {
      errors[key] = `${nameMap[key]} is required`;
    }
  });

  if (!errors['postal-code']) {
    const isValid = zipCodeRegExp.test(values['postal-code']);
    if (!isValid) {
      errors['postal-code'] = `${nameMap['postal-code']} is not in the correct format e.g. 12345 or 12345-1234`;
    }
  }

  return errors;
}

const stateItems = Object.keys(states).map(type => ({
  value: type,
  label: states[type],
}));

class CreateEventLocationForm extends Component {
  componentDidMount() {
    initAutocomplete();
  }

  componentWillUnmount() {
    teardownAutocomplete();
  }

  render() {
    const { handleSubmit, onSubmit } = this.props;

    return (
      <form onSubmit={handleSubmit(onSubmit)} noValidate>
        <Field
          fullWidth
          required
          autoFocus
          id="google-places-autocomplete"
          autoComplete="address-line1"
          component={TextField}
          floatingLabelText={<RequiredLabel text={nameMap['location-address']} />}
          hintText="Enter Street Adress"
          name="location-address"
          type="text"
        />
        <Field
          fullWidth
          autoComplete="address-line2"
          component={TextField}
          floatingLabelText={nameMap['location-address-2']}
          hintText="Enter Apt/Suite Number"
          name="location-address-2"
          type="text"
        />
        <Field
          fullWidth
          required
          autoComplete="address-level2"
          component={TextField}
          floatingLabelText={<RequiredLabel text={nameMap.city} />}
          hintText="Enter City"
          name="city"
          type="text"
        />
        <Field
          fullWidth
          required
          autoComplete="address-level1"
          component={SelectField}
          floatingLabelText={<RequiredLabel text={nameMap.state} />}
          hintText="Enter State"
          name="state"
          options={stateItems}
        />
        <Field
          fullWidth
          required
          autoComplete="postal-code"
          component={TextField}
          floatingLabelText={<RequiredLabel text={nameMap['postal-code']} />}
          hintText="Enter Zip Code"
          name="postal-code"
          type="text"
          style={standardMarginBottom}
        />

        <RaisedButton
          primary
          label="Continue"
          type="submit"
        />
      </form>
    );
  }
}

CreateEventLocationForm.propTypes = {
  handleSubmit: PropTypes.func,
  onSubmit: PropTypes.func,
};

const formified = reduxForm({
  form: 'createEventLocation',
  validate,
})(CreateEventLocationForm);

const mapStateToProps = state => ({ initialValues: getters.getCreateEventLocation(state) });
export default connect(mapStateToProps)(formified);
