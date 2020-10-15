import React, { useState, useEffect } from 'react';

import { Snackbar } from '@material-ui/core';
import { Alert } from '@material-ui/lab';

const AlertMessage = (props) => {
  const { type, content } = props;
  const [snackbarStatus, setSnackbarStatus] = useState(true);
  const [message, setMessage] = useState(null);

  const snackbarClose = () => {
    setSnackbarStatus(false);
    setMessage(null);
  };

  useEffect(() => {
    setMessage(content);
  }, [content]);

  return (
    <Snackbar
      anchorOrigin={{ vertical: 'top', horizontal: 'left' }}
      open={snackbarStatus}
      onClose={snackbarClose}
      autoHideDuration={2000}
    >
      <Alert severity={type} style={{ whiteSpace: 'pre' }}>
        {message}
      </Alert>
    </Snackbar>
  );
};

export default AlertMessage;
