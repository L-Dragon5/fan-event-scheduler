import React, { useState } from 'react';

import { Snackbar } from '@material-ui/core';
import { Alert } from '@material-ui/lab';

const AlertMessage = (props) => {
  const { type, content } = props;
  const [snackbarStatus, setSnackbarStatus] = useState(true);

  const snackbarClose = () => {
    setSnackbarStatus(false);
  };

  return (
    <Snackbar
      anchorOrigin={{ vertical: 'top', horizontal: 'left' }}
      open={snackbarStatus}
      onClose={snackbarClose}
      autoHideDuration={2000}
    >
      <Alert severity={type} style={{ whiteSpace: 'pre' }}>
        {content}
      </Alert>
    </Snackbar>
  );
};

export default AlertMessage;
