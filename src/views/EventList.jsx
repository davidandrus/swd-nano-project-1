import React, { PropTypes } from 'react';
import omit from 'lodash/omit';
import { connect } from 'react-redux';
import {
  Card,
  CardTitle,
  CardText,
} from 'material-ui/Card';
import RaisedButton from 'material-ui/RaisedButton';
import Chips from '../components/Chips';
import { goToCreateEvent } from '../actions';
import { getters } from '../reducers';
import {
  wrapperStyle,
  standardMarginBottom,
} from '../constants/styles';
import states from '../constants/states';
import eventTypes from '../constants/eventTypes';
import {
  getDateFromValue,
  getTimeFromValue,
} from '../utils/date';
import { longDateTime } from '../constants/formats';

const subTitleStyle = {
  fontSize: '15px',
};

const eventDetailStyle = {
  alignItems: 'flex-start',
  display: 'flex',
  lineHeight: '150%',
  marginTop: '10px',
};

const eventDetailLabelStyle = {
  flex: '0 0 6em',
  textAlign: 'left',
};

const eventDetailValueStyle = {
  fontWeight: 500,
};

const noEventsMessageStyle = {
  marginBottom: '30px',
};

function getSubTitleSection(label, value) {
  return (
    <span style={eventDetailStyle}>
      <span style={eventDetailLabelStyle}>
        {label}:
      </span>
      <span style={eventDetailValueStyle}>
        {value}
      </span>
    </span>
  );
}

function getSubTitle(event) {
  console.log(event);
  return (
    <span style={subTitleStyle}>
      {getSubTitleSection('created by', event.creator)}
      {getSubTitleSection('hosted by', event.host)}
      {getSubTitleSection('event type', eventTypes[event['event-type']])}
      {getSubTitleSection('start time', event.startDate)}
      {getSubTitleSection('end time', event.endDate)}
      {getSubTitleSection('location', (
        <span>
          {event['location-address']}<br />
          {event['location-address-2'] &&
            <span>
              {event['location-address-2']}<br />
            </span>
          }
          {event.city}, {states[event.state]} {event['postal-code']}
        </span>
      ))}
    </span>
  );
}

export function EventList({ events }) {
  return (
    <div style={wrapperStyle}>
      {events.length === 0 &&
        <h1 style={noEventsMessageStyle}>No Events Have Been Created Yet</h1>
      }
      {/* normally wouldn't use index as key here, but since it's a demo going to let it go */}
      {events.map((event, index) => (
        <Card
          key={index}
          style={standardMarginBottom}
        >
          <CardTitle
            title={event['event-name']}
            subtitle={getSubTitle(event)}
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
      startDate: getDateFromValue(event['start-date']).set({
        hours: getTimeFromValue(event['start-time']).hours(),
        minutes: getTimeFromValue(event['start-time']).minutes(),
      }).format(longDateTime),
      endDate: getDateFromValue(event['end-date']).set({
        hours: getTimeFromValue(event['end-time']).hours(),
        minutes: getTimeFromValue(event['end-time']).minutes(),
      }).format(longDateTime),
    };
  }),
});

export default connect(mapStateToProps)(EventList);
