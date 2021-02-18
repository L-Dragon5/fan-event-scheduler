import React, { useState } from 'react';
import { Inertia } from '@inertiajs/inertia';

import {
  Button,
  ButtonGroup,
  FormControlLabel,
  Switch,
  TextField,
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  form: {
    width: '100%',
  },
  formField: {
    marginBottom: theme.spacing(1),
  },
  fieldBreak: {
    marginBottom: theme.spacing(4),
  },
}));

const FormScheduleEdit = ({ reloadPage, schedule }) => {
  const classes = useStyles();

  const [isLiveCheck, setIsLiveCheck] = useState(!!schedule.is_live);

  const handleSwitch = (e) => {
    // If hitting the switch, unchecks it, display warning.
    if (!e.target.checked && schedule.is_live) {
      if (
        confirm(
          'Doing so will remove the public link and a new one will be regenerated later, proceed?',
        )
      ) {
        setIsLiveCheck(e.target.checked);
      } else {
        setIsLiveCheck(true);
      }
    } else {
      setIsLiveCheck(e.target.checked);
    }
  };

  const handleEditSubmit = (e) => {
    e.preventDefault();

    const formData = new FormData(e.target);
    formData.set('id', schedule.id);
    formData.set('is_live', isLiveCheck ? 1 : 0);

    Inertia.post(`/admin/schedule/${schedule.id}/update`, formData, {
      onSuccess: (page) => {
        reloadPage();
      },
    });
  };

  return (
    <form className={classes.form} onSubmit={handleEditSubmit}>
      <TextField
        required
        fullWidth
        defaultValue={schedule.name}
        name="name"
        variant="outlined"
        label="Schedule Name"
        className={classes.formField}
      />

      <TextField
        required
        fullWidth
        type="date"
        defaultValue={schedule.start_date}
        name="start_date"
        variant="outlined"
        label="Start Date"
        className={classes.formField}
        inputProps={{
          min: new Date().toISOString().split('T')[0],
        }}
      />

      <TextField
        required
        fullWidth
        type="date"
        defaultValue={schedule.end_date}
        name="end_date"
        variant="outlined"
        label="End Date"
        className={(classes.formField, classes.fieldBreak)}
        inputProps={{
          min: new Date().toISOString().split('T')[0],
        }}
      />

      <TextField
        fullWidth
        defaultValue={schedule.social_fb}
        type="url"
        name="social_fb"
        variant="outlined"
        label="Event Facebook"
        className={classes.formField}
      />

      <TextField
        fullWidth
        defaultValue={schedule.social_tw}
        type="url"
        name="social_tw"
        variant="outlined"
        label="Event Twitter"
        className={classes.formField}
      />

      <TextField
        fullWidth
        defaultValue={schedule.social_ig}
        type="url"
        name="social_ig"
        variant="outlined"
        label="Event Instagram"
        className={classes.formField}
      />

      <TextField
        fullWidth
        defaultValue={schedule.social_web}
        type="url"
        name="social_web"
        variant="outlined"
        label="Event Website"
        className={classes.formField}
      />

      <FormControlLabel
        control={
          <Switch
            name="is_live"
            checked={isLiveCheck}
            onChange={handleSwitch}
          />
        }
        label={isLiveCheck ? 'Publically Available' : 'Hidden from Public'}
      />

      <ButtonGroup aria-label="add form buttons">
        <Button type="submit" variant="contained" color="primary">
          Save
        </Button>
      </ButtonGroup>
    </form>
  );
};

export default FormScheduleEdit;
