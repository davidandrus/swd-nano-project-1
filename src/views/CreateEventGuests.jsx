import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import CreateEventGuestsForm from '../components/CreateEventGuestsForm';
import CreateEventWrapper from '../components/CreateEventWrapper';
import { addGuests as addGuestsAction } from '../actions';

export function CreateEventGuests({ activePath, addGuests }) {
  return (
    <CreateEventWrapper activePath={activePath}>
      <CreateEventGuestsForm onSubmit={addGuests} />
    </CreateEventWrapper>
  );
}

CreateEventGuests.propTypes = {
  activePath: PropTypes.string,
  addGuests: PropTypes.func,
};

const mapStateToProps = (state, ownProps) => ({ activePath: ownProps.route.path });
export default connect(mapStateToProps, {
  addGuests: addGuestsAction,
})(CreateEventGuests);
