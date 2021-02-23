import React, { useState } from 'react';
import { Inertia } from '@inertiajs/inertia';
import { ColorPicker } from 'material-ui-color';

import {
  Button,
  ButtonGroup,
  FormControl,
  FormLabel,
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

const FormEventTypeAdd = ({ closeDrawer, reloadPage, scheduleId }) => {
  const classes = useStyles();

  const [colorPickerValue, setColorPickerValue] = useState('#000000');

  const handleAddSubmit = (e) => {
    e.preventDefault();

    const formData = new FormData(e.target);
    formData.set('scheduleId', scheduleId);

    // If color picker is set with object, get the object value
    if (typeof colorPickerValue === 'object') {
      formData.set('color', colorPickerValue.hex);
    } else {
      formData.set('color', colorPickerValue);
    }

    Inertia.post(`/admin/schedule/${scheduleId}/eventTypes/store`, formData, {
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
        label="Event Type Name"
        className={classes.formField}
      />

      <FormControl fullWidth required margin="normal">
        <FormLabel>Event Type Color</FormLabel>

        <ColorPicker
          disableAlpha
          value={colorPickerValue}
          onChange={setColorPickerValue}
        />
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

export default FormEventTypeAdd;
