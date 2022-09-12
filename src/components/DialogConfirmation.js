import { Button, DialogActions, DialogContent, DialogContentText, DialogTitle } from '@material-ui/core';
import React from 'react';
import ErrorIcon from '@mui/icons-material/Error';
import PropTypes from 'prop-types';
import { LoadingButton } from '@material-ui/lab';
import { DialogAnimate } from './animate';

const DialogConfirmation = ({ open, handleClickClose, setResponse, loading, textContent }) => (
  <DialogAnimate open={open} maxWidth="sm" onClose={handleClickClose}>
    <DialogTitle sx={{ textAlign: 'center' }}>Ventana de confimación</DialogTitle>
    <DialogContent sx={{ display: 'flex', alignItems: 'center' }}>
      <DialogContentText
        id="alert-dialog-description"
        sx={{
          padding: '16px',
          flexDirection: 'column',
          alignItems: 'center',
          display: 'flex',
          justifyContent: 'center'
        }}
      >
        <ErrorIcon color="warning" sx={{ width: '60px', height: '60px' }} />
        {textContent}
      </DialogContentText>
    </DialogContent>
    <DialogActions sx={{ display: 'flex', justifyContent: 'center', gap: '16px' }}>
      <Button onClick={handleClickClose} color="error" variant="outlined">
        no, quiero cancelar
      </Button>
      <LoadingButton
        onClick={() => setResponse(true)}
        loading={loading}
        autoFocus
        color="success"
        variant="outlined"
        loadingIndicator="Borrando..."
      >
        si, estoy de acuerdo
      </LoadingButton>
    </DialogActions>
  </DialogAnimate>
);

export default DialogConfirmation;

DialogConfirmation.propTypes = {
  open: PropTypes.bool.isRequired,
  handleClickClose: PropTypes.func.isRequired,
  setResponse: PropTypes.func.isRequired,
  loading: PropTypes.bool.isRequired,
  textContent: PropTypes.string.isRequired
};
