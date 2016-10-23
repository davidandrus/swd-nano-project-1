import React, { PropTypes, Component } from 'react';
import { findDOMNode } from 'react-dom';
import { reduxForm, Field } from 'redux-form';
import { TextField } from 'redux-form-material-ui';
import RaisedButton from 'material-ui/RaisedButton';
import RequiredLabel from './RequiredLabel';
import { emailRegExp } from '../constants/regex';

const inlineInputWrapper = {
  display: 'flex',
  marginBottom: '20px',
};

const inlineInput = {
  flex: '0 999 auto',
};

const inlineButton = {
  flex: '0 0 100px',
  marginLeft: '20px',
  paddingTop: '28px', // to offset hidden label area
};

function validate(values) {
  const errors = [];

  if (!emailRegExp.test(values['guest-email'])) {
    errors['guest-email'] = 'Guest Email is not a valid email address';
  }

  return errors;
}


class AddGuestForm extends Component {

  constructor(...args) {
    super(...args);
    this._onSubmit = this._onSubmit.bind(this);
  }

  _onSubmit(values) {
    this.props.onSubmit(values);

    // this is gross but it seems to be the only way to focus the passed TextField
    // es-lint-disable-next-line no-find-dom-node
    findDOMNode(this._input).querySelector('input[type="email"]').focus();
  }

  render() {
    const { handleSubmit } = this.props;

    return (
      <form onSubmit={handleSubmit(this._onSubmit)} noValidate>
        <div style={inlineInputWrapper}>
          <Field
            autoFocus
            fullWidth
            component={TextField}
            ref={(input) => { this._input = input; }}
            floatingLabelText="Add Guest Email"
            hintText="Enter Guest Email"
            name="guest-email"
            style={inlineInput}
            type="email"
          />
          <div style={inlineButton}>
            <RaisedButton
              secondary
              label="Add"
              type="submit"
            />
          </div>
        </div>
      </form>
    );
  }
}


AddGuestForm.propTypes = {
  handleSubmit: PropTypes.func,
  onSubmit: PropTypes.func,
};

export default reduxForm({
  form: 'createEventGuest',
  validate,
})(AddGuestForm);
