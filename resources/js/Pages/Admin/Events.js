import React from 'react';
import { Inertia } from '@inertiajs/inertia';

import { Box, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

import AdminScheduleLayout from './AdminScheduleLayout';

const useStyles = makeStyles((theme) => ({
  contentRoot: {
    flexGrow: 1,
    padding: theme.spacing(2),
  },
}));

const Events = ({ scheduleId, events }) => {
  const classes = useStyles();

  const handleReload = () => {
    Inertia.reload({ only: ['events'] });
  };

  return (
    <AdminScheduleLayout title="Events" scheduleId={scheduleId}>
      <Box className={classes.contentRoot}>
        <Box className={classes.title}>
          <Typography component="span" variant="h4">
            Events
          </Typography>
        </Box>

        {events && events.length ? (
          events.map((event) => (
            <Box key={event.name}>
              <div>{event.name}</div>
            </Box>
          ))
        ) : (
          <Typography variant="body1">No events</Typography>
        )}
      </Box>
    </AdminScheduleLayout>
  );
};

export default Events;
