import React, { useEffect } from 'react';
import { SnackbarProvider } from 'notistack';

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
  useEffect(() => {
    document.title = `${title} | Fan Event Scheduler`;
  }, [title]);

  return (
    <ThemeProvider theme={theme}>
      <SnackbarProvider
        maxSnack={3}
        dense
        anchorOrigin={{ horizontal: 'left', vertical: 'top' }}
        autoHideDuration={2000}
      >
        <SnackbarMessages />
        <CssBaseline />
        <AdminUserNavbar />
        <main>{children}</main>
      </SnackbarProvider>
    </ThemeProvider>
  );
};

export default AdminUserLayout;
