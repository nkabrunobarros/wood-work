/* eslint-disable react/jsx-props-no-spreading */
import { Box, Grid, Tab, Tabs, Typography } from "@mui/material";
import React from "react";

//  PropTypes
import PropTypes from 'prop-types';
//  Page Component Styles

//  Actions
import MyInput from "../../../inputs/myInput";
import MySelect from "../../../inputs/select";
import TabPanel from "../../../tapPanel/TabPanel";

const BudgetTab = (props) => {
    const {getRootProps, getInputProps, isDragActive} = props.dragDrop;

    const { 
         newBudgetData,
         budgets,
         chosenBudget,
         onNewBudgetChange,
         onBudgetChange,
         currentTab,
         onTabChange,
         } = props;

    const { uploadedFiles, setUploadedFiles} = props.docs;

    function a11yProps(index) {
        return {
          id: `tab-${index}`,
          'aria-controls': `tabpanel-${index}`,
        };
      }
    

    return (
        <Grid container>
            <Grid container md={6} sx={{ borderRight: '1px solid', borderColor:'divider' }}>
                  <Box container sx={{ width: '100%' }}>
                    <Grid container md={12}>
                      <Grid container md={12} sx={{ display: 'flex', justifyContent: 'center' }}>
                        <Typography variant='xl' sx={{  borderBottom: 1, borderColor: 'divider'}}>Budget</Typography>
                      </Grid>
                      <Grid container md={12}>
                        <Tabs value={currentTab} sx={{ width: '100%'}} onChange={(e, newValue) => onTabChange(newValue)} aria-label="basic tabs example">
                          <Tab sx={{ width: '100%'}} {...a11yProps(0)} label="Já existente"></Tab>
                          <Tab sx={{ width: '100%'}} {...a11yProps(1)} label="Novo"></Tab>
                        </Tabs>
                      </Grid>
                    </Grid>
                    {/* Choose Already exiting budget */}
                    <TabPanel value={currentTab} index={0}>
                      <Grid container>
                        <Grid container md={6} p={1}>
                          <MySelect
                            fullWidth
                            required
                            name='id'
                            error={chosenBudget.id.error}
                            options={budgets}
                            value={chosenBudget.id.value}
                            onChange={(e) => onBudgetChange(e.target)}
                            optionLabel='name'
                            label='Escolher já existente budget'
                          />

                        </Grid>
                        <Grid container md={6} p={1}>
                            <MyInput
                              label='Quantidade'
                              required
                              value={chosenBudget.amount.value}
                              error={chosenBudget.amount.error}
                              type='number'
                              name='amount'
                              onChange={(e) => onBudgetChange(e.target)}
                              disabled={!chosenBudget.id.value}
                             />
                        </Grid>
                        <Grid container md={6} p={1}>
                            <MyInput
                              label='Categoria'
                              required
                              value={chosenBudget.category.value}
                              error={chosenBudget.category.error}
                              name='category'
                              onChange={(e) => onBudgetChange(e.target)}
                              disabled={!chosenBudget.id.value}
                             />
                        </Grid>
                      </Grid>
                    </TabPanel>
                    {/* Create New Budget */}
                    <TabPanel value={currentTab} index={1}>
                      <Grid container>
                        <Grid container md={6} p={1}>
                          <MyInput
                              label='Nome'
                              name='name'
                              required
                              value={newBudgetData.name.value}
                              error={newBudgetData.name.error}
                              onChange={(e) => onNewBudgetChange(e.target)}
                            />
                        </Grid>

                        <Grid container md={6} p={1}>
                          <MyInput
                            label='Quantidade'
                            type='number'
                            name='amount'
                            value={newBudgetData.amount.value}
                              error={newBudgetData.amount.error}
                              onChange={(e) => onNewBudgetChange(e.target)}
                            />
                        </Grid>
                        <Grid container md={6} p={1}>
                            <MyInput
                              label='Categoria'
                              required
                              value={newBudgetData.category.value}
                              error={newBudgetData.category.error}
                              name='category'
                              onChange={(e) => onNewBudgetChange(e.target)}
                             />
                        </Grid>
                      </Grid>
                    </TabPanel>
                  </Box>
                </Grid>
                <Grid container md={6} sx={{ borderLeft: '1px solid',  borderColor:'divider'  }}>
                  <Grid container md={12} sx={{ display: 'flex', justifyContent: 'center' }}>
                    <Typography variant='xl'  sx={{  borderBottom: 1, borderColor: 'divider'}}>Documentos</Typography>
                  </Grid>
                  <Grid container md={12} className='fullCenter' {...getRootProps()}>
                    <Box className='dragDrop' {...getRootProps()} sx={{ borderColor: uploadedFiles && 'var(--green)', color: uploadedFiles && 'var(--green)' }}>
                       {/* eslint-disable-next-line react/no-unknown-property */}
                      <input {...getInputProps()} type='file' hidden multiple directory="" webkitdirectory="" onChange={(e) => setUploadedFiles(e.target.files)} />
                      {
                        isDragActive ?
                          <p>Drop...</p> :
                          <p>{uploadedFiles ? `${Object.keys(uploadedFiles).length} ficheiros anexados` : 'Arraste para carregar ficheiros'}</p>
                      }
                    </Box>
                  </Grid>
                </Grid>
        </Grid>
    );
  };

  BudgetTab.propTypes = {
    chosenBudget: PropTypes.object,
    newBudgetData: PropTypes.object,
    budgets: PropTypes.array,
    uploadedFiles: PropTypes.array,
    onTabChange: PropTypes.func,
    onBudgetChange: PropTypes.func,
    setUploadedFiles: PropTypes.func,
    onNewBudgetChange: PropTypes.func,
    docs: PropTypes.any,
    dragDrop: PropTypes.any,
    currentTab: PropTypes.number,
  };

export default BudgetTab;