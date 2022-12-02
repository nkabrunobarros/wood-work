/* eslint-disable react/prop-types */
// Node modules
import { FormControl, IconButton, InputAdornment, InputLabel, TextField, Tooltip } from '@mui/material';
import PropTypes from 'prop-types';
import React from 'react';
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

const CurrencyInput = ({
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
  adornmentIcon,
  adornmentOnClick,
  adornmentPos,
  iconTooltip,
  placeholder,
}) => {

  return (
    <>
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
        <TextField
          placeholder={placeholder}
          disabled={disabled}
          id={id}
          variant={variant || 'outlined'}
          error={error}
          label={error}
          value={value}
          fullWidth={fullWidth}
          sx={{ width: width || halfWidth && '50%' }}
          onChange={onChange}
          style={style}
          name={name}
          InputProps={{
            inputComponent: NumberFormatCustom,
          }}
          endAdornment={!!adornmentIcon &&
            <InputAdornment position={adornmentPos || "end"}>
              <Tooltip title={iconTooltip || ''}>
                <IconButton component='label'
                  onClick={adornmentOnClick || null}
                  edge="end">
                  {adornmentIcon}
                </IconButton>
              </Tooltip>
            </InputAdornment>
          }
        />
      </FormControl>

    </>
  );
};

export default CurrencyInput;
