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

const useStyles = makeStyles((theme) => ({
  contentRoot: {
    flexGrow: 1,
    padding: theme.spacing(2),
  },
}));

const EventTypes = ({ scheduleId, eventTypes }) => {
  const classes = useStyles();

  const [drawerStatus, setDrawerStatus] = useState(false);
  const [drawerContent, setDrawerContent] = useState('');

  const handleClose = () => {
    setDrawerStatus(false);
    setDrawerContent('');
  };

  const handleReload = () => {
    Inertia.reload({ only: ['eventTypes'] });
  };

  const handleAdd = () => {
    /*
    setDrawerContent(
      <FormGuestAdd
        closeDrawer={handleClose}
        reloadPage={handleReload}
        scheduleId={scheduleId}
      />,
    );
    */
    setDrawerStatus(true);
  };

  const handleEdit = (eventType) => {
    /*
    setDrawerContent(
      <FormGuestEdit
        closeDrawer={handleClose}
        reloadPage={handleReload}
        scheduleId={scheduleId}
        guest={guest}
      />,
    );
    */
    setDrawerStatus(true);
  };

  const handleDelete = (eventTypeId, eventTypeName) => {
    /*
    setDrawerContent(
      <FormGuestDelete
        closeDrawer={handleClose}
        reloadPage={handleReload}
        scheduleId={scheduleId}
        guestId={guestId}
        guestName={guestName}
      />,
    );
    */
    setDrawerStatus(true);
  };

  return (
    <AdminScheduleLayout title="Event Types" scheduleId={scheduleId}>
      <Box className={classes.contentRoot}>
        <Box className={classes.title}>
          <Typography component="span" variant="h4">
            Event Types
          </Typography>
        </Box>

        <Drawer anchor="right" open={drawerStatus}>
          <Box>{drawerContent}</Box>
        </Drawer>

        <ButtonAdd onClick={handleAdd}>Add Event Type</ButtonAdd>

        {eventTypes?.length ? (
          <TableContainer component={Paper}>
            <Table className={classes.table} aria-label="table of event type">
              <TableHead>
                <TableRow>
                  <TableCell>Name</TableCell>
                  <TableCell align="right">Actions</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {eventTypes?.map((eventType) => (
                  <TableRow key={eventType.id}>
                    <TableCell>{eventType.name}</TableCell>
                    <TableCell align="right">
                      <ButtonEdit onClick={() => handleEdit(eventType)} />
                      <ButtonDelete
                        onClick={() =>
                          handleDelete(eventType.id, eventType.name)
                        }
                      />
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        ) : (
          <Typography variant="body1">No event types</Typography>
        )}
      </Box>
    </AdminScheduleLayout>
  );
};

export default EventTypes;
