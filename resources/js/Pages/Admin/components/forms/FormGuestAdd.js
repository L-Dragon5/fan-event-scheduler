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

const FormGuestAdd = ({ closeDrawer, reloadPage, scheduleId }) => {
  const classes = useStyles();

  const handleAddSubmit = (e) => {
    e.preventDefault();

    const formData = new FormData(e.target);
    formData.set('scheduleId', scheduleId);

    Inertia.post(`/admin/schedule/${scheduleId}/guests/store`, formData, {
      onSuccess: (page) => {
        reloadPage();
        closeDrawer();
      },
    });
  };

  return (
    <form className={classes.form} onSubmit={handleAddSubmit}>
      <TextField
        required
        fullWidth
        name="name"
        variant="outlined"
        label="Guest Name"
        className={classes.formField}
      />

      <TextField
        required
        fullWidth
        name="category"
        variant="outlined"
        label="Guest Category"
        className={classes.formField}
      />

      <TextField
        fullWidth
        multiline
        rows={5}
        name="description"
        variant="outlined"
        label="Guest Description"
        className={classes.formField}
      />

      <TextField
        fullWidth
        type="url"
        name="social_fb"
        variant="outlined"
        label="Guest Facebook"
        className={classes.formField}
      />

      <TextField
        fullWidth
        type="url"
        name="social_tw"
        variant="outlined"
        label="Guest Twitter"
        className={classes.formField}
      />

      <TextField
        fullWidth
        type="url"
        name="social_ig"
        variant="outlined"
        label="Guest Instagram"
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
          onClick={closeDrawer}
        >
          Cancel
        </Button>
      </ButtonGroup>
    </form>
  );
};

export default FormGuestAdd;
