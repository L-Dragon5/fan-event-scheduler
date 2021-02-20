import React, { useEffect, useState } from 'react';

import {
  Box,
  Drawer,
  Typography,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

import AdminScheduleLayout from './AdminScheduleLayout';
import ButtonAdd from './components/buttons/ButtonAdd';
import ButtonEdit from './components/buttons/ButtonEdit';
import ButtonDelete from './components/buttons/ButtonDelete';
import FormMapAdd from './components/forms/FormMapAdd';
import FormMapEdit from './components/forms/FormMapEdit';
import FormMapDelete from './components/forms/FormMapDelete';

const useStyles = makeStyles((theme) => ({
  contentRoot: {
    flexGrow: 1,
    padding: theme.spacing(2),
  },
  image: {
    padding: theme.spacing(2),
    maxWidth: '100%',
  },
  actions: {
    display: 'flex',
  },
}));

const Maps = ({ scheduleId, maps }) => {
  const classes = useStyles();

  const [selectedMap, setSelectedMap] = useState('');
  const [cMap, setMap] = useState(null);
  const [drawerStatus, setDrawerStatus] = useState(false);
  const [drawerContent, setDrawerContent] = useState('');

  const handleClose = () => {
    setDrawerStatus(false);
    setDrawerContent('');
  };

  const handleReload = () => {
    window.location.reload();
  };

  const handleMapSelect = (e) => {
    setSelectedMap(e.target.value);
  };

  const handleAdd = () => {
    setDrawerContent(
      <FormMapAdd
        closeDrawer={handleClose}
        reloadPage={handleReload}
        scheduleId={scheduleId}
      />,
    );
    setDrawerStatus(true);
  };

  const handleEdit = (map) => {
    setDrawerContent(
      <FormMapEdit
        closeDrawer={handleClose}
        reloadPage={handleReload}
        scheduleId={scheduleId}
        map={map}
      />,
    );
    setDrawerStatus(true);
  };

  const handleDelete = (map) => {
    setDrawerContent(
      <FormMapDelete
        closeDrawer={handleClose}
        reloadPage={handleReload}
        scheduleId={scheduleId}
        mapId={map.id}
        mapName={map.name}
      />,
    );
    setDrawerStatus(true);
  };

  useEffect(() => {
    setMap(maps.find((map) => map.id === selectedMap));
  }, [selectedMap]);

  return (
    <AdminScheduleLayout title="Maps" scheduleId={scheduleId}>
      <Box className={classes.contentRoot}>
        <Box className={classes.title}>
          <Typography component="span" variant="h4">
            Maps
          </Typography>
        </Box>

        <Drawer anchor="right" open={drawerStatus}>
          <Box>{drawerContent}</Box>
        </Drawer>

        <ButtonAdd onClick={handleAdd}>Add Map</ButtonAdd>

        {maps?.length ? (
          <>
            <FormControl
              fullWidth
              variant="outlined"
              className={classes.formField}
            >
              <InputLabel id="map-selection-label">Map</InputLabel>
              <Select
                labelId="map-selection-label"
                value={selectedMap}
                onChange={handleMapSelect}
              >
                {maps.map((map) => (
                  <MenuItem key={map.name} value={map.id}>
                    {map.name}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>

            {cMap && (
              <Box>
                <Box className={classes.actions}>
                  <ButtonEdit onClick={() => handleEdit(cMap)} />
                  <ButtonDelete onClick={() => handleDelete(cMap)} />
                </Box>

                <img
                  className={classes.image}
                  alt={cMap.name}
                  src={`/storage/${cMap.image}`}
                />
              </Box>
            )}
          </>
        ) : (
          <Typography variant="body1">No maps</Typography>
        )}
      </Box>
    </AdminScheduleLayout>
  );
};

export default Maps;
