import React from 'react';
import { Inertia } from '@inertiajs/inertia';

import { Box, ButtonBase, Typography, Grid } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import CancelPresentationIcon from '@material-ui/icons/CancelPresentation';

import AdminUserLayout from './AdminUserLayout';
import AddScheduleButton from './components/AddScheduleButton';

const useStyles = makeStyles((theme) => ({
  root: {
    padding: theme.spacing(2),
  },
  title: {
    marginBottom: theme.spacing(2),
  },
  scheduleButton: {
    backgroundColor: 'rgba(0, 0, 0, 0.02)',
    border: '1px solid rgba(0, 0, 0, 0.15)',
    borderRadius: '5px',
    width: '100%',
    '& > div': {
      padding: theme.spacing(3),
      width: '100%',
    },
  },
  scheduleButtonImage: {
    width: '100%',
    borderBottom: '1px solid rgba(0, 0, 0, 0.15)',
    '& > svg': {
      fontSize: '3.5rem',
      marginBottom: theme.spacing(2),
    },
  },
  scheduleButtonText: {
    width: '100%',
    textAlign: 'center',
    fontSize: '1.25rem',
    paddingTop: theme.spacing(2),
  },
}));

const Schedules = ({ schedules }) => {
  const classes = useStyles();

  const handleReload = () => {
    Inertia.reload({ only: ['schedules'] });
  };

  const ScheduleButton = ({ id, image, text }) => {
    return (
      <ButtonBase
        focusRipple
        key={`${text}-button`}
        className={classes.scheduleButton}
        onClick={() => Inertia.visit(`/schedule/${id}`)}
      >
        <Box>
          <Box className={classes.scheduleButtonImage}>
            {image === undefined || image === null ? (
              <CancelPresentationIcon />
            ) : (
              <img alt="" src={image} />
            )}
          </Box>
          <Box className={classes.scheduleButtonText}>{text}</Box>
        </Box>
      </ButtonBase>
    );
  };

  return (
    <AdminUserLayout title="Schedules">
      <Box className={classes.root}>
        <Box className={classes.title}>
          <Typography component="span" variant="h4">
            Schedules
          </Typography>
        </Box>

        <Grid container spacing={3}>
          {schedules?.map((schedule) => (
            <Grid key={schedule.name} item xs={12} sm={6} md={4}>
              {schedule.image === 'add' ? (
                <AddScheduleButton reloadPage={handleReload} />
              ) : (
                <ScheduleButton
                  id={schedule.id}
                  image={schedule.image}
                  text={schedule.name}
                />
              )}
            </Grid>
          ))}
        </Grid>
      </Box>
    </AdminUserLayout>
  );
};

export default Schedules;
