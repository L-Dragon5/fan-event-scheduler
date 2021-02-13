import React, { useEffect } from 'react';
import { SnackbarProvider } from 'notistack';

import { CssBaseline } from '@material-ui/core';
import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles';
import { blue, pink } from '@material-ui/core/colors';

import AdminScheduleNavbar from './components/AdminScheduleNavbar';
import SnackbarMessages from '../SnackbarMessages';

const theme = createMuiTheme({
  palette: {
    primary: blue,
    secondary: pink,
  },
});

const AdminScheduleLayout = ({ title, scheduleId, children }) => {
  useEffect(() => {
    document.title = `${title} | SaaS Event Schedule`;
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
        <div style={{ display: 'flex', flexWrap: 'wrap' }}>
          <AdminScheduleNavbar scheduleId={scheduleId} />
          <main style={{ flex: '1 1 0' }}>{children}</main>
        </div>
      </SnackbarProvider>
    </ThemeProvider>
  );
};

export default AdminScheduleLayout;
