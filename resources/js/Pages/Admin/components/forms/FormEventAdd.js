import React, { useState } from 'react';
import { Inertia } from '@inertiajs/inertia';

import {
  Button,
  ButtonGroup,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  form: {
    padding: theme.spacing(1),
  },
  formField: {
    marginBottom: theme.spacing(1),
  },
}));

const FormEventAdd = ({
  closeDrawer,
  reloadPage,
  scheduleId,
  availableLocations,
  minDate,
  maxDate,
}) => {
  const classes = useStyles();

  const [locationId, setLocationId] = useState(0);

  const handleLocationSelect = (e) => {
    setLocationId(e.target.value);
  };

  const handleAddSubmit = (e) => {
    e.preventDefault();

    const formData = new FormData(e.target);
    formData.set('scheduleId', scheduleId);
    formData.set('location_id', locationId);

    Inertia.post(`/schedule/${scheduleId}/events/store`, formData, {
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
        label="Event Name"
        className={classes.formField}
      />

      <TextField
        required
        fullWidth
        type="date"
        name="date"
        variant="outlined"
        label="Date"
        className={classes.formField}
        InputLabelProps={{
          shrink: true,
        }}
        inputProps={{
          min: minDate,
          max: maxDate,
        }}
        defaultValue={minDate}
      />

      <TextField
        required
        fullWidth
        type="time"
        name="time_start"
        variant="outlined"
        label="Start Time"
        className={classes.formField}
        InputLabelProps={{
          shrink: true,
        }}
      />

      <TextField
        required
        fullWidth
        type="time"
        name="time_end"
        variant="outlined"
        label="End Time"
        className={classes.formField}
        InputLabelProps={{
          shrink: true,
        }}
      />

      <FormControl fullWidth variant="outlined" className={classes.formField}>
        <InputLabel id="event-edit-form-location-label">Location</InputLabel>
        <Select
          labelId="event-edit-form-location-label"
          value={locationId}
          onChange={handleLocationSelect}
        >
          <MenuItem key="location-none" value={0}>
            None
          </MenuItem>
          {availableLocations?.map((location) => (
            <MenuItem key={location.id} value={location.id}>
              {location.name}
            </MenuItem>
          ))}
        </Select>
      </FormControl>

      <TextField
        fullWidth
        multiline
        rows={5}
        name="description"
        variant="outlined"
        label="Event Description"
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

export default FormEventAdd;
