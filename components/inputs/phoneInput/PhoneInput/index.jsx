/* eslint-disable react/prop-types */
// Node modules
import { Box, FormControl, InputAdornment, InputLabel, MenuItem, OutlinedInput, Select, Tooltip } from '@mui/material';
import axios from 'axios';
import PropTypes from 'prop-types';
import React, { useEffect, useState } from 'react';
import { NumericFormat } from 'react-number-format';

export const NumberFormatCustom = React.forwardRef(function NumberFormatCustom(props, ref) {
  const { ...other } = props;

  return <NumericFormat
    {...other}
    getInputRef={ref}
    // style={{ textAlign: 'start' }}
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
  tooltip,
}) => {

  const [countries, setCountries] = useState();
  const [selected, setSelected] = useState('PT');

  useEffect(() => {
    const test = async () => {
      await axios.get('https://restcountries.com/v3.1/all').then((res) => setCountries(res.data));
    };

  test();
  },[]);


  return countries && (
    <Box sx={{ width: '100%'}}>
      {variant !== 'standard' && (
        <Tooltip title={tooltip || ''} >
          <InputLabel htmlFor={label}>
            {label}
            {required &&
              <Tooltip title='Obrigatório' >
                <span style={{ color: 'var(--red)' }}> *</span>
              </Tooltip>
            }
          </InputLabel>
        </Tooltip>
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
          }}
          helperText={`${value?.length}/20`}
          startAdornment={
            <InputAdornment position={"start"}>
              <Select aria-selected={selected} value={selected} onChange={(e) => setSelected(e.target.value)}>
                {countries
                  .map((opt, i) => (
                    <MenuItem key={i} value={opt.cca2}>
                      <Box
                        sx={{ '& > img': { mr: 2, flexShrink: 0 } }}
                      >
                        {!!opt.cca2 &&
                          <img
                            loading='lazy'
                            width='20'
                            src={`https://flagcdn.com/w20/${opt.cca2.toLowerCase()}.png`}
                            srcSet={`https://flagcdn.com/w40/${opt.cca2.toLowerCase()}.png 2x`}
                            alt=''
                          />}
                         {opt.idd.root}{opt.idd.suffixes}
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
