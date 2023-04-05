/* eslint-disable react/prop-types */
import { IconButton, Menu, MenuItem, Tooltip } from '@mui/material';
import { MinusCircle, Play } from 'lucide-react';
import React, { useState } from 'react';
//  Proptypes
import PropTypes from 'prop-types';

export const StartBtn = (props) => {
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    props.onStart(props);
    setAnchorEl(null);
  };

  return !props.detailOnly
    ? (
      <>
        <IconButton onClick={(e) => !props.msg && props.machines[0] && handleClick(e)} >
          <Tooltip title={!props.machines[0] ? 'Não há maquinas disponiveis' : (props.msg || 'Iniciar')} >
            <Play />
          </Tooltip>
        </IconButton>
        <Menu
          id="demo-positioned-menu"
          aria-labelledby="demo-positioned-button"
          anchorEl={anchorEl}
          open={open}
          onClose={() => setAnchorEl(null)}
          anchorOrigin={{
            vertical: 'top',
            horizontal: 'left',
          }}
          transformOrigin={{
            vertical: 'top',
            horizontal: 'left',
          }}
        >
          {props.machines.map((mach, i) => <MenuItem key={i} onClick={handleClose}>{mach.id}</MenuItem>)}
        </Menu>
      </>
      // <IconButton onClick={() => !props.msg && props.onStart(props)} >
      //   <Tooltip title={props.msg || 'Iniciar'} >
      //     <Play />
      //   </Tooltip>
      // </IconButton>
    )
    : <Tooltip title='Ainda não iniciou'>
      <MinusCircle color='gray' />
    </Tooltip>;
};

StartBtn.propTypes = {
  msg: PropTypes.string,
  detailOnly: PropTypes.bool,
  onStart: PropTypes.func.isRequired,
};
