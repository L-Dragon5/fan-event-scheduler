import React from 'react';
import { Inertia } from '@inertiajs/inertia';

import {
  Box,
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
import LocationAddButton from './components/LocationAddButton';
import LocationEditButton from './components/LocationEditButton';
import LocationDeleteButton from './components/LocationDeleteButton';

const useStyles = makeStyles((theme) => ({
  contentRoot: {
    flexGrow: 1,
    padding: theme.spacing(2),
  },
}));

const Locations = ({ scheduleId, locations }) => {
  const classes = useStyles();

  const handleReload = () => {
    Inertia.reload({ only: ['locations'] });
  };

  return (
    <AdminScheduleLayout title="Locations" scheduleId={scheduleId}>
      <Box className={classes.contentRoot}>
        <Box className={classes.title}>
          <Typography component="span" variant="h4">
            Locations
          </Typography>
        </Box>

        <LocationAddButton scheduleId={scheduleId} onAdd={handleReload} />

        {locations && locations.length ? (
          <TableContainer component={Paper}>
            <Table className={classes.table} aria-label="table of location">
              <TableHead>
                <TableRow>
                  <TableCell>Name</TableCell>
                  <TableCell align="right">Actions</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {locations.map((location) => (
                  <TableRow key={location.name}>
                    <TableCell component="th" scope="row">
                      {location.name}
                    </TableCell>
                    <TableCell align="right">
                      <LocationEditButton
                        locationId={location.id}
                        name={location.name}
                        onEdit={handleReload}
                      />
                      <LocationDeleteButton
                        locationId={location.id}
                        onDelete={handleReload}
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
