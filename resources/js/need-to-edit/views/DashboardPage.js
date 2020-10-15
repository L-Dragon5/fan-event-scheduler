import React, { useEffect, useState } from 'react';

import { Box, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

import Helper from '../components/Helper';
import AlertMessage from '../components/AlertMessage';
import AdminScheduleNavbar from '../components/AdminScheduleNavbar';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  contentRoot: {
    flexGrow: 1,
    padding: theme.spacing(2),
  },
}));

const DashboardPage = ({ match }) => {
  const { scheduleId } = match.params;
  const classes = useStyles();
  const [errorAlertMessage, setErrorAlertMessage] = useState(null);
  const [successAlertMessage, setSuccessAlertMessage] = useState(null);

  useEffect(() => {
    document.title = 'Dashboard | SaaS Event Schedule';
  }, []);

  return (
    <Box className={classes.root}>
      <AdminScheduleNavbar scheduleId={scheduleId} />
      <Box component="main" className={classes.contentRoot}>
        <Box className={classes.title}>
          <Typography component="span" variant="h4">
            Dashboard
          </Typography>
        </Box>

        {errorAlertMessage && (
          <AlertMessage type="error" content={errorAlertMessage} />
        )}
        {successAlertMessage && (
          <AlertMessage type="success" content={successAlertMessage} />
        )}
      </Box>
    </Box>
  );
};

export default DashboardPage;
