import React from 'react';

import { Box, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

import AdminScheduleLayout from './AdminScheduleLayout';

const useStyles = makeStyles((theme) => ({
  contentRoot: {
    flexGrow: 1,
    padding: theme.spacing(2),
  },
}));

const Dashboard = ({ scheduleId }) => {
  const classes = useStyles();

  return (
    <AdminScheduleLayout title="Dashboard" scheduleId={scheduleId}>
      <Box className={classes.contentRoot}>
        <Box className={classes.title}>
          <Typography component="span" variant="h4">
            Dashboard
          </Typography>
        </Box>
      </Box>
    </AdminScheduleLayout>
  );
};

export default Dashboard;
