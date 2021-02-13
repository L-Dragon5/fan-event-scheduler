import React from 'react';
import { Inertia } from '@inertiajs/inertia';

import { Box, Paper, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

import AdminScheduleLayout from './AdminScheduleLayout';
import FormScheduleEdit from './components/forms/FormScheduleEdit';

const useStyles = makeStyles((theme) => ({
  contentRoot: {
    marginLeft: '240px',
    flexGrow: 1,
    padding: theme.spacing(2),
  },
  formContainer: {
    padding: theme.spacing(2),
    marginTop: theme.spacing(2),
    backgroundColor: 'white',
  },
}));

const Settings = ({ scheduleId, schedule }) => {
  const classes = useStyles();

  const handleReload = () => {
    Inertia.reload({ only: ['settings'] });
  };

  return (
    <AdminScheduleLayout title="Schedule Settings" scheduleId={scheduleId}>
      <Box className={classes.contentRoot}>
        <Box className={classes.title}>
          <Typography component="span" variant="h4">
            Schedule Settings
          </Typography>
        </Box>

        <Paper className={classes.formContainer}>
          <FormScheduleEdit reloadPage={handleReload} schedule={schedule} />
        </Paper>
      </Box>
    </AdminScheduleLayout>
  );
};

export default Settings;
