import React, { PropTypes } from 'react';
import muiThemeable from 'material-ui/styles/muiThemeable';

function DynamicValidator({ isValid, label, hasBlurred, muiTheme }) {
  const {
    textField: {
      errorColor,
      hintColor,
    }
  } = muiTheme;

  const invalidColor = hasBlurred ? errorColor : hintColor;
  const combinedStyle = {
    color: isValid ? 'green' : invalidColor,
    fontSize: '12px',
  };

  if (isValid) { return null; }

  return (
    <div style={combinedStyle}>
      {label}
    </div>
  );
}

DynamicValidator.propTypes = {
  label: PropTypes.string,
  hasBlurred: PropTypes.string,
  isValid: PropTypes.bool,
  muiTheme: PropTypes.shape({
    textField: PropTypes.shape({
      // eslint-disable-next-line react/no-unused-prop-types
      errorColor: PropTypes.string,
      hintColor: PropTypes.string,
    }),
  }),
};

export default muiThemeable()(DynamicValidator);
