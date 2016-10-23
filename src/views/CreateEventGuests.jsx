import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import CreateEventGuestsForm from '../components/CreateEventGuestsForm';
import CreateEventWrapper from '../components/CreateEventWrapper';

function createForm() {
  console.log('createForm Called');
}

export function CreateEventGuests({ activePath }) {
  return (
    <CreateEventWrapper activePath={activePath}>
      <CreateEventGuestsForm onSubmit={createForm} />
    </CreateEventWrapper>
  );
}

CreateEventGuests.propTypes = {
  activePath: PropTypes.string,
};

const mapStateToProps = (state, ownProps) => ({ activePath: ownProps.route.path });
// export default connect(mapStateToProps, {
//   createEventLocation: createEventLocationAction,
// })(CreateEventLocation);

export default connect(mapStateToProps)(CreateEventGuests);
