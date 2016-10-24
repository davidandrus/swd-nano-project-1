import React, { PropTypes } from 'react';
import { formWrapperStyle } from '../constants/styles';

export default function FormWrapper({ children }) {
  return (
    <div style={formWrapperStyle}>
      {children}
    </div>
  );
}

FormWrapper.propTypes = {
  children: PropTypes.node,
};
