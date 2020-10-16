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

const Guests = ({ scheduleId, guests }) => {
  const classes = useStyles();

  const handleReload = () => {
    Inertia.reload({ only: ['guests'] });
  };

  return (
    <AdminScheduleLayout title="Guests" scheduleId={scheduleId}>
      <Box className={classes.contentRoot}>
        <Box className={classes.title}>
          <Typography component="span" variant="h4">
            Guests
          </Typography>
        </Box>

        {guests && guests.length ? (
          guests.map((guest) => (
            <Box key={guest.name}>
              <div>{guest.name}</div>
            </Box>
          ))
        ) : (
          <Typography variant="body1">No guests</Typography>
        )}
      </Box>
    </AdminScheduleLayout>
  );
};

export default Guests;
