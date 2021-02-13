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

const FormLocationEdit = ({
  closeDrawer,
  reloadPage,
  scheduleId,
  location,
}) => {
  const classes = useStyles();

  const handleEditSubmit = (e) => {
    e.preventDefault();

    const formData = new FormData(e.target);
    formData.set('id', location.id);
    formData.set('scheduleId', scheduleId);

    Inertia.post(`/schedule/${scheduleId}/locations/update`, formData, {
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
        defaultValue={location.name}
        name="name"
        variant="outlined"
        label="Location Name"
        className={classes.formField}
      />

      <TextField
        fullWidth
        type="url"
        defaultValue={location.url}
        name="url"
        variant="outlined"
        label="Location URL"
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

export default FormLocationEdit;
