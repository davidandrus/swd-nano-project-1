import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import RegisterWrapper from './RegisterWrapper';
import RegisterForm from './RegisterForm';
import { register as registerAction } from '../actions';

function Register({ activePath, register }) {
  return (
    <RegisterWrapper activePath={activePath}>
      <RegisterForm onSubmit={register} />
    </RegisterWrapper>
  );
}

Register.propTypes = {
  activePath: PropTypes.string,
  register: PropTypes.func,
};

function mapStateToProps(state, ownProps) {
  return {
    activePath: ownProps.route.path,
  };
}

export default connect(mapStateToProps, {
  register: registerAction,
})(Register);
