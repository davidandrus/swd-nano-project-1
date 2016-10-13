import React from 'react';
import TextField from 'material-ui/TextField';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';
import DatePicker from 'material-ui/DatePicker';
import TimePicker from 'material-ui/TimePicker';
import RaisedButton from 'material-ui/RaisedButton';
import Chip from 'material-ui/Chip';

export default function CreateEvent(props) {
  return (
    <form>
      <h1>Create Event</h1>
      <TextField
        autoFocus
        fullWidth
        floatingLabelText="Event Name"
        hintText="Enter the name of your event"
        name="event-name"
        type="text"
      />
      {/*
        @TODO - https://github.com/callemall/material-ui/issues/714
        is not keyboard focusable, maybe make pr to fix, or make a work around with a offscreen text
        field that when focused will open the dropdown
      */}
      {/* @TODO - make more event types */}
      <SelectField
        fullWidth
        floatingLabelText="Event Type"
        name="event-type"
      >
        <MenuItem
          value={1}
          primaryText="Birthday Party"
        />
        <MenuItem
          value={2}
          primaryText="Conference Talk"
        />
        <MenuItem
          value={3}
          primaryText="Wedding"
        />
      </SelectField>
      <TextField
        fullWidth
        floatingLabelText="Event Host"
        hintText="Enter the name of your host"
        name="host"
        type="text"
      />
      <div>
        <DatePicker
          floatingLabelText="Start Date"
          name="start-date"
        />
        <TimePicker
          hintText="Start Time"
          name="start-time"
        />
      </div>
      <div>
        <DatePicker
          floatingLabelText="End Date"
          name="end-time"
        />
        <TimePicker
          hintText="End Time"
          name="end-time"
        />
      </div>
      <div>
        <TextField
          floatingLabel="Add Guest"
          hintText="Enter the name of your guest"
        />
        <RaisedButton secondary label="Add" />
      </div>
      <Chip onRequestDelete={() => {}}>email@email.com</Chip>
      <h1>Location</h1>
      <TextField
        fullWidth
        autoComplete="street-address"
        floatingLabelText="Street Address"
        hintText="Enter Street Adress"
        name="location-address"
        type="text"
      />
      <TextField
        fullWidth
        autoComplete="address-line2"
        floatingLabelText="Apt/Suite Number"
        hintText="Enter Apt/Suite Number"
        name="location-address-2"
        type="text"
      />
      <TextField
        fullWidth
        autoComplete="address-level2"
        floatingLabelText="City"
        hintText="Enter City"
        name="city"
        type="text"
      />
      <TextField
        fullWidth
        autoComplete="address-level1"
        floatingLabelText="State"
        hintText="Enter State"
        name="state"
        type="text"
      />
      <TextField
        fullWidth
        autoComplete="postal-code"
        floatingLabelText="Zip Code"
        hintText="Enter Zip Code"
        name="postal-code"
        type="text"
      />
    </form>
  )
}
