/* eslint-disable react/prop-types */
/* eslint-disable react/jsx-props-no-spreading */
import { Box, Button, ButtonGroup, Grid, Grow, IconButton, InputLabel, Tooltip, Typography } from '@mui/material';
import React from 'react';

//  PropTypes
import PropTypes from 'prop-types';
//  Page Component Styles

//  Actions
import { Package, Plus, X } from 'lucide-react';
// import CurrencyInput from '../../../inputs/CurrencyInput';
import MyInput from '../../../inputs/myInput';
import MySelect from '../../../inputs/select';

const ProductTab = (props) => {
  const {
    budgetData,
    onBudgetChange,
    noDrop,
    pageProps,
    categories,
    inputFields,
    setInputFields
  } = props;

  const { getRootProps, getInputProps, isDragActive } = props.dragDrop;
  const { uploadedFiles, setUploadedFiles } = props.docs;

  function addNewProduct () {
    setInputFields([...inputFields, {
      category: { value: '', error: '' },
      name: { value: '', error: '', required: true },
      amount: { value: 0, error: '' }
    }]);
  }

  function onFieldChange (props) {
    setInputFields(prevInputFields => {
      const newInputFields = [...prevInputFields];
      const fieldToEdit = newInputFields[props.row];

      if (props.field === 'category') {
        if (fieldToEdit.name.value === '') fieldToEdit.name.value = props.value + fieldToEdit.name.value;
        else fieldToEdit.name.value = fieldToEdit.name.value.replace(newInputFields[props.row].category.value, props.value);

        fieldToEdit.name.error = '';
      }

      fieldToEdit[props.field] = { ...fieldToEdit[props.field], value: props.value, error: '' };

      return newInputFields;
    });
  }

  function onRemoveRow (props) {
    setInputFields(inputFields.filter((item, index) => index !== props.row));
  }

  return (
    <Grid container p={'16px'}>
      <Grid container md={noDrop ? 12 : 6} sx={{ borderRight: '0px solid', borderColor: 'divider', paddingBottom: '1rem' }}>
        <Box container sx={{ width: '100%' }}>
          <Grid container md={12}>
            <Grid container md={9}>
              <Typography id='align' className='headerTitleSm'>
                <Package size={pageProps?.globalVars?.iconSize} strokeWidth={pageProps?.globalVars?.iconStrokeWidth} /> Produto
              </Typography>
            </Grid>
          </Grid>
          {false && <Grid container>
            <Grid container md={4} sm={4} xs={12} pl={1} pr={1}>
              <MySelect
                options={categories}
                label='Categoria'
                name='category'
                onChange={(e) => onBudgetChange(e.target)}
              />
            </Grid>
            <Grid container md={4} sm={4} xs={12} pl={1} pr={1}>
              <MyInput
                label='Nome'
                name='name'
                required
                value={budgetData.name.value}
                error={budgetData.name.error}
                onChange={(e) => onBudgetChange(e.target)}
              />
            </Grid>
            {/* <Grid container md={5} sm={6} xs={6} pl={1} pr={1}>
              <MyInput
                label='Quantidade'
                type='number'
                name='amount'
                value={budgetData.amount.value}
                error={budgetData.amount.error}
                onChange={(e) => onBudgetChange(e.target)}
              />
            </Grid> */}
            <Grid container md={4} sm={4} xs={12} pl={1} pr={1} >
              <InputLabel sx={{ width: '100%' }}>Qtd.</InputLabel>
              <Box sx={{ display: 'flex', alignItems: 'center', height: '56px' }}>
                <ButtonGroup size="small" aria-label="small outlined button group">
                  <Button >+</Button>
                  <Button disabled>{}</Button>
                  <Button >-</Button>
                </ButtonGroup>
              </Box>
            </Grid>
          </Grid>}
          {inputFields.map((field, index) => {
            return <Grow key={index} in={true}>
              <Grid container>
                <Grid container md={4} sm={4} xs={12} pl={1} pr={1}>
                  <MySelect
                    options={categories}
                    label='Categoria'
                    name='category'
                    onChange={(e) => onFieldChange({ value: e.target.value, field: e.target.name, row: index })}
                  />
                </Grid>
                <Grid container md={4} sm={4} xs={12} pl={1} pr={1}>
                  <MyInput
                    label='Nome'
                    name='name'
                    required
                    value={field.name.value}
                    error={field.name.error}
                    onChange={(e) => onFieldChange({ value: e.target.value, field: e.target.name, row: index })}
                  />
                </Grid>
                {/* <Grid container md={5} sm={6} xs={6} pl={1} pr={1}>
              <MyInput
                label='Quantidade'
                type='number'
                name='amount'
                value={budgetData.amount.value}
                error={budgetData.amount.error}
                onChange={(e) => onBudgetChange(e.target)}
              />
            </Grid> */}
                <Grid container md={4} sm={4} xs={12} pl={1} pr={1} >
                  <InputLabel sx={{ width: '100%' }}>Qtd.</InputLabel>
                  <Box sx={{ display: 'flex', alignItems: 'center', height: '56px' }}>
                    <ButtonGroup size="small" aria-label="small outlined button group">
                      <Button onClick={() => onFieldChange({ value: field.amount.value + 1, field: 'amount', row: index })} >+</Button>
                      <Button disabled>{field.amount.value}</Button>
                      <Button onClick={() => onFieldChange({ value: field.amount.value - 1 > -1 ? field.amount.value - 1 : 0, field: 'amount', row: index })}>-</Button>
                    </ButtonGroup>
                  </Box>
                  <Box sx={{ marginLeft: 'auto', alignSelf: 'center', display: inputFields.length === 1 && 'none' }}>
                    <Tooltip title='Remover este produto'>
                      <IconButton onClick={() => onRemoveRow({ row: index })}>
                        <X color='red' />
                      </IconButton>
                    </Tooltip>
                  </Box>

                </Grid>
              </Grid>
            </Grow>;
          })}
          <Grid container justifyContent={'center'} pt={2}>
            <Button sx={{ border: '1px solid', borderColor: 'primary', color: 'primary', borderRadius: '50px' }} onClick={addNewProduct} > <Plus /> Adicionar</Button>
          </Grid>
        </Box>
      </Grid>
      <Grid container md={6} sx={{ borderLeft: '1px solid', borderColor: 'divider', paddingBottom: '1rem', display: noDrop && 'none' }}>
        <Grid container md={12} sx={{ display: 'flex', justifyContent: 'center' }}>
          <Typography variant='xl' sx={{ borderBottom: 1, borderColor: 'divider' }}></Typography>
        </Grid>
        <Grid container md={12} className='fullCenter' {...getRootProps()}>
          <Box className='dragDrop' {...getRootProps()} sx={{ borderColor: uploadedFiles && 'var(--green)', color: uploadedFiles && 'var(--green)' }}>
            {/* eslint-disable-next-line react/no-unknown-property */}
            <input {...getInputProps()} type='file' hidden multiple directory="" webkitdirectory="" onChange={(e) => setUploadedFiles(e.target.files)} />
            {
              isDragActive
                ? <p>Drop...</p>
                : <p>{uploadedFiles ? `${Object.keys(uploadedFiles).length} ficheiros anexados` : 'Arraste para carregar ficheiros'}</p>
            }
          </Box>
        </Grid>
      </Grid>
    </Grid>
  );
};

ProductTab.propTypes = {
  chosenBudget: PropTypes.object,
  budgetData: PropTypes.object,
  pageProps: PropTypes.object,
  budgets: PropTypes.array,
  uploadedFiles: PropTypes.array,
  onTabChange: PropTypes.func,
  onBudgetChange: PropTypes.func,
  setUploadedFiles: PropTypes.func,
  docs: PropTypes.any,
  dragDrop: PropTypes.any,
  currentTab: PropTypes.number,
  noDrop: PropTypes.bool,
  onObsChange: PropTypes.func,
  obs: PropTypes.string,
  categories: PropTypes.string,
  inputFields: PropTypes.array,
  setInputFields: PropTypes.func,
};

export default ProductTab;
