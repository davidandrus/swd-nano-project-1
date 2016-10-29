import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import RegisterWrapper from '../components/RegisterWrapper';
import CreateProfileForm from '../components/CreateProfileForm';
import { createProfile as createProfileAction } from '../actions';

function CreateProfile({ activePath, createProfile }) {
  return (
    <RegisterWrapper activePath={activePath}>
      <h2>Thanks for Signing up!</h2>
      <h3>Please share some info so people can know what you are all about.</h3>
      <CreateProfileForm onSubmit={createProfile} />
    </RegisterWrapper>
  );
}

CreateProfile.propTypes = {
  activePath: PropTypes.string,
  createProfile: PropTypes.func,
};

function mapStateToProps(state, ownProps) {
  return {
    activePath: ownProps.route.path,
  };
}

export default connect(mapStateToProps, {
  createProfile: createProfileAction,
})(CreateProfile);
