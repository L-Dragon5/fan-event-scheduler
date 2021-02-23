import React, { useState } from 'react';
import { InertiaLink } from '@inertiajs/inertia-react';

import {
  AppBar,
  Box,
  Hidden,
  SwipeableDrawer,
  List,
  ListItem,
  ListItemText,
  ListSubheader,
  Modal,
  Toolbar,
  Typography,
  IconButton,
} from '@material-ui/core';
import MenuIcon from '@material-ui/icons/Menu';
import { makeStyles } from '@material-ui/core/styles';

import FormUserUpdate from './forms/FormUserUpdate';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
    '& > a': {
      color: theme.palette.primary.contrastText,
      textDecoration: 'none',
    },
  },
  mobileNav: {
    '& > a': {
      color: theme.palette.text.primary,
      textDecoration: 'none',
    },
  },
  desktopNav: {
    '& > a': {
      color: theme.palette.primary.contrastText,
      textDecoration: 'none',
      padding: '12px',
      fontSize: '1rem',
      cursor: 'pointer',
    },
    '& > a:hover': {
      borderWidth: 2,
      borderStyle: 'none none solid',
      borderColor: theme.palette.primary.contrastText,
    },
  },
  paper: {
    position: 'absolute',
    width: '65%',
    backgroundColor: theme.palette.background.paper,
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
  },
  modalContent: {
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    position: 'absolute',
    width: '80vw',
    backgroundColor: theme.palette.background.paper,
    borderWidth: 2,
    borderStyle: 'solid',
    borderColor: theme.palette.background.paper,
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
    [theme.breakpoints.up('md')]: {
      width: '50vw',
    },
    [theme.breakpoints.up('lg')]: {
      width: '30vw',
    },
  },
}));

const AdminUserNavbar = () => {
  const classes = useStyles();

  const [drawerStatus, setDrawerStatus] = useState(false);
  const [modalStatus, setModalStatus] = useState(false);

  const drawerOpen = () => {
    setDrawerStatus(true);
  };
  const drawerClose = () => {
    setDrawerStatus(false);
  };
  const modalOpen = () => {
    setModalStatus(true);
  };
  const modalClose = () => {
    setModalStatus(false);
  };

  const NavigationList = () => {
    return (
      <>
        <List
          component="nav"
          className={classes.mobileNav}
          aria-labelledby="main-options-mobile-header"
          subheader={
            <ListSubheader component="div" id="main-options-mobile-header">
              Main Options
            </ListSubheader>
          }
        >
          <InertiaLink href="/admin">
            <ListItem button>
              <ListItemText primary="Schedules" />
            </ListItem>
          </InertiaLink>
        </List>
        <List
          component="nav"
          className={classes.mobileNav}
          aria-labelledby="settings-mobile-header"
          subheader={
            <ListSubheader component="div" id="settings-mobile-header">
              Settings
            </ListSubheader>
          }
        >
          <ListItem button onClick={modalOpen}>
            <ListItemText primary="User Settings" />
          </ListItem>
          <a href="/admin/billing">
            <ListItem button>
              <ListItemText primary="Billing" />
            </ListItem>
          </a>
        </List>
      </>
    );
  };

  return (
    <Box className={classes.root}>
      <Hidden mdUp>
        <SwipeableDrawer
          anchor="left"
          open={drawerStatus}
          onClose={drawerClose}
          onOpen={drawerOpen}
        >
          <NavigationList />
        </SwipeableDrawer>
      </Hidden>

      <AppBar position="static">
        <Toolbar>
          <Hidden mdUp>
            <IconButton
              edge="start"
              className={classes.menuButton}
              color="inherit"
              aria-label="menu"
              onClick={drawerOpen}
            >
              <MenuIcon />
            </IconButton>
          </Hidden>

          <Typography variant="h6" className={classes.title}>
            <InertiaLink href="/admin">Admin - Fan Event Scheduler</InertiaLink>
          </Typography>
          <nav className={classes.desktopNav}>
            <Hidden smDown>
              <InertiaLink href="/admin">Schedules</InertiaLink>
              <a href="#" onClick={modalOpen}>
                User Settings
              </a>

              <a href="/admin/billing">Billing</a>
            </Hidden>
          </nav>
        </Toolbar>
      </AppBar>

      <Modal open={modalStatus} onClose={modalClose}>
        <Box className={classes.modalContent}>
          <FormUserUpdate closeModal={modalClose} />
        </Box>
      </Modal>
    </Box>
  );
};

export default AdminUserNavbar;
