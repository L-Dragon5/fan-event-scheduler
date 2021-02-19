import React, { useState } from 'react';

import { Box, List, Modal } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

import EventsListViewEvent from './EventsListViewEvent';
import EventsViewModal from '../EventsViewModal';

const useStyles = makeStyles((theme) => ({
  list: {
    width: '100%',
    backgroundColor: theme.palette.background.paper,
  },
}));

const EventsListView = ({ events, locations }) => {
  const classes = useStyles();

  const [open, setOpen] = useState(false);
  const [modalContent, setModalContent] = useState(<Box />);

  const handleClose = () => {
    setOpen(false);
  };

  const handleEventClick = (event) => {
    const foundLoc = locations.find((loc) => loc.id === event.location_id);
    setModalContent(<EventsViewModal event={event} location={foundLoc} />);
    setOpen(true);
  };

  return (
    <>
      <List className={classes.list}>
        {events.map((event) => (
          <EventsListViewEvent
            key={event.id}
            event={event}
            locations={locations}
            onClick={() => handleEventClick(event)}
          />
        ))}
      </List>
      <Modal open={open} onClose={handleClose}>
        {modalContent}
      </Modal>
    </>
  );
};

export default EventsListView;
