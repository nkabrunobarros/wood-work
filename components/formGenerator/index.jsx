import { Box, Checkbox, Divider, FormControlLabel, Grid, Paper, Popover, Tooltip, styled } from "@mui/material";
import { Info } from "lucide-react";
import React, { useEffect, useState } from 'react';
import * as CountryActions from '../../pages/api/actions/country';
import MyInput from "../inputs/myInput";
import PhoneInput from "../inputs/phoneInput/PhoneInput";
import MySelect from "../inputs/select";
//  Proptypes
import PropTypes from 'prop-types';

// HOW TO USE
// to use this form generator, u need to provida a array of objects for the inputs.
// for the minimum display of the input, only needs a blank obj.
// the form is ready for this fields
// id, label, value, error, required, type
//
// if u wish to use a phoneInput, use type : 'phone'
//
// for a select field, provide the options ->  options: countries (array)
// to select the specifiq field to display in the options, u can use -> optLabel: 'id',
// by default, is using the field label
// to select the specifiq value field in the options, u can use -> optValue: 'id',
//
// for a area text field, use type: 'area'
//  
//  for the password field, use type: 'password'
//  if u wish for it to be randomized, provide the FormGenerator component,
//  on the optionData property, with a generatePassword state (bool) and a setGeneratePassword
//  
//  you can also provide the fields with a tooltip, which appear while hovering over the input label


const FormGenerator = ({fields, onFormChange, optionalData, perRow}) => {
    const [anchorEl, setAnchorEl] = useState(null);
    const [countries, setCountries] = useState();
    const [loaded, setLoaded] = useState(false);
    const placeholderDefault = 'Escrever';

    const { 
      generatePassword,
      setGeneratePassword,
      postalCodeInfo
      } = optionalData;

    useEffect(() => {
      const getData = async () => {
        try {
          await CountryActions
            .countries()
            .then((res) => setCountries(res.data.payload.data));
        } catch (error) { }
      };
  
      Promise.all([getData()]).then(() => setLoaded(true));
    }, []);


    const Item = styled(Paper)(() => ({
      padding: '.5rem',
    }));
  
    return loaded && <>
      <Popover
        id={anchorEl ? 'simple-popover' : undefined}
        open={!!anchorEl}
        anchorEl={anchorEl}
        onClose={() => setAnchorEl(null)}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'left',
        }}
      >
        <Box sx={{ flexGrow: 1, p: 1 }}>
          <Grid container >
            <Grid container item >
              <Grid item xs={6} sx={{ padding: '.5rem'}}>
                <Item>Distrito</Item>
              </Grid>
              <Grid item xs={6} sx={{ padding: '.5rem'}}>
                <Item>{postalCodeInfo?.Distrito}</Item>
              </Grid>
            </Grid>
            <Grid container item >
              <Grid item xs={6} sx={{ padding: '.5rem'}}>
                <Item>Concelho</Item>
              </Grid>
              <Grid item xs={6} sx={{ padding: '.5rem'}}>
                <Item>{postalCodeInfo?.Concelho}</Item>
              </Grid>
            </Grid>
            <Grid container item >
              <Grid item xs={6} sx={{ padding: '.5rem'}}>
                <Item>{typeof postalCodeInfo?.Localidade === 'object' ? 'Localidades' : 'Localidade'}</Item>
              </Grid>
              <Grid item xs={6} sx={{ maxHeight: '300px', overflow: 'scroll', padding: '.5rem'}}>
                <Item> {typeof postalCodeInfo?.Localidade === 'object' ?
                  <>
                    {postalCodeInfo.Localidade.map((x, i) => <a key={i}>{x}<Divider /></a>)}
                  </> : postalCodeInfo?.Localidade}</Item>
              </Grid>
            </Grid>
          </Grid>
        </Box>
      </Popover>
      <Grid container>
        {fields.map((field, index) => {
          if (field.options) 
            return <Grid key={index} md={ perRow ? (12 / perRow) : 3} sm={ 6 } xs={12} container sx={{ paddingLeft: '.5rem',paddingRight: '.5rem'}}>
                <MySelect
                  fullWidth
                  name={field.id}
                  label={field.label}
                  required={field.required}
                  value={field.value}
                  error={field.error}
                  type={field.type && field.type}
                  onChange={(e) => onFormChange(index, e)}
                  options={field.options}
                  optionValue={field.optValue}
                  optionLabel={field.optLabel}
                  disabled={field.disabled}
                  placeholder={field.placeholder || `${placeholderDefault} ${field.label}`}
                  tooltip={field.tooltip}

                /> 
              </Grid>;

          if (field.type === 'phone' ) 
            return <Grid key={index} md={ perRow ? (12 / perRow) : 3} sm={ 6} xs={12} container sx={{ paddingLeft: '.5rem',paddingRight: '.5rem'}}> 
            <PhoneInput
              name={field.id}
              label={field.label}
              options={countries}
              required={field.required}
              value={field.value}
              placeholder={field.placeholder || `${placeholderDefault} ${field.label}`}
              error={field.error}
              onChange={(e) => onFormChange(index, e)}
              tooltip={field.tooltip}
              disabled={field.disabled}

            />
            </Grid>;

          if (field.type === 'password') 
            return <Grid key={index} md={ perRow ? (12 / perRow) : 3} sm={ 6} xs={12} container sx={{ paddingLeft: '.5rem',paddingRight: '.5rem'}}> 
            <Box sx={{ width: '100%'}}>
              {generatePassword ? 
                <FormControlLabel control={<Checkbox checked={generatePassword} onChange={() => setGeneratePassword(!generatePassword)} />} label={field.label} />
                  :
                  <MyInput
                    label={
                        <a className='link' onClick={() => generatePassword !== 'undefined' && setGeneratePassword(!generatePassword)} >{field.label}</a>
                    }
                      name={field.id}
                      required={field.required}
                      value={field.value}
                      error={field.error}
                      type={field.type}
                      placeholder={field.placeholder || `${placeholderDefault} ${field.label}`}
                      onChange={(e) => onFormChange(index, e)}
                      tooltip={field.tooltip}
                      disabled={field.disabled}

                  />
                }
              </Box>
            </Grid>;

          //  Default case regular text input
          return <Grid key={index} md={ perRow ? (12 / perRow) : 3} sm={ 6 } xs={12} container sx={{ paddingLeft: '.5rem',paddingRight: '.5rem'}}>
            <MyInput 
              name={field.id}
              label={field.label}
              required={field.required}
              value={field.value}
              error={field.error}
              tooltip={field.tooltip}
              disabled={field.disabled}
              type={field.type && field.type}
              onChange={(e) => onFormChange(index, e)}
              placeholder={field.placeholder || `${placeholderDefault} ${field.label}`}
              adornmentIcon={!!postalCodeInfo && field.id === 'postalCode' ?
                <Tooltip title='Detalhes Codigo Postal' >
                  <Info color="var(--primary)" strokeWidth={1} onClick={(event) => setAnchorEl(event.currentTarget)} />
                </Tooltip> : null
              }
            />
          </Grid>;
        })}
      </Grid>
    </>;
};

FormGenerator.propTypes = {
  fields: PropTypes.array,
  onFormChange: PropTypes.function,
  generatePassword: PropTypes.bool,
  setGeneratePassword: PropTypes.any,
  perRow: PropTypes.number,
  postalCodeInfo: PropTypes.object,
  optionalData: PropTypes.object,
};


export default FormGenerator;