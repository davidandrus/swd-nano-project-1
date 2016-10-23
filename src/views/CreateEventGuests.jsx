import React from 'react';
import CreateEventGuestsForm from '../components/CreateEventGuestsForm';
import CreateEventWrapper from '../components/CreateEventWrapper';

function createForm() {
  console.log('createForm Called');
}

export default function CreateEvent() {
  return (
    <CreateEventWrapper>
      <CreateEventGuestsForm onSubmit={createForm} />
    </CreateEventWrapper>
  );
}
