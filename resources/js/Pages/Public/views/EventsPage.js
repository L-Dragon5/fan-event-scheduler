import React, { useEffect, useState } from 'react';

import { useMediaQuery } from '@material-ui/core';
import { useTheme } from '@material-ui/core/styles';

import PublicScheduleLayout from '../PublicScheduleLayout';
import EventsGridView from './schedule/grid/EventsGridView';
import EventsListView from './schedule/list/EventsListView';

const EventsPage = ({
  uuid,
  scheduleName,
  socialSettings,
  events,
  locations,
}) => {
  const [eventDisplay, setEventDisplay] = useState(null);
  const theme = useTheme();
  const isDesktop = useMediaQuery(theme.breakpoints.up('md'));

  useEffect(() => {
    if (isDesktop) {
      setEventDisplay(<EventsGridView events={events} locations={locations} />);
    } else {
      setEventDisplay(<EventsListView events={events} locations={locations} />);
    }
  }, [isDesktop]);

  return (
    <PublicScheduleLayout
      title="Events"
      scheduleName={scheduleName}
      socialSettings={socialSettings}
      uuid={uuid}
    >
      {eventDisplay}
    </PublicScheduleLayout>
  );
};

export default EventsPage;
