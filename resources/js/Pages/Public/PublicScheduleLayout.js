import React, { useEffect } from 'react';

import { Box, CssBaseline } from '@material-ui/core';
import {
  createMuiTheme,
  makeStyles,
  ThemeProvider,
} from '@material-ui/core/styles';
import { blue, pink } from '@material-ui/core/colors';

import PublicScheduleNavbar from './components/PublicScheduleNavbar';

const theme = createMuiTheme({
  palette: {
    primary: blue,
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

const PublicScheduleLayout = ({ title, scheduleName, uuid, children }) => {
  const classes = useStyles();

  useEffect(() => {
    document.title = `${title} | ${scheduleName}`;
  }, [title]);

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Box className={classes.root}>
        <PublicScheduleNavbar uuid={uuid} scheduleName={scheduleName} />
        <Box component="main" className={classes.main}>
          <Box style={{ flexGrow: 1 }}>{children}</Box>
        </Box>
      </Box>
    </ThemeProvider>
  );
};

export default PublicScheduleLayout;
