import React, { useEffect } from 'react';

import { CssBaseline } from '@material-ui/core';
import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles';
import { blue, pink } from '@material-ui/core/colors';

import AdminScheduleNavbar from './components/AdminScheduleNavbar';

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
      <CssBaseline />
      <div style={{ display: 'flex', flexWrap: 'wrap' }}>
        <AdminScheduleNavbar scheduleId={scheduleId} />
        <main style={{ flex: '1 1 auto' }}>{children}</main>
      </div>
    </ThemeProvider>
  );
};

export default AdminScheduleLayout;
