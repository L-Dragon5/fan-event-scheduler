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

const Maps = ({ scheduleId, maps }) => {
  const classes = useStyles();

  const handleReload = () => {
    Inertia.reload({ only: ['maps'] });
  };

  return (
    <AdminScheduleLayout title="Maps" scheduleId={scheduleId}>
      <Box className={classes.contentRoot}>
        <Box className={classes.title}>
          <Typography component="span" variant="h4">
            Maps
          </Typography>
        </Box>

        {maps && maps.length ? (
          maps.map((map) => (
            <Box key={map.name}>
              <div>{map.name}</div>
            </Box>
          ))
        ) : (
          <Typography variant="body1">No maps</Typography>
        )}
      </Box>
    </AdminScheduleLayout>
  );
};

export default Maps;
