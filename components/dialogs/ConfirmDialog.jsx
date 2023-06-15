import { QuestionMark } from '@mui/icons-material';
import { Box, Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Divider, Typography } from '@mui/material';
import PropTypes from 'prop-types';
import React from 'react';

const ConfirmDialog = ({ open, handleClose, onConfirm, message, title, iconType, confirmText, cancelText, inputs }) => {
  const colors = {
    error: 'error.main',
    success: 'success.main',
    default: 'primary.main',
  };

  const iconColor = colors[iconType || 'default'];

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      aria-labelledby='alert-dialog-title'
      aria-describedby='alert-dialog-description'
    >
      <DialogTitle id='alert-dialog-title'>
        <Typography variant='h6' color='primary'>
          {title || 'Confirmar Ação'}
        </Typography>
      </DialogTitle>
      <Divider />
      <DialogContent>
        <Box mb={1} sx={{ display: 'flex', justifyContent: 'center' }} color={iconColor} >
          <QuestionMark sx={{ fontSize: '80px' }} fontSize={'80px'} strokeWidth={1.5} />
        </Box>
        <DialogContentText id='alert-dialog-description' variant='body1'>
          {message || 'A ação que está a fazer é irreversível. Tem certeza que quer continuar?'}
        </DialogContentText>
        {inputs}
      </DialogContent>
      <DialogActions>
        <Button onClick={onConfirm} autoFocus>
          <Typography color='primary'>{confirmText || 'Confirmar'}</Typography>
        </Button>
        <Button onClick={handleClose}>
          <Typography color='textSecondary'>{cancelText || 'Cancelar'}</Typography>
        </Button>
      </DialogActions>
    </Dialog>
  );
};

ConfirmDialog.propTypes = {
  open: PropTypes.any,
  handleClose: PropTypes.any,
  onConfirm: PropTypes.any,
  message: PropTypes.any,
  title: PropTypes.any,
  icon: PropTypes.any,
  iconType: PropTypes.any,
  confirmText: PropTypes.any,
  cancelText: PropTypes.any,
  inputs: PropTypes.any,
};

export default ConfirmDialog;
