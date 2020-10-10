import React, { useState } from 'react';
import axios from 'axios';

import {
  Button,
  ButtonGroup,
  ButtonBase,
  Box,
  Drawer,
  TextField,
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { Add } from '@material-ui/icons';

import Helper from './Helper';
import AlertMessage from './AlertMessage';

const useStyles = makeStyles((theme) => ({
  root: {
    padding: theme.spacing(2),
  },
  scheduleButton: {
    backgroundColor: 'rgba(0, 0, 0, 0.02)',
    border: '1px dashed rgba(0, 0, 0, 0.25)',
    borderRadius: '5px',
    width: '100%',
    '& > div': {
      padding: theme.spacing(3),
      width: '100%',
    },
  },
  scheduleButtonIcon: {
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
  form: {
    padding: theme.spacing(1),
  },
  formField: {
    marginBottom: theme.spacing(1),
  },
}));

const AddScheduleButton = ({ onAdd }) => {
  const classes = useStyles();
  const [errorAlertMessage, setErrorAlertMessage] = useState(null);
  const [successAlertMessage, setSuccessAlertMessage] = useState(null);

  const [drawerStatus, setDrawerStatus] = useState(false);

  const handleAddClick = () => {
    setDrawerStatus(true);
  };

  const handleAddCancel = () => {
    setDrawerStatus(false);
  };

  const handleAddSubmit = (e) => {
    e.preventDefault();

    const formData = new FormData(e.target);
    e.target.reset();

    axios
      .post('/api/schedules/create', formData, {
        headers: {
          Accept: 'application/json',
          Authorization: `Bearer ${Helper.getToken()}`,
          'content-type': 'multipart/form-data',
        },
      })
      .then((response) => {
        if (response.status === 200) {
          onAdd();
          setSuccessAlertMessage(response.data.message);
          setDrawerStatus(false);
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

  return (
    <>
      {errorAlertMessage && (
        <AlertMessage type="error" content={errorAlertMessage} />
      )}
      {successAlertMessage && (
        <AlertMessage type="success" content={successAlertMessage} />
      )}

      <ButtonBase
        focusRipple
        key="add-schedule-button"
        className={classes.scheduleButton}
        onClick={handleAddClick}
      >
        <Box>
          <Box className={classes.scheduleButtonIcon}>
            <Add />
          </Box>
          <Box className={classes.scheduleButtonText}>Add Schedule</Box>
        </Box>
      </ButtonBase>
      <Drawer anchor="right" open={drawerStatus}>
        <Box>
          <form className={classes.form} onSubmit={handleAddSubmit}>
            <TextField
              required
              fullWidth
              name="name"
              variant="outlined"
              label="Schedule Name"
              className={classes.formField}
            />

            <ButtonGroup aria-label="add form buttons">
              <Button type="submit" variant="contained" color="primary">
                Submit
              </Button>
              <Button
                type="reset"
                variant="contained"
                color="secondary"
                onClick={handleAddCancel}
              >
                Cancel
              </Button>
            </ButtonGroup>
          </form>
        </Box>
      </Drawer>
    </>
  );
};

export default AddScheduleButton;
