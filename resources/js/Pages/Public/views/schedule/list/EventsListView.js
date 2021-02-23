import React, { useState } from 'react';
import { DateTime } from 'luxon';

import { Box, Divider, List, ListSubheader, Modal } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

import EventsListViewEvent from './EventsListViewEvent';
import EventsViewModal from '../EventsViewModal';

const useStyles = makeStyles((theme) => ({
  list: {
    width: '100%',
    backgroundColor: theme.palette.background.paper,
    padding: 0,
  },
  timeHeader: {
    fontSize: '1rem',
    fontWeight: 700,
    backgroundColor: theme.palette.grey[300],
    borderBottom: theme.palette.grey[100],
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
    setModalContent(<EventsViewModal event={event} />);
    setOpen(true);
  };

  const timeSortedEvents = events.reduce((r, a) => {
    r[a.time_start] = r[a.time_start] || [];
    r[a.time_start].push(a);
    return r;
  }, Object.create(null));

  return (
    <>
      {Object.entries(timeSortedEvents).map((val) => {
        const time = DateTime.fromISO(val[0]).toLocaleString(
          DateTime.TIME_SIMPLE,
        );
        const entries = val[1];

        return (
          <List
            key={time}
            className={classes.list}
            subheader={
              <ListSubheader className={classes.timeHeader}>
                {time}
              </ListSubheader>
            }
          >
            {entries.map((event, index) => {
              if (index !== entries.length - 1) {
                return (
                  <React.Fragment key={event.id}>
                    <EventsListViewEvent
                      key={event.id}
                      event={event}
                      locations={locations}
                      onClick={() => handleEventClick(event)}
                    />
                    <Divider />
                  </React.Fragment>
                );
              }
              return (
                <EventsListViewEvent
                  key={event.id}
                  event={event}
                  locations={locations}
                  onClick={() => handleEventClick(event)}
                />
              );
            })}
          </List>
        );
      })}

      <Modal open={open} onClose={handleClose}>
        {modalContent}
      </Modal>
    </>
  );
};

export default EventsListView;
