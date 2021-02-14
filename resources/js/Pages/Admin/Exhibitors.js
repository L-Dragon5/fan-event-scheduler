import React, { useState } from 'react';
import { Inertia } from '@inertiajs/inertia';

import {
  Box,
  Drawer,
  Paper,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

import AdminScheduleLayout from './AdminScheduleLayout';
import ButtonAdd from './components/buttons/ButtonAdd';
import ButtonEdit from './components/buttons/ButtonEdit';
import ButtonDelete from './components/buttons/ButtonDelete';

const useStyles = makeStyles((theme) => ({
  contentRoot: {
    flexGrow: 1,
    padding: theme.spacing(2),
  },
}));

const Exhibitors = ({ scheduleId, exhibitors }) => {
  const classes = useStyles();

  const [drawerStatus, setDrawerStatus] = useState(false);
  const [drawerContent, setDrawerContent] = useState('');

  const handleClose = () => {
    setDrawerStatus(false);
    setDrawerContent('');
  };

  const handleReload = () => {
    Inertia.reload({ only: ['exhibitors'] });
  };

  const handleAdd = () => {
    /*
    setDrawerContent(
      <FormGuestAdd
        closeDrawer={handleClose}
        reloadPage={handleReload}
        scheduleId={scheduleId}
      />,
    );
    */
    setDrawerStatus(true);
  };

  const handleEdit = (exhibitor) => {
    /*
    setDrawerContent(
      <FormGuestEdit
        closeDrawer={handleClose}
        reloadPage={handleReload}
        scheduleId={scheduleId}
        guest={guest}
      />,
    );
    */
    setDrawerStatus(true);
  };

  const handleDelete = (exhibitorId, exhibitorName) => {
    /*
    setDrawerContent(
      <FormGuestDelete
        closeDrawer={handleClose}
        reloadPage={handleReload}
        scheduleId={scheduleId}
        guestId={guestId}
        guestName={guestName}
      />,
    );
    */
    setDrawerStatus(true);
  };

  return (
    <AdminScheduleLayout title="Exhibitors" scheduleId={scheduleId}>
      <Box className={classes.contentRoot}>
        <Box className={classes.title}>
          <Typography component="span" variant="h4">
            Exhibitors
          </Typography>
        </Box>

        <Drawer anchor="right" open={drawerStatus}>
          <Box>{drawerContent}</Box>
        </Drawer>

        <ButtonAdd onClick={handleAdd}>Add Exhibitor</ButtonAdd>

        {exhibitors?.length ? (
          <TableContainer component={Paper}>
            <Table className={classes.table} aria-label="table of exhibitor">
              <TableHead>
                <TableRow>
                  <TableCell>Name</TableCell>
                  <TableCell>Category</TableCell>
                  <TableCell align="right">Actions</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {exhibitors?.map((exhibitor) => (
                  <TableRow key={exhibitor.id}>
                    <TableCell>{exhibitor.name}</TableCell>
                    <TableCell>{exhibitor.category}</TableCell>
                    <TableCell align="right">
                      <ButtonEdit onClick={() => handleEdit(exhibitor)} />
                      <ButtonDelete
                        onClick={() =>
                          handleDelete(exhibitor.id, exhibitor.name)
                        }
                      />
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        ) : (
          <Typography variant="body1">No exhibitors</Typography>
        )}
      </Box>
    </AdminScheduleLayout>
  );
};

export default Exhibitors;
