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

const EventTypes = ({ scheduleId, eventTypes }) => {
  const classes = useStyles();

  const handleReload = () => {
    Inertia.reload({ only: ['eventTypes'] });
  };

  return (
    <AdminScheduleLayout title="Event Types" scheduleId={scheduleId}>
      <Box className={classes.contentRoot}>
        <Box className={classes.title}>
          <Typography component="span" variant="h4">
            Event Types
          </Typography>
        </Box>

        {eventTypes?.length ? (
          eventTypes?.map((eventType) => (
            <Box key={eventType.id}>
              <div>{eventType.name}</div>
            </Box>
          ))
        ) : (
          <Typography variant="body1">No event types</Typography>
        )}
      </Box>
    </AdminScheduleLayout>
  );
};

export default EventTypes;
