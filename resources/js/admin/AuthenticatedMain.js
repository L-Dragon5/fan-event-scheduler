import React, { useEffect } from 'react';
import axios from 'axios';
import { Route, BrowserRouter, Switch } from 'react-router-dom';

import { CssBaseline } from '@material-ui/core';
import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles';
import { orange, pink } from '@material-ui/core/colors';

// List Pages
import DashboardPage from './views/DashboardPage';
/*
import SchedulePage from './views/SchedulePage'
import RulesPage from './views/RulesPage'
import ExhibitorsPage from './views/ExhibitorsPage'
import GuestsPage from './views/GuestsPage'
import MapsPage from './views/MapsPage'

// Detail Pages
import SingleEvent from './views/single/SingleEvent'
import SingleGuest from './views/single/SingleGuest'

// Components
import ExternalLink from './components/ExternalLink'
import Modal from './components/Modal'
import LoginForm from './components/auth/LoginForm'
*/
import Navbar from './components/Navbar';
import Helper from './components/Helper';

const theme = createMuiTheme({
  palette: {
    primary: orange,
    secondary: pink,
  },
});

const AuthenticatedMain = () => {
  const routes = [
    {
      path: '/',
      component: DashboardPage,
    },
    /*
    {
      path: '/guest/:guestId',
      render: ({ match }) => (
        <SingleGuest
          guestId={match.params.guestId}
          token={this.state.token}
        />
      ),
    },
    */
  ];

  const routeComponents = routes.map(({ path, component }, key) => (
    <Route exact path={path} component={component} key={key} />
  ));

  useEffect(() => {
    if (Helper.checkLocalStorage()) {
      const token = Helper.getToken();

      const formData = new FormData();
      formData.set('token', token);

      // Check Logged in State
      axios
        .post('/api/checkUser', formData, {
          headers: {
            Accept: 'application/json',
            Authorization: `Bearer ${token}`,
            'content-type': 'multipart/form-data',
          },
        })
        .catch((error) => {
          if (error.response) {
            window.location.replace(error.response.data.message);
          }
        });
    }
  }, []);

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <BrowserRouter basename="dashboard">
        <Navbar />
        <div>
          <Switch>{routeComponents}</Switch>
        </div>
      </BrowserRouter>
    </ThemeProvider>
  );
};

export default AuthenticatedMain;
