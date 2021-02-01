import React, { useState } from 'react';
import { Inertia } from '@inertiajs/inertia';
import { usePage } from '@inertiajs/inertia-react';

import { Button, ButtonGroup, Box, Drawer, TextField } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { Edit } from '@material-ui/icons';

import AlertMessage from './AlertMessage';

const useStyles = makeStyles((theme) => ({
  baseButton: {
    cursor: 'pointer',
  },
  form: {
    padding: theme.spacing(1),
  },
  formField: {
    marginBottom: theme.spacing(1),
  },
}));

const LocationEditButton = ({ onEdit, locationId, name }) => {
  const { errors, flash } = usePage().props;
  const classes = useStyles();

  const [drawerStatus, setDrawerStatus] = useState(false);

  const handleClick = () => {
    setDrawerStatus(true);
  };

  const handleCancel = () => {
    setDrawerStatus(false);
  };

  const handleEditSubmit = (e) => {
    e.preventDefault();

    const formData = new FormData(e.target);
    formData.set('location', locationId);
    e.target.reset();

    Inertia.post(`locations/update`, formData, {
      onSuccess: (page) => {
        onEdit();
        setDrawerStatus(false);
      },
    });
  };

  return (
    <>
      {errors.error && <AlertMessage type="error" content={errors.error[0]} />}
      {flash.message && <AlertMessage type="success" content={flash.message} />}

      <Edit
        key="edit-location-button"
        className={classes.baseButton}
        onClick={handleClick}
      />

      <Drawer anchor="right" open={drawerStatus}>
        <Box>
          <form className={classes.form} onSubmit={handleEditSubmit}>
            <TextField
              required
              fullWidth
              defaultValue={name}
              name="name"
              variant="outlined"
              label="Location Name"
              className={classes.formField}
            />

            <ButtonGroup aria-label="add form buttons">
              <Button type="submit" variant="contained" color="primary">
                Update
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

export default LocationEditButton;
