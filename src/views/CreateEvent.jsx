import React from 'react';
import FormWrapper from '../components/FormWrapper';
import CreateEventForm from '../components/CreateEventForm';

function createForm() {
  console.log('createForm Called');
}

export default function CreateEvent() {
  return (
    <FormWrapper>
      <h1>Create Event</h1>
      <CreateEventForm onSubmit={createForm} />
    </FormWrapper>
  );
}
