import { Divider, Grid, InputLabel, TextField, Tooltip, Typography } from '@mui/material';
import React from 'react';

//  PropTypes
import { Calendar } from 'lucide-react';
import PropTypes from 'prop-types';
//  Page Component Styles
import styles from '../../../../styles/NewOrder.module.css';

//  Actions
import { DesktopDatePicker, LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import CurrencyInput from '../../../inputs/CurrencyInput';
import MyInput from '../../../inputs/myInput';
import PostalCodeInput from '../../../inputs/postalCodeInput';

const RequestTab = (props) => {
  const {
    pageProps,
    budgetData,
    onBudgetChange,
  } = props;

  return (
    <Grid container>
      <Grid container md={12} sm={12} >
        <Grid bgcolor={'lightGray.main'} className={styles.clientContainer} spacing={1} p={2}>
          <Grid container item sm={12} xs={12} >
            <Grid container md={12}>
              <Typography id='align' className='headerTitleSm'>
                <Calendar size={pageProps?.globalVars?.iconSize} strokeWidth={pageProps?.globalVars?.iconStrokeWidth} /> Pedido
              </Typography>
            </Grid>
          </Grid>
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <Grid container item sm={12} xs={12} >
              <InputLabel>
                Data
                {budgetData.dateRequest.required && <Tooltip title='Obrigatório' >
                  <span style={{ color: 'var(--red)' }}> *</span>
                </Tooltip>}
              </InputLabel>

              <DesktopDatePicker
                inputFormat={'DD.MM.YYYY'}
                value={budgetData.dateRequest.value}
                onChange={(e, newValue) => onBudgetChange({ value: JSON.stringify(e?.$d) === 'null' ? newValue : e?.$d, name: 'dateRequest' })}
                // onChange={(newValue) => onBudgetChange(newValue)}
                renderInput={(params) =>
                  <TextField fullWidth {...params} error={budgetData.dateRequest.error} inputProps={{ sx: { color: budgetData.dateRequest.error && 'var(--red)' }, ...params.inputProps, placeholder: budgetData.dateRequest.error || 'DD.MM.YYYY' }}/>}

              />
            </Grid>
            {/* <Grid container item sm={12} xs={12} >
              <InputLabel>
                Criação de orçamento
                {budgetData.dateCreation.required && <Tooltip title='Obrigatório' >
                  <span style={{ color: 'var(--red)' }}> *</span>
                </Tooltip>}

              </InputLabel>
              <DesktopDatePicker
                inputFormat={'DD.MM.YYYY'}
                value={budgetData.dateCreation.value}
                onChange={(e, newValue) => onBudgetChange({ value: JSON.stringify(e?.$d) === 'null' ? newValue : e?.$d, name: 'dateCreation' })}
                renderInput={(params) =>
                  <TextField fullWidth {...params} error={budgetData.dateCreation.error} inputProps={{ sx: { color: budgetData.dateCreation.error && 'var(--red)' }, ...params.inputProps, placeholder: budgetData.dateCreation.error || 'DD.MM.YYYY' }}/>}
              />
            </Grid> */}
            <Grid container item sm={12} xs={12} >
              <InputLabel >
                Data de entrega do orçamento
                {budgetData.dateAgreedDelivery.required && <Tooltip title='Obrigatório' >
                  <span style={{ color: 'var(--red)' }}> *</span>
                </Tooltip>}

              </InputLabel>
              <DesktopDatePicker
                inputFormat={'DD.MM.YYYY'}
                value={budgetData.dateAgreedDelivery.value}
                onChange={(e, newValue) => onBudgetChange({ value: JSON.stringify(e?.$d) === 'null' ? newValue : e?.$d, name: 'dateAgreedDelivery' })}
                renderInput={(params) =>
                  <TextField fullWidth {...params} error={budgetData.dateAgreedDelivery.error} inputProps={{ sx: { color: budgetData.dateAgreedDelivery.error && 'var(--red)' }, ...params.inputProps, placeholder: budgetData.dateAgreedDelivery.error || 'DD.MM.YYYY' }}/>}
              />
            </Grid>
            {/* <Grid container item sm={12} xs={12} >
              <InputLabel >
                Entrega de orçamento
                {budgetData.dateDelivery.required && <Tooltip title='Obrigatório' >
                  <span style={{ color: 'var(--red)' }}> *</span>
                </Tooltip>}

              </InputLabel>
              <DesktopDatePicker
                inputFormat={'DD.MM.YYYY'}
                value={budgetData.dateDelivery.value}
                onChange={(e, newValue) => onBudgetChange({ value: JSON.stringify(e?.$d) === 'null' ? newValue : e?.$d, name: 'dateDelivery' })}
                renderInput={(params) =>
                  <TextField fullWidth {...params} error={budgetData.dateDelivery.error} inputProps={{ sx: { color: budgetData.dateDelivery.error && 'var(--red)' }, ...params.inputProps, placeholder: budgetData.dateDelivery.error || 'DD.MM.YYYY' }}/>}
              />
            </Grid> */}
            <Divider fullWidth sx={{ width: '100%', marginTop: 1, marginBottom: 1 }} />
            <Grid container item sm={12} xs={12} >
              <InputLabel >
               Data de entrega de projeto
                {budgetData.dateDeliveryProject.required && <Tooltip title='Obrigatório' >
                  <span style={{ color: 'var(--red)' }}> *</span>
                </Tooltip>}

              </InputLabel>
              <DesktopDatePicker
                inputFormat={'DD.MM.YYYY'}
                value={budgetData.dateDeliveryProject.value}
                onChange={(e, newValue) => onBudgetChange({ value: JSON.stringify(e?.$d) === 'null' ? newValue : e?.$d, name: 'dateDeliveryProject' })}
                renderInput={(params) =>
                  <TextField fullWidth {...params} error={budgetData.dateDeliveryProject.error} inputProps={{ sx: { color: budgetData.dateDeliveryProject.error && 'var(--red)' }, ...params.inputProps, placeholder: budgetData.dateDeliveryProject.error || 'DD.MM.YYYY' }}/>}
              />
            </Grid>
            <Grid container item sm={12} xs={12} >
              <MyInput
                onChange={(e) => onBudgetChange(e.target)}
                label='Rua'
                error={budgetData.streetAddress.error}
                required={budgetData.streetAddress.required}
                name='streetAddress'
                placeholder='Escrever rua'
                value={budgetData.streetAddress.value}
              />
            </Grid>
            <Grid container item sm={12} xs={12} >
              <Grid container item sm={6} xs={6} pr={0.5}>
                <PostalCodeInput
                  label='Localidade'
                  required={budgetData.postalCode.required}
                  error={budgetData.postalCode.error}
                  name='postalCode'
                  placeholder='XXXX-XXX'
                  value={budgetData.postalCode.value}
                  onChange={(e) => onBudgetChange(e.target)}
                />
              </Grid>
              <Grid container item sm={6} xs={6} pl={0.5}>
                <MyInput
                  label='Localidade'
                  required={budgetData.addressLocality.required}
                  error={budgetData.addressLocality.error}
                  name='addressLocality'
                  value={budgetData.addressLocality.value}
                  onChange={(e) => onBudgetChange(e.target)}
                />
              </Grid>
            </Grid>
            <Grid container item sm={12} xs={12} >
              <Grid container item sm={6} xs={6} pr={0.5}>
                <MyInput
                  label='Concelho'
                  required={budgetData.addressRegion?.required}
                  error={budgetData.addressRegion.error}
                  name='addressRegion'
                  value={budgetData.addressRegion.value}
                  onChange={(e) => onBudgetChange(e.target)}
                />
              </Grid>
              <Grid container item sm={6} xs={6} pl={0.5}>
                <MyInput
                  label='Pais'
                  required={budgetData.addressCountry?.required}
                  error={budgetData.addressCountry.error}
                  name='addressCountry'
                  value={budgetData.addressCountry.value}
                  onChange={(e) => onBudgetChange(e.target)}
                />
              </Grid>
            </Grid>
            <Divider fullWidth sx={{ width: '100%', marginTop: 1, marginBottom: 1 }} />

            <Grid container item sm={12} xs={12} >
              <CurrencyInput
                onChange={(e) => onBudgetChange(e.target)}
                label='Valor'
                error={budgetData.price.error}
                required={budgetData.price.required}
                name='price'
                placeholder='Valor total do pedido'
                value={budgetData.price.value}
              />
            </Grid>
            <Grid container item sm={12} xs={12} >
              <MyInput
                label='Observações'
                type={budgetData.obs.type}
                name='obs'
                placeholder='Escrever observações'
                className={styles.textarea}
                value={budgetData.obs.value}
                onChange={(e) => onBudgetChange(e.target)}
              />
            </Grid>
          </LocalizationProvider>
        </Grid>
      </Grid>
    </Grid>
  );
};

RequestTab.propTypes = {
  pageProps: PropTypes.any,
  budgetData: PropTypes.any,
  onBudgetChange: PropTypes.any,

};

export default RequestTab;
