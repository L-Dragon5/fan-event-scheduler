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
  Toolbar,
  Typography,
  IconButton,
} from '@material-ui/core';
import MenuIcon from '@material-ui/icons/Menu';
import FacebookIcon from '@material-ui/icons/Facebook';
import TwitterIcon from '@material-ui/icons/Twitter';
import InstagramIcon from '@material-ui/icons/Instagram';
import LanguageIcon from '@material-ui/icons/Language';
import { makeStyles } from '@material-ui/core/styles';

import ExternalLink from './ExternalLink';

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
  iconLink: {
    color: theme.palette.grey[900],
    marginRight: theme.spacing(0.5),
  },
}));

const PublicScheduleNavbar = ({ uuid, scheduleName, socialSettings }) => {
  const classes = useStyles();

  const [drawerStatus, setDrawerStatus] = useState(false);

  const drawerOpen = () => {
    setDrawerStatus(true);
  };

  const drawerClose = () => {
    setDrawerStatus(false);
  };

  const socialIcons = (
    <>
      {socialSettings?.fb && (
        <ExternalLink href={socialSettings.fb} className={classes.iconLink}>
          <FacebookIcon />
        </ExternalLink>
      )}
      {socialSettings?.tw && (
        <ExternalLink href={socialSettings.tw} className={classes.iconLink}>
          <TwitterIcon />
        </ExternalLink>
      )}
      {socialSettings?.ig && (
        <ExternalLink href={socialSettings.ig} className={classes.iconLink}>
          <InstagramIcon />
        </ExternalLink>
      )}
      {socialSettings?.web && (
        <ExternalLink href={socialSettings.web} className={classes.iconLink}>
          <LanguageIcon />
        </ExternalLink>
      )}
    </>
  );

  const NavigationList = () => {
    return (
      <>
        <List>
          <ListItem>
            <ListItemText>
              <Typography variant="h5">{scheduleName}</Typography>
            </ListItemText>
          </ListItem>
          <ListItem divider>
            <ListItemText>{socialIcons}</ListItemText>
          </ListItem>
        </List>
        <List component="nav" className={classes.nav}>
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
