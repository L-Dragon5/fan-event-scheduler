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

const Exhibitors = ({ scheduleId, exhibitors }) => {
  const classes = useStyles();

  const handleReload = () => {
    Inertia.reload({ only: ['exhibitors'] });
  };

  return (
    <AdminScheduleLayout title="Exhibitors" scheduleId={scheduleId}>
      <Box className={classes.contentRoot}>
        <Box className={classes.title}>
          <Typography component="span" variant="h4">
            Exhibitors
          </Typography>
        </Box>

        {exhibitors && exhibitors.length ? (
          exhibitors.map((exhibitor) => (
            <Box key={exhibitor.name}>
              <div>{exhibitor.name}</div>
            </Box>
          ))
        ) : (
          <Typography variant="body1">No exhibitors</Typography>
        )}
      </Box>
    </AdminScheduleLayout>
  );
};

export default Exhibitors;
