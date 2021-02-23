import React, { useState } from 'react';
import { Inertia } from '@inertiajs/inertia';
import { DateTime } from 'luxon';
import { DatePicker, TimePicker } from '@material-ui/pickers';

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
  const [eventDate, setEventDate] = useState(DateTime.fromISO(minDate));
  const [eventStartTime, setEventStartTime] = useState(
    DateTime.now().set({ second: 0, millisecond: 0 }),
  );
  const [eventEndTime, setEventEndTime] = useState(
    DateTime.now().set({ second: 0, millisecond: 0 }),
  );

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
    formData.set('date', eventDate.toUTC().toISODate());
    formData.set(
      'time_start',
      eventStartTime.toISOTime({
        includeOffset: false,
        suppressMilliseconds: true,
      }),
    );
    formData.set(
      'time_end',
      eventEndTime.toISOTime({
        includeOffset: false,
        suppressMilliseconds: true,
      }),
    );

    Inertia.post(`/admin/schedule/${scheduleId}/events/store`, formData, {
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

      <DatePicker
        value={eventDate}
        onChange={setEventDate}
        className={classes.formField}
        required
        fullWidth
        label="Date"
        inputVariant="outlined"
        minDate={DateTime.fromISO(minDate)}
        maxDate={DateTime.fromISO(maxDate)}
      />

      <TimePicker
        value={eventStartTime}
        onChange={setEventStartTime}
        required
        fullWidth
        label="Start Time"
        inputVariant="outlined"
        className={classes.formField}
      />

      <TimePicker
        value={eventEndTime}
        onChange={setEventEndTime}
        required
        fullWidth
        label="End Time"
        inputVariant="outlined"
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
