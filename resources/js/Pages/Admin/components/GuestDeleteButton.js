import React, { useState } from 'react';
import { Inertia } from '@inertiajs/inertia';
import { usePage } from '@inertiajs/inertia-react';

import {
  Button,
  ButtonGroup,
  Typography,
  Box,
  Drawer,
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { Delete } from '@material-ui/icons';

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

const GuestDeleteButton = ({ scheduleId, guest, onDelete }) => {
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

    Inertia.post(
      `guests/destroy`,
      {
        id: guest.id,
        scheduleId,
      },
      {
        onSuccess: (page) => {
          onDelete();
          setDrawerStatus(false);
        },
      },
    );
  };

  return (
    <>
      {errors.error && <AlertMessage type="error" content={errors.error[0]} />}
      {flash.message && <AlertMessage type="success" content={flash.message} />}

      <Delete
        key="delete-guest-button"
        className={classes.baseButton}
        onClick={handleClick}
      />

      <Drawer anchor="right" open={drawerStatus}>
        <Box>
          <form className={classes.form} onSubmit={handleAddSubmit}>
            <Typography>
              Are you sure you want to delete &quot;{guest.name}&quot;?
            </Typography>
            <Typography>This is not reversible.</Typography>

            <ButtonGroup aria-label="add form buttons">
              <Button type="submit" variant="contained" color="primary">
                Delete
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

export default GuestDeleteButton;
