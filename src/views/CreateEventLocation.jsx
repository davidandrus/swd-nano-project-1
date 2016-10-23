import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import CreateEventLocationForm from '../components/CreateEventLocationForm';
import CreateEventWrapper from '../components/CreateEventWrapper';
import { createEventLocation as createEventLocationAction } from '../actions';

export function CreateEventLocation({ activePath, createEventLocation }) {
  return (
    <CreateEventWrapper activePath={activePath}>
      <CreateEventLocationForm onSubmit={createEventLocation} />
    </CreateEventWrapper>
  );
}

CreateEventLocation.propTypes = {
  activePath: PropTypes.string,
  createEventLocation: PropTypes.func,
};

const mapStateToProps = (state, ownProps) => ({ activePath: ownProps.route.path });

export default connect(mapStateToProps, {
  createEventLocation: createEventLocationAction,
})(CreateEventLocation);
