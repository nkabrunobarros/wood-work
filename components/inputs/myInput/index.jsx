/* eslint-disable react/prop-types */
// Node modules
import { Box, FormControl, IconButton, InputAdornment, InputLabel, OutlinedInput, Tooltip } from '@mui/material';
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
  name,
  id,
  tooltip,
}) => {
  return (<Box sx={{ width: '100%' }}>
    {variant !== 'standard' && (
      <Tooltip title={tooltip || ''} >

        <InputLabel htmlFor={'ID-' + label} id={'ID-' + label} >
          {label}
          {required &&
          <Tooltip title='Obrigatório' >
            <span style={{ color: 'var(--red)' }}> *</span>
          </Tooltip>}
        </InputLabel>
      </Tooltip>

    )}
    <FormControl fullWidth disabled={disabled}>
      {!!error && <InputLabel error={!!error} id={'ID-' + label}>{error}</InputLabel>}
      <OutlinedInput
        aria-labelledby={'ID-' + label}
        variant={variant}
        name={name}
        type={type || 'string'}
        multiline={type === 'area'}
        id={id || 'ID-' + label}
        error={error}
        value={value}
        onChange={onChange}
        required
        label={error}
        fullWidth={fullWidth}
        InputProps={{ inputProps: { min: 0, max: 10 } }}

        sx={{
          // eslint-disable-next-line no-mixed-operators
          width: width || halfWidth && '50%',
        }}
        rows={4}
        style={style}
        placeholder={placeholder || ''}
        endAdornment={!!adornmentIcon &&
          <InputAdornment position={adornmentPos || 'end'}>
            <Tooltip title={iconTooltip || ''}>
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
  </Box>);
};

export default MyInput;
