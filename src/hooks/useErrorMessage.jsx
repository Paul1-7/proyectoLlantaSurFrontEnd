import { useSnackbar } from 'notistack';
import { useEffect } from 'react';
import { SnackBar } from '~/components';
import { ERRORS } from '~/constants/handleError';

const useErrorMessage = ({ errors = [], setErrors = [] }) => {
  const severity = 'error';
  const { enqueueSnackbar } = useSnackbar();

  useEffect(() => {
    errors.some((error, index) => {
      const isErrorFetch = error?.status === 'FETCH_ERROR';
      let msg = error?.message;

      if (!msg && isErrorFetch) msg = ERRORS.FETCH_ERROR;

      if (msg)
        enqueueSnackbar(msg, {
          anchorOrigin: { horizontal: 'right', vertical: 'bottom' },
          autoHideDuration: 5000,
          content: (key, message) => <SnackBar id={key} message={message} severity={severity} />,
        });

      if (setErrors.length) setErrors?.[index]('');
      return isErrorFetch;
    });
  }, errors);
};

export default useErrorMessage;
