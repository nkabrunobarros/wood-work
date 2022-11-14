/* eslint-disable react/prop-types */
// Node modules
import { Box, FormControl, InputAdornment, InputLabel, MenuItem, OutlinedInput, Select, Tooltip } from '@mui/material';
import PropTypes from 'prop-types';
import React from 'react';
import { NumericFormat } from 'react-number-format';

const PhoneInput = ({
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
  name,
  id,
  style,
  placeholder,
  options,
}) => {


  const NumberFormatCustom = React.forwardRef(function NumberFormatCustom(props, ref) {
    const { ...other } = props;

    return <NumericFormat
      {...other}
      getInputRef={ref}
      // style={{ textAlign: 'start' }}
      value={value}
      onChange={onChange}
      suffix={process.env.NEXT_PUBLIC_COUNTRY_SUFFIX}
      decimalScale={process.env.NEXT_PUBLIC_DECIMALS_SCALE}
      decimalSeparator={process.env.NEXT_PUBLIC_DECIMALS_SEPARATOR}
      thousandSeparator={process.env.NEXT_PUBLIC_THOUSANDS_SEPARATOR}
    />;

  });

  NumberFormatCustom.propTypes = {
    name: PropTypes.string.isRequired,
    onChange: PropTypes.func.isRequired,
  };

  return (
    <Box sx={{ width: '100%'}}>
      {variant !== 'standard' && (
        <InputLabel htmlFor={label}>
          {label}
          {required &&
            <Tooltip title='Obrigatório' >
              <span style={{ color: 'var(--red)' }}> *</span>
            </Tooltip>
          }
        </InputLabel>
      )}
      <FormControl fullWidth disabled={disabled}>
        {!!error && <InputLabel error={!!error} id="demo-simple-select-label">{error}</InputLabel>}
        <OutlinedInput
          sx={{ paddingLeft: '0px', width: width || halfWidth && '50%' }}
          placeholder={placeholder}
          disabled={disabled}
          id={id}
          variant={variant || 'outlined'}
          error={error}
          label={error}
          value={value}
          fullWidth={fullWidth}
          onChange={onChange}
          style={style}
          type='number'
          name={name}
          inputProps={{
            inputComponent: NumberFormatCustom,
            maxlength: 9,
          }}
          helperText={`${value?.length}/20`}
          startAdornment={
            <InputAdornment position={"start"}>
              <Select aria-selected='PT' value='PT' onChange={() => console.log('')}>
                {options
                  .map((opt, i) => (
                    <MenuItem key={i} value={opt.codigo}>
                      <Box
                        sx={{ '& > img': { mr: 2, flexShrink: 0 } }}
                      >
                        {!!opt.codigo &&
                          <img
                            loading='lazy'
                            width='20'
                            src={`https://flagcdn.com/w20/${opt.codigo.toLowerCase()}.png`}
                            srcSet={`https://flagcdn.com/w40/${opt.codigo.toLowerCase()}.png 2x`}
                            alt=''
                          />}
                        +351
                      </Box>
                    </MenuItem>
                  ))}
              </Select>
            </InputAdornment>
          }
        >

        </OutlinedInput>


      </FormControl>

    </Box>
  );
};

export default PhoneInput;
