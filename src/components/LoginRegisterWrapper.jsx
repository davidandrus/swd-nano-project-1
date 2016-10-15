import React, { PropTypes } from 'react';
import { Tabs, Tab } from 'material-ui/Tabs';
import { browserHistory } from 'react-router';

const wrapperStyle = {
  maxWidth: 500,
  margin: '0 auto',
  padding: '20px',
};

const handleTabClick = value => browserHistory.push(value);

export default function LoginRegisterWrapper({ children, activePath }) {
  return (
    <div>
      <Tabs
        onChange={handleTabClick}
        value={activePath}
      >
        <Tab
          label="Register"
          value="/"
        />
        <Tab
          label="Login"
          value="/login"
        />
      </Tabs>
      <div style={wrapperStyle}>
        { children }
      </div>
    </div>
  );
}

LoginRegisterWrapper.propTypes = {
  activePath: PropTypes.string,
  children: PropTypes.node,
};
