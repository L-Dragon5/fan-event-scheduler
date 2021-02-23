import React from 'react';
import { Helmet } from 'react-helmet';

import { Box, CssBaseline } from '@material-ui/core';
import {
  createMuiTheme,
  makeStyles,
  ThemeProvider,
} from '@material-ui/core/styles';
import { teal, pink } from '@material-ui/core/colors';

import PublicScheduleNavbar from './components/PublicScheduleNavbar';

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

const PublicScheduleLayout = ({
  title,
  scheduleName,
  socialSettings,
  uuid,
  children,
}) => {
  const classes = useStyles();

  return (
    <ThemeProvider theme={theme}>
      <Helmet>
        <title>
          {title} | {scheduleName}
        </title>
      </Helmet>
      <CssBaseline />
      <Box className={classes.root}>
        <PublicScheduleNavbar
          uuid={uuid}
          scheduleName={scheduleName}
          socialSettings={socialSettings}
        />
        <Box component="main" className={classes.main}>
          <Box style={{ flexGrow: 1 }}>{children}</Box>
        </Box>
      </Box>
    </ThemeProvider>
  );
};

export default PublicScheduleLayout;
