import React, { useEffect } from 'react';

import { Box, CssBaseline } from '@material-ui/core';

import {
  createMuiTheme,
  ThemeProvider,
  makeStyles,
} from '@material-ui/core/styles';
import { orange, pink } from '@material-ui/core/colors';

import EventsPage from './views/EventsPage';

const theme = createMuiTheme({
  palette: {
    primary: orange,
    secondary: pink,
  },
});

const useStyles = makeStyles(() => ({
  root: {
    padding: theme.spacing(2),
  },
  filters: {
    margin: '16px 0 32px',
  },
  searchInput: {
    paddingRight: '16px',
  },
}));

const PublicSchedule = ({ schedule }) => {
  const classes = useStyles();

  useEffect(() => {
    document.title = schedule.name;
  }, [schedule]);

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <EventsPage events={schedule.events} locations={schedule.locations} />
    </ThemeProvider>
  );
};

export default PublicSchedule;
