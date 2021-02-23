import React from 'react';
import { DateTime } from 'luxon';

import { Box, ListItem, ListItemText, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

import EventTypeDot from '../EventTypeDot';

const useStyles = makeStyles((theme) => ({
  dotContainer: {
    display: 'flex',
    flexWrap: 'wrap',
    flexBasis: 44,
    justifyContent: 'flex-end',
  },
}));

const EventsListViewEvent = ({ onClick, event, locations }) => {
  const classes = useStyles();

  const beginDate = DateTime.fromISO(`${event.date}T${event.time_start}`);
  const endDate = DateTime.fromISO(`${event.date}T${event.time_end}`);
  const timeEntry = `${beginDate.toLocaleString(
    DateTime.TIME_SIMPLE,
  )} - ${endDate.toLocaleString(DateTime.TIME_SIMPLE)}`;

  const location = locations.find((loc) => loc.id === event.location_id);

  if (event.is_cancelled === 1) {
    return (
      <ListItem alignItems="flex-start" button onClick={onClick}>
        <ListItemText
          secondary={
            <>
              <Typography
                component="span"
                variant="body2"
                color="textPrimary"
                style={{ display: 'block', textDecoration: 'line-through' }}
              >
                {timeEntry}
              </Typography>
              {location !== undefined ? location?.name : 'Unknown'}
            </>
          }
        >
          <Typography style={{ textDecoration: 'line-through' }}>
            {event.name}
          </Typography>
        </ListItemText>
        {event.event_types?.length > 0 && (
          <Box className={classes.dotContainer}>
            {event.event_types.map((type) => (
              <EventTypeDot key={type.id} type={type} />
            ))}
          </Box>
        )}
      </ListItem>
    );
  }

  return (
    <ListItem alignItems="flex-start" button onClick={onClick}>
      <ListItemText
        primary={event.name}
        secondary={
          <>
            <Typography
              component="span"
              variant="body2"
              color="textPrimary"
              style={{ display: 'block' }}
            >
              {timeEntry}
            </Typography>
            {location !== undefined ? location?.name : 'Unknown'}
          </>
        }
      />
      {event.event_types?.length > 0 && (
        <Box className={classes.dotContainer}>
          {event.event_types.map((type) => (
            <EventTypeDot key={type.id} type={type} />
          ))}
        </Box>
      )}
    </ListItem>
  );
};

export default EventsListViewEvent;
