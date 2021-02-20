import React from 'react';
import { Inertia } from '@inertiajs/inertia';

import { ButtonGroup, Button, TextField } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { FormatBoldTwoTone } from '@material-ui/icons';

const useStyles = makeStyles((theme) => ({
  form: {
    padding: theme.spacing(1),
  },
  formField: {
    marginBottom: theme.spacing(1),
  },
  uploadButton: {
    width: '100%',
    marginBottom: theme.spacing(4),
  },
}));

const FormMapEdit = ({ closeDrawer, reloadPage, scheduleId, map }) => {
  const classes = useStyles();

  const handleAddSubmit = (e) => {
    e.preventDefault();

    const formData = new FormData(e.target);
    formData.set('id', map.id);
    formData.set('scheduleId', scheduleId);

    Inertia.post(`/admin/schedule/${scheduleId}/maps/update`, formData, {
      onSuccess: (page) => {
        reloadPage();
        closeDrawer();
      },
    });
  };

  const UploadButton = () => (
    <div className={classes.uploadButton}>
      <label htmlFor="map-button-file">
        <input
          accept="image/*"
          name="image"
          style={{ display: 'none' }}
          id="map-button-file"
          type="file"
        />
        <Button variant="contained" color="primary" component="span">
          Upload Image
        </Button>
      </label>
    </div>
  );

  return (
    <form className={classes.form} onSubmit={handleAddSubmit}>
      <TextField
        required
        fullWidth
        defaultValue={map.name}
        name="name"
        variant="outlined"
        label="Map Name"
        className={classes.formField}
      />

      <UploadButton />

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

export default FormMapEdit;
