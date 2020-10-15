import React, { useEffect } from 'react';

import { CssBaseline } from '@material-ui/core';
import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles';
import { orange, pink } from '@material-ui/core/colors';

import AdminUserNavbar from './components/AdminUserNavbar';

const theme = createMuiTheme({
  palette: {
    primary: orange,
    secondary: pink,
  },
});

const AdminUserLayout = ({ title, children }) => {
  useEffect(() => {
    document.title = `${title} | SaaS Event Schedule`;
  }, [title]);

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <AdminUserNavbar />
      <main>{children}</main>
    </ThemeProvider>
  );
};

export default AdminUserLayout;
