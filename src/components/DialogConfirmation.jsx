import { Button, DialogActions, DialogContent, DialogContentText, DialogTitle } from '@mui/material';
import React from 'react';
import ErrorIcon from '@mui/icons-material/Error';
import PropTypes from 'prop-types';
import { LoadingButton } from '@mui/lab';
import { DialogAnimate } from './animate';

function DialogConfirmation({ open, handleClickClose, handleDelete, loading, textContent, id }) {
  return (
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
            justifyContent: 'center',
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
          onClick={() => handleDelete(id)}
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
}

export default DialogConfirmation;

DialogConfirmation.propTypes = {
  open: PropTypes.bool.isRequired,
  handleClickClose: PropTypes.func.isRequired,
  handleDelete: PropTypes.func.isRequired,
  loading: PropTypes.bool.isRequired,
  textContent: PropTypes.string.isRequired,
  id: PropTypes.string.isRequired,
};
