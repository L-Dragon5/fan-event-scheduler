import React, { useEffect, useState } from 'react';
import axios from 'axios';

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

const PublicSchedulePage = () => {
  const classes = useStyles();

  useEffect(() => {
    document.title = 'Public Schedule';
  }, []);

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Box className={classes.root}>Hello</Box>
    </ThemeProvider>
  );
};

export default PublicSchedulePage;
