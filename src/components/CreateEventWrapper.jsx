import React, { PropTypes } from 'react';
import findIndex from 'lodash/findIndex';
import {
  Stepper,
  Step,
  StepLabel,
  StepContent,
} from 'material-ui/Stepper';
import FormWrapper from './FormWrapper';
import * as paths from '../constants/paths';
import { standardMargin } from '../constants/styles';

const steps = [
  paths.createEvent,
  paths.createEventLocation,
  paths.createEventGuests,
];

const headerStyles = {
  marginLeft: standardMargin,
};

const getContent = (step, activeStep, children) => (
  <StepContent>{step === activeStep ? children : ''}</StepContent>
);

export default function CreateEventWrapper({ children, activePath }) {
  const activeStep = findIndex(steps, step => step === activePath);

  return (
    <FormWrapper>
      <h1 style={headerStyles}>Create New Event</h1>
      <Stepper
        activeStep={activeStep}
        orientation="vertical"
      >
        <Step>
          <StepLabel>Event Info</StepLabel>
          {getContent(0, activeStep, children)}
        </Step>
        <Step>
          <StepLabel>Location</StepLabel>
          {getContent(1, activeStep, children)}
        </Step>
        <Step>
          <StepLabel>Add Guests</StepLabel>
          {getContent(2, activeStep, children)}
        </Step>
      </Stepper>
    </FormWrapper>
  );
}

CreateEventWrapper.propTypes = {
  activePath: PropTypes.string,
  children: PropTypes.node,
};
