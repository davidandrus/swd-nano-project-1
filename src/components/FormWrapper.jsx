import React from 'react';
import { wrapperStyle } from '../constants/styles';

export default function FormWrapper({ children }) {
  return (
    <div style={wrapperStyle}>
      {children}
    </div>
  );
}
