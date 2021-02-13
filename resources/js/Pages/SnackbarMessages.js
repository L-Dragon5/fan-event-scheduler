import React, { useEffect } from 'react';
import { usePage } from '@inertiajs/inertia-react';
import { useSnackbar } from 'notistack';

const SnackbarMessages = () => {
  const { flash, errors } = usePage()?.props;
  const { enqueueSnackbar } = useSnackbar();

  useEffect(() => {
    if (flash?.message !== undefined && flash?.message?.length >= 1) {
      enqueueSnackbar(flash?.message, {
        variant: 'success',
      });
    }
  }, [flash]);

  useEffect(() => {
    let errorMsg = '';
    if (Array.isArray(errors) && errors.length >= 1) {
      errorMsg = errors.join('\n');
    }

    if (typeof errors === 'object') {
      errorMsg = Object.values(errors).join('\n');
    }

    if (errorMsg !== '') {
      enqueueSnackbar(errorMsg, {
        variant: 'error',
      });
    }
  }, [errors]);

  return <></>;
};

export default SnackbarMessages;
