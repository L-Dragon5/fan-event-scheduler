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
    if (Array.isArray(errors) && errors.length >= 1) {
      enqueueSnackbar(errors.join('\n'), {
        variant: 'error',
      });
    }
  }, [errors]);

  return <></>;
};

export default SnackbarMessages;
