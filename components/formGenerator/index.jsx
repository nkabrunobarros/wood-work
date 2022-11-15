import { Box, Checkbox, Divider, FormControlLabel, Grid, Paper, Popover, styled, Tooltip } from "@mui/material";
import { Info } from "lucide-react";
import React, { useEffect, useState } from 'react';
import * as CountryActions from '../../pages/api/actions/country';
import MyInput from "../inputs/myInput";
import PhoneInput from "../inputs/phoneInput/PhoneInput";
import Select2 from "../inputs/select";
//  Proptypes
import PropTypes from 'prop-types';

const FormGenerator = ({fields, onFormChange, generatePassword, setGeneratePassword, postalCodeInfo}) => {
    const [anchorEl, setAnchorEl] = useState(null);
    const [countries, setCountries] = useState();
    const [loaded, setLoaded] = useState(false);

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
              {

                return <Grid key={index} md={3} sm={6} xs={12} container sx={{ paddingLeft: '.5rem',paddingRight: '.5rem'}}>
                  <Select2
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
                    placeholder={`Escrever ${field.label}`}
                  /> 
                </Grid>;
              }

              if (field.type === 'phone' && field.required) 
                return <Grid key={index} md={3} sm={6} xs={12} container sx={{ paddingLeft: '.5rem',paddingRight: '.5rem'}}> 
                <PhoneInput
                  name={field.id}
                  label={field.label}
                  options={countries}
                  required={field.required}
                  value={field.value}
                  placeholder={`Escrever ${field.label}`}
                  error={field.error}
                  onChange={(e) => onFormChange(index, e)}
                />
                </Grid>;

              if (field.type === 'password' && field.required) 
                return <Grid key={index} md={3} sm={6} xs={12} container sx={{ paddingLeft: '.5rem',paddingRight: '.5rem'}}> 
                <Box sx={{ width: '100%'}}>

                {generatePassword ? <FormControlLabel control={<Checkbox checked={generatePassword} onChange={() => setGeneratePassword(!generatePassword)} />} label="Gerar Senha" />
                    :
                    <MyInput
                      label={
                        <Tooltip title='Trocar para senha autogerada'>
                          <a className='link' onClick={() => setGeneratePassword(!generatePassword)} >Senha</a>
                        </Tooltip>
                      }
                        name={field.id}
                        required={field.required}
                        value={field.value}
                        error={field.error}
                        type={field.type}
                        placeholder={`Escrever ${field.label}`}
                        onChange={(e) => onFormChange(index, e)}
                    />
                  }
                </Box>

                </Grid>;

              //  Default case regular text input 
              return <Grid key={index} md={3} sm={6} xs={12} container sx={{ paddingLeft: '.5rem',paddingRight: '.5rem'}}>
                <MyInput 
                  name={field.id}
                  label={field.label}
                  required={field.required}
                  value={field.value}
                  error={field.error}
                  type={field.type && field.type}
                  onChange={(e) => onFormChange(index, e)}
                  placeholder={`Escrever ${field.label}`}
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
  postalCodeInfo: PropTypes.object
};


export default FormGenerator;