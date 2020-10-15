import React from 'react';

import { Box, Paper, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  error: {
    backgroundColor: '#ffcdd2',
    width: '100%',
    padding: theme.spacing(2),
    marginTop: theme.spacing(1),
  },
}));

const ErrorBox = (props) => {
  const classes = useStyles();
  const { content } = props;

  return (
    <Box>
      <Paper elevation={1} className={classes.error}>
        <Typography variant="body2">{content}</Typography>
      </Paper>
    </Box>
  );
};

export default ErrorBox;
