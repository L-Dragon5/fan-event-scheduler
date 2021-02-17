import React from 'react';

import PublicScheduleLayout from '../PublicScheduleLayout';

const ExhibitorsPage = ({ uuid, scheduleName, exhibitors }) => {
  return (
    <PublicScheduleLayout
      title="Exhibitors"
      scheduleName={scheduleName}
      uuid={uuid}
    >
      {exhibitors?.map((exhibitor) => {
        return <div key={exhibitor.id}>{exhibitor.name}</div>;
      })}
    </PublicScheduleLayout>
  );
};

export default ExhibitorsPage;
