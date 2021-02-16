import React, { useState } from 'react';
import { Inertia } from '@inertiajs/inertia';

import {
  Button,
  ButtonGroup,
  Chip,
  FormControl,
  Input,
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
  fullWidthSelect: {
    width: '100%',
    marginBottom: theme.spacing(4),
  },
  chips: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  chip: {
    margin: 2,
  },
}));

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

const FormEventAdd = ({
  closeDrawer,
  reloadPage,
  scheduleId,
  availableLocations,
  availableEventTypes,
  minDate,
  maxDate,
}) => {
  const classes = useStyles();

  const [locationId, setLocationId] = useState(0);
  const [eventTypes, setEventTypes] = useState([]);

  const handleLocationSelect = (e) => {
    setLocationId(e.target.value);
  };

  const handleEventTypeSelect = (e) => {
    setEventTypes(e.target.value);
  };

  const handleAddSubmit = (e) => {
    e.preventDefault();

    const formData = new FormData(e.target);
    formData.set('scheduleId', scheduleId);
    formData.set('location_id', locationId);
    formData.set('event_types', eventTypes);

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

      <FormControl className={(classes.formField, classes.fullWidthSelect)}>
        <InputLabel id="event-edit-form-event-type-label">
          Event Types
        </InputLabel>
        <Select
          labelId="event-edit-form-event-type-label"
          multiple
          value={eventTypes}
          onChange={handleEventTypeSelect}
          input={<Input id="select-multiple-event-type" />}
          renderValue={(selected) => (
            <div className={classes.chips}>
              {selected.map((value) => (
                <Chip
                  key={value}
                  label={availableEventTypes[value - 1].name}
                  className={classes.chip}
                />
              ))}
            </div>
          )}
          MenuProps={MenuProps}
        >
          {availableEventTypes.map((eventType) => (
            <MenuItem key={eventType.id} value={eventType.id}>
              {eventType.name}
            </MenuItem>
          ))}
        </Select>
      </FormControl>

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
