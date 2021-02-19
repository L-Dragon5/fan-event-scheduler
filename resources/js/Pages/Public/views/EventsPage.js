import React, { useEffect, useState } from 'react';
import { DateTime } from 'luxon';

import {
  Box,
  InputLabel,
  FormControl,
  MenuItem,
  Select,
  useMediaQuery,
} from '@material-ui/core';
import { makeStyles, useTheme } from '@material-ui/core/styles';

import PublicScheduleLayout from '../PublicScheduleLayout';
import EventsGridView from './schedule/grid/EventsGridView';
import EventsListView from './schedule/list/EventsListView';

const useStyles = makeStyles((theme) => ({
  formControl: {
    margin: theme.spacing(2),
    minWidth: 120,
  },
}));

const EventsPage = ({
  uuid,
  scheduleName,
  socialSettings,
  events,
  locations,
}) => {
  const classes = useStyles();
  const dates = Object.keys(events);

  const [selectedDate, setSelectedDate] = useState(
    dates.length > 0 ? dates[0] : '',
  );
  const [eventDisplay, setEventDisplay] = useState(null);
  const theme = useTheme();
  const isDesktop = useMediaQuery(theme.breakpoints.up('md'));

  const handleChange = (e) => {
    setSelectedDate(e.target.value);
  };

  useEffect(() => {
    if (selectedDate !== '') {
      if (isDesktop) {
        setEventDisplay(
          <EventsGridView
            events={events[selectedDate]}
            locations={locations}
          />,
        );
      } else {
        setEventDisplay(
          <EventsListView
            events={events[selectedDate]}
            locations={locations}
          />,
        );
      }
    }
  }, [isDesktop, selectedDate]);

  return (
    <PublicScheduleLayout
      title="Events"
      scheduleName={scheduleName}
      socialSettings={socialSettings}
      uuid={uuid}
    >
      <Box>
        <FormControl variant="outlined" className={classes.formControl}>
          <InputLabel id="events-date-select-label">Event Day</InputLabel>
          <Select
            labelId="events-date-select-label"
            value={selectedDate}
            onChange={handleChange}
          >
            {dates.map((date) => (
              <MenuItem key={date} value={date}>
                {DateTime.fromISO(date).toFormat('DDDD')}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </Box>
      <Box>{eventDisplay}</Box>
    </PublicScheduleLayout>
  );
};

export default EventsPage;
