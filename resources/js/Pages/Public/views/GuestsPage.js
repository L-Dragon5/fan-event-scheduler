import React from 'react';

import PublicScheduleLayout from '../PublicScheduleLayout';

const GuestsPage = ({ uuid, scheduleName, guests }) => {
  return (
    <PublicScheduleLayout
      title="Guests"
      scheduleName={scheduleName}
      uuid={uuid}
    >
      {guests?.map((guest) => {
        return <div key={guest.id}>{guest.name}</div>;
      })}
    </PublicScheduleLayout>
  );
};

export default GuestsPage;
