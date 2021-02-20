import React, { useEffect, useState } from 'react';

import {
  Box,
  Typography,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

import PublicScheduleLayout from '../PublicScheduleLayout';

const useStyles = makeStyles((theme) => ({
  root: {
    padding: theme.spacing(2),
  },
  centerText: {
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    position: 'fixed',
  },
  image: {
    display: 'block',
    margin: '0 auto',
    maxWidth: '100%',
    paddingTop: theme.spacing(4),
  },
}));

const MapsPage = ({ uuid, scheduleName, socialSettings, maps }) => {
  const classes = useStyles();

  const [selectedMap, setSelectedMap] = useState('');
  const [cMap, setMap] = useState(null);

  const handleMapSelect = (e) => {
    setSelectedMap(e.target.value);
  };

  useEffect(() => {
    setMap(maps.find((map) => map.id === selectedMap));
  }, [selectedMap]);

  if (maps && Object.keys(maps).length !== 0) {
    return (
      <PublicScheduleLayout
        title="Maps"
        scheduleName={scheduleName}
        socialSettings={socialSettings}
        uuid={uuid}
      >
        <Box className={classes.root}>
          <FormControl fullWidth variant="outlined">
            <InputLabel id="map-selection-label">Map</InputLabel>
            <Select
              labelId="map-selection-label"
              value={selectedMap}
              onChange={handleMapSelect}
            >
              {maps?.map((map) => (
                <MenuItem key={map.name} value={map.id}>
                  {map.name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>

          {cMap && (
            <Box>
              <img
                className={classes.image}
                alt={cMap.name}
                src={`/storage/${cMap.image}`}
              />
            </Box>
          )}
        </Box>
      </PublicScheduleLayout>
    );
  }

  return (
    <PublicScheduleLayout
      title="Maps"
      scheduleName={scheduleName}
      socialSettings={socialSettings}
      uuid={uuid}
    >
      <Typography variant="h4" className={classes.centerText}>
        No maps currently
      </Typography>
    </PublicScheduleLayout>
  );
};

export default MapsPage;
