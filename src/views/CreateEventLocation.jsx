import React from 'react';
import CreateEventLocationForm from '../components/CreateEventLocationForm';
import CreateEventWrapper from '../components/CreateEventWrapper';

function createForm() {
  console.log('createForm Called');
}

export default function CreateEventLocation() {
  return (
    <CreateEventWrapper>
      <CreateEventLocationForm onSubmit={createForm} />
    </CreateEventWrapper>
  );
}
