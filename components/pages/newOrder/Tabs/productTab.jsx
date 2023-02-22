/* eslint-disable react/jsx-props-no-spreading */
import { Box, Grid, Typography } from '@mui/material';
import React from 'react';

//  PropTypes
import PropTypes from 'prop-types';
//  Page Component Styles

//  Actions
import { Package } from 'lucide-react';
// import CurrencyInput from '../../../inputs/CurrencyInput';
import MyInput from '../../../inputs/myInput';
import MySelect from '../../../inputs/select';

const ProductTab = (props) => {
  const {
    budgetData,
    onBudgetChange,
    noDrop,
    pageProps,
    categories
  } = props;

  const { getRootProps, getInputProps, isDragActive } = props.dragDrop;
  const { uploadedFiles, setUploadedFiles } = props.docs;

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
          <Grid container>
            <Grid container md={6} sm={6} xs={6} pl={1} pr={1}>
              <MySelect
                options={categories}
                label='Categoria'
                name='category'
                onChange={(e) => onBudgetChange(e.target)}
              />
            </Grid>
            <Grid container md={6} sm={6} xs={6} pl={1} pr={1}>
              <MyInput
                label='Nome'
                name='name'
                required
                value={budgetData.name.value}
                error={budgetData.name.error}
                onChange={(e) => onBudgetChange(e.target)}
              />
            </Grid>
            {/* <Grid container md={6} sm={6} xs={6} pl={1} pr={1}>
              <MyInput
                label='Categoria'
                value={budgetData.category.value}
                error={budgetData.category.error}
                name='category'
                onChange={(e) => onBudgetChange(e.target)}
              />
            </Grid> */}
            <Grid container md={6} sm={6} xs={6} pl={1} pr={1}>
              <MyInput
                label='Quantidade'
                type='number'
                name='amount'
                value={budgetData.amount.value}
                error={budgetData.amount.error}
                onChange={(e) => onBudgetChange(e.target)}
              />
            </Grid>
            {/* <Grid container md={6} sm={6} xs={6} pl={1} pr={1}>
              <CurrencyInput
                label='Preço'
                name='price'
                value={budgetData.price.value}
                error={budgetData.price.error}
                onChange={(e) => onBudgetChange(e.target)}
              />
            </Grid> */}
            {/* <Grid container item sm={12} xs={12} pl={1} pr={1}>
              <InputLabel htmlFor='email'>Observações</InputLabel>
              <TextareaAutosize
                placeholder='Escrever observações'
                className={styles.textarea}
                value={obs}
                onChange={(e) => onObsChange(e.target.value)}
              />
            </Grid> */}
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
};

export default ProductTab;
