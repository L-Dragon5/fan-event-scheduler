import React, { useState } from 'react';

import { ButtonBase, Box, Drawer } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { Add } from '@material-ui/icons';

import FormScheduleAdd from './forms/FormScheduleAdd';

const useStyles = makeStyles((theme) => ({
  root: {
    padding: theme.spacing(2),
  },
  scheduleButton: {
    backgroundColor: theme.palette.grey[100],
    borderWidth: 1,
    borderStyle: 'dashed',
    borderColor: theme.palette.grey[400],
    borderRadius: '5px',
    width: '100%',
    '& > div': {
      padding: theme.spacing(3),
      width: '100%',
    },
  },
  scheduleButtonIcon: {
    width: '100%',
    borderWidth: 1,
    borderStyle: 'none none solid',
    borderColor: theme.palette.grey[400],
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

const AddScheduleButton = ({ reloadPage }) => {
  const classes = useStyles();

  const [drawerStatus, setDrawerStatus] = useState(false);

  const handleClose = () => {
    setDrawerStatus(false);
  };

  const handleAddClick = () => {
    setDrawerStatus(true);
  };

  return (
    <>
      <ButtonBase
        focusRipple
        key="add-schedule-button"
        className={classes.scheduleButton}
        onClick={handleAddClick}
      >
        <Box>
          <Box className={classes.scheduleButtonIcon}>
            <Add />
          </Box>
          <Box className={classes.scheduleButtonText}>Add Schedule</Box>
        </Box>
      </ButtonBase>
      <Drawer anchor="right" open={drawerStatus}>
        <Box>
          <FormScheduleAdd closeDrawer={handleClose} reloadPage={reloadPage} />
        </Box>
      </Drawer>
    </>
  );
};

export default AddScheduleButton;
