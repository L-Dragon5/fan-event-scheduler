import React, { useState } from 'react';
import { Inertia } from '@inertiajs/inertia';

import {
  Button,
  ButtonGroup,
  Checkbox,
  FormControl,
  FormControlLabel,
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

const FormEventEdit = ({
  closeDrawer,
  reloadPage,
  scheduleId,
  availableLocations,
  event,
}) => {
  const classes = useStyles();

  const [locationId, setLocationId] = useState(event.location_id ?? 0);
  const [isCancelled, setIsCancelled] = useState(!!event.is_cancelled);

  const handleLocationSelect = (e) => {
    setLocationId(e.target.value);
  };

  const handleCancelCheck = (e) => {
    setIsCancelled(e.target.checked);
  };

  const handleEditSubmit = (e) => {
    e.preventDefault();

    const formData = new FormData(e.target);
    formData.set('id', event.id);
    formData.set('scheduleId', scheduleId);
    formData.set('location_id', locationId);
    formData.set('is_cancelled', isCancelled ? 1 : 0);

    Inertia.post(`/schedule/${scheduleId}/events/update`, formData, {
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
        defaultValue={event.name}
        name="name"
        variant="outlined"
        label="Event Name"
        className={classes.formField}
      />

      <TextField
        required
        fullWidth
        type="date"
        defaultValue={event.date}
        name="date"
        variant="outlined"
        label="Date"
        className={classes.formField}
        inputProps={{
          min: event.min_date,
          max: event.max_date,
        }}
      />

      <TextField
        required
        fullWidth
        type="time"
        defaultValue={event.time_start}
        name="time_start"
        variant="outlined"
        label="Start Time"
        className={classes.formField}
      />

      <TextField
        required
        fullWidth
        type="time"
        defaultValue={event.time_end}
        name="time_end"
        variant="outlined"
        label="End Time"
        className={classes.formField}
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
        defaultValue={event.description}
        name="description"
        variant="outlined"
        label="Event Description"
        className={classes.formField}
      />

      <FormControlLabel
        control={
          <Checkbox
            name="is_cancelled"
            checked={isCancelled}
            onChange={handleCancelCheck}
          />
        }
        label="Is Cancelled?"
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

export default FormEventEdit;
