import React, { useEffect, useState } from 'react';

import {
  Button,
  CssBaseline,
  Link,
  Paper,
  Box,
  Grid,
  Typography,
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

import Copyright from './components/Copyright';

const useStyles = makeStyles((theme) => ({
  intro: {
    height: '100vh',
    width: '100%',
  },
  image: {
    backgroundImage: 'url(/storage/organized-bg.jpg)',
    backgroundRepeat: 'no-repeat',
    backgroundColor:
      theme.palette.type === 'light'
        ? theme.palette.grey[50]
        : theme.palette.grey[900],
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    height: '100%',
    width: '100%',
  },
  overlay: {
    position: 'absolute',
    background: 'rgba(0, 0, 0, 0.75)',
    height: '100%',
    width: '100%',
    top: '0',
  },
  introContent: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    color: '#fff',
    textAlign: 'center',
  },
  introSubtitle: {
    marginTop: '16px',
  },
  introButtons: {
    display: 'flex',
    justifyContent: 'space-evenly',
    marginTop: '32px',
  },
  features: {
    minHeight: '100vh',
    width: '100%',
    padding: '32px',
  },
  about: {
    width: '100%',
    padding: '32px',
  },
  footer: {
    width: '100%',
    padding: '16px',
    color: '#fff',
    background:
      'linear-gradient(180deg, rgba(255,153,0,1) 0%, rgba(255,106,0,1) 100%)',
  },
  changelog: {
    maxHeight: '400px',
    overflowY: 'auto',
    padding: theme.spacing(2),
    paddingTop: '0',
    color: theme.palette.text.primary,
  },
  carousel: {
    maxWidth: '1200px',
    margin: '32px 0',
    '& img': {
      width: '100%',
    },
  },
}));

const HomePage = () => {
  const classes = useStyles();

  useEffect(() => {
    document.title = 'Home | SaaS Event Schedule';
  }, []);

  return (
    <>
      <CssBaseline />
      <Grid container component="main" className={classes.root}>
        <Box className={classes.intro}>
          <Box className={classes.image} />
          <Box className={classes.overlay} />
          <Box className={classes.introContent}>
            <Typography component="h1" variant="h2">
              Schedule Made Simple
            </Typography>

            <Box className={classes.introButtons}>
              <Button
                type="button"
                variant="outlined"
                color="default"
                style={{ color: '#fff' }}
                size="large"
                href="/login"
              >
                Login
              </Button>

              <Button
                type="button"
                variant="contained"
                color="primary"
                size="large"
                href="/register"
              >
                Sign up now
              </Button>
            </Box>
          </Box>
        </Box>

        <Box className={classes.about} align="center">
          <Typography variant="h4">Who made this?</Typography>

          <Typography variant="body1" style={{ marginTop: '16px' }}>
            Hi, I'm Joe and I'm the creator and developer of CosManage. I make
            websites for fun (you can check out my{' '}
            <Link
              href="https://github.com/L-Dragon5/"
              target="_blank"
              rel="noopener noreferrer"
            >
              GitHub
            </Link>
            ).
          </Typography>

          <Typography variant="body1" style={{ marginTop: '16px' }}>
            Feel free to contact me if you have any problems or any things you
            wanted added in the future. I hope to grow this as much as possible!
          </Typography>
        </Box>
      </Grid>

      <Box className={classes.footer}>
        <Copyright style={{ color: '#fff' }} />
      </Box>
    </>
  );
};

export default HomePage;
