import React, { useState } from 'react';
import { Inertia } from '@inertiajs/inertia';
import { DateTime } from 'luxon';

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
import FormEventAdd from './components/forms/FormEventAdd';
import FormEventEdit from './components/forms/FormEventEdit';
import FormEventDelete from './components/forms/FormEventDelete';

const useStyles = makeStyles((theme) => ({
  contentRoot: {
    flexGrow: 1,
    padding: theme.spacing(2),
  },
}));

const Events = ({
  scheduleId,
  availableLocations,
  availableEventTypes,
  minDate,
  maxDate,
  events,
}) => {
  const classes = useStyles();

  const [drawerStatus, setDrawerStatus] = useState(false);
  const [drawerContent, setDrawerContent] = useState('');

  const handleClose = () => {
    setDrawerStatus(false);
    setDrawerContent('');
  };

  const handleReload = () => {
    Inertia.reload({
      only: ['events', 'minDate', 'maxDate', 'availableLocations'],
    });
  };

  const handleAdd = () => {
    setDrawerContent(
      <FormEventAdd
        closeDrawer={handleClose}
        reloadPage={handleReload}
        scheduleId={scheduleId}
        availableLocations={availableLocations}
        availableEventTypes={availableEventTypes}
        minDate={minDate}
        maxDate={maxDate}
      />,
    );
    setDrawerStatus(true);
  };

  const handleEdit = (event) => {
    setDrawerContent(
      <FormEventEdit
        closeDrawer={handleClose}
        reloadPage={handleReload}
        scheduleId={scheduleId}
        availableLocations={availableLocations}
        availableEventTypes={availableEventTypes}
        event={event}
        minDate={minDate}
        maxDate={maxDate}
      />,
    );
    setDrawerStatus(true);
  };

  const handleDelete = (eventId, eventName) => {
    setDrawerContent(
      <FormEventDelete
        closeDrawer={handleClose}
        reloadPage={handleReload}
        scheduleId={scheduleId}
        eventId={eventId}
        eventName={eventName}
      />,
    );
    setDrawerStatus(true);
  };

  return (
    <AdminScheduleLayout title="Events" scheduleId={scheduleId}>
      <Box className={classes.contentRoot}>
        <Box className={classes.title}>
          <Typography component="span" variant="h4">
            Events
          </Typography>
        </Box>

        <Drawer anchor="right" open={drawerStatus}>
          <Box>{drawerContent}</Box>
        </Drawer>

        <ButtonAdd onClick={handleAdd}>Add Event</ButtonAdd>

        {events?.length ? (
          <TableContainer component={Paper}>
            <Table className={classes.table} aria-label="table of event">
              <TableHead>
                <TableRow>
                  <TableCell>Name</TableCell>
                  <TableCell>Date/Time</TableCell>
                  <TableCell align="right">Actions</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {events?.map((event) => {
                  const beginDate = DateTime.fromISO(
                    `${event.date}T${event.time_start}`,
                  );
                  const endDate = DateTime.fromISO(
                    `${event.date}T${event.time_end}`,
                  );
                  const dateEntry = `${beginDate.toLocaleString(
                    DateTime.DATE_FULL,
                  )}`;
                  const timeEntry = `${beginDate.toLocaleString(
                    DateTime.TIME_SIMPLE,
                  )} - ${endDate.toLocaleString(DateTime.TIME_SIMPLE)}`;

                  return (
                    <TableRow key={event.id}>
                      <TableCell>
                        {event.is_cancelled === 1 ? (
                          <span style={{ textDecoration: 'line-through' }}>
                            {event.name}
                          </span>
                        ) : (
                          event.name
                        )}
                      </TableCell>
                      <TableCell>
                        {dateEntry}
                        <br />
                        {timeEntry}
                      </TableCell>
                      <TableCell align="right">
                        <ButtonEdit onClick={() => handleEdit(event)} />
                        <ButtonDelete
                          onClick={() => handleDelete(event.id, event.name)}
                        />
                      </TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          </TableContainer>
        ) : (
          <Typography variant="body1">No events</Typography>
        )}
      </Box>
    </AdminScheduleLayout>
  );
};

export default Events;
