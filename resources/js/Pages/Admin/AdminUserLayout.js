import React from 'react';
import { Helmet } from 'react-helmet';
import { SnackbarProvider } from 'notistack';
import { MuiPickersUtilsProvider } from '@material-ui/pickers';
import LuxonUtils from '@date-io/luxon';

import { CssBaseline } from '@material-ui/core';
import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles';
import { teal, pink } from '@material-ui/core/colors';

import AdminUserNavbar from './components/AdminUserNavbar';
import SnackbarMessages from '../SnackbarMessages';

const theme = createMuiTheme({
  palette: {
    primary: teal,
    secondary: pink,
  },
});

const AdminUserLayout = ({ title, children }) => {
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
        <MuiPickersUtilsProvider utils={LuxonUtils}>
          <AdminUserNavbar />
          <main>{children}</main>
        </MuiPickersUtilsProvider>
      </SnackbarProvider>
    </ThemeProvider>
  );
};

export default AdminUserLayout;
