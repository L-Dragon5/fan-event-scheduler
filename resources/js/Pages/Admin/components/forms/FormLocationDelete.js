import React from 'react';
import { Inertia } from '@inertiajs/inertia';

import { Button, ButtonGroup, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  baseButton: {
    cursor: 'pointer',
  },
  form: {
    padding: theme.spacing(1),
  },
  formField: {
    marginBottom: theme.spacing(1),
  },
}));

const FormLocationDelete = ({
  closeDrawer,
  reloadPage,
  scheduleId,
  locationId,
  locationName,
}) => {
  const classes = useStyles();

  const handleDeleteSubmit = (e) => {
    e.preventDefault();

    Inertia.post(
      `/schedule/${scheduleId}/locations/destroy`,
      {
        id: locationId,
        scheduleId,
      },
      {
        onSuccess: (page) => {
          reloadPage();
          closeDrawer();
        },
      },
    );
  };

  return (
    <form className={classes.form} onSubmit={handleDeleteSubmit}>
      <Typography>
        Are you sure you want to delete &quot;{locationName}&quot;?
      </Typography>
      <Typography>This is not reversible.</Typography>

      <ButtonGroup aria-label="add form buttons">
        <Button type="submit" variant="contained" color="primary">
          Delete
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

export default FormLocationDelete;
