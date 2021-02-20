import React, { useState } from 'react';
import { Inertia } from '@inertiajs/inertia';
import TimezoneSelect from 'react-timezone-select';

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
  timezone: {
    zIndex: 2,
    marginBottom: theme.spacing(4),
  },
}));

const FormScheduleAdd = ({ closeDrawer, reloadPage }) => {
  const classes = useStyles();
  const [selectedTimezone, setSelectedTimezone] = useState({
    value: 'America/Detroit',
    abbrev: 'EST',
  });

  const handleAddSubmit = (e) => {
    e.preventDefault();

    const formData = new FormData(e.target);
    formData.set('timezone', selectedTimezone.value);
    formData.set('timezone_label', selectedTimezone.abbrev);

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
        className={classes.formField}
        InputLabelProps={{
          shrink: true,
        }}
        inputProps={{
          min: new Date().toISOString().split('T')[0],
        }}
        defaultValue={new Date().toISOString().split('T')[0]}
      />

      <TimezoneSelect
        className={classes.timezone}
        value={selectedTimezone}
        onChange={setSelectedTimezone}
        labelStyle="abbrev"
      />

      <TextField
        fullWidth
        type="url"
        name="social_fb"
        variant="outlined"
        label="Event Facebook"
        className={classes.formField}
      />

      <TextField
        fullWidth
        type="url"
        name="social_tw"
        variant="outlined"
        label="Event Twitter"
        className={classes.formField}
      />

      <TextField
        fullWidth
        type="url"
        name="social_ig"
        variant="outlined"
        label="Event Instagram"
        className={classes.formField}
      />

      <TextField
        fullWidth
        type="url"
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
