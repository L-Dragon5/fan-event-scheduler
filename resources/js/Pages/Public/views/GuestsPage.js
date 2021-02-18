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
}));

const GuestsPage = ({ uuid, scheduleName, socialSettings, guests }) => {
  const classes = useStyles();

  const handleClick = (guest) => {
    console.log(guest);
  };

  return (
    <PublicScheduleLayout
      title="Guests"
      scheduleName={scheduleName}
      socialSettings={socialSettings}
      uuid={uuid}
    >
      <Box className={classes.root}>
        {Object.entries(guests).map((values) => {
          const category = values[0];
          const entries = values[1];

          return (
            <Box key={category} className={classes.categories}>
              <Typography variant="h4" className={classes.heading}>
                {category}
              </Typography>
              <div>
                {entries?.map((entry) => {
                  return (
                    <List key={entry.id} className={classes.list}>
                      <ListItem button onClick={() => handleClick(entry)}>
                        <ListItemText primary={entry.name} />
                      </ListItem>
                    </List>
                  );
                })}
              </div>
            </Box>
          );
        })}
      </Box>
    </PublicScheduleLayout>
  );
};

export default GuestsPage;
