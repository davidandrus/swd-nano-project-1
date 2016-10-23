import React from 'react';
import CreateEventForm from '../components/CreateEventForm';
import CreateEventWrapper from '../components/CreateEventWrapper';

function createForm() {
  console.log('createForm Called');
}

export default function CreateEvent() {
  return (
    <CreateEventWrapper>
      <CreateEventForm onSubmit={createForm} />
    </CreateEventWrapper>
  );
}
