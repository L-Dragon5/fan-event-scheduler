import React from 'react';
import { Inertia } from '@inertiajs/inertia';

import { Button, ButtonGroup, TextField } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  form: {
    width: '100%',
  },
  formField: {
    marginBottom: theme.spacing(1),
  },
  fieldBreak: {
    marginBottom: theme.spacing(4),
  },
}));

const FormScheduleEdit = ({ reloadPage, schedule }) => {
  const classes = useStyles();

  const handleEditSubmit = (e) => {
    e.preventDefault();

    const formData = new FormData(e.target);
    formData.set('id', schedule.id);

    Inertia.post(`/schedule/${schedule.id}/update`, formData, {
      onSuccess: (page) => {
        reloadPage();
      },
    });
  };

  return (
    <form className={classes.form} onSubmit={handleEditSubmit}>
      <TextField
        required
        fullWidth
        defaultValue={schedule.name}
        name="name"
        variant="outlined"
        label="Schedule Name"
        className={classes.formField}
      />

      <TextField
        required
        fullWidth
        defaultValue={schedule.start_date}
        name="start_date"
        variant="outlined"
        label="Start Date"
        className={classes.formField}
      />

      <TextField
        required
        fullWidth
        defaultValue={schedule.end_date}
        name="end_date"
        variant="outlined"
        label="End Date"
        className={(classes.formField, classes.fieldBreak)}
      />

      <TextField
        fullWidth
        defaultValue={schedule.social_fb}
        name="social_fb"
        variant="outlined"
        label="Event Facebook"
        className={classes.formField}
      />

      <TextField
        fullWidth
        defaultValue={schedule.social_tw}
        name="social_tw"
        variant="outlined"
        label="Event Twitter"
        className={classes.formField}
      />

      <TextField
        fullWidth
        defaultValue={schedule.ig}
        name="social_ig"
        variant="outlined"
        label="Event Instagram"
        className={classes.formField}
      />

      <TextField
        fullWidth
        defaultValue={schedule.web}
        name="social_web"
        variant="outlined"
        label="Event Website"
        className={classes.formField}
      />

      <ButtonGroup aria-label="add form buttons">
        <Button type="submit" variant="contained" color="primary">
          Save
        </Button>
      </ButtonGroup>
    </form>
  );
};

export default FormScheduleEdit;
