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

const FormUserUpdate = ({ closeModal }) => {
  const classes = useStyles();

  const handleUpdate = (e) => {
    e.preventDefault();

    const formData = new FormData(e.target);

    Inertia.post('/admin/update-password', formData, {
      onSuccess: (page) => {
        closeModal();
      },
    });
  };

  return (
    <form className={classes.form} onSubmit={handleUpdate}>
      <TextField
        required
        fullWidth
        type="password"
        name="old_password"
        variant="outlined"
        label="Old Password"
        className={classes.formField}
      />

      <TextField
        required
        fullWidth
        type="password"
        name="new_password"
        variant="outlined"
        label="New Password"
        className={classes.formField}
      />

      <ButtonGroup aria-label="add form buttons">
        <Button type="submit" variant="contained" color="primary">
          Save
        </Button>
        <Button
          type="reset"
          variant="contained"
          color="secondary"
          onClick={closeModal}
        >
          Cancel
        </Button>
      </ButtonGroup>
    </form>
  );
};

export default FormUserUpdate;
