import React from 'react';
import { Inertia } from '@inertiajs/inertia';

import { Button } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { Delete } from '@material-ui/icons';

const useStyles = makeStyles((theme) => ({
  buitton: {
    padding: theme.spacing(2),
  },
}));

const DeleteScheduleButton = ({ scheduleId }) => {
  const classes = useStyles();

  const handleDelete = () => {
    if (
      confirm(
        'You are about to permanently delete this schedule, there is no recovering from this. Are you sure?',
      )
    ) {
      Inertia.post(`/admin/schedule/${scheduleId}/destroy`, {
        id: scheduleId,
      });
    }
  };

  return (
    <Button
      variant="contained"
      color="secondary"
      className={classes.button}
      startIcon={<Delete />}
      key="delete-schedule-button"
      onClick={handleDelete}
    >
      Delete Forever
    </Button>
  );
};

export default DeleteScheduleButton;
