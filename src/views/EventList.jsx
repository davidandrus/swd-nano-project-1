import React, { PropTypes } from 'react';
import moment from 'moment';
import omit from 'lodash/omit';
import { connect } from 'react-redux';
import {
  Card,
  CardTitle,
  CardText,
} from 'material-ui/Card';
import RaisedButton from 'material-ui/RaisedButton';
import Chip from 'material-ui/Chip';
import LocationOn from 'material-ui/svg-icons/communication/location-on';
import { goToCreateEvent } from '../actions';
import { getters } from '../reducers';

const cardStyle = { marginBottom: '20px' };
const cardWrapper = {
  margin: '20px auto 0',
  maxWidth: '500px',
};

const chipContainer = {
  marginBottom: '20px',
};

const chipWrapper = {
  display: 'inline-block',
  margin: '0 20px 20px 0',
};

export function EventList({ events }) {
  return (
    <div style={cardWrapper}>
      {events.length === 0 &&
        <h1>No Events Have Been Created Yet</h1>
      }
      {events.map((event, index) => {
        { /* Normally wouldn't use index here, but since it's a demo will make an exception */ }
        return (
          <Card
            key={index}
            style={cardStyle}
          >
            <CardTitle
              title={event['event-name']}
              subtitle={
                <span>
                  created by: {event.creator}<br />
                  hosted by: {event.host}<br />
                  event type: {event['event-type']}<br />
                  time: {event.startDate} to {event.endDate}<br /><br />
                  location: <LocationOn /> {event['location-address']} {event['location-address-2']} {event.city}, {event.state} {event['postal-code']}
                </span>
              }
            />

            <CardText>
              <div style={chipContainer}>
                {event.emails.map(email => (
                  <div
                    style={chipWrapper}
                    key={email}
                  >
                    <Chip>{email}</Chip>
                  </div>
                ))}
              </div>
              {event.message &&
                <div>{event.message}</div>
              }
            </CardText>
          </Card>
        );
      })}

      <RaisedButton
        primary
        label="Create New Event"
        onClick={goToCreateEvent}
        type="submit"
      />
    </div>
  );
}

EventList.propTypes = {
  events: PropTypes.arrayOf(PropTypes.object),
};

const mapStateToProps = state => ({
  events: getters.getEvents(state).map((event) => {
    const updatedEvent = omit(event, [
      'start-date',
      'end-date',
      'start-time',
      'end-time',
    ]);

    return {
      ...updatedEvent,
      startDate: moment(event['start-date']).set({
        hours: moment(event['start-time']).hours(),
        minutes: moment(event['start-time']).hours(),
      }).format('MM/DD/YY - hh:mma'),
      endDate: moment(event['end-date']).set({
        hours: moment(event['end-time']).hours(),
        minutes: moment(event['end-time']).hours(),
      }).format('MM/DD/YY - hh:mma'),
    };
  }),
});

export default connect(mapStateToProps)(EventList);
