import React, { useState } from 'react';
import { NavLink, withRouter } from 'react-router-dom';

import {
  AppBar,
  Box,
  Hidden,
  SwipeableDrawer,
  List,
  ListItem,
  ListItemText,
  ListSubheader,
  Toolbar,
  Typography,
  IconButton,
} from '@material-ui/core';
import MenuIcon from '@material-ui/icons/Menu';
import { makeStyles } from '@material-ui/core/styles';

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
      color: 'rgba(0, 0, 0, 0.87)',
      textDecoration: 'none',
    },
  },
  mobileNav: {
    '& > a': {
      color: 'rgba(0, 0, 0, 0.87)',
      textDecoration: 'none',
    },
  },
  desktopNav: {
    '& > a': {
      color: 'rgba(0, 0, 0, 0.87)',
      textDecoration: 'none',
      padding: '12px',
      fontSize: '1rem',
      cursor: 'pointer',
    },
    '& > a.active-tool': {
      borderBottom: '2px solid rgba(0, 0, 0, 0.87)',
    },
    '& > a:hover': {
      borderBottom: '2px solid rgba(0, 0, 0, 0.87)',
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
}));

const AdminUserNavbar = () => {
  const classes = useStyles();

  const [drawerStatus, setDrawerStatus] = useState(false);

  const drawerOpen = () => {
    setDrawerStatus(true);
  };

  const drawerClose = () => {
    setDrawerStatus(false);
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
            <NavLink to="/">
              <ListItem button>
                <ListItemText primary="Schedules" />
              </ListItem>
            </NavLink>
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
            <NavLink to="/user-settings">
              <ListItem button>
                <ListItemText primary="User Settings" />
              </ListItem>
            </NavLink>
          </List>
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
            <NavLink to="/">Admin - Saas Event Schedule</NavLink>
          </Typography>
          <nav className={classes.desktopNav}>
            <Hidden smDown>
              <NavLink to="/">Schedules</NavLink>

              <NavLink to="/user-settings" activeClassName="active-tool">
                User Settings
              </NavLink>
            </Hidden>
          </nav>
        </Toolbar>
      </AppBar>
    </Box>
  );
};

export default withRouter(AdminUserNavbar);
