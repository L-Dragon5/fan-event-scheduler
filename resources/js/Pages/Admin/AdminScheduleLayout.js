import React from 'react';
import { Helmet } from 'react-helmet';
import { SnackbarProvider } from 'notistack';

import { Box, CssBaseline } from '@material-ui/core';
import {
  createMuiTheme,
  makeStyles,
  ThemeProvider,
} from '@material-ui/core/styles';
import { teal, pink } from '@material-ui/core/colors';

import AdminScheduleNavbar from './components/AdminScheduleNavbar';
import SnackbarMessages from '../SnackbarMessages';

const theme = createMuiTheme({
  palette: {
    primary: teal,
    secondary: pink,
  },
});

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    flexWrap: 'wrap',
    [theme.breakpoints.up('md')]: {
      flexWrap: 'nowrap',
    },
  },
  main: {
    flex: '1 1 0',
  },
}));

const AdminScheduleLayout = ({ title, scheduleId, children }) => {
  const classes = useStyles();

  return (
    <ThemeProvider theme={theme}>
      <Helmet>
        <title>{title} | FES Admin</title>
      </Helmet>
      <SnackbarProvider
        maxSnack={3}
        dense
        anchorOrigin={{ horizontal: 'left', vertical: 'top' }}
        autoHideDuration={2000}
      >
        <SnackbarMessages />
        <CssBaseline />
        <Box className={classes.root}>
          <AdminScheduleNavbar scheduleId={scheduleId} />
          <Box component="main" className={classes.main}>
            {children}
          </Box>
        </Box>
      </SnackbarProvider>
    </ThemeProvider>
  );
};

export default AdminScheduleLayout;
