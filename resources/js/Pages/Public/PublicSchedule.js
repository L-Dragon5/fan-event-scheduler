import React, { useEffect, useState } from 'react';

import { Box, Grid, TextField, CssBaseline } from '@material-ui/core';

import {
  createMuiTheme,
  ThemeProvider,
  makeStyles,
} from '@material-ui/core/styles';
import { orange, pink } from '@material-ui/core/colors';

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

  console.log(schedule);

  useEffect(() => {
    document.title = schedule.name;
  }, [schedule]);

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Box className={classes.root}>Hello</Box>
    </ThemeProvider>
  );
};

export default PublicSchedule;
