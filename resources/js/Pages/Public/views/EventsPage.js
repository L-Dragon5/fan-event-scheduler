import React, { useState } from 'react';

import EventsGridView from './schedule/grid/EventsGridView';

const EventsPage = ({ events, locations }) => {
  return (
    <div style={{ height: '80vh', width: '50vw', overflow: 'auto' }}>
      <EventsGridView events={events} locations={locations} />
    </div>
  );
};

export default EventsPage;
