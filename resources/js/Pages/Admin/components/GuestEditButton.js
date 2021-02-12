import React, { useState } from 'react';
import { Inertia } from '@inertiajs/inertia';
import { usePage } from '@inertiajs/inertia-react';

import { Button, ButtonGroup, Box, Drawer, TextField } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { Edit } from '@material-ui/icons';

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

const GuestEditButton = ({ scheduleId, guest, onEdit }) => {
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
    formData.set('id', guest.id);
    formData.set('scheduleId', scheduleId);

    Inertia.post(`guests/update`, formData, {
      onSuccess: (page) => {
        onEdit();
        setDrawerStatus(false);
      },
    });
  };

  return (
    <>
      <Edit
        key="edit-guest-button"
        className={classes.baseButton}
        onClick={handleClick}
      />

      <Drawer anchor="right" open={drawerStatus}>
        <Box>
          <form className={classes.form} onSubmit={handleEditSubmit}>
            <TextField
              required
              fullWidth
              defaultValue={guest.name}
              name="name"
              variant="outlined"
              label="Guest Name"
              className={classes.formField}
            />

            <TextField
              required
              fullWidth
              defaultValue={guest.category}
              name="category"
              variant="outlined"
              label="Guest Category"
              className={classes.formField}
            />

            <TextField
              fullWidth
              multiline
              rows={5}
              defaultValue={guest.description}
              name="description"
              variant="outlined"
              label="Guest Description"
              className={classes.formField}
            />

            <TextField
              fullWidth
              defaultValue={guest.social_fb}
              name="social_fb"
              variant="outlined"
              label="Guest Facebook"
              className={classes.formField}
            />

            <TextField
              fullWidth
              defaultValue={guest.social_tw}
              name="social_tw"
              variant="outlined"
              label="Guest Twitter"
              className={classes.formField}
            />

            <TextField
              fullWidth
              defaultValue={guest.social_ig}
              name="social_ig"
              variant="outlined"
              label="Guest Instagram"
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

export default GuestEditButton;
