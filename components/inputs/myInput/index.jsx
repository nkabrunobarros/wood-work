/* eslint-disable react/prop-types */
// Node modules
import { FormControl, IconButton, InputAdornment, InputLabel, OutlinedInput, Tooltip } from '@mui/material';
import React from 'react';

const MyInput = ({
  disabled,
  value,
  label,
  onChange,
  fullWidth,
  variant,
  required,
  width,
  halfWidth,
  error,
  type,
  placeholder,
  adornmentIcon,
  adornmentOnClick,
  adornmentPos,
  style,
  iconTooltip,
  helperText
}) => {

  return (<>
    {variant !== 'standard' && (
      <InputLabel htmlFor={label}>
        {label}
        {required &&
          <Tooltip title='Obrigatório' >
            <span style={{ color: 'var(--red)' }}> *</span>
          </Tooltip>}
      </InputLabel>
    )}
    <FormControl fullWidth disabled={disabled}>
      {!!error && <InputLabel error={!!error} id="demo-simple-select-label">{error}</InputLabel>}
      <OutlinedInput
      
        type={type || 'string'}
        id={label}
        error={error}
        value={value}
        onChange={onChange}
        required
        label={error}
        fullWidth={fullWidth}
        sx={{ width: width || halfWidth && '50%' }}
        style={style}
        placeholder={placeholder || ''}
        endAdornment={!!adornmentIcon &&
          <InputAdornment position={adornmentPos || "end"}>
            <Tooltip title={iconTooltip || '' }>
              <IconButton component='label'
                aria-label="toggle password visibility"
                onClick={adornmentOnClick || null}
                edge="end">

                {adornmentIcon}
              </IconButton>
            </Tooltip>
          </InputAdornment>
        }
      />
    </FormControl>
  </>)

};

export default MyInput;
