import React from 'react';
import { Inertia } from '@inertiajs/inertia';

import { Box, Paper, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

import AdminScheduleLayout from './AdminScheduleLayout';
import FormScheduleEdit from './components/forms/FormScheduleEdit';
import DeleteScheduleButton from './components/DeleteScheduleButton';

const useStyles = makeStyles((theme) => ({
  contentRoot: {
    flexGrow: 1,
    padding: theme.spacing(2),
  },
  formContainer: {
    padding: theme.spacing(2),
    marginTop: theme.spacing(2),
    backgroundColor: theme.palette.background.paper,
  },
  publicLink: {
    margin: theme.spacing(4),
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
          <Typography className={classes.publicLink}>
            {schedule.public_link}
          </Typography>
          <DeleteScheduleButton scheduleId={scheduleId} />
        </Paper>
      </Box>
    </AdminScheduleLayout>
  );
};

export default Settings;
