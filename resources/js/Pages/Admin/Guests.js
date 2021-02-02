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
import GuestAddButton from './components/GuestAddButton';
import GuestEditButton from './components/GuestEditButton';
import GuestDeleteButton from './components/GuestDeleteButton';

const useStyles = makeStyles((theme) => ({
  contentRoot: {
    flexGrow: 1,
    padding: theme.spacing(2),
  },
}));

const Guests = ({ scheduleId, guests }) => {
  const classes = useStyles();

  const handleReload = () => {
    Inertia.reload({ only: ['guests'] });
  };

  return (
    <AdminScheduleLayout title="Guests" scheduleId={scheduleId}>
      <Box className={classes.contentRoot}>
        <Box className={classes.title}>
          <Typography component="span" variant="h4">
            Guests
          </Typography>
        </Box>

        <GuestAddButton scheduleId={scheduleId} onAdd={handleReload} />

        {guests && guests.length ? (
          <TableContainer component={Paper}>
            <Table className={classes.table} aria-label="table of guest">
              <TableHead>
                <TableRow>
                  <TableCell>Name</TableCell>
                  <TableCell>Category</TableCell>
                  <TableCell scope="small">Description</TableCell>
                  <TableCell>Social Media</TableCell>
                  <TableCell align="right">Actions</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {guests.map((guest) => (
                  <TableRow key={guest.name}>
                    <TableCell>{guest.name}</TableCell>
                    <TableCell>{guest.category}</TableCell>
                    <TableCell scope="small">{guest.description}</TableCell>
                    <TableCell>
                      {guest.social_tw} {guest.social_fb} {guest.social_ig}
                    </TableCell>
                    <TableCell align="right">
                      <GuestEditButton
                        scheduleId={scheduleId}
                        guest={guest}
                        onEdit={handleReload}
                      />
                      <GuestDeleteButton
                        scheduleId={scheduleId}
                        guest={guest}
                        onDelete={handleReload}
                      />
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        ) : (
          <Typography variant="body1">No guests</Typography>
        )}
      </Box>
    </AdminScheduleLayout>
  );
};

export default Guests;
