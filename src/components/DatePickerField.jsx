/* eslint-disable react/no-find-dom-node */
import React, { PropTypes, Component } from 'react';
import { findDOMNode } from 'react-dom';
import moment from 'moment';
import { Field } from 'redux-form';
import { TextField } from 'redux-form-material-ui';
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

const getInputFromField = ref => ref.getRenderedComponent().props.input;
const getInputFromFieldNode = ref => findDOMNode(ref.getRenderedComponent()).querySelector('input');

export default class DatePickerField extends Component {

  constructor(...args) {
    super(...args);
    this._updateInput = this._updateInput.bind(this);
  }

  componentDidMount() {
    this._inputNode = getInputFromFieldNode(this._input);
    this._usesModernDateInput = this._inputNode.type === 'date';
  }

  _updateInput(date) {
    const modernDateInputFormat = 'YYYY-MM-DD';
    const standardTextDateInputFormat = 'MM/DD/YYYY';

    const formattedDate = moment(date).format(
      this._usesModernDateInput
      ? modernDateInputFormat
      : standardTextDateInputFormat
    );

    getInputFromField(this._input).onChange(formattedDate);
  }

  render() {
    return (
      <div style={datePickerWrapper}>
        <div style={datePickerFieldWrapper}>
          <Field
            {...this.props}
            floatingLabelFixed
            fullWidth
            withRef
            component={TextField}
            type="date"
            ref={(input) => { this._input = input; }}
          />
        </div>
        <div style={datePickerButtonWrapper}>
          <DatePickerButton onSelect={this._updateInput} />
        </div>
      </div>
    );
  }
}
