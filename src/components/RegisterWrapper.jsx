import React, { PropTypes } from 'react';
import findIndex from 'lodash/findIndex';
import {
  Stepper,
  Step,
  StepLabel,
  StepContent,
} from 'material-ui/Stepper';
import * as paths from '../constants/paths';
import FormWrapper from './FormWrapper';

const steps = [
  paths.register,
  paths.createProfile,
];

const getContent = (step, activeStep, children) => (
  <StepContent>{step === activeStep ? children : ''}</StepContent>
);

export default function RegisterWrapper({ children, activePath }) {
  const activeStep = findIndex(steps, step => step === activePath);

  return (
    <FormWrapper>
      <Stepper
        activeStep={activeStep}
        orientation="vertical"
      >
        <Step>
          <StepLabel>Register For An account</StepLabel>
          {getContent(0, activeStep, children)}
        </Step>
        <Step>
          <StepLabel>Create Profile (Optional)</StepLabel>
          {getContent(1, activeStep, children)}
        </Step>
      </Stepper>
    </FormWrapper>
  );
}

RegisterWrapper.propTypes = {
  activePath: PropTypes.string,
  children: PropTypes.node,
};
