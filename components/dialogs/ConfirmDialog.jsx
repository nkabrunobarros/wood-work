/* eslint-disable react/prop-types */
import { QuestionMark } from '@mui/icons-material';
import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Divider,
  Typography
} from '@mui/material';
import PropTypes from 'prop-types';
import React from 'react';

const ConfirmDialog = ({ open, handleClose, onConfirm, message, title, icon, iconType, okTxt, cancelTxt }) => {
  // const Icon = icons[icon || 'XCircle'];
  const style = {};

  switch (iconType) {
    case icon:
      style.color = 'var(--red)';

      break;

    case 'success':
      style.color = 'var(--green)';

      break;

    default:
      style.color = 'var(--primary)';

      break;
  }

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      aria-labelledby='alert-dialog-title'
      aria-describedby='alert-dialog-description'
    >
      <DialogTitle color="link.main" id='alert-dialog-title' >
        {title ? `${title}` : 'Confirmar a Ação'}
      </DialogTitle>
      <Divider />
      <DialogContent>
        <Box mb={1} sx={{ display: 'flex', justifyContent: 'center' }}>
          <QuestionMark  sx={{ fontSize: '80px'}} fontSize={'80px'} strokeWidth={1} style={style} />
        </Box>

        <DialogContentText id='alert-dialog-description'>
          {message
            ? `${message}`
            : 'A ação que está a fazer é irreversivel, tem certeza que quer continuar?'}
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={onConfirm} autoFocus>
          <Typography color="link.main">{okTxt || 'Confirmar'}</Typography>
        </Button>
        <Button onClick={handleClose} sx={{ color: 'var(--gray)' }}>{cancelTxt || 'Cancelar'}</Button>
      </DialogActions>
    </Dialog>
  );
};

ConfirmDialog.propTypes = {
  open: PropTypes.any,
  handleClose: PropTypes.any,
};

export default ConfirmDialog;
