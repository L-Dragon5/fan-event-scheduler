import React, { useState } from 'react';

import {
  Box,
  List,
  ListItem,
  ListItemText,
  Modal,
  Typography,
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

import PublicScheduleLayout from '../PublicScheduleLayout';
import GuestModal from './components/GuestModal';

const useStyles = makeStyles((theme) => ({
  root: {
    padding: theme.spacing(1),
  },
  categories: {
    margin: theme.spacing(0, 0, 2, 1),
  },
  heading: {
    borderBottom: '1px solid gray',
  },
  list: {
    backgroundColor: theme.palette.background.paper,
  },
  centerText: {
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    position: 'fixed',
  },
}));

const GuestsPage = ({ uuid, scheduleName, socialSettings, guests }) => {
  const classes = useStyles();

  const [open, setOpen] = useState(false);
  const [modalContent, setModalContent] = useState(<Box />);

  const handleClose = () => {
    setOpen(false);
  };

  const handleClick = (guest) => {
    setModalContent(<GuestModal guest={guest} />);
    setOpen(true);
  };

  if (guests && Object.keys(guests).length !== 0) {
    return (
      <PublicScheduleLayout
        title="Guests"
        scheduleName={scheduleName}
        socialSettings={socialSettings}
        uuid={uuid}
      >
        <Box className={classes.root}>
          {Object.entries(guests).map((values) => {
            const category = values[0];
            const entries = values[1];

            return (
              <Box key={category} className={classes.categories}>
                <Typography variant="h4" className={classes.heading}>
                  {category}
                </Typography>
                <div>
                  {entries?.map((entry) => {
                    return (
                      <List key={entry.id} className={classes.list}>
                        <ListItem button onClick={() => handleClick(entry)}>
                          <ListItemText primary={entry.name} />
                        </ListItem>
                      </List>
                    );
                  })}
                </div>
              </Box>
            );
          })}
          <Modal open={open} onClose={handleClose}>
            {modalContent}
          </Modal>
        </Box>
      </PublicScheduleLayout>
    );
  }

  return (
    <PublicScheduleLayout
      title="Guests"
      scheduleName={scheduleName}
      socialSettings={socialSettings}
      uuid={uuid}
    >
      <Box className={classes.root}>
        <Typography variant="h4" className={classes.centerText}>
          No guests currently
        </Typography>
      </Box>
    </PublicScheduleLayout>
  );
};

export default GuestsPage;
