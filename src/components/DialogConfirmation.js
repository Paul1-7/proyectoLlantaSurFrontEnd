import { Button, DialogActions, DialogContent, DialogContentText, DialogTitle } from '@material-ui/core';
import React from 'react';
import ErrorIcon from '@mui/icons-material/Error';
import PropTypes from 'prop-types';
import { DialogAnimate } from './animate';

const DialogConfirmation = ({ isOpen, handleClickOpen, handleDelete, loading, textContent }) => (
  <DialogAnimate open={isOpen} maxWidth="sm" onClose={handleClickOpen}>
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
      <Button onClick={handleClickOpen} color="error" variant="outlined">
        no, quiero cancelar
      </Button>
      <Button
        onClick={handleDelete}
        loading={loading}
        autoFocus
        color="success"
        variant="outlined"
        loadingIndicator="Borrando..."
      >
        si, estoy de acuerdo
      </Button>
    </DialogActions>
  </DialogAnimate>
);

export default DialogConfirmation;

DialogConfirmation.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  handleClickOpen: PropTypes.func.isRequired,
  handleDelete: PropTypes.func.isRequired,
  loading: PropTypes.bool.isRequired,
  textContent: PropTypes.string.isRequired
};
