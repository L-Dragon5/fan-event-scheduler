import React, { useCallback } from 'react';
import { Inertia } from '@inertiajs/inertia';
import { usePage } from '@inertiajs/inertia-react';

import {
  Avatar,
  Button,
  Container,
  CssBaseline,
  TextField,
  Link,
  Box,
  Grid,
  Typography,
} from '@material-ui/core';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import { makeStyles } from '@material-ui/core/styles';

// Components
import ErrorBox from './components/ErrorBox';
import Copyright from './components/Copyright';

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(3),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

const ForgotPassword = () => {
  const classes = useStyles();
  const { errors, flash } = usePage().props;

  const handleSubmit = useCallback((e) => {
    e.preventDefault();

    const formData = new FormData(e.target);

    Inertia.post('/admin/forgot-password', formData);
  }, []);

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Forgot Password
        </Typography>

        {errors.error && <ErrorBox content={errors.error[0]} />}
        {flash.message && <ErrorBox content={flash.message} />}

        <form className={classes.form} onSubmit={handleSubmit}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                autoComplete="email"
              />
            </Grid>
          </Grid>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
          >
            Retrieve Password
          </Button>
          <Grid container>
            <Grid item xs>
              <Link href="/login" variant="body2">
                Back to login
              </Link>
            </Grid>
            <Grid item>
              <Link href="/home" variant="body2">
                Back to home
              </Link>
            </Grid>
          </Grid>
        </form>
      </div>
      <Box mt={5}>
        <Copyright />
      </Box>
    </Container>
  );
};

export default ForgotPassword;
