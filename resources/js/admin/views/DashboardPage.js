import React, { useEffect, useState } from 'react';

import { Box, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

import AlertMessage from '../components/AlertMessage';

const useStyles = makeStyles((theme) => ({
  root: {
    padding: theme.spacing(2),
  },
  fab: {
    position: 'fixed',
    bottom: theme.spacing(2),
    right: theme.spacing(2),
  },
}));

const DashboardPage = () => {
  const classes = useStyles();
  const [errorAlertMessage, setErrorAlertMessage] = useState(null);
  const [successAlertMessage, setSuccessAlertMessage] = useState(null);

  useEffect(() => {
    document.title = 'User Admin Panel | SaaS Event Schedule';
  }, []);

  return (
    <Box className={classes.root}>
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
  );
};

export default DashboardPage;
