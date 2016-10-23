import React, { PropTypes } from 'react';
import muiThemeable from 'material-ui/styles/muiThemeable';

function RequiredLabel({ text, muiTheme }) {
  const asteriskStyle = {
    color: muiTheme.textField.errorColor,
    paddingLeft: '.3em',
  };

  return (
    <span>
      {text}
      <span style={asteriskStyle}>*</span>
    </span>
  );
}

RequiredLabel.propTypes = {
  text: PropTypes.string,
  muiTheme: PropTypes.shape({
    textField: PropTypes.shape({
      // eslint-disable-next-line react/no-unused-prop-types
      errorColor: PropTypes.string,
    }),
  }),
};

export default muiThemeable()(RequiredLabel);
