import React, { PropTypes } from 'react';
import { Stepper, Step, StepLabel } from 'material-ui/Stepper';
import * as paths from '../constants/paths';


const wrapperStyle = {
  maxWidth: 500,
  margin: '0 auto',
  padding: '20px',
};

export default function RegisterWrapper({ children, activePath }) {
  return (
    <div style={wrapperStyle}>
      <Stepper activeStep={activePath === paths.registerPath ? 0 : 1}>
        <Step>
          <StepLabel>Basic Info</StepLabel>
        </Step>
        <Step>
          <StepLabel>Create Profile</StepLabel>
        </Step>
      </Stepper>
      { children }
    </div>
  );
}

RegisterWrapper.propTypes = {
  activePath: PropTypes.string,
  children: PropTypes.node,
};
