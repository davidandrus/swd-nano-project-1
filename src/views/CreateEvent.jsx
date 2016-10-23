import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import CreateEventForm from '../components/CreateEventForm';
import CreateEventWrapper from '../components/CreateEventWrapper';
import { createEvent as createEventAction } from '../actions';

export function CreateEvent({ createEvent, activePath }) {
  return (
    <CreateEventWrapper activePath={activePath}>
      <CreateEventForm onSubmit={createEvent} />
    </CreateEventWrapper>
  );
}

CreateEvent.propTypes = {
  createEvent: PropTypes.func,
  activePath: PropTypes.string,
};

const mapStateToProps = (state, ownProps) => ({ activePath: ownProps.route.path });

export default connect(mapStateToProps, {
  createEvent: createEventAction,
})(CreateEvent);
