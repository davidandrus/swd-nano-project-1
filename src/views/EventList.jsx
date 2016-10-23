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
import LocationOn from 'material-ui/svg-icons/communication/location-on';
import Chips from '../components/Chips';
import { goToCreateEvent } from '../actions';
import { getters } from '../reducers';
import {
  wrapperStyle,
  standardMarginBottom,
} from '../constants/styles';


export function EventList({ events }) {
  return (
    <div style={wrapperStyle}>
      {events.length === 0 &&
        <h1>No Events Have Been Created Yet</h1>
      }
      {/* normally wouldn't use index as key here, but since it's a demo going to let it go */}
      {events.map((event, index) => (
        <Card
          key={index}
          style={standardMarginBottom}
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
            <div style={standardMarginBottom}>
              <Chips items={event.emails} />
            </div>
            {event.message &&
              <div>{event.message}</div>
            }
          </CardText>
        </Card>
      ))}

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
