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
      color: '#FFFFFF',
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

const PublicScheduleNavbar = ({ uuid, scheduleName }) => {
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
          <InertiaLink href={`/s/${uuid}`}>
            <ListItem button>
              <ListItemText primary="Events" />
            </ListItem>
          </InertiaLink>

          <InertiaLink href={`/s/${uuid}/exhibitors`}>
            <ListItem button>
              <ListItemText primary="Exhibitors" />
            </ListItem>
          </InertiaLink>

          <InertiaLink href={`/s/${uuid}/guests`}>
            <ListItem button>
              <ListItemText primary="Guests" />
            </ListItem>
          </InertiaLink>

          <InertiaLink href={`/s/${uuid}/maps`}>
            <ListItem button>
              <ListItemText primary="Maps" />
            </ListItem>
          </InertiaLink>

          <InertiaLink href={`/s/${uuid}/rules`}>
            <ListItem button>
              <ListItemText primary="Rules" />
            </ListItem>
          </InertiaLink>
        </List>
      </>
    );
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
              <InertiaLink href={`/s/${uuid}`}>{scheduleName}</InertiaLink>
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

export default PublicScheduleNavbar;
