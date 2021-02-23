import React, { useState } from 'react';
import { Inertia } from '@inertiajs/inertia';
import TimezoneSelect from 'react-timezone-select';
import { DateTime } from 'luxon';
import { DatePicker } from '@material-ui/pickers';

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

  const [scheduleStartDate, setScheduleStartDate] = useState(DateTime.now());
  const [scheduleEndDate, setScheduleEndDate] = useState(DateTime.now());
  const [selectedTimezone, setSelectedTimezone] = useState({
    value: 'America/Detroit',
    abbrev: 'EST',
  });

  const handleAddSubmit = (e) => {
    e.preventDefault();

    const formData = new FormData(e.target);
    formData.set('start_date', scheduleStartDate.toUTC().toISODate());
    formData.set('end_date', scheduleEndDate.toUTC().toISODate());
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

      <DatePicker
        value={scheduleStartDate}
        onChange={setScheduleStartDate}
        className={classes.formField}
        required
        fullWidth
        label="Start Date"
        inputVariant="outlined"
        minDate={DateTime.now().toISODate()}
      />

      <DatePicker
        value={scheduleEndDate}
        onChange={setScheduleEndDate}
        className={classes.formField}
        required
        fullWidth
        label="End Date"
        inputVariant="outlined"
        minDate={DateTime.now().toISODate()}
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
