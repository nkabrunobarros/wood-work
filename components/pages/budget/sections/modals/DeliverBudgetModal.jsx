import { Box, Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Divider, Grid, InputLabel, TextField, Tooltip, Typography } from '@mui/material';
import React, { useState } from 'react';
//  PropTypes
import { QuestionMark } from '@mui/icons-material';
import { DesktopDatePicker, LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import PropTypes from 'prop-types';
import CurrencyInput from '../../../../inputs/CurrencyInput';
import MyInput from '../../../../inputs/myInput';
import MySelect from '../../../../inputs/select';
import dayjs from 'dayjs';

const DeliverBudgetModal = (props) => {
  const { open, onConfirm, handleClose, budget, categories } = props;
  const [dateAgreedDelivery, setDateAgreedDelivery] = useState({ value: budget.dateAgreedDelivery.value, error: '' });
  const [dateDeliveryProject, setDateDeliveryProject] = useState({ value: budget.dateDeliveryProject.value, error: '' });
  const [category, setCategory] = useState({ value: budget.category.value, error: '' });
  const [price, setPrice] = useState({ value: budget.price?.value, error: '' });
  const [amount, setAmount] = useState({ value: budget.amount.value, error: '' });
  const [obs, setObs] = useState({ value: budget.obs?.value, error: '' });

  function validateData () {
    let errors = false;

    if (!amount.value) {
      setAmount({ ...amount, error: 'Campo Obrigatório' });
      errors = true;
    }

    if (!price.value) {
      setPrice({ ...price, error: 'Campo Obrigatório' });
      errors = true;
    }

    if (!dateDeliveryProject.value) {
      setDateDeliveryProject({ ...dateDeliveryProject, error: 'Campo Obrigatório' });
      errors = true;
    }

    if (!dateAgreedDelivery.value) {
      setDateAgreedDelivery({ ...dateAgreedDelivery, error: 'Campo Obrigatório' });
      errors = true;
    }

    !errors && onConfirm({
      category,
      price,
      amount,
      obs,
      dateAgreedDelivery,
      dateDeliveryProject
    });
  }

  return <Dialog
    open={open}
    onClose={handleClose}
    aria-labelledby='alert-dialog-title'
    aria-describedby='alert-dialog-description'
  >
    <DialogTitle color="link.main" id='alert-dialog-title' >
     Entrega de orçamento
    </DialogTitle>
    <Divider />
    <DialogContent>
      <Box mb={1} sx={{ display: 'flex', justifyContent: 'center' }}>
        <QuestionMark sx={{ fontSize: '80px' }} fontSize={'80px'} strokeWidth={1} />
      </Box>

      <DialogContentText id='alert-dialog-description'>
        <Typography variant='md'>
           Para finalizar a entrega do orçamento, por favor preencha a seguinte informação.
        </Typography>
      </DialogContentText>
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <Grid container md={12} sm={12} xs={12}>
          <Grid container md={6} sm={6} xs={6} p={1}><CurrencyInput required value={price.value} error={price.error} label={'Valor total do pedido'} onChange={(e) => { setPrice({ value: e.target.value, error: '' }); }} /></Grid>
          <Grid container md={6} sm={6} xs={6} p={1}><MyInput required value={amount.value} error={amount.error} label={'Quantidade'} type='number' onChange={(e) => { setAmount({ value: e.target.value, error: '' }); }} disabled={budget.amount.value}/></Grid>
          <Grid container md={6} sm={6} xs={6} p={1}><MySelect value={category.value} error={category.error} options={categories} label='Categoria' onChange={(e) => { setCategory({ value: e.target.value, error: '' }); }} disabled={budget.category.value}/></Grid>
          <Grid container md={6} sm={6} xs={6} p={1}>
            <InputLabel>
            Data de entrega de projeto
              <Tooltip title='Obrigatório' >
                <span style={{ color: 'var(--red)' }}> *</span>
              </Tooltip>

            </InputLabel>
            <DesktopDatePicker
              inputFormat={'DD.MM.YYYY'}
              value={dateDeliveryProject.value}
              onChange={(e, newValue) => setDateDeliveryProject({ value: JSON.stringify(e?.$d) === 'null' ? newValue : e?.$d, name: 'dateRequest' })}
              // onChange={(newValue) => onBudgetChange(newValue)}
              renderInput={(params) =>
                <TextField fullWidth {...params} error={dateDeliveryProject.error} inputProps={{ sx: { color: dateDeliveryProject.error && 'var(--red)' }, ...params.inputProps, placeholder: dateDeliveryProject.error || 'DD.MM.YYYY' }}/>}
            />
          </Grid>
          <Grid container md={6} sm={6} xs={6} p={1}>
            <Box sx={{ width: '100%' }}>
              <InputLabel>
            Data de entrega orçamento
                <Tooltip title='Obrigatório' >
                  <span style={{ color: 'var(--red)' }}> *</span>
                </Tooltip>

              </InputLabel>
              <DesktopDatePicker
                sx={{ width: '100%' }}
                inputFormat={'DD.MM.YYYY'}
                minDate={dayjs(budget.dateRequest.value).endOf('day')}

                value={dateAgreedDelivery.value}
                onChange={(e, newValue) => setDateAgreedDelivery({ value: JSON.stringify(e?.$d) === 'null' ? newValue : e?.$d, name: 'dateRequest' })}
                // onChange={(newValue) => onBudgetChange(newValue)}
                renderInput={(params) =>
                  <TextField fullWidth sx={{ width: '100%' }} {...params} error={dateAgreedDelivery.error} inputProps={{ sx: { color: dateAgreedDelivery.error && 'var(--red)' }, ...params.inputProps, placeholder: dateAgreedDelivery.error || 'DD.MM.YYYY' }}/>}
              />

            </Box>
          </Grid>
          <Grid container md={6} sm={6} xs={6} p={1}><MyInput value={obs.value} error={obs.error} label={'Observações'} type='area' onChange={(e) => { setObs({ value: e.target.value, error: '' }); }} /></Grid>
        </Grid>

      </LocalizationProvider>

    </DialogContent>
    <DialogActions>
      <Button onClick={validateData} autoFocus>
        <Typography color="link.main" >Confirmar</Typography>
      </Button>
      <Button onClick={handleClose} sx={{ color: 'var(--gray)' }}> Cancelar</Button>
    </DialogActions>
  </Dialog>;
};

DeliverBudgetModal.propTypes = {
  open: PropTypes.bool,
  onConfirm: PropTypes.func,
  handleClose: PropTypes.func,
  budget: PropTypes.object,
  categories: PropTypes.arrayOf(PropTypes.object),
};

export default DeliverBudgetModal;
