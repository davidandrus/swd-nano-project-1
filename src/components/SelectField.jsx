/* eslint-disable react/prop-types */
import React, { Component, PropTypes } from 'react';
import TextFieldUnderline from 'material-ui/TextField/TextFieldUnderline';
import TextFieldLabel from 'material-ui/TextField/TextFieldLabel';
import TextFieldHint from 'material-ui/TextField/TextFieldHint';
import transitions from 'material-ui/styles/transitions';
import { fade } from 'material-ui/utils/colorManipulator';
import ArrowDown from 'material-ui/svg-icons/hardware/keyboard-arrow-down';

/**
 *  @NOTE - most everything in this file is copied from material ui TextField,
 *  and modified to work with a native Select input, it however does not include
 *  all of the funtionality of the original
 *  https://github.com/callemall/material-ui/blob/master/src/TextField/TextField.js
 *
 * it should also be noted that this has been made to be compatible with react-redux-form as well
 * http://redux-form.com/6.1.1/docs/api/Field.md/
 */
//

const getCustomStyles = (props, context, state) => {
  const {
    textField: {
      focusColor,
      hintColor,
      errorColor,
    },
  } = context.muiTheme;

  let iconColor = hintColor;
  if (state.isFocused) iconColor = focusColor;

  // eslint-disable-next-line no-extra-boolean-cast
  if (props.meta.error && props.meta.touched) {
    iconColor = errorColor;
  }

  return {
    root: {
      height: '72px',
    },
    icon: {
      color: iconColor,
      position: 'absolute',
      right: '0px',
      bottom: '10px',
      // so icon shows below select so doesn't eat select's clicks
      zIndex: 1,
    },
    input: {
      position: 'relative',
      height: '72px',
      marginBottom: '-14px',
      // for arrowIcon to be lower stacking order as to not eat select's clicks
      zIndex: 2,
    },
  };
};

const getStyles = (props, context, state) => {
  const {
    baseTheme,
    textField: {
      floatingLabelColor,
      focusColor,
      textColor,
      disabledTextColor,
      backgroundColor,
      hintColor,
      errorColor,
    },
  } = context.muiTheme;

  const styles = {
    root: {
      fontSize: 16,
      lineHeight: '24px',
      width: props.fullWidth ? '100%' : 256,
      height: ((props.rows - 1) * 24) + (props.floatingLabelText ? 72 : 48),
      display: 'inline-block',
      position: 'relative',
      backgroundColor,
      fontFamily: baseTheme.fontFamily,
      transition: transitions.easeOut('200ms', 'height'),
    },
    error: {
      position: 'relative',
      bottom: 2,
      fontSize: 12,
      lineHeight: '12px',
      color: errorColor,
      transition: transitions.easeOut(),
    },
    floatingLabel: {
      color: hintColor,
      pointerEvents: 'none',
    },
    input: {
      padding: 0,
      position: 'relative',
      width: '100%',
      border: 'none',
      outline: 'none',
      backgroundColor: 'rgba(0,0,0,0)',
      color: props.disabled ? disabledTextColor : textColor,
      cursor: props.disabled ? 'not-allowed' : 'initial',
      font: 'inherit',
      WebkitTapHighlightColor: 'rgba(0,0,0,0)', // Remove mobile color flashing (deprecated style).
    },
    inputNative: {
      appearance: 'textfield', // Improve type search style.
    },
  };

  Object.assign(styles.error, props.errorStyle);

  styles.textarea = Object.assign({}, styles.input, {
    marginTop: props.floatingLabelText ? 36 : 12,
    marginBottom: props.floatingLabelText ? -36 : -12,
    boxSizing: 'border-box',
    font: 'inherit',
  });

  // Do not assign a height to the textarea as he handles it on his own.
  styles.input.height = '100%';

  if (state.hasValue) {
    styles.floatingLabel.color = fade(props.disabled ? disabledTextColor : floatingLabelColor, 0.5);
  }

  if (state.isFocused) {
    styles.floatingLabel.color = focusColor;
  }

  if (props.floatingLabelText) {
    styles.input.boxSizing = 'border-box';

    if (!props.multiLine) {
      styles.input.marginTop = 14;
    }

    if (state.errorText) {
      styles.error.bottom = !props.multiLine ? styles.error.fontSize + 3 : 3;
    }
  }

  if (state.errorText) {
    if (state.isFocused) {
      styles.floatingLabel.color = styles.error.color;
    }
  }

  return styles;
};

export default class SelectField extends Component {
  constructor(...args) {
    super(...args);
    this._handleFocus = this._handleFocus.bind(this);
    this._handleBlur = this._handleBlur.bind(this);
    this._handleChange = this._handleChange.bind(this);
    this.state = {
      isFocused: false,
      hasValue: this.props.input.value,
    };
  }

  componentWillReceiveProps({ value }) {
    if (value) {
      this.setState({ hasValue: true });
    }
  }

  _handleChange(e) {
    this.setState({
      hasValue: true,
    });
    this.props.input.onChange(e.target.value);
  }

  _handleFocus() {
    this.setState({
      isFocused: true,
    });
    this.props.input.onFocus();
  }

  _handleBlur(e) {
    this.setState({
      isFocused: false,
    });
    this.props.input.onBlur(e);
  }

  render() {
    const {
      children,
      className,
      disabled,
      errorStyle,
      errorText, // eslint-disable-line no-unused-vars
      floatingLabelFixed,
      floatingLabelFocusStyle, // eslint-disable-line no-unused-vars
      floatingLabelStyle, // eslint-disable-line no-unused-vars
      floatingLabelText,
      fullWidth, // eslint-disable-line no-unused-vars
      hintText,
      hintStyle,
      id,
      inputStyle,
      onBlur, // eslint-disable-line no-unused-vars
      onChange, // eslint-disable-line no-unused-vars
      onFocus, // eslint-disable-line no-unused-vars
      options,
      style,
      underlineDisabledStyle,
      underlineFocusStyle,
      underlineShow,
      underlineStyle,
      ...other
    } = this.props;

    // from redux-form
    const { input: { value }, meta: { touched, error } } = this.props;

    const { prepareStyles } = this.context.muiTheme;
    const styles = getStyles(this.props, this.context, this.state);
    const customStyles = getCustomStyles(this.props, this.context, this.state);
    const inputId = id || this.uniqueId;

    const errorTextElement = touched && error && (
      <div style={prepareStyles(styles.error)}>{error}</div>
    );

    const floatingLabelTextElement = floatingLabelText && (
      <TextFieldLabel
        muiTheme={this.context.muiTheme}
        style={Object.assign(styles.floatingLabel, this.props.floatingLabelStyle)}
        shrinkStyle={this.props.floatingLabelFocusStyle}
        htmlFor={inputId}
        shrink={this.state.hasValue || this.state.isFocused || floatingLabelFixed}
        disabled={disabled}
      >
        {floatingLabelText}
      </TextFieldLabel>
    );

    const childStyleMerged = Object.assign(styles.input, inputStyle, customStyles.input);

    let rootProps = {};

    if (children) {
      rootProps = other;
    }

    /* eslint-disable max-len */
    const showHintText = !!(!(this.state.hasValue || (floatingLabelText && !this.state.isFocused)) ||
      (!this.state.hasValue && floatingLabelText && floatingLabelFixed && !this.state.isFocused));
    /* eslint-enable max-len */

    return (
      <div
        {...rootProps}
        className={className}
        style={prepareStyles(Object.assign(styles.root, style, customStyles.root))}
      >
        {floatingLabelTextElement}
        {hintText ?
          <TextFieldHint
            muiTheme={this.context.muiTheme}
            show={showHintText}
            style={hintStyle}
            text={hintText}
          /> :
          null
        }
        <select
          id="checkIt"
          style={childStyleMerged}
          onFocus={this._handleFocus}
          onBlur={this._handleBlur}
          onChange={this._handleChange}
          value={value}
        >
          {/* make sure that input shows as empty initially */}
          {!this.state.hasValue && <option value="" />}


          { // eslint-disable-next-line
            options.map(({ label, value }) => (
              <option
                key={value}
                value={value}
              >
                {label}
              </option>
            ))
          }

        </select>
        <ArrowDown style={customStyles.icon} />
        {underlineShow ?
          <TextFieldUnderline
            disabled={disabled}
            disabledStyle={underlineDisabledStyle}
            error={error && touched}
            errorStyle={errorStyle}
            focus={this.state.isFocused}
            focusStyle={underlineFocusStyle}
            muiTheme={this.context.muiTheme}
            style={underlineStyle}
          /> :
          null
        }
        {errorTextElement}
      </div>
    );
  }
}

SelectField.contextTypes = {
  muiTheme: PropTypes.object.isRequired,
};

SelectField.propTypes = {
  options: PropTypes.arrayOf(PropTypes.shape({
    label: PropTypes.string,
    value: PropTypes.string,
  })),
};

SelectField.defaultProps = {
  underlineShow: true,
};
