import React from 'react';
import { Inertia } from '@inertiajs/inertia';

import { Button, ButtonGroup, TextField } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  form: {
    padding: theme.spacing(1),
  },
  formField: {
    marginBottom: theme.spacing(1),
  },
}));

const FormRuleEdit = ({ closeDrawer, reloadPage, scheduleId, rule }) => {
  const classes = useStyles();

  const handleEditSubmit = (e) => {
    e.preventDefault();

    const formData = new FormData(e.target);
    formData.set('id', location.id);
    formData.set('scheduleId', scheduleId);

    Inertia.post(`/admin/schedule/${scheduleId}/rules/update`, formData, {
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
        defaultValue={rule.title}
        name="title"
        variant="outlined"
        label="Rule Title"
        className={classes.formField}
      />

      <TextField
        fullWidth
        multiline
        rows={5}
        defaultValue={rule.description}
        name="description"
        variant="outlined"
        label="Rule Description"
        className={classes.formField}
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

export default FormRuleEdit;
