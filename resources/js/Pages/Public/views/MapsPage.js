import React from 'react';

import PublicScheduleLayout from '../PublicScheduleLayout';

const MapsPage = ({ uuid, scheduleName, maps }) => {
  return (
    <PublicScheduleLayout title="Maps" scheduleName={scheduleName} uuid={uuid}>
      {maps?.map((map) => {
        return <div key={map.id}>{map.name}</div>;
      })}
    </PublicScheduleLayout>
  );
};

export default MapsPage;
