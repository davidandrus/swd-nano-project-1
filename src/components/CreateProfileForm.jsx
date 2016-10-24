/* eslint-disable react/no-find-dom-node */
import moment from 'moment';
import React, { PropTypes, Component } from 'react';
import { findDOMNode } from 'react-dom';
import { connect } from 'react-redux';
import { reduxForm, Field } from 'redux-form';
import RaisedButton from 'material-ui/RaisedButton';
import { TextField } from 'redux-form-material-ui';
import { getters } from '../reducers';
import { standardMarginBottom } from '../constants/styles';
import DatePickerButton from './DatePickerButton';

const datePickerWrapper = {
  alignItems: 'flex-start',
  display: 'flex',
};

const datePickerButtonWrapper = {
  flex: '0 0 40px',
  paddingTop: '22px',
};

const datePickerFieldWrapper = {
  flex: '999 0 auto',
};

function validate(values) {
  const errors = [];
  const birthDate = moment(values['birth-date']);

  if (!birthDate.isValid()) {
    errors['birth-date'] = 'Not a valid date';
  } else if (birthDate > moment()) {
    errors['birth-date'] = "Your birth date can't be in the future";
  }

  return errors;
}

const getInputFromField = ref => ref.getRenderedComponent().props.input;
const getInputFromFieldNode = ref => findDOMNode(ref.getRenderedComponent()).querySelector('input');
class CreateProfileForm extends Component {

  constructor(...args) {
    super(...args);
    this._updateBirthdayInput = this._updateBirthdayInput.bind(this);
  }

  componentDidMount() {
    this._birthdayNode = getInputFromFieldNode(this._birthdayInput);
    this._usesModernDateInput = this._birthdayNode.type === 'date';
  }

  _updateBirthdayInput(date) {
    const modernDateInputFormat = 'YYYY-MM-DD';
    const standardTextDateInputFormat = 'MM/DD/YYYY';

    const formattedDate = moment(date).format(
      this._usesModernDateInput
      ? modernDateInputFormat
      : standardTextDateInputFormat
    );

    getInputFromField(this._birthdayInput).onChange(formattedDate);
  }

  render() {
    const { handleSubmit, onSubmit } = this.props;
    return (
      <form onSubmit={handleSubmit(onSubmit)} noValidate>
        <Field
          autoFocus
          fullWidth
          autoComplete="organization"
          component={TextField}
          floatingLabelText="Employer Name"
          hintText="Enter Employer Name"
          name="employer"
        />
        <Field
          fullWidth
          autoComplete="organization-title"
          component={TextField}
          floatingLabelText="Job Title"
          hintText="Enter Your Job Title"
          name="title"
        />
        <div style={datePickerWrapper}>
          <div style={datePickerFieldWrapper}>
            <Field
              floatingLabelFixed
              fullWidth
              withRef
              autoComplete="bday"
              component={TextField}
              floatingLabelText="Birth Date mm/dd/yyyy"
              name="birth-date"
              type="date"
              ref={(input) => { this._birthdayInput = input; }}
            />
          </div>
          <div style={datePickerButtonWrapper}>
            <DatePickerButton onSelect={this._updateBirthdayInput} />
          </div>
        </div>
        <Field
          fullWidth
          multiLine
          component={TextField}
          floatingLabelText="Bio"
          hintText="Tell us about yourself"
          name="bio"
          rows={2}
          style={standardMarginBottom}
          type="text"
        />
        <RaisedButton
          primary
          label="Save profile"
          type="submit"
        />
      </form>
    );
  }
}

CreateProfileForm.propTypes = {
  handleSubmit: PropTypes.func,
  onSubmit: PropTypes.func,
};

const formified = reduxForm({
  form: 'profile',
  validate,
})(CreateProfileForm);

const mapStateToProps = state => ({ initialValues: getters.getProfile(state) });
export default connect(mapStateToProps)(formified);
