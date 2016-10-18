import React from 'react';

const wrapperStyle = {
  maxWidth: 500,
  margin: '0 auto',
  padding: '20px',
};

export default function FormWrapper({ children }) {
  return (
    <div style={wrapperStyle}>
      {children}
    </div>
  );
}
