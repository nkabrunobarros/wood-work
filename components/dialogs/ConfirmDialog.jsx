/* eslint-disable react/prop-types */
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from '@mui/material';
import React from 'react';
import PropTypes from 'prop-types';

const ConfirmDialog = ({ open, handleClose, onConfirm, message, title }) => {
  return (
    <Dialog
      open={open}
      onClose={handleClose}
      aria-labelledby='alert-dialog-title'
      aria-describedby='alert-dialog-description'
    >
      <DialogTitle id='alert-dialog-title'>
        {title ? `${title}` : 'Confirmar a Ação'}
      </DialogTitle>
      <DialogContent>
        <DialogContentText id='alert-dialog-description'>
          {message
            ? `${message}`
            : 'A ação que está a fazer é irreversivel, tem certeza que quer continuar?'}
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose}>Cancelar</Button>
        <Button onClick={onConfirm} autoFocus>
          Concordo
        </Button>
      </DialogActions>
    </Dialog>
  );
};
ConfirmDialog.PropTypes = {
  open: PropTypes.boolean,
  handleClose: PropTypes.any,
};
export default ConfirmDialog;
