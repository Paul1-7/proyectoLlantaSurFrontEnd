import { Alert, AlertTitle, Snackbar } from '@mui/material';
import React from 'react';
import PropTypes from 'prop-types';

function Toast({ open, onClose, duration = 3000, textTitle, textContent, severity, ...other }) {
  return (
    <Snackbar open={open} autoHideDuration={duration} onClose={onClose} {...other}>
      <Alert variant="outlined" severity={severity}>
        <AlertTitle>{textTitle}</AlertTitle>
        {textContent}
      </Alert>
    </Snackbar>
  );
}

export default Toast;

Toast.propTypes = {
  open: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  duration: PropTypes.number,
  textTitle: PropTypes.string.isRequired,
  textContent: PropTypes.string.isRequired,
  severity: PropTypes.string.isRequired,
};
