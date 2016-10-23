import React, { PropTypes } from 'react';
import findIndex from 'lodash/findIndex';
import { Stepper, Step, StepLabel } from 'material-ui/Stepper';
import * as paths from '../constants/paths';
import FormWrapper from './FormWrapper';

const steps = [
  paths.register,
  paths.createProfile,
];

export default function RegisterWrapper({ children, activePath }) {
  const activeStep = findIndex(steps, step => step === activePath);
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
