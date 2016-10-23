import React, { PropTypes } from 'react';
import { Stepper, Step, StepLabel } from 'material-ui/Stepper';
import * as paths from '../constants/paths';
import FormWrapper from './FormWrapper';

export default function CreateEventWrapper({ children, activePath }) {
  const activeStep = activePath === paths.registerPath ? 0 : 1;

  return (
    <FormWrapper>
      <h1>Create Event</h1>
      <Stepper activeStep={activeStep}>
        <Step>
          <StepLabel>Event Info</StepLabel>
        </Step>
        <Step>
          <StepLabel>Location</StepLabel>
        </Step>
        <Step>
          <StepLabel>Add Guests</StepLabel>
        </Step>
      </Stepper>
      { children }
    </FormWrapper>
  );
}

CreateEventWrapper.propTypes = {
  activePath: PropTypes.string,
  children: PropTypes.node,
};
