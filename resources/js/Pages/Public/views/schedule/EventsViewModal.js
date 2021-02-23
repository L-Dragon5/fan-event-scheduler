import React from 'react';
import { DateTime } from 'luxon';

import { Box, Chip, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  modalContent: {
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    position: 'absolute',
    width: '80vw',
    backgroundColor: theme.palette.background.paper,
    borderWidth: 2,
    borderStyle: 'solid',
    borderColor: theme.palette.grey[700],
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
    [theme.breakpoints.up('md')]: {
      width: '50vw',
    },
    [theme.breakpoints.up('lg')]: {
      width: '30vw',
    },
  },
  eventTitle: {
    margin: theme.spacing(0, 0, 0.5, 0),
  },
  eventSubtitle: {
    margin: theme.spacing(0, 0, 1, 0),
  },
  eventTypeChips: {
    margin: theme.spacing(0, 0, 2, 0),
  },
  chip: {
    margin: theme.spacing(0, 0.5, 0.5, 0),
  },
}));

const EventsViewModal = ({ event }) => {
  const classes = useStyles();

  const beginDate = DateTime.fromISO(`${event.date}T${event.time_start}`);
  const endDate = DateTime.fromISO(`${event.date}T${event.time_end}`);
  const timeEntry = `${beginDate.toLocaleString(
    DateTime.TIME_SIMPLE,
  )} - ${endDate.toLocaleString(DateTime.TIME_SIMPLE)}`;

  if (event.is_cancelled === 1) {
    return (
      <Box className={classes.modalContent}>
        <Typography variant="h4">Cancelled</Typography>
        <Typography
          variant="h4"
          className={classes.eventTitle}
          style={{ textDecoration: 'line-through' }}
        >
          {event.name}
        </Typography>
        <Typography variant="h5" className={classes.eventSubtitle}>
          {event.location?.name !== undefined
            ? `${event.location?.name} | ${timeEntry}`
            : timeEntry}
        </Typography>
        <Box className={classes.eventTypeChips}>
          {event.event_types.map((type) => (
            <Chip
              key={type.id}
              variant="outlined"
              label={type.name}
              clickable
              className={classes.chip}
              style={{ borderColor: `#${type.color}` }}
            />
          ))}
        </Box>
        <Typography variant="body1">{event.description}</Typography>
      </Box>
    );
  }

  return (
    <Box className={classes.modalContent}>
      <Typography variant="h4" className={classes.eventTitle}>
        {event.name}
      </Typography>
      <Typography variant="h5" className={classes.eventSubtitle}>
        {event.location?.name !== undefined
          ? `${event.location?.name} | ${timeEntry}`
          : timeEntry}
      </Typography>
      <Box className={classes.eventTypeChips}>
        {event.event_types.map((type) => (
          <Chip
            key={type.id}
            variant="outlined"
            label={type.name}
            clickable
            className={classes.chip}
            style={{ borderColor: `#${type.color}` }}
          />
        ))}
      </Box>
      <Typography variant="body1">{event.description}</Typography>
    </Box>
  );
};

export default EventsViewModal;
