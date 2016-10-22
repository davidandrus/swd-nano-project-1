import React, { PropTypes } from 'react';
import { Stepper, Step, StepLabel } from 'material-ui/Stepper';
import * as paths from '../constants/paths';
import FormWrapper from './FormWrapper';

export default function RegisterWrapper({ children, activePath }) {
  const activeStep = activePath === paths.registerPath ? 0 : 1;

  return (
    <FormWrapper>
      <Stepper activeStep={activeStep}>
        <Step>
          <StepLabel>Basic Info</StepLabel>
        </Step>
        <Step>
          <StepLabel>Create Profile</StepLabel>
        </Step>
      </Stepper>
      { children }
    </FormWrapper>
  );
}

RegisterWrapper.propTypes = {
  activePath: PropTypes.string,
  children: PropTypes.node,
};
