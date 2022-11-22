/* eslint-disable react/prop-types */
// Node modules
import { Box, FormControl, InputLabel, MenuItem, Select, Tooltip } from '@mui/material';
import React from 'react';

const MySelect = ({
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
  error,
  name,
  id,
  tooltip,
}) => {

  return (
    <Box sx={{ width: '100%'}}>
      {variant !== 'standard' && label ? (
        <Tooltip title={tooltip || ''} >
          <InputLabel htmlFor={label}>
            {label}
            {required &&
              <Tooltip title='Obrigatório' >
                <span style={{ color: 'var(--red)' }}> *</span>
              </Tooltip>}
          </InputLabel>
        </Tooltip>
      ) : null}
      <FormControl fullWidth>
        {!!error && <InputLabel error={!!error} id={id}>{error}</InputLabel>}
        <Select
          error={!!error}
          label={error}
          required={required}
          select
          name={name}
          disabled={disabled}
          id={id}
          fullWidth={fullWidth || false}
          value={value}
          onChange={onChange}
          sx={{ width: width && width }}
          style={{ width: halfWidth && '50%' }}
        >
          <MenuItem value="" disabled>
            Escolha uma opcao
          </MenuItem>
          {options && options
            .map((opt, i) => (
                <MenuItem disabled={opt.subheader} key={i} value={opt[optionValue]?.value ?  opt[optionValue].value : opt[optionValue] || opt.id}>
                <Box sx={{ '& > img': { mr: 2, flexShrink: 0 } }} >
                  {!!opt.codigo &&
                    <img
                    loading='lazy'
                      width='20'
                      src={`https://flagcdn.com/w20/${opt.codigo.toLowerCase()}.png`}
                      srcSet={`https://flagcdn.com/w40/${opt.codigo.toLowerCase()}.png 2x`}
                      alt=''
                    />}
                  {opt[optionLabel]?.value ? opt[optionLabel].value : opt[optionLabel]  || opt.label || 'Empty'}
                </Box>
              </MenuItem>  
             
            ))}
        </Select>
      </FormControl>
    </Box>
  );
};

export default MySelect;
