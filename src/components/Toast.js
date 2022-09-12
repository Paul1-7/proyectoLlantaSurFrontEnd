import { Alert, AlertTitle, Snackbar } from '@material-ui/core';
import React from 'react';
import PropTypes from 'prop-types';

const Toast = ({ open, onClose, duration = 3000, textTitle, textContent, severity, ...other }) => (
  <Snackbar open={open} autoHideDuration={duration} onClose={onClose} {...other}>
    <Alert
      variant="outlined"
      severity={severity}
      // sx={{ position: 'absolute', bottom: 0, right: 0, zIndex: 9999, padding: '0 16px' }}
    >
      <AlertTitle>{textTitle}</AlertTitle>
      {textContent}
    </Alert>
  </Snackbar>
);

export default Toast;

Toast.propTypes = {
  open: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  duration: PropTypes.number,
  textTitle: PropTypes.string.isRequired,
  textContent: PropTypes.string.isRequired,
  severity: PropTypes.string.isRequired
};
