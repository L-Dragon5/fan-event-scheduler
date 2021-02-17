import React, { useLayoutEffect, useRef, useState } from 'react';

import { Box, Modal } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

import EventsGridViewModal from './EventsGridViewModal';
import EventsGridViewEvent from './EventsGridViewEvent';
import ExternalLink from '../../../components/ExternalLink';

let earliestEvent = '';
let latestEvent = '';
let earliestHour;
let latestHour;

const EventsGridView = ({ events, locations }) => {
  const eventGridRef = useRef(null);

  const [timeSlots, setTimeSlots] = useState([]);
  const [open, setOpen] = useState(false);
  const [modalContent, setModalContent] = useState(<Box />);
  const gridRowSpacing = '15px';

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
  for (let minute = 0, hour = earliestHour; hour < latestHour; minute += 5) {
    if (minute !== 0 && minute === 60) {
      hour += 1;
      minute = 0;
    }

    if (hour === 24) {
      break;
    }

    gridTemplateRowsCss += `[time-${zeroPad(hour, 2)}${zeroPad(
      minute,
      2,
    )}] ${gridRowSpacing} `;
  }

  // Get grid sections for locations
  let gridTemplateColumnsCss =
    '[times] .35fr [track-0-start] minmax(150px, 1fr) ';
  for (let k = 0; k < locations.length - 1; k += 1) {
    gridTemplateColumnsCss += `[track-${k}-end track-${
      k + 1
    }-start] minmax(150px, 1fr) `;
  }
  gridTemplateColumnsCss += `[track-${locations.length - 1}-end]`;

  // CSS Classes
  const classes = makeStyles((theme) => ({
    eventGrid: {
      display: 'grid',
      gap: `0 .5rem`,
      gridTemplateRows: gridTemplateRowsCss,
      gridTemplateColumns: gridTemplateColumnsCss,
      backgroundColor: theme.palette.grey[200],
      padding: theme.spacing(0, 2, 0, 0),
    },
    timeSlot: {
      gridColumn: 'times',
      whiteSpace: 'nowrap',
      margin: 0,
      textAlign: 'right',
      position: 'relative',
    },
    timeSlotLine: {
      content: '""',
      display: 'block',
      backgroundColor: 'rgba(0,0,0,.3)',
      top: '-1px',
      height: '1px',
      position: 'absolute',
      width: '100%',
    },
    trackSlot: {
      display: 'block',
      padding: '10px 5px 5px',
      position: 'sticky',
      top: 0,
      zIndex: 1000,
      backgroundColor: theme.palette.primary.light,
      opacity: 0.9,
      fontWeight: 'bold',
      textAlign: 'center',
    },
    externalLink: {
      display: 'block',
      width: '100%',
      height: '100%',
      color: 'black',
    },
    modalContent: {
      top: '50%',
      left: '50%',
      transform: 'translate(-50%, -50%)',
      position: 'absolute',
      width: 400,
      backgroundColor: theme.palette.background.paper,
      border: '2px solid #000',
      boxShadow: theme.shadows[5],
      padding: theme.spacing(2, 4, 3),
    },
  }))();

  // Create time slot elements
  const generateTimeSlots = (gridWidth) => {
    const tempArray = [];
    for (let minute = 0, hour = earliestHour; hour < latestHour; minute += 30) {
      if (minute !== 0 && minute === 60) {
        hour += 1;
        minute = 0;
      }

      if (hour === 24) {
        break;
      }

      const timeSlotName = `time-${zeroPad(hour, 2)}${zeroPad(minute, 2)}`;
      const timeSlotStyle = {
        gridColumn: 'times',
        whiteSpace: 'nowrap',
        margin: 0,
        textAlign: 'right',
        position: 'relative',
        gridRow: timeSlotName,
      };
      const timeSlotLineStyle = {
        content: '""',
        display: 'block',
        backgroundColor: 'rgba(0,0,0,.3)',
        top: '-1px',
        height: '1px',
        position: 'absolute',
        width: gridWidth,
      };

      tempArray.push(
        <h3 key={timeSlotName} style={timeSlotStyle}>
          <div style={timeSlotLineStyle} />
          {hour > 12 ? zeroPad(hour - 12, 1) : zeroPad(hour, 1)}:
          {zeroPad(minute, 2)} {hour >= 12 ? 'pm' : 'am'}
        </h3>,
      );
    }

    setTimeSlots(tempArray);
  };

  const handleEventClick = (event, location) => {
    setModalContent(<EventsGridViewModal event={event} location={location} />);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  useLayoutEffect(() => {
    const { current } = eventGridRef;
    let delayTimer;

    const handleResize = () => {
      clearTimeout(delayTimer);
      delayTimer = setTimeout(() => {
        generateTimeSlots(current.offsetWidth);
      }, 250);
    };
    handleResize();
    window.addEventListener('resize', handleResize);

    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <Box className={classes.eventGrid} ref={eventGridRef}>
      {locations.map((location, index) => (
        <Box
          key={location.id}
          className={classes.trackSlot}
          aria-hidden="true"
          style={{ gridColumn: `track-${index}`, gridRow: 'tracks' }}
        >
          {location.url !== null ? (
            <ExternalLink className={classes.externalLink} href={location.url}>
              {location.name}
            </ExternalLink>
          ) : (
            location.name
          )}
        </Box>
      ))}

      {timeSlots}

      {locations.map((location, locationIndex) => {
        return events.map((event) => {
          if (event.location_id === location.id) {
            return (
              <EventsGridViewEvent
                key={event.id}
                onClick={() => handleEventClick(event, location)}
                event={event}
                locationIndex={locationIndex}
              />
            );
          }

          return false;
        });
      })}
      <Modal open={open} onClose={handleClose}>
        {modalContent}
      </Modal>
    </Box>
  );
};

export default EventsGridView;
