import { useSnackbar } from 'notistack';
import { useEffect } from 'react';
import { SnackBar } from '~/components';
import { ERRORS } from '~/constants/handleError';

const useSnackBarMessage = ({ errors = [], setErrors = [], successes = [], setSuccesss = [] }) => {
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
          autoHideDuration: 4000,
          variant: severity,
        });

      if (setErrors.length) setErrors?.[index]('');
      return isErrorFetch;
    });
  }, errors);

  useEffect(() => {
    successes.some((success, index) => {
      const msg = success?.message;

      if (msg)
        enqueueSnackbar(msg, {
          anchorOrigin: { horizontal: 'right', vertical: 'bottom' },
          autoHideDuration: 5000,
          content: (key, message) => <SnackBar id={key} message={message} severity="success" />,
        });
      if (setSuccesss.length && msg) setSuccesss?.[index]([]);
      return true;
    });
  }, successes);
};

export default useSnackBarMessage;
