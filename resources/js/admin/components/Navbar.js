import React, { useState } from 'react';
import { NavLink, withRouter, useHistory } from 'react-router-dom';

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
  Menu,
  MenuItem,
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
  nav: {
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

const Navbar = () => {
  const history = useHistory();
  const classes = useStyles();

  const [anchorEl, setAnchorEl] = useState(null);
  const [
    cosplayManagementMenuStatus,
    setCosplayManagementMenuStatus,
  ] = useState(false);
  const [drawerStatus, setDrawerStatus] = useState(false);

  const openCosplayManagementMenu = (e) => {
    e.preventDefault();

    setAnchorEl(e.currentTarget);
    setCosplayManagementMenuStatus(true);
  };

  const closeCosplayManagementMenu = () => {
    setCosplayManagementMenuStatus(false);
  };

  const drawerOpen = () => {
    setDrawerStatus(true);
  };

  const drawerClose = () => {
    setDrawerStatus(false);
  };

  const mobileNavClick = (url) => {
    drawerClose();
    history.push(url);
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
            aria-labelledby="main-options-mobile-header"
            subheader={
              <ListSubheader component="div" id="main-options-mobile-header">
                Main Options
              </ListSubheader>
            }
          >
            <ListItem button onClick={() => mobileNavClick('/')}>
              <ListItemText primary="Dashboard" />
            </ListItem>
            <ListItem button onClick={() => mobileNavClick('/tag-manager')}>
              <ListItemText primary="Tag Manager" />
            </ListItem>
          </List>
          <List
            component="nav"
            aria-labelledby="cosplay-management-mobile-header"
            subheader={
              <ListSubheader
                component="div"
                id="cosplay-management-mobile-header"
              >
                Cosplay Management
              </ListSubheader>
            }
          >
            <ListItem
              button
              onClick={() => mobileNavClick('/cosplay-management')}
            >
              <ListItemText primary="Series Grid" />
            </ListItem>
            <ListItem
              button
              onClick={() => mobileNavClick('/cosplay-management/all-cosplays')}
            >
              <ListItemText primary="All Cosplays" />
            </ListItem>
          </List>
          <List
            component="nav"
            aria-labelledby="taobao-organizer-mobile-header"
            subheader={
              <ListSubheader
                component="div"
                id="taobao-organizer-mobile-header"
              >
                Taobao Organizer
              </ListSubheader>
            }
          >
            <ListItem
              button
              onClick={() => mobileNavClick('/taobao-organizer')}
            >
              <ListItemText primary="All Items" />
            </ListItem>
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
            <NavLink to="/">CosManage</NavLink>
          </Typography>
          <nav className={classes.nav}>
            <Hidden smDown>
              <NavLink to="/">Dashboard</NavLink>

              <NavLink
                aria-controls="menu-cosplay-management"
                to="/cosplay-management"
                activeClassName="active-tool"
                onClick={openCosplayManagementMenu}
              >
                Cosplay Management
              </NavLink>
              <Menu
                id="menu-cosplay-management"
                anchorEl={anchorEl}
                anchorOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                keepMounted
                transformOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                open={cosplayManagementMenuStatus}
                onClose={closeCosplayManagementMenu}
              >
                <MenuItem
                  component={NavLink}
                  to="/cosplay-management"
                  activeClassName="active-tool"
                  onClick={closeCosplayManagementMenu}
                >
                  Series Grid
                </MenuItem>
                <MenuItem
                  component={NavLink}
                  to="/cosplay-management/all-cosplays"
                  activeClassName="active-tool"
                  onClick={closeCosplayManagementMenu}
                >
                  All Cosplays
                </MenuItem>
              </Menu>

              <NavLink to="/taobao-organizer" activeClassName="active-tool">
                Taobao Organizer
              </NavLink>

              <NavLink to="/tag-manager" activeClassName="active-tool">
                Tag Manager
              </NavLink>
            </Hidden>
          </nav>
        </Toolbar>
      </AppBar>
    </Box>
  );
};

export default withRouter(Navbar);
