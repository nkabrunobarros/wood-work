/* eslint-disable react/prop-types */
import {
  Box,
  FormControl,
  IconButton,
  InputAdornment,
  InputLabel,
  OutlinedInput,
  Tooltip
} from '@mui/material';
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
  type = 'string',
  placeholder,
  adornmentIcon,
  adornmentOnClick,
  adornmentPos = 'end',
  style,
  iconTooltip,
  name,
  id = `ID-${label}`,
  tooltip,
}) => (
  <Box sx={{ width: '100%' }}>
    {variant !== 'standard' && (
      <Tooltip title={tooltip || ''}>
        <InputLabel htmlFor={id} id={id}>
          {label}
          {required
            ? (
              <Tooltip title='Obrigatório'>
                <span style={{ color: 'var(--red)' }}> *</span>
              </Tooltip>
            )
            : null}
        </InputLabel>
      </Tooltip>
    )}
    <FormControl fullWidth disabled={disabled}>
      {!!error && <InputLabel error={!!error} id={id}>{error}</InputLabel>}
      <OutlinedInput
        aria-labelledby={id}
        variant={variant}
        name={name}
        type={type}
        multiline={type === 'area'}
        id={id}
        error={error}
        value={value}
        onChange={onChange}
        required
        label={error}
        fullWidth={fullWidth}
        InputProps={{ inputProps: { min: 0, max: 10 } }}
        sx={{
          width: width || (halfWidth && '50%'),
        }}
        rows={4}
        style={style}
        placeholder={placeholder || ''}
        endAdornment={adornmentIcon && (
          <InputAdornment position={adornmentPos}>
            {iconTooltip
              ? (
                <Tooltip title={iconTooltip}>
                  <IconButton
                    component='label'
                    aria-label='toggle password visibility'
                    onClick={adornmentOnClick}
                    edge='end'
                  >
                    {adornmentIcon}
                  </IconButton>
                </Tooltip>
              )
              : (
                <IconButton
                  component='label'
                  aria-label='toggle password visibility'
                  onClick={adornmentOnClick}
                  edge='end'
                >
                  {adornmentIcon}
                </IconButton>
              )}
          </InputAdornment>
        )}
      />
    </FormControl>
  </Box>
);

export default MyInput;
