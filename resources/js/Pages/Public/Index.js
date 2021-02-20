import React from 'react';
import { InertiaLink } from '@inertiajs/inertia-react';
import { Helmet } from 'react-helmet';

import {
  CssBaseline,
  Box,
  Button,
  ButtonGroup,
  Typography,
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

import Copyright from './components/Copyright';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    minHeight: '100vh',
    backgroundColor: theme.palette.grey[200],
  },
  logo: {
    textAlign: 'center',
    flex: '0 1 auto',
    paddingTop: theme.spacing(1),
    fontSize: '2.75rem',
    [theme.breakpoints.up('md')]: {
      fontSize: '3.75rem',
    },
  },
  contentContainer: {
    flex: '1 1 auto',
    position: 'relative',
  },
  content: {
    margin: theme.spacing(4, 2, 0, 2),
    [theme.breakpoints.up('md')]: {
      position: 'absolute',
      top: '50%',
      left: '50%',
      transform: 'translate(-50%, -50%)',
    },
  },
  actions: {
    textAlign: 'center',
    margin: theme.spacing(4),
  },
  text: {
    margin: theme.spacing(2, 0, 2, 0),
  },
  footer: {
    flex: '0 1 40px',
    width: '100%',
    padding: '16px',
    color: theme.palette.grey[100],
    backgroundColor: theme.palette.grey[800],
  },
}));

const Index = () => {
  const classes = useStyles();

  return (
    <>
      <Helmet>
        <meta
          name="description"
          content="Make simple schedules and agendas for your virtual and in-person events. Try it now, for free."
        />
        <meta
          property="og:title"
          content="Fan Event Scheduler - Schedules Made Simple"
        />
        <meta property="og:type" content="website" />
        <meta
          property="og:description"
          content="Make simple schedules and agendas for your virtual and in-person events. Try it now, for free."
        />
      </Helmet>
      <CssBaseline />
      <Box component="main" className={classes.root}>
        <Typography className={classes.logo} variant="h2">
          Fan Event Scheduler
        </Typography>

        <Box className={classes.contentContainer}>
          <Box className={classes.content}>
            <Typography variant="h3">Welcome to FES!</Typography>
            <Typography
              variant="subtitle2"
              style={{ fontSize: '.75rem', marginBottom: '32px' }}
            >
              Please excuse the bare page
            </Typography>

            <Typography className={classes.text}>
              Schedule creators for events, conferences, and conventions are
              nothing new. Many different types exist, but many of them come
              bundled in with other services provided driving up the cost of
              entry. As the founder of a small convention in my region, it's
              difficult sometimes to pay for these helpful services because our
              budget won't allow it. So we're left with trying to make schedules
              in spreadsheets that look nice for our attendees.
            </Typography>

            <Typography className={classes.text}>
              This was developed with the small events in mind. I wanted to
              bring a more cost-effective solution that won't eat up an event's
              budget and instead allow them to use it for the attendees.
            </Typography>

            <Typography className={classes.text}>
              Because of the Covid-19 pandemic, FES is now an alternative that
              allows organizers to build schedules for their free virtual events
              at free to low cost.
            </Typography>

            <Typography className={classes.text}>
              Yes, that's right.{' '}
              <strong>No payment required to get started.</strong> (There are
              limitations to the free accounts, but if you find you enjoy using
              this service, I hope you support us in the future).
            </Typography>

            <Typography variant="body2" className={classes.text}>
              This website is in what I consider an alpha-stage. Designed,
              developed, and maintained by a single person. I hope to have this
              service grow with more features and users.
            </Typography>

            <Typography variant="body2" className={classes.text}>
              If you need assistance or have any feature requests send me an
              email at:{' '}
              <span
                style={{
                  backgroundColor: 'rgba(0,0,0,0.6)',
                  color: '#fff',
                  padding: '4px',
                }}
              >
                support@fesapp.net
              </span>
            </Typography>

            <Box className={classes.actions}>
              <ButtonGroup>
                <Button
                  component={InertiaLink}
                  href="/login"
                  variant="contained"
                  color="primary"
                  size="large"
                >
                  Login
                </Button>
                <Button
                  href="/register"
                  variant="contained"
                  color="secondary"
                  size="large"
                >
                  Signup
                </Button>
              </ButtonGroup>
            </Box>
          </Box>
        </Box>

        <Box className={classes.footer}>
          <Copyright />
        </Box>
      </Box>
    </>
  );
};

export default Index;
