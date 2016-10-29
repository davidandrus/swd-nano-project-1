/* eslint-disable react/no-find-dom-node */
import React, {
  createElement,
  PropTypes,
  Component,
} from 'react';
import { findDOMNode } from 'react-dom';
import moment from 'moment';
import { Field } from 'redux-form';
import { TextField } from 'redux-form-material-ui';

const pickerWrapper = {
  alignItems: 'flex-start',
  display: 'flex',
};

const pickerButtonWrapper = {
  flex: '0 0 40px',
  paddingTop: '22px',
};

const pickerFieldWrapper = {
  flex: '999 0 auto',
};

const getInputFromField = ref => ref.getRenderedComponent().props.input;
const getInputFromFieldNode = ref => findDOMNode(ref.getRenderedComponent()).querySelector('input');

export default class PickerField extends Component {

  constructor(...args) {
    super(...args);
    this._updateInput = this._updateInput.bind(this);
  }

  componentDidMount() {
    this._inputNode = getInputFromFieldNode(this._input);
    this._usesModernInput = this._inputNode.type === this.props.type;
  }

  _updateInput(time) {
    const modernInputFormat = this.props.modernFormat;
    const standardTextInputFormat = this.props.legacyFormat;

    const formattedDate = moment(time).format(
      this._usesModernInput ? modernInputFormat : standardTextInputFormat
    );

    getInputFromField(this._input).onChange(formattedDate);
  }

  render() {
    const {
      button,
      currentValue,
      name,
      type,
      /* eslint-disable no-unused-vars */
      // destructuring these out so they are not passed to Field
      modernFormat,
      legacyFormat,
      /* eslint-enable no-unused-vars */
      ...extraProps
    } = this.props;

    const buttonContent = createElement(button, {
      currentValue,
      onSelect: this._updateInput,
    });

    return (
      <div style={pickerWrapper}>
        <div style={pickerFieldWrapper}>
          <Field
            {...extraProps}
            floatingLabelFixed
            fullWidth
            withRef
            component={TextField}
            type={type}
            name={name}
            ref={(input) => { this._input = input; }}
          />
        </div>
        <div style={pickerButtonWrapper}>
          {buttonContent}
        </div>
      </div>
    );
  }
}

PickerField.propTypes = {
  name: PropTypes.string.isRequired,
  currentValue: PropTypes.string,
  button: PropTypes.func,
  modernFormat: PropTypes.string,
  legacyFormat: PropTypes.string,
  type: PropTypes.string,
};
