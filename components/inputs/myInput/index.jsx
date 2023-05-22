/* eslint-disable react/prop-types */
import {
  Box,
  FormControl,
  FormHelperText,
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
  maxLength,
  rows
}) => {
  const handleInputChange = (event) => {
    const inputValue = event.target.value;

    // If the type is "number" and the input value is less than 0, set it to 0
    if (type === 'number') {
      inputValue >= 0 && onChange && onChange(event, inputValue);
    } else { onChange && onChange(event, inputValue); }
  };

  return <Box sx={{ width: '100%' }}>
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
        variant={variant || 'outlined' }
        name={name}
        type={type}
        multiline={type === 'area'}
        id={id}
        error={error}
        value={value}
        onChange={handleInputChange}
        required
        label={error || variant ? label : ''}
        fullWidth={fullWidth}
        inputProps={{
          maxLength: maxLength || type === 'area' ? 2000 : 255,
        }}
        sx={{
          width: width || (halfWidth && '50%'),
        }}
        rows={rows || 4}
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
      {(maxLength || type === 'area') && <Tooltip title='Tamanho máximo'>
        <FormHelperText sx={{ display: 'flex', justifyContent: 'end' }} >
          {value?.length} / {maxLength || 2000} caracteres
        </FormHelperText>
      </Tooltip>
      }
    </FormControl>
  </Box>;
};

export default MyInput;
