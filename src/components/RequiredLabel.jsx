import React from 'react';
import muiThemeable from 'material-ui/styles/muiThemeable';

function RequiredLabel({ text, muiTheme }) {

  const asteriskStyle = {
    color: muiTheme.textField.errorColor,
    paddingLeft: '.3em',
  };

  return <span>{text}<span style={asteriskStyle}>*</span></span>
}

export default muiThemeable()(RequiredLabel);
