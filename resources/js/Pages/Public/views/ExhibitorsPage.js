import React from 'react';

import {
  Box,
  List,
  ListItem,
  ListItemText,
  Typography,
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import LinkIcon from '@material-ui/icons/Link';

import PublicScheduleLayout from '../PublicScheduleLayout';
import ExternalLink from '../components/ExternalLink';

const useStyles = makeStyles((theme) => ({
  root: {
    padding: theme.spacing(1),
  },
  categories: {
    margin: theme.spacing(0, 0, 2, 1),
  },
  heading: {
    borderBottom: '1px solid gray',
  },
  list: {
    backgroundColor: theme.palette.background.paper,
  },
  centerText: {
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    position: 'fixed',
  },
}));

const ExhibitorsPage = ({ uuid, scheduleName, socialSettings, exhibitors }) => {
  const classes = useStyles();

  if (exhibitors && Object.keys(exhibitors).length !== 0) {
    return (
      <PublicScheduleLayout
        title="Exhibitors"
        scheduleName={scheduleName}
        socialSettings={socialSettings}
        uuid={uuid}
      >
        <Box className={classes.root}>
          {Object.entries(exhibitors).map((values) => {
            const category = values[0];
            const entries = values[1];

            return (
              <Box key={category} className={classes.categories}>
                <Typography variant="h4" className={classes.heading}>
                  {category}
                </Typography>
                <div>
                  {entries?.map((entry) => {
                    if (entry.url !== '') {
                      return (
                        <List key={entry.id} className={classes.list}>
                          <ListItem button>
                            <ListItemText disableTypography>
                              <Typography>
                                <ExternalLink
                                  href={entry.url}
                                  style={{
                                    display: 'flex',
                                    alignItems: 'center',
                                    textDecoration: 'none',
                                    color: 'black',
                                  }}
                                >
                                  {entry.name}{' '}
                                  <LinkIcon style={{ marginLeft: '8px' }} />
                                </ExternalLink>
                              </Typography>
                            </ListItemText>
                          </ListItem>
                        </List>
                      );
                    }

                    return (
                      <List key={entry.id} className={classes.list}>
                        <ListItem>
                          <ListItemText primary={entry.name} />
                        </ListItem>
                      </List>
                    );
                  })}
                </div>
              </Box>
            );
          })}
        </Box>
      </PublicScheduleLayout>
    );
  }

  return (
    <PublicScheduleLayout
      title="Exhibitors"
      scheduleName={scheduleName}
      socialSettings={socialSettings}
      uuid={uuid}
    >
      <Box className={classes.root}>
        <Typography variant="h4" className={classes.centerText}>
          No exhibitors currently
        </Typography>
      </Box>
    </PublicScheduleLayout>
  );
};

export default ExhibitorsPage;
