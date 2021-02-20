import React from 'react';
import { DateTime } from 'luxon';

import { Box, Typography, Paper } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  event: {
    display: 'flex',
    flexDirection: 'column',
    backgroundColor: theme.palette.background.paper,
    padding: theme.spacing(1),
    zIndex: 1,
    cursor: 'pointer',
    overflow: 'hidden',
  },
  eventTitle: {
    margin: '0 0 4px',
    fontSize: '1.25rem',
  },
  eventTime: {
    margin: 0,
    fontSize: '1rem',
  },
}));

const EventsGridViewEvent = ({ onClick, event, locationIndex }) => {
  const classes = useStyles();

  let eventTrackNum = '';
  let eventTimeRow = '';

  const eventTimeStart = event.time_start.replace(':', '').substr(0, 4);
  const eventTimeEnd = event.time_end.replace(':', '').substr(0, 4);

  eventTrackNum = `track-${locationIndex}`;
  eventTimeRow = `time-${eventTimeStart} / time-${eventTimeEnd}`;

  const beginDate = DateTime.fromISO(`${event.date}T${event.time_start}`);
  const endDate = DateTime.fromISO(`${event.date}T${event.time_end}`);
  const timeEntry = `${beginDate.toLocaleString(
    DateTime.TIME_SIMPLE,
  )} - ${endDate.toLocaleString(DateTime.TIME_SIMPLE)}`;

  return (
    <Box
      onClick={onClick}
      component={Paper}
      elevation={4}
      key={event.id}
      className={classes.event}
      style={{ gridColumn: eventTrackNum, gridRow: eventTimeRow }}
    >
      {event.is_cancelled === 1 ? (
        <>
          <Typography
            component="h2"
            className={classes.eventTitle}
            style={{ textDecoration: 'line-through' }}
          >
            {event.name}
          </Typography>
          <Typography
            component="h3"
            className={classes.eventTime}
            style={{ textDecoration: 'line-through' }}
          >
            {timeEntry}
          </Typography>
        </>
      ) : (
        <>
          <Typography component="h2" className={classes.eventTitle}>
            {event.name}
          </Typography>
          <Typography component="h3" className={classes.eventTime}>
            {timeEntry}
          </Typography>
        </>
      )}
    </Box>
  );
};

export default EventsGridViewEvent;
