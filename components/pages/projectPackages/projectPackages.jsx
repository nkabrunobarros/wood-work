/* eslint-disable no-constant-condition */
/* eslint-disable react/prop-types */
import { Accordion, AccordionDetails, AccordionSummary, Box, Grid, IconButton, Tooltip, Typography } from '@mui/material';
import React, { useState } from 'react';

import { ChevronDown, ChevronUp, QrCode } from 'lucide-react';
import CustomBreadcrumbs from '../../breadcrumbs';
import PrimaryBtn from '../../buttons/primaryBtn';
import Content from '../../content/content';
import Notification from '../../dialogs/Notification';
import Footer from '../../layout/footer/footer';
import Navbar from '../../layout/navbar/navbar';

const packageectPackages = (props) => {
  const { breadcrumbsPath } = props;

  const cellProps = {
    sm: 12 / 7,
    md: 12 / 7,
    xs: 12 / 7,
    container: true,
    alignItems: 'center',
    p: 2,
  };

  const toggleValueInArray = (value, array) => {
    const index = array.indexOf(value);

    if (index === -1) {
      return [...array, value];
    }

    return [...array.slice(0, index), ...array.slice(index + 1)];
  };

  const [expandedGroups, setExpandedGroups] = useState([]);

  const handleChange = (expandedGroups, setExpandedGroups) => (panel) => {
    setExpandedGroups((prevExpandedGroups) =>
      toggleValueInArray(panel, prevExpandedGroups)
    );
  };

  const handlePanelChange = handleChange(expandedGroups, setExpandedGroups);

  const packages = [
    {
      id: '1',
      items: [
        {},
        {},
        {},
        {},
      ]
    },
    {
      id: '2'
    },
  ];

  return <>
    <Navbar />
    <Grid component='main' sx={{ padding: '0rem 2rem 4rem 2rem' }}>
      <CustomBreadcrumbs path={breadcrumbsPath} />
      <Notification />
      <Content>
        <Box id='pad' className='flex' style={{ alignItems: 'center' }}>
          <Box style={{ display: 'flex', justifyContent: 'space-between', width: '100%' }}>
            <Typography variant='title' >{breadcrumbsPath[1].title}</Typography>
            <PrimaryBtn text='Adicionar' />
          </Box>
        </Box>
        <Grid container >
          <Grid container md={12} sm={12} xs={12} >
            <Grid container md={12} sm={12} xs={12} bgcolor={'primary.main'} color='white'>
              <Grid {...cellProps} >Número</Grid>
              <Grid {...cellProps} >Quantidade</Grid>
              <Grid {...cellProps} >Peso</Grid>
              <Grid {...cellProps} >Embalado a</Grid>
              <Grid {...cellProps} >Embalado por</Grid>
              <Grid {...cellProps} >QrCode</Grid>
              <Grid {...cellProps} justifyContent={'center'}>Conteúdo</Grid>
            </Grid>
            {packages.map((pack, index) => {
              return <>
                <Accordion
                  expanded={expandedGroups.includes(pack?.id)}
                  onChange={() => handlePanelChange(pack?.id)}
                  sx={{ width: '100%' }}>
                  <AccordionSummary sx={{ padding: 0, height: '20px' }} aria-controls="panel1d-content" id="panel1d-header"
                    bgcolor={index % 2 !== 0 && 'lightGray.edges'}
                  >
                    <Grid container md={12} sm={12} xs={12} alignItems={'center'}>
                      <Grid {...cellProps} >{index + 1}</Grid>
                      <Grid {...cellProps} >Qtd.</Grid>
                      <Grid {...cellProps} >Peso</Grid>
                      <Grid {...cellProps} >Embalado a</Grid>
                      <Grid {...cellProps} >Embalado por</Grid>
                      <Grid {...cellProps} >
                        <Tooltip title='Descarregar'>
                          <IconButton>
                            <QrCode />
                          </IconButton>
                        </Tooltip>
                      </Grid>
                      <Grid {...cellProps} onClick={() => {}} sx={{ cursor: 'pointer' }} justifyContent={'center'}>
                        <Tooltip title={expandedGroups.includes(pack?.id) ? 'Fechar Móveis' : 'Mostrar Móveis'}>
                          <IconButton> {expandedGroups.includes(pack?.id) ? <ChevronUp /> : <ChevronDown /> } </IconButton>
                        </Tooltip>
                      </Grid>
                    </Grid>
                  </AccordionSummary>
                  <AccordionDetails>
                    <Grid container md={12} sm={12} xs={12} sx={{ borderBottom: '1px solid', borderTop: '1px solid', borderColor: 'divider' }} >
                      <Grid {...cellProps} ><Box sx={{ borderRight: '1px solid', borderColor: 'divider', width: '100%' }}> <Typography color='primary' fontWeight={'bold'} variant='subtitle2'>Cliente</Typography> </Box></Grid>
                      <Grid {...cellProps} ><Box sx={{ borderRight: '1px solid', borderColor: 'divider', width: '100%' }}> <Typography color='primary' fontWeight={'bold'} variant='subtitle2'>Projeto</Typography> </Box></Grid>
                      <Grid {...cellProps} ><Box sx={{ borderRight: '1px solid', borderColor: 'divider', width: '100%' }}> <Typography color='primary' fontWeight={'bold'} variant='subtitle2'>Movel</Typography> </Box></Grid>
                      <Grid {...cellProps} ><Box sx={{ borderRight: '1px solid', borderColor: 'divider', width: '100%' }}> <Typography color='primary' fontWeight={'bold'} variant='subtitle2'>Módulo</Typography> </Box></Grid>
                      <Grid {...cellProps} ><Box sx={{ borderRight: '1px solid', borderColor: 'divider', width: '100%' }}> <Typography color='primary' fontWeight={'bold'} variant='subtitle2'>Nome</Typography> </Box></Grid>
                      <Grid {...cellProps} ><Box sx={{ borderRight: '1px solid', borderColor: 'divider', width: '100%' }}> <Typography color='primary' fontWeight={'bold'} variant='subtitle2'>Tipo</Typography> </Box></Grid>
                      <Grid {...cellProps} ><Box sx={{ borderRight: '1px solid', borderColor: 'divider', width: '100%' }}> <Typography color='primary' fontWeight={'bold'} variant='subtitle2'>Quantiade</Typography> </Box></Grid>
                    </Grid>
                    {pack?.items?.map((furni, index) => {
                      return <Grid key={furni.id} container md={12} sm={12} xs={12} bgcolor={index % 2 !== 0 && 'lightGray.edges'}>
                        <Grid {...cellProps}><Typography variant='sm'>Nome Cliente</Typography></Grid>
                        <Grid {...cellProps}><Typography variant='sm'>Nome Projeto</Typography></Grid>
                        <Grid {...cellProps}><Typography variant='sm'>Nome Movel</Typography></Grid>
                        <Grid {...cellProps}><Typography variant='sm'>Nome Módulo</Typography></Grid>
                        <Grid {...cellProps}><Typography variant='sm'>Nome Peça</Typography></Grid>
                        <Grid {...cellProps}><Typography variant='sm'>Part ou assembly</Typography></Grid>
                        <Grid {...cellProps}><Typography variant='sm'>Quantidade</Typography></Grid>
                      </Grid>;
                    })}
                  </AccordionDetails>
                </Accordion>
              </>;
            })}
          </Grid>
        </Grid>
      </Content>

    </Grid>
    <Footer/>

  </>;
};

export default packageectPackages;
