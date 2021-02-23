import React, { useEffect, useState } from 'react';
import { DateTime } from 'luxon';
import SearchBar from 'material-ui-search-bar';

import {
  Box,
  InputLabel,
  FormControl,
  MenuItem,
  Paper,
  Select,
  Typography,
  useMediaQuery,
} from '@material-ui/core';
import { makeStyles, useTheme } from '@material-ui/core/styles';

import PublicScheduleLayout from '../PublicScheduleLayout';
import EventsGridView from './schedule/grid/EventsGridView';
import EventsListView from './schedule/list/EventsListView';

const useStyles = makeStyles((theme) => ({
  formControl: {
    minWidth: 120,
    marginRight: theme.spacing(2),
  },
  eventHeader: {
    display: 'flex',
    width: '100%',
    flexWrap: 'wrap',
  },
  headerRow: {
    display: 'flex',
    flexBasis: '100%',
    alignItems: 'center',
    padding: theme.spacing(2),
    maxWidth: '98.8vw',
    [theme.breakpoints.up('md')]: {
      flexBasis: 'auto',
    },
  },
  searchBar: {
    flexGrow: 1,
    flexBasis: 420,
  },
}));

const EventsPage = ({
  uuid,
  scheduleName,
  scheduleTimezone,
  socialSettings,
  events,
  eventTypes,
  locations,
}) => {
  const classes = useStyles();
  const dates = Object.keys(events);
  const theme = useTheme();
  const isDesktop = useMediaQuery(theme.breakpoints.up('md'));

  const [selectedDate, setSelectedDate] = useState(
    dates.length > 0 ? dates[0] : '',
  );
  const [eventDisplay, setEventDisplay] = useState(null);
  const [selectedTypes, setSelectedTypes] = useState([]);
  const [searchValue, setSearchValue] = useState('');
  const [filteredEvents, setFilteredEvents] = useState(events[selectedDate]);

  const handleChange = (e) => {
    setSelectedDate(e.target.value);
  };

  const handleTypesChange = (e) => {
    setSelectedTypes(e.target.value);
  };

  // Search handle listener.
  useEffect(() => {
    const eventArray = events[selectedDate];
    const searchVal = searchValue.toLowerCase();

    // If both search values are filled, filter accordingly.
    // If not, go by search only then by type only.
    // Default, send all events.
    if (searchVal !== '' && selectedTypes.length > 0) {
      setFilteredEvents(
        eventArray.filter(
          (ev) =>
            ev.event_types.some((type) => selectedTypes.includes(type.id)) &&
            (ev.name?.toLowerCase().includes(searchVal) ||
              ev.description?.toLowerCase().includes(searchVal)),
        ),
      );
    } else if (searchVal !== '') {
      setFilteredEvents(
        eventArray.filter(
          (ev) =>
            ev.name?.toLowerCase().includes(searchVal) ||
            ev.description?.toLowerCase().includes(searchVal),
        ),
      );
    } else if (selectedTypes.length > 0) {
      setFilteredEvents(
        eventArray.filter((ev) =>
          ev.event_types.some((type) => selectedTypes.includes(type.id)),
        ),
      );
    } else {
      setFilteredEvents(eventArray);
    }
  }, [selectedTypes, searchValue]);

  // Display event in style depending on breakpoint of viewport.
  useEffect(() => {
    if (selectedDate !== '') {
      if (isDesktop) {
        setEventDisplay(
          <EventsGridView
            timezone={scheduleTimezone?.timezone}
            events={filteredEvents}
            locations={locations}
          />,
        );
      } else {
        setEventDisplay(
          <EventsListView events={filteredEvents} locations={locations} />,
        );
      }
    }
  }, [isDesktop, selectedDate, filteredEvents]);

  return (
    <PublicScheduleLayout
      title="Events"
      scheduleName={scheduleName}
      socialSettings={socialSettings}
      uuid={uuid}
    >
      <Box className={classes.eventHeader}>
        <Box className={classes.headerRow}>
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

          <Typography display="inline">
            Times displayed in {scheduleTimezone?.label}
          </Typography>
        </Box>

        <Box
          component={Paper}
          className={classes.headerRow}
          style={{ flexGrow: 1 }}
        >
          <FormControl variant="outlined" className={classes.formControl}>
            <InputLabel id="events-type-select-label">Event Type</InputLabel>
            <Select
              multiple
              labelId="events-type-select-label"
              value={selectedTypes}
              onChange={handleTypesChange}
            >
              {eventTypes.map((type) => (
                <MenuItem key={type.id} value={type.id}>
                  {type.name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>

          <SearchBar
            className={classes.searchBar}
            value={searchValue}
            onChange={setSearchValue}
            onCancelSearch={() => setSearchValue('')}
          />
        </Box>
      </Box>
      <Box>{eventDisplay}</Box>
    </PublicScheduleLayout>
  );
};

export default EventsPage;
