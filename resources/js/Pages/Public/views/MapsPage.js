import React from 'react';

import {
  Box,
  List,
  ListItem,
  ListItemText,
  Typography,
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

import PublicScheduleLayout from '../PublicScheduleLayout';

const useStyles = makeStyles((theme) => ({
  root: {
    padding: theme.spacing(1),
  },
  categories: {
    margin: theme.spacing(0, 0, 2, 1),
  },
  heading: {
    borderBottom: '1px solid gray',
  },
  list: {
    backgroundColor: theme.palette.background.paper,
  },
  centerText: {
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    position: 'fixed',
  },
}));

const MapsPage = ({ uuid, scheduleName, socialSettings, maps }) => {
  const classes = useStyles();

  if (maps && Object.keys(maps).length !== 0) {
    return (
      <PublicScheduleLayout
        title="Maps"
        scheduleName={scheduleName}
        socialSettings={socialSettings}
        uuid={uuid}
      >
        {maps?.map((map) => {
          return <div key={map.id}>{map.name}</div>;
        })}
      </PublicScheduleLayout>
    );
  }

  return (
    <PublicScheduleLayout
      title="Maps"
      scheduleName={scheduleName}
      socialSettings={socialSettings}
      uuid={uuid}
    >
      <Typography variant="h4" className={classes.centerText}>
        No maps currently
      </Typography>
    </PublicScheduleLayout>
  );
};

export default MapsPage;
