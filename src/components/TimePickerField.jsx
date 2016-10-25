/* eslint-disable react/no-find-dom-node */
import React, { PropTypes, Component } from 'react';
import { findDOMNode } from 'react-dom';
import moment from 'moment';
import { Field } from 'redux-form';
import { TextField } from 'redux-form-material-ui';
import TimePickerButton from './TimePickerButton';

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

export default class TimePickerField extends Component {

  constructor(...args) {
    super(...args);
    this._updateInput = this._updateInput.bind(this);
  }

  componentDidMount() {
    this._inputNode = getInputFromFieldNode(this._input);
    this._usesModernInput = this._inputNode.type === 'time';
  }

  _updateInput(time) {
    // @TODO - update to be time
    const modernInputFormat = 'HH:mm';
    const standardTextInputFormat = 'HH:mm A';

    const formattedDate = moment(time).format(
      this._usesModernInput
      ? modernInputFormat
      : standardTextInputFormat
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
            type="time"
            ref={(input) => { this._input = input; }}
          />
        </div>
        <div style={datePickerButtonWrapper}>
          <TimePickerButton onSelect={this._updateInput} />
        </div>
      </div>
    );
  }
}
