import React from 'react';

import {
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Box,
  Typography,
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';

import PublicScheduleLayout from '../PublicScheduleLayout';

const useStyles = makeStyles((theme) => ({
  root: {
    padding: theme.spacing(1),
  },
  heading: {
    fontSize: theme.typography.h4,
    fontWeight: theme.typography.fontWeightMedium,
  },
  centerText: {
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    position: 'fixed',
  },
}));

const RulesPage = ({ uuid, scheduleName, socialSettings, rules }) => {
  const classes = useStyles();

  if (rules && Object.keys(rules).length !== 0) {
    return (
      <PublicScheduleLayout
        title="Rules"
        scheduleName={scheduleName}
        socialSettings={socialSettings}
        uuid={uuid}
      >
        <Box className={classes.root}>
          {rules?.map((rule) => {
            return (
              <Accordion key={rule.id}>
                <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                  <Typography className={classes.heading}>
                    {rule.title}
                  </Typography>
                </AccordionSummary>
                <AccordionDetails>
                  <Typography>{rule.description}</Typography>
                </AccordionDetails>
              </Accordion>
            );
          })}
        </Box>
      </PublicScheduleLayout>
    );
  }

  return (
    <PublicScheduleLayout
      title="Rules"
      scheduleName={scheduleName}
      socialSettings={socialSettings}
      uuid={uuid}
    >
      <Box className={classes.root}>
        <Typography variant="h4" className={classes.centerText}>
          No rules currently
        </Typography>
      </Box>
    </PublicScheduleLayout>
  );
};

export default RulesPage;
