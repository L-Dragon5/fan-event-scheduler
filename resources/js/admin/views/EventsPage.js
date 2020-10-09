import React, { useEffect, useState } from 'react';
import axios from 'axios';

import { Box, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

import Helper from '../components/Helper';
import AlertMessage from '../components/AlertMessage';
import AdminScheduleNavbar from '../components/AdminScheduleNavbar';

const useStyles = makeStyles((theme) => ({
  root: {
    padding: theme.spacing(2),
  },
}));

const EventsPage = ({ match }) => {
  const { scheduleId } = match.params;
  const classes = useStyles();
  const [errorAlertMessage, setErrorAlertMessage] = useState(null);
  const [successAlertMessage, setSuccessAlertMessage] = useState(null);

  const [events, setEvents] = useState([]);

  const getEvents = () => {
    axios
      .get('/api/events', {
        headers: {
          Accept: 'application/json',
          Authorization: `Bearer ${Helper.getToken()}`,
        },
      })
      .then((response) => {
        if (response.data) {
          setEvents(response.data);
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

  const handleAddEvent = () => {};

  const handleEditEvent = () => {};

  const handleDeleteEvent = () => {};

  useEffect(() => {
    // getEvents();
  }, []);

  return (
    <>
      <AdminScheduleNavbar scheduleId={scheduleId} />
      <Box className={classes.root}>
        <Box className={classes.title}>
          <Typography component="span" variant="h4">
            Events
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

export default EventsPage;
