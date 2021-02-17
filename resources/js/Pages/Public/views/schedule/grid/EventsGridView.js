import React from 'react';

import { makeStyles } from '@material-ui/core/styles';

let earliestEvent = '';
let latestEvent = '';
let earliestHour;
let latestHour;

const EventsGridView = ({ events, locations }) => {
  console.log(events);
  console.log(locations);

  // Get earliest and latest event times.
  events.forEach((event) => {
    if (earliestEvent === '' || earliestEvent > event.time_start) {
      earliestEvent = event.time_start;
    }

    if (latestEvent === '' || latestEvent < event.time_end) {
      latestEvent = event.time_end;
    }
  });

  // Get earliest and latest hour.
  earliestHour =
    earliestEvent.substr(0, 2) !== 0
      ? Number(earliestEvent.substr(0, 2)) - 1
      : 0;
  latestHour =
    latestEvent.substr(0, 2) !== 24 ? Number(latestEvent.substr(0, 2)) + 1 : 0;

  // Function to get leading number strings
  const zeroPad = (num, places) => String(num).padStart(places, '0');

  // Get grid sections for time
  let gridTemplateRowsCss = '[tracks] auto ';
  for (let second = 0, hour = earliestHour; hour < latestHour; second += 5) {
    if (second !== 0 && second === 60) {
      hour += 1;
      second = 0;
    }

    if (hour === 24) {
      break;
    }

    gridTemplateRowsCss += `[time-${zeroPad(hour, 2)}${zeroPad(
      second,
      2,
    )}] 2px `;
  }

  // Get grid sections for locations
  let gridTemplateColumnsCss = '[times] auto [track-0-start] 1fr ';
  for (let k = 0; k < locations.length - 1; k += 1) {
    gridTemplateColumnsCss += `[track-${k}-end track-${k + 1}-start] 1fr `;
  }
  gridTemplateColumnsCss += `[track-${locations.length - 1}-end]`;

  // CSS Classes
  const classes = makeStyles(() => ({
    eventGrid: {
      display: 'grid',
      gap: '.5rem',
      gridTemplateRows: gridTemplateRowsCss,
      gridTemplateColumns: gridTemplateColumnsCss,
    },
    timeSlot: {
      gridColumn: 'times',
      whiteSpace: 'nowrap',
      margin: 0,
      borderTop: '1px solid gray',
    },
    trackSlot: {
      display: 'block',
      padding: '10px 5px 5px',
      position: 'sticky',
      top: 0,
      zIndex: 1000,
      backgroundColor: 'rgba(255,255,255,.9)',
    },
    session: {
      backgroundColor: 'green',
    },
  }))();

  // Create time slot elements
  const timeSlots = [];
  for (let second = 0, hour = earliestHour; hour < latestHour; second += 30) {
    if (second !== 0 && second === 60) {
      hour += 1;
      second = 0;
    }

    if (hour === 24) {
      break;
    }

    const timeSlotName = `time-${zeroPad(hour, 2)}${zeroPad(second, 2)}`;

    timeSlots.push(
      <h3
        key={timeSlotName}
        className={classes.timeSlot}
        style={{ gridRow: timeSlotName }}
      >
        {zeroPad(hour, 2)}:{zeroPad(second, 2)} {hour >= 12 ? 'pm' : 'am'}
      </h3>,
    );
  }

  return (
    <div className={classes.eventGrid}>
      {locations.map((location, index) => (
        <span
          key={location.id}
          className={classes.trackSlot}
          aria-hidden="true"
          style={{ gridColumn: `track-${index}`, gridRow: 'tracks' }}
        >
          {location.name}
        </span>
      ))}

      {timeSlots}

      {locations.map((location, locationIndex) => {
        return events.map((event) => {
          let eventTrackNum = '';
          let eventTimeRow = '';
          if (event.location_id === location.id) {
            const eventTimeStart = event.time_start
              .replace(':', '')
              .substr(0, 4);
            const eventTimeEnd = event.time_end.replace(':', '').substr(0, 4);

            eventTrackNum = `track-${locationIndex}`;
            eventTimeRow = `time-${eventTimeStart} / time-${eventTimeEnd}`;

            return (
              <div
                key={event.id}
                className={classes.session}
                style={{ gridColumn: eventTrackNum, gridRow: eventTimeRow }}
              >
                <h4>{event.name}</h4>
              </div>
            );
          }

          return false;
        });
      })}
    </div>
  );
};

export default EventsGridView;
