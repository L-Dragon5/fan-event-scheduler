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
  fieldBreak: {
    marginBottom: theme.spacing(4),
  },
}));

const FormScheduleAdd = ({ closeDrawer, reloadPage }) => {
  const classes = useStyles();

  const handleAddSubmit = (e) => {
    e.preventDefault();

    const formData = new FormData(e.target);

    Inertia.post('/admin/schedules/create', formData, {
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
        label="Schedule Name"
        className={classes.formField}
      />

      <TextField
        required
        fullWidth
        type="date"
        name="start_date"
        variant="outlined"
        label="Start Date"
        className={classes.formField}
        InputLabelProps={{
          shrink: true,
        }}
        inputProps={{
          min: new Date().toISOString().split('T')[0],
        }}
        defaultValue={new Date().toISOString().split('T')[0]}
      />

      <TextField
        required
        fullWidth
        type="date"
        name="end_date"
        variant="outlined"
        label="End Date"
        className={(classes.formField, classes.fieldBreak)}
        InputLabelProps={{
          shrink: true,
        }}
        inputProps={{
          min: new Date().toISOString().split('T')[0],
        }}
        defaultValue={new Date().toISOString().split('T')[0]}
      />

      <TextField
        fullWidth
        name="social_fb"
        variant="outlined"
        label="Event Facebook"
        className={classes.formField}
      />

      <TextField
        fullWidth
        name="social_tw"
        variant="outlined"
        label="Event Twitter"
        className={classes.formField}
      />

      <TextField
        fullWidth
        name="social_ig"
        variant="outlined"
        label="Event Instagram"
        className={classes.formField}
      />

      <TextField
        fullWidth
        name="social_web"
        variant="outlined"
        label="Event Website"
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
          onClick={closeDrawer}
        >
          Cancel
        </Button>
      </ButtonGroup>
    </form>
  );
};

export default FormScheduleAdd;
