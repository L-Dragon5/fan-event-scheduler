import React, { useEffect, useState } from 'react';

import { useMediaQuery } from '@material-ui/core';
import { useTheme } from '@material-ui/core/styles';

import PublicScheduleLayout from '../PublicScheduleLayout';
import EventsGridView from './schedule/grid/EventsGridView';

const EventsPage = ({ uuid, scheduleName, events, locations }) => {
  const [eventDisplay, setEventDisplay] = useState(null);
  const theme = useTheme();
  const isDesktop = useMediaQuery(theme.breakpoints.up('md'));

  useEffect(() => {
    if (isDesktop) {
      setEventDisplay(<EventsGridView events={events} locations={locations} />);
    } else {
      setEventDisplay(<div>List view would go here once complete.</div>);
    }
  }, [isDesktop]);

  return (
    <PublicScheduleLayout
      title="Events"
      scheduleName={scheduleName}
      uuid={uuid}
    >
      {eventDisplay}
    </PublicScheduleLayout>
  );
};

export default EventsPage;
