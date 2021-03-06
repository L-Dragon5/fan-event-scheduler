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
    [theme.breakpoints.down('sm')]: {
      width: '100%',
    },
  },
  title: {
    flexGrow: 1,
    '& > a': {
      color: theme.palette.primary.contrastText,
      textDecoration: 'none',
    },
  },
  nav: {
    '& > a': {
      color: theme.palette.text.primary,
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

  const NavigationList = () => {
    return (
      <>
        <List
          component="nav"
          className={classes.nav}
          aria-labelledby="main-options-header"
          subheader={
            <ListSubheader component="div" id="main-options-header">
              Main Options
            </ListSubheader>
          }
        >
          <InertiaLink href={`/admin/schedule/${scheduleId}`}>
            <ListItem button>
              <ListItemText primary="Events" />
            </ListItem>
          </InertiaLink>

          <InertiaLink href={`/admin/schedule/${scheduleId}/eventTypes`}>
            <ListItem button>
              <ListItemText primary="Event Types" />
            </ListItem>
          </InertiaLink>

          <InertiaLink href={`/admin/schedule/${scheduleId}/exhibitors`}>
            <ListItem button>
              <ListItemText primary="Exhibitors" />
            </ListItem>
          </InertiaLink>

          <InertiaLink href={`/admin/schedule/${scheduleId}/guests`}>
            <ListItem button>
              <ListItemText primary="Guests" />
            </ListItem>
          </InertiaLink>

          <InertiaLink href={`/admin/schedule/${scheduleId}/locations`}>
            <ListItem button>
              <ListItemText primary="Locations" />
            </ListItem>
          </InertiaLink>

          <InertiaLink href={`/admin/schedule/${scheduleId}/maps`}>
            <ListItem button>
              <ListItemText primary="Maps" />
            </ListItem>
          </InertiaLink>

          <InertiaLink href={`/admin/schedule/${scheduleId}/rules`}>
            <ListItem button>
              <ListItemText primary="Rules" />
            </ListItem>
          </InertiaLink>
        </List>
        <List
          component="nav"
          className={classes.nav}
          aria-labelledby="settings-header"
          subheader={
            <ListSubheader component="div" id="settings-header">
              Settings
            </ListSubheader>
          }
        >
          <InertiaLink href={`/admin/schedule/${scheduleId}/settings`}>
            <ListItem button>
              <ListItemText primary="Schedule Settings" />
            </ListItem>
          </InertiaLink>
        </List>
      </>
    );
  };

  return (
    <Box className={classes.appBar}>
      <Hidden mdUp>
        <AppBar position="static">
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
              <InertiaLink href={`/admin/schedule/${scheduleId}`}>
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
          <NavigationList />
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
          <NavigationList />
        </Drawer>
      </Hidden>
    </Box>
  );
};

export default AdminScheduleNavbar;
