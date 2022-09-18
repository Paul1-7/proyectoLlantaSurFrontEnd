import { Alert } from '@material-ui/core';
import { SnackbarContent } from 'notistack';
import React, { forwardRef } from 'react';
import PropTypes from 'prop-types';

const SnackBar = forwardRef((props, ref) => {
  const { severity, message } = props;
  return (
    <SnackbarContent ref={ref}>
      <Alert severity={severity} variant="filled">
        {message}
      </Alert>
    </SnackbarContent>
  );
});
export default SnackBar;

SnackBar.propTypes = {
  severity: PropTypes.string.isRequired,
  message: PropTypes.string.isRequired
};
