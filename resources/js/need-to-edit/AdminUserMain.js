import React, { useEffect } from 'react';
import { Route, BrowserRouter, Switch } from 'react-router-dom';
import axios from 'axios';

import { CssBaseline } from '@material-ui/core';
import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles';
import { orange, pink } from '@material-ui/core/colors';

// List Pages
import SchedulesPage from './views/SchedulesPage';
import DashboardPage from './views/DashboardPage';
import EventsPage from './views/EventsPage';

import Helper from './components/Helper';

const theme = createMuiTheme({
  palette: {
    primary: orange,
    secondary: pink,
  },
});

const AdminUserMain = () => {
  const routes = [
    {
      path: '/',
      component: SchedulesPage,
    },
    {
      path: '/schedule/:scheduleId',
      component: DashboardPage,
    },
    {
      path: '/schedule/:scheduleId/events',
      component: EventsPage,
    },
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
      <BrowserRouter>
        <Switch>{routeComponents}</Switch>
      </BrowserRouter>
    </ThemeProvider>
  );
};

export default AdminUserMain;
