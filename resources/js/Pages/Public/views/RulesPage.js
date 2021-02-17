import React from 'react';

import PublicScheduleLayout from '../PublicScheduleLayout';

const RulesPage = ({ uuid, scheduleName, rules }) => {
  return (
    <PublicScheduleLayout title="Rules" scheduleName={scheduleName} uuid={uuid}>
      {rules?.map((rule) => {
        return <div key={rule.id}>{rule.title}</div>;
      })}
    </PublicScheduleLayout>
  );
};

export default RulesPage;
