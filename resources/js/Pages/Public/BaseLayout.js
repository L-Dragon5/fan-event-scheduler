import React from 'react';
import { Helmet } from 'react-helmet';
import { SnackbarProvider } from 'notistack';

import { Box, CssBaseline } from '@material-ui/core';
import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles';
import { teal, pink } from '@material-ui/core/colors';

import SnackbarMessages from '../SnackbarMessages';

const theme = createMuiTheme({
  palette: {
    primary: teal,
    secondary: pink,
  },
});

const BaseLayout = ({ title, children }) => {
  return (
    <ThemeProvider theme={theme}>
      <Helmet>
        <title>{title} | Fan Event Scheduler</title>
      </Helmet>
      <SnackbarProvider
        maxSnack={3}
        dense
        anchorOrigin={{ horizontal: 'left', vertical: 'top' }}
        autoHideDuration={2000}
      >
        <SnackbarMessages />
        <CssBaseline />
        <Box component="main">{children}</Box>
      </SnackbarProvider>
    </ThemeProvider>
  );
};

export default BaseLayout;
