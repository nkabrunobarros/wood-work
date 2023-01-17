import { AppBar, Box, Dialog, Grid, IconButton, Toolbar } from '@mui/material';
import { X } from 'lucide-react';
import Image from 'next/image';
import React from 'react';
import companyLogo from '../../../../public/Logotipo_Vetorizado.png';
import woodWorkyLogo from '../../../../public/logo_bw_ww40_inv-big.png';
import QrReaderComp from '../../../qrReader/qrReader';

const FinishProjectModal = (props) => {
  // eslint-disable-next-line react/prop-types
  const { open, handleClose, onConfirm } = props;
  const detailOnly = true;

  return <Dialog
    fullScreen
    open={open}
    onClose={() => handleClose()}
    sx={{ display: !open && 'none' }}
  >

    <AppBar position='sticky' component="nav" sx={{ backgroundColor: localStorage.getItem('theme') === 'light' && 'var(--primary-dark)' }}>
      <Toolbar>
        <Grid container>
          <Grid container md={6} sm={6} xs={6} p={1} >
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
              <IconButton
                edge="start"
                color="inherit"
                onClick={() => handleClose()}
                aria-label="close"
              >
                <X />
              </IconButton>
              <Box p={detailOnly && 1}>
                <Image
                  src={companyLogo}
                  alt={'companyLogo'}
                  placeholder='blur'
                  height={!detailOnly ? 50 : 40}
                  width={!detailOnly ? 50 : 40}
                  loading='lazy'
                />
              </Box>
            </Box>
          </Grid>
          <Grid container md={6} sm={6} xs={6} p={1} justifyContent='end'>
            <Box className='fullCenter'>
              <Box p={detailOnly && 1}>
                <Image
                  src={woodWorkyLogo}
                  alt={'woodWork Logo'}
                  placeholder='blur'
                  height={!detailOnly ? 50 : 40}
                  width={!detailOnly ? 50 : 40}
                  loading='lazy'
                />
              </Box>
            </Box>
          </Grid>
        </Grid>
      </Toolbar>
    </AppBar>
    <Box justifyContent={'center'} sx={{ width: '100%', height: '50%', border: '10px solid black' }}>
      <Box justifyContent={'center'} sx={{ width: '50%', height: '50%', border: '1px solid red' }}>
        <QrReaderComp onScanned={onConfirm} />
      </Box>
    </Box>
  </Dialog>;
};

export default FinishProjectModal;
