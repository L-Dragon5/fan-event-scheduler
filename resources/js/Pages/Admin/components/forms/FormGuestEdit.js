import React from 'react';
import { Inertia } from '@inertiajs/inertia';

import { Button, ButtonGroup, TextField } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  form: {
    padding: theme.spacing(1),
  },
  formField: {
    marginBottom: theme.spacing(1),
  },
}));

const FormGuestEdit = ({ closeDrawer, reloadPage, scheduleId, guest }) => {
  const classes = useStyles();

  const handleEditSubmit = (e) => {
    e.preventDefault();

    const formData = new FormData(e.target);
    formData.set('id', guest.id);
    formData.set('scheduleId', scheduleId);

    Inertia.post(`/admin/schedule/${scheduleId}/guests/update`, formData, {
      onSuccess: (page) => {
        reloadPage();
        closeDrawer();
      },
    });
  };

  return (
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
          onClick={closeDrawer}
        >
          Cancel
        </Button>
      </ButtonGroup>
    </form>
  );
};

export default FormGuestEdit;
