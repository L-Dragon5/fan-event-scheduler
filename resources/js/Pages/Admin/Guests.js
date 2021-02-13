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
import FormGuestAdd from './components/forms/FormGuestAdd';
import FormGuestEdit from './components/forms/FormGuestEdit';
import FormGuestDelete from './components/forms/FormGuestDelete';

const useStyles = makeStyles((theme) => ({
  contentRoot: {
    flexGrow: 1,
    padding: theme.spacing(2),
  },
}));

const Guests = ({ scheduleId, guests }) => {
  const classes = useStyles();

  const [drawerStatus, setDrawerStatus] = useState(false);
  const [drawerContent, setDrawerContent] = useState('');

  const handleClose = () => {
    setDrawerStatus(false);
    setDrawerContent('');
  };

  const handleReload = () => {
    Inertia.reload({ only: ['guests'] });
  };

  const handleAdd = () => {
    setDrawerContent(
      <FormGuestAdd
        closeDrawer={handleClose}
        reloadPage={handleReload}
        scheduleId={scheduleId}
      />,
    );
    setDrawerStatus(true);
  };

  const handleEdit = (guest) => {
    setDrawerContent(
      <FormGuestEdit
        closeDrawer={handleClose}
        reloadPage={handleReload}
        scheduleId={scheduleId}
        guest={guest}
      />,
    );
    setDrawerStatus(true);
  };

  const handleDelete = (guestId, guestName) => {
    setDrawerContent(
      <FormGuestDelete
        closeDrawer={handleClose}
        reloadPage={handleReload}
        scheduleId={scheduleId}
        guestId={guestId}
        guestName={guestName}
      />,
    );
    setDrawerStatus(true);
  };

  return (
    <AdminScheduleLayout title="Guests" scheduleId={scheduleId}>
      <Box className={classes.contentRoot}>
        <Box className={classes.title}>
          <Typography component="span" variant="h4">
            Guests
          </Typography>
        </Box>

        <Drawer anchor="right" open={drawerStatus}>
          <Box>{drawerContent}</Box>
        </Drawer>

        <ButtonAdd onClick={handleAdd}>Add Guest</ButtonAdd>

        {guests?.length ? (
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
                {guests?.map((guest) => (
                  <TableRow key={guest.name}>
                    <TableCell>{guest.name}</TableCell>
                    <TableCell>{guest.category}</TableCell>
                    <TableCell scope="small">{guest.description}</TableCell>
                    <TableCell>
                      {guest.social_tw} {guest.social_fb} {guest.social_ig}
                    </TableCell>
                    <TableCell align="right">
                      <ButtonEdit onClick={() => handleEdit(guest)} />
                      <ButtonDelete
                        onClick={() => handleDelete(guest.id, guest.name)}
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
