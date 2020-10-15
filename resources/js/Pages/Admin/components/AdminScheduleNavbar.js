import React, { useState } from 'react';
import { InertiaLink } from '@inertiajs/inertia-react';

import {
  AppBar,
  Box,
  Hidden,
  Drawer,
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

const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
  menuButton: {
    marginRight: theme.spacing(2),
  },
  appBar: {
    width: '100vw',
  },
  title: {
    flexGrow: 1,
    '& > a': {
      color: 'rgba(0, 0, 0, 0.87)',
      textDecoration: 'none',
    },
  },
  nav: {
    '& > a': {
      color: 'rgba(0, 0, 0, 0.87)',
      textDecoration: 'none',
    },
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
  },
  drawerPaper: {
    width: drawerWidth,
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

const AdminScheduleNavbar = ({ scheduleId }) => {
  const classes = useStyles();

  const [drawerStatus, setDrawerStatus] = useState(false);

  const drawerOpen = () => {
    setDrawerStatus(true);
  };

  const drawerClose = () => {
    setDrawerStatus(false);
  };

  return (
    <Box>
      <Hidden mdUp>
        <AppBar position="static" className={classes.appBar}>
          <Toolbar>
            <IconButton
              edge="start"
              className={classes.menuButton}
              color="inherit"
              aria-label="menu"
              onClick={drawerOpen}
            >
              <MenuIcon />
            </IconButton>

            <Typography variant="h6" className={classes.title}>
              <InertiaLink href={`/schedule/${scheduleId}`}>
                Schedule Admin
              </InertiaLink>
            </Typography>
          </Toolbar>
        </AppBar>

        <SwipeableDrawer
          anchor="left"
          open={drawerStatus}
          onClose={drawerClose}
          onOpen={drawerOpen}
        >
          <List
            component="nav"
            className={classes.nav}
            aria-labelledby="main-options-mobile-header"
            subheader={
              <ListSubheader component="div" id="main-options-mobile-header">
                Main Options
              </ListSubheader>
            }
          >
            <InertiaLink href={`/schedule/${scheduleId}`}>
              <ListItem button>
                <ListItemText primary="Dashboard" />
              </ListItem>
            </InertiaLink>

            <InertiaLink href={`/schedule/${scheduleId}/events`}>
              <ListItem button>
                <ListItemText primary="Events" />
              </ListItem>
            </InertiaLink>
          </List>
          <List
            component="nav"
            className={classes.nav}
            aria-labelledby="settings-mobile-header"
            subheader={
              <ListSubheader component="div" id="settings-mobile-header">
                Settings
              </ListSubheader>
            }
          >
            <InertiaLink href={`/schedule/${scheduleId}/settings`}>
              <ListItem button>
                <ListItemText primary="Schedule Settings" />
              </ListItem>
            </InertiaLink>
          </List>
        </SwipeableDrawer>
      </Hidden>

      <Hidden smDown>
        <Drawer
          open
          variant="permanent"
          anchor="left"
          className={classes.drawer}
          classes={{ paper: classes.drawerPaper }}
        >
          <List
            component="nav"
            className={classes.nav}
            aria-labelledby="main-options-desktop-header"
            subheader={
              <ListSubheader component="div" id="main-options-desktop-header">
                Main Options
              </ListSubheader>
            }
          >
            <InertiaLink href={`/schedule/${scheduleId}`}>
              <ListItem button>
                <ListItemText primary="Dashboard" />
              </ListItem>
            </InertiaLink>

            <InertiaLink href={`/schedule/${scheduleId}/events`}>
              <ListItem button>
                <ListItemText primary="Events" />
              </ListItem>
            </InertiaLink>
          </List>
          <List
            component="nav"
            className={classes.nav}
            aria-labelledby="settings-desktop-header"
            subheader={
              <ListSubheader component="div" id="settings-desktop-header">
                Settings
              </ListSubheader>
            }
          >
            <InertiaLink href={`/schedule/${scheduleId}/settings`}>
              <ListItem button>
                <ListItemText primary="Schedule Settings" />
              </ListItem>
            </InertiaLink>
          </List>
        </Drawer>
      </Hidden>
    </Box>
  );
};

export default AdminScheduleNavbar;
