import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Divider,
  Grid, Typography
} from '@mui/material';
import * as icons from 'lucide-react';
import PropTypes from 'prop-types';
import React, { useState } from 'react';
import MyInput from '../inputs/myInput';

const LeftOversDialog = ({ open, handleClose, onConfirm }) => {
  const [manually, setManualy] = useState(false);

  const [sizes, setSizes] = useState(
    { 
      height:0,
      width: 0,
      lenght:0,
     }
  );
 

   function onSizesChange (e) {
    e.preventDefault();

    const data = {...sizes};

    data[e.target.name] = e.target.value;
    setSizes(data);
   }

  return (
    <Dialog
      open={open}
      onClose={handleClose}
    >
      <DialogTitle color="link.main" id='alert-dialog-title' >
      Confirme os dados
      </DialogTitle>
      <Divider />
      <DialogContent>
        <Box mb={1} sx={{ display: 'flex', justifyContent: 'center' }}>
          <icons.Check size={80} strokeWidth={1} color='green' />
        </Box>
        <DialogContentText id='alert-dialog-description'>
          {!manually ? ' Estes dados estão corretos?' : 'Preencha os dados em cm' }
        </DialogContentText>
        <Box mb={1}>
            {!manually ? <Typography variant='md'>Comprimento:  X, Largura:  X, Altura:  X</Typography>:
            <Grid container>
              <Grid container md={4} p={.5}><MyInput onChange={(e) => onSizesChange(e)} type='number' value={sizes.lenght} name="lenght" label="Comprimento" /></Grid>
              <Grid container md={4} p={.5}><MyInput onChange={(e) => onSizesChange(e)} type='number' value={sizes.width}  name="width"  label="Largura"    /></Grid>
              <Grid container md={4} p={.5}><MyInput onChange={(e) => onSizesChange(e)} type='number' value={sizes.height} name="height" label="Altura"    /></Grid>
              <Grid container md={12} p={.5}><Typography variant='md'>Área total:  {sizes.height * sizes.width * sizes.lenght} cm</Typography></Grid>
            </Grid>
            }
        </Box>

      </DialogContent>
      <DialogActions>
        <Button onClick={() => {
          onConfirm(sizes);
          setManualy(false);

          setSizes({ 
            height:0,
            width: 0,
            lenght:0,
           });
        }} autoFocus>
          <Typography color="link.main">Concordo</Typography>
        </Button>
        <Button onClick={() => setManualy(true)} autoFocus sx={{display: manually && 'none'}}>
          <Typography color="link.main">Colocar Manualmente</Typography>
        </Button>
        <Button onClick={handleClose} sx={{ color: 'var(--gray)' }}>Cancelar</Button>
      </DialogActions>
    </Dialog>
  );
};

LeftOversDialog.propTypes = {
  open: PropTypes.bool,
  handleClose: PropTypes.func,
  onConfirm: PropTypes.func,
};

export default LeftOversDialog;
