import React, { useState } from 'react';
import { Inertia } from '@inertiajs/inertia';
import { usePage } from '@inertiajs/inertia-react';

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

import AlertMessage from './AlertMessage';

const useStyles = makeStyles((theme) => ({
  baseButton: {
    backgroundColor: theme.palette.primary.main,
    color: '#FFFFFF',
    width: '200px',
    padding: theme.spacing(1, 2),
    margin: theme.spacing(2, 0),
    fontSize: '1.2rem',
  },
  form: {
    padding: theme.spacing(1),
  },
  formField: {
    marginBottom: theme.spacing(1),
  },
}));

const LocationAddButton = ({ onAdd, scheduleId }) => {
  const { errors, flash } = usePage().props;
  const classes = useStyles();

  const [drawerStatus, setDrawerStatus] = useState(false);

  const handleClick = () => {
    setDrawerStatus(true);
  };

  const handleCancel = () => {
    setDrawerStatus(false);
  };

  const handleAddSubmit = (e) => {
    e.preventDefault();

    const formData = new FormData(e.target);
    formData.set('scheduleId', scheduleId);
    e.target.reset();

    Inertia.post('locations/store', formData, {
      onSuccess: (page) => {
        onAdd();
        setDrawerStatus(false);
      },
    });
  };

  return (
    <>
      {errors.error && <AlertMessage type="error" content={errors.error[0]} />}
      {flash.message && <AlertMessage type="success" content={flash.message} />}

      <ButtonBase
        focusRipple
        key="add-location-button"
        className={classes.baseButton}
        onClick={handleClick}
      >
        <Add /> Add Location
      </ButtonBase>

      <Drawer anchor="right" open={drawerStatus}>
        <Box>
          <form className={classes.form} onSubmit={handleAddSubmit}>
            <TextField
              required
              fullWidth
              name="name"
              variant="outlined"
              label="Location Name"
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
                onClick={handleCancel}
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

export default LocationAddButton;
