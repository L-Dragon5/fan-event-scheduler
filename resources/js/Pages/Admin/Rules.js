import React from 'react';
import { Inertia } from '@inertiajs/inertia';

import { Box, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

import AdminScheduleLayout from './AdminScheduleLayout';

const useStyles = makeStyles((theme) => ({
  contentRoot: {
    flexGrow: 1,
    padding: theme.spacing(2),
  },
}));

const Rules = ({ scheduleId, rules }) => {
  const classes = useStyles();

  const handleReload = () => {
    Inertia.reload({ only: ['rules'] });
  };

  return (
    <AdminScheduleLayout title="Rules" scheduleId={scheduleId}>
      <Box className={classes.contentRoot}>
        <Box className={classes.title}>
          <Typography component="span" variant="h4">
            Rules
          </Typography>
        </Box>

        {rules && rules.length ? (
          rules.map((rule) => (
            <Box key={rule.name}>
              <div>{rule.name}</div>
            </Box>
          ))
        ) : (
          <Typography variant="body1">No rules</Typography>
        )}
      </Box>
    </AdminScheduleLayout>
  );
};

export default Rules;
