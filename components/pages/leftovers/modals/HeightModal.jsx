import { Box, Dialog, DialogActions, DialogContent, DialogTitle, Divider, Typography } from "@mui/material";
import PropTypes from 'prop-types';
import React, { useState } from "react";
import PrimaryBtn from '../../../buttons/primaryBtn';
import MyInput from "../../../inputs/myInput";

const HeightModal = (props) => {
    const {open, onClose, onConfirm} = props;
    const [height, setHeight] = useState();

    return (
    <Dialog 
        open={open}
        onClose={onClose}
        className='fullCenter'>
        <DialogTitle color="link.main">
            <Typography variant='md'>Escolha a espessura</Typography>
        </DialogTitle>
        <Divider />
        <DialogContent>
            <Box sx={{ background: 'white', width: 'max-content'}}>
                <MyInput onChange={(e) => setHeight(e.target.value)} type='number' value={height} label='Espessura' />
            </Box>
        </DialogContent>
        <DialogActions>
        <PrimaryBtn onClick={() => onConfirm(height)} autoFocus>
          <Typography>Concordo</Typography>
        </PrimaryBtn>
        <PrimaryBtn onClick={onClose} light  >Cancelar</PrimaryBtn>
      </DialogActions>
    </Dialog>
);
};

HeightModal.propTypes = {
    open: PropTypes.bool,
    onClose: PropTypes.func,
    onConfirm: PropTypes.func,
  };

export default HeightModal;