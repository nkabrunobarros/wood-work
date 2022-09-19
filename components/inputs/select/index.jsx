/* eslint-disable react/prop-types */
// Node modules
import { FormControl, InputLabel, MenuItem, Select } from '@mui/material';
import React from 'react';

const Select2 = ({
  disabled,
  value,
  label,
  onChange,
  options,
  optionLabel,
  optionValue,
  fullWidth,
  variant,
  required,
  width,
  halfWidth,
  error
}) => {

  return (
    <React.Fragment>
      {variant !== 'standard' && (
        <InputLabel htmlFor={label}>
          {label}
          {required && <span style={{ color: 'var(--red)' }}> *</span>}
        </InputLabel>
      )}
      <FormControl fullWidth>
        {!!error && <InputLabel error={!!error} id="demo-simple-select-label">{error}</InputLabel>}
        <Select
          error={!!error}
          label={error}
          required={required}
          select

          disabled={disabled}
          id={label}
          fullWidth={fullWidth || false}
          value={value}
          onChange={onChange}
          sx={{ width: width && width }}
          style={{ width: halfWidth && '50%' }}
        >
          <MenuItem value=" " disabled>
            Escolha uma opcao
          </MenuItem>
          {options
            .map((opt, i) => (
              <MenuItem key={i} value={opt[optionValue] || opt.id}>
                {opt[optionLabel]}
              </MenuItem>
            ))}
        </Select>
      </FormControl>
    </React.Fragment>
  );
};

export default Select2;
