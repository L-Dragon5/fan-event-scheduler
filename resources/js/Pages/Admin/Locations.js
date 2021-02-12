import React, { useState } from 'react';
import { Inertia } from '@inertiajs/inertia';

import {
  Box,
  Drawer,
  Paper,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

import AdminScheduleLayout from './AdminScheduleLayout';
import ButtonAdd from './components/buttons/ButtonAdd';
import ButtonEdit from './components/buttons/ButtonEdit';
import ButtonDelete from './components/buttons/ButtonDelete';
import FormLocationAdd from './components/forms/FormLocationAdd';
import FormLocationEdit from './components/forms/FormLocationEdit';
import FormLocationDelete from './components/forms/FormLocationDelete';

const useStyles = makeStyles((theme) => ({
  contentRoot: {
    flexGrow: 1,
    padding: theme.spacing(2),
  },
}));

const Locations = ({ scheduleId, locations }) => {
  const classes = useStyles();

  const [drawerStatus, setDrawerStatus] = useState(false);
  const [drawerContent, setDrawerContent] = useState('');

  const handleClose = () => {
    setDrawerStatus(false);
    setDrawerContent('');
  };

  const handleReload = () => {
    Inertia.reload({ only: ['locations'] });
  };

  const handleAdd = () => {
    setDrawerContent(
      <FormLocationAdd
        closeDrawer={handleClose}
        reloadPage={handleReload}
        scheduleId={scheduleId}
      />,
    );
    setDrawerStatus(true);
  };

  const handleEdit = (location) => {
    setDrawerContent(
      <FormLocationEdit
        closeDrawer={handleClose}
        reloadPage={handleReload}
        scheduleId={scheduleId}
        location={location}
      />,
    );
    setDrawerStatus(true);
  };

  const handleDelete = (locationId, locationName) => {
    setDrawerContent(
      <FormLocationDelete
        closeDrawer={handleClose}
        reloadPage={handleReload}
        scheduleId={scheduleId}
        locationId={locationId}
        locationName={locationName}
      />,
    );
    setDrawerStatus(true);
  };

  return (
    <AdminScheduleLayout title="Locations" scheduleId={scheduleId}>
      <Box className={classes.contentRoot}>
        <Box className={classes.title}>
          <Typography component="span" variant="h4">
            Locations
          </Typography>
        </Box>

        <Drawer anchor="right" open={drawerStatus}>
          <Box>{drawerContent}</Box>
        </Drawer>

        <ButtonAdd onClick={handleAdd}>Add Location</ButtonAdd>

        {locations?.length ? (
          <TableContainer component={Paper}>
            <Table className={classes.table} aria-label="table of location">
              <TableHead>
                <TableRow>
                  <TableCell>Name</TableCell>
                  <TableCell>Link</TableCell>
                  <TableCell align="right">Actions</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {locations?.map((location) => (
                  <TableRow key={location.name}>
                    <TableCell>{location.name}</TableCell>
                    <TableCell>https://twitch.tv/</TableCell>
                    <TableCell align="right">
                      <ButtonEdit onClick={() => handleEdit(location)} />
                      <ButtonDelete
                        onClick={() => handleDelete(location.id, location.name)}
                      />
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        ) : (
          <Typography variant="body1">No locations</Typography>
        )}
      </Box>
    </AdminScheduleLayout>
  );
};

export default Locations;
