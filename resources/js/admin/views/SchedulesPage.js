import React, { useEffect, useState } from 'react';
import { NavLink, withRouter } from 'react-router-dom';
import axios from 'axios';

import { Box, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

import Helper from '../components/Helper';
import AlertMessage from '../components/AlertMessage';
import AdminUserNavbar from '../components/AdminUserNavbar';

const useStyles = makeStyles((theme) => ({
  root: {
    padding: theme.spacing(2),
  },
}));

const SchedulesPage = () => {
  const classes = useStyles();
  const [errorAlertMessage, setErrorAlertMessage] = useState(null);
  const [successAlertMessage, setSuccessAlertMessage] = useState(null);

  const [schedules, setSchedules] = useState([]);

  const getSchedules = () => {
    axios
      .get('/api/schedules', {
        headers: {
          Accept: 'application/json',
          Authorization: `Bearer ${Helper.getToken()}`,
        },
      })
      .then((response) => {
        if (response.data) {
          setSchedules(response.data);
        }
      })
      .catch((error) => {
        if (error.response) {
          let message = '';

          if (Array.isArray(error.response)) {
            Object.keys(error.response.data.message).forEach((key) => {
              message += `[${key}] - ${error.response.data.message[key]}\r\n`;
            });
          } else {
            message += error.response.data.message;
          }

          setErrorAlertMessage(message);
        }
      });
  };

  const handleAddSchedule = () => {};

  const handleEditSchedule = () => {};

  const handleDeleteSchedule = () => {};

  useEffect(() => {
    getSchedules();
    document.title = 'Schedules | SaaS Event Schedule';
  }, []);

  console.log(schedules);

  return (
    <>
      <AdminUserNavbar />
      <Box className={classes.root}>
        <Box className={classes.title}>
          <Typography component="span" variant="h4">
            Schedules
          </Typography>
        </Box>

        {errorAlertMessage && (
          <AlertMessage type="error" content={errorAlertMessage} />
        )}
        {successAlertMessage && (
          <AlertMessage type="success" content={successAlertMessage} />
        )}
      </Box>
    </>
  );
};

export default withRouter(SchedulesPage);
