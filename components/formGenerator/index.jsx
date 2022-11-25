/* eslint-disable sort-imports */
import { Box, Checkbox, Divider, FormControlLabel, Grid, Paper, Popover, styled, Tooltip } from "@mui/material";
import { HelpCircle, Verified } from "lucide-react";
import React, { useEffect, useState } from 'react';
// import * as CountryActions from '../../pages/api/actions/country';
import MyInput from "../inputs/myInput";
import PhoneInput from "../inputs/phoneInput/PhoneInput";
import MySelect from "../inputs/select";
//  Proptypes
import { Visibility, VisibilityOff } from "@mui/icons-material";
import PropTypes from 'prop-types';

/* HOW TO USE
 * to use this form generator, u need to provida a array of objects for the inputs.
 * for the minimum display of the input, only needs a blank obj.
 * the form is ready for this fields
 * id, label, value, error, required, type
 * 
 * if u wish to use a phoneInput, use type : 'phone'
 * 
 * for a select field, provide the options ->  options: countries (array)
 * to select the specifiq field to display in the options, u can use -> optLabel: 'id',
 * by default, is using the field label
 * to select the specifiq value field in the options, u can use -> optValue: 'id',
 * 
 * for a area text field, use type: 'area'
 *  
 *  for the password field, use type: 'password'
 *  if u wish for it to be randomized, provide the FormGenerator component,
 *  on the optionData property, with a generatePassword state (bool) and a setGeneratePassword
 *  
 *  you can also provide the fields with a tooltip, which appear while hovering over the input label
*/  

/*
 * You may think you know what the following code does.
 * But you dont. Trust me.
 * Fiddle with it, and youll spend many a sleepless
 * night cursing the moment you thought youd be clever
 * enough to "optimize" the code below.
 * Now close this file and go play with something else.
 */


const FormGenerator = ({fields, onFormChange, perRow, ...props}) => {
    const [anchorEl, setAnchorEl] = useState(null);
    // const [countries, setCountries] = useState();
    const [loaded, setLoaded] = useState(false);
    const [visible, setVisible] = useState(false) ;
    const placeholderDefault = 'Escrever';
    const optData = props.optionalData || {};
  const countries = [];

    const { 
      generatePassword,
      setGeneratePassword,
      postalCodeInfo,
      ValidatePostalCode
      } = optData;

    useEffect(() => {
      const getData = async () => {
        try {
          // await CountryActions
          //   .countries()
          //   .then((res) => setCountries(res.data.payload.data));
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
            return <Grid key={index}  
            md={ perRow ? (12 / perRow) : 3} 
            sm={ perRow !== 1 ? 6  : 12} 
            xs={ perRow !== 1 ? 12 : 12}
            container sx={{ paddingLeft: '.5rem',paddingRight: '.5rem'}}> 
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
            return <Grid key={index}  md={ perRow ? (12 / perRow) : 3} 
            sm={ perRow !== 1 ? 6  : 12} 
            xs={ perRow !== 1 ? 12 : 12}  container sx={{ paddingLeft: '.5rem',paddingRight: '.5rem'}}> 
            <Box sx={{ width: '100%'}}>
              {generatePassword ? 
                <FormControlLabel control={<Checkbox checked={generatePassword} onChange={() => setGeneratePassword(!generatePassword)} />} label={field.label} />
                  :
                  <MyInput
                    label={
                        <a className={ generatePassword !== 'undefined' && setGeneratePassword ?'link': null } onClick={() => generatePassword !== 'undefined' && setGeneratePassword ? setGeneratePassword(!generatePassword) : null} >{field.label}</a>
                    }
                      name={field.id}
                      required={field.required}
                      value={field.value}
                      error={field.error}
                      type={visible ? 'text' :field.type}
                      placeholder={field.placeholder || `${placeholderDefault} ${field.label}`}
                      onChange={(e) => onFormChange(index, e)}
                      tooltip={field.tooltip}
                      disabled={field.disabled}
                      adornmentIcon={visible ? <Visibility color={'primary'} /> : <VisibilityOff />}
                      adornmentOnClick={() => setVisible(!visible)}
                      iconTooltip={!visible && 'Mostrar Senha'}

                  />
                }
              </Box>
            </Grid>;

          //  Default case regular text input
          return <Grid key={index} 
          md={ perRow ? (12 / perRow) : 3} 
          sm={ perRow !== 1 ? 6  : 12} 
          xs={ perRow !== 1 ? 12 : 12} 
          container sx={{ paddingLeft: '.5rem',paddingRight: '.5rem'}}>
            <MyInput 
              name={field.id}
              label={field.label}
              required={field.required}
              value={field.value}
              error={field.error}
              tooltip={field.tooltip}
              disabled={field.disabled}
              type={field.type && field.type}
              onChange={(e) => {
                onFormChange(index, e);
                field.id === 'postalCode' && ValidatePostalCode(null);
              }}
              placeholder={field.placeholder || `${placeholderDefault} ${field.label}`}
              adornmentIcon={field.id === 'postalCode' &&
              <>
                {postalCodeInfo ?
                  <Tooltip title='Detalhes Codigo Postal' >
                    <Verified color="var(--green)" strokeWidth={1} onClick={(event) => setAnchorEl(event.currentTarget)} />
                  </Tooltip>
                  :  
                  <Tooltip title='Validar' >
                    <HelpCircle color="var(--primary)" strokeWidth={1} onClick={() => ValidatePostalCode(field.value)} />
                  </Tooltip>
                }
              </>
              }
            />
          </Grid>;
        })}
      </Grid>
    </>;
};

FormGenerator.propTypes = {
  fields: PropTypes.array,
  onFormChange: PropTypes.func,
  ValidatePostalCode: PropTypes.func,
  generatePassword: PropTypes.bool,
  setGeneratePassword: PropTypes.any,
  perRow: PropTypes.number,
  postalCodeInfo: PropTypes.object,
  optionalData: PropTypes.object,
};


export default FormGenerator;