import React, { useEffect, useState } from 'react';
import { withRouter } from 'react-router-dom';
import axios from 'axios';
import { Inertia } from '@inertiajs/inertia';

import { Box, ButtonBase, Typography, Grid } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import CancelPresentationIcon from '@material-ui/icons/CancelPresentation';

import Helper from './components/Helper';
import AlertMessage from './components/AlertMessage';
import AdminUserNavbar from './components/AdminUserNavbar';
import AddScheduleButton from './components/AddScheduleButton';

const useStyles = makeStyles((theme) => ({
  root: {
    padding: theme.spacing(2),
  },
  title: {
    marginBottom: theme.spacing(2),
  },
  scheduleButton: {
    backgroundColor: 'rgba(0, 0, 0, 0.02)',
    border: '1px solid rgba(0, 0, 0, 0.15)',
    borderRadius: '5px',
    width: '100%',
    '& > div': {
      padding: theme.spacing(3),
      width: '100%',
    },
  },
  scheduleButtonImage: {
    width: '100%',
    borderBottom: '1px solid rgba(0, 0, 0, 0.15)',
    '& > svg': {
      fontSize: '3.5rem',
      marginBottom: theme.spacing(2),
    },
  },
  scheduleButtonText: {
    width: '100%',
    textAlign: 'center',
    fontSize: '1.25rem',
    paddingTop: theme.spacing(2),
  },
}));

const SchedulesPage = ({ history }) => {
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
        if (response.data && response.data.length > 0) {
          setSchedules([
            ...response.data,
            { image: 'add', name: 'Add Schedule' },
          ]);
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

  const handleOnAdd = () => {
    getSchedules();
  };

  const handleEditSchedule = () => {};

  const handleDeleteSchedule = () => {};

  const ScheduleButton = ({ id, image, text }) => {
    return (
      <ButtonBase
        focusRipple
        key={`${text}-button`}
        className={classes.scheduleButton}
        onClick={() => history.push(`/schedule/${id}`)}
      >
        <Box>
          <Box className={classes.scheduleButtonImage}>
            {image === undefined || image === null ? (
              <CancelPresentationIcon />
            ) : (
              <img alt="" src={image} />
            )}
          </Box>
          <Box className={classes.scheduleButtonText}>{text}</Box>
        </Box>
      </ButtonBase>
    );
  };

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

        <Grid container spacing={3}>
          {schedules.map((schedule) => (
            <Grid key={schedule.name} item xs={12} sm={6} md={4}>
              {schedule.image === 'add' ? (
                <AddScheduleButton onAdd={handleOnAdd} />
              ) : (
                <ScheduleButton
                  id={schedule.id}
                  image={schedule.image}
                  text={schedule.name}
                />
              )}
            </Grid>
          ))}
        </Grid>
      </Box>
    </>
  );
};

export default withRouter(SchedulesPage);
