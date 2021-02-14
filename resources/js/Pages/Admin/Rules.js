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
import FormRuleAdd from './components/forms/FormRuleAdd';
import FormRuleEdit from './components/forms/FormRuleEdit';
import FormRuleDelete from './components/forms/FormRuleDelete';

const useStyles = makeStyles((theme) => ({
  contentRoot: {
    flexGrow: 1,
    padding: theme.spacing(2),
  },
}));

const Rules = ({ scheduleId, rules }) => {
  const classes = useStyles();

  const [drawerStatus, setDrawerStatus] = useState(false);
  const [drawerContent, setDrawerContent] = useState('');

  const handleClose = () => {
    setDrawerStatus(false);
    setDrawerContent('');
  };

  const handleReload = () => {
    Inertia.reload({ only: ['rules'] });
  };

  const handleAdd = () => {
    setDrawerContent(
      <FormRuleAdd
        closeDrawer={handleClose}
        reloadPage={handleReload}
        scheduleId={scheduleId}
      />,
    );
    setDrawerStatus(true);
  };

  const handleEdit = (rule) => {
    setDrawerContent(
      <FormRuleEdit
        closeDrawer={handleClose}
        reloadPage={handleReload}
        scheduleId={scheduleId}
        rule={rule}
      />,
    );
    setDrawerStatus(true);
  };

  const handleDelete = (ruleId, ruleTitle) => {
    setDrawerContent(
      <FormRuleDelete
        closeDrawer={handleClose}
        reloadPage={handleReload}
        scheduleId={scheduleId}
        ruleId={ruleId}
        ruleTitle={ruleTitle}
      />,
    );
    setDrawerStatus(true);
  };

  return (
    <AdminScheduleLayout title="Rules" scheduleId={scheduleId}>
      <Box className={classes.contentRoot}>
        <Box className={classes.title}>
          <Typography component="span" variant="h4">
            Rules
          </Typography>
        </Box>

        <Drawer anchor="right" open={drawerStatus}>
          <Box>{drawerContent}</Box>
        </Drawer>

        <ButtonAdd onClick={handleAdd}>Add Rule</ButtonAdd>

        {rules?.length ? (
          <TableContainer component={Paper}>
            <Table className={classes.table} aria-label="table of rule">
              <TableHead>
                <TableRow>
                  <TableCell>Title</TableCell>
                  <TableCell align="right">Actions</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {rules?.map((rule) => (
                  <TableRow key={rule.id}>
                    <TableCell>{rule.title}</TableCell>
                    <TableCell align="right">
                      <ButtonEdit onClick={() => handleEdit(rule)} />
                      <ButtonDelete
                        onClick={() => handleDelete(rule.id, rule.title)}
                      />
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        ) : (
          <Typography variant="body1">No rules</Typography>
        )}
      </Box>
    </AdminScheduleLayout>
  );
};

export default Rules;
