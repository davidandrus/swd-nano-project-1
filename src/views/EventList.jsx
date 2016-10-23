import React from 'react';
import {
  Card,
  CardTitle,
  CardText,
} from 'material-ui/Card';
import RaisedButton from 'material-ui/RaisedButton';
import LocationOn from 'material-ui/svg-icons/communication/location-on';
import { goToCreateEvent } from '../actions';

export default function EventList() {
  return (
    <div>
      <Card>
        <CardTitle
          title="Event Name"
          subtitle={
            <span>
              created by: Event Creator<br />
              hosted by: Event hosted<br />
              event type: Event Type<br />
              time: 1/2/2015 - 7:00am to 1/3/2015 9:00pm<br /><br />

              location: <LocationOn /> 34343 something st, something, state 038028340
            </span>
          }
        />
        <CardText>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit.
          Donec mattis pretium massa. Aliquam erat volutpat. Nulla facilisi.
          Donec vulputate interdum sollicitudin. Nunc lacinia auctor quam sed pellentesque.
          Aliquam dui mauris, mattis quis lacus id, pellentesque lobortis odio.
        </CardText>
      </Card>
      <RaisedButton
        primary
        label="CreateButton"
        onClick={goToCreateEvent}
        type="submit"
      />
    </div>
  );
}
