/* eslint-disable array-callback-return */
/* eslint-disable react/prop-types */
/* eslint-disable react/jsx-props-no-spreading */
import { Accordion, AccordionDetails, AccordionSummary, Box, Button, Grid, Grow, IconButton, Tooltip, Typography } from '@mui/material';
import React, { useState } from 'react';

//  PropTypes
import { ChevronDown, Package, Plus, X } from 'lucide-react';
import PropTypes from 'prop-types';
import MyInput from '../../../inputs/myInput';
import AccessoryForm from './FormRows/AccessoryForm';
import FurnitureForm from './FormRows/FurnitureForm';
import GroupForm from './FormRows/GroupForm';

const ProductLinesTab2 = (props) => {
  const {
    pageProps,
    categories,
    lines,
    setLines,
  } = props;

  const [newGroupName, setNewGroupName] = useState('');
  const [expanded, setExpanded] = useState(true);
  const [sectionExpanded, setSectionExpanded] = useState(true);

  const handleChange = (panel) => (event, newExpanded) => {
    setExpanded(newExpanded ? panel : false);
  };

  //  Add group
  function addGroup (props) {
    const newGroup = {
      id: 'group' + lines.length,
      type: 'group',
      name: newGroupName,
      items: [],
    };

    if (props + 1 <= 0) {
      setLines([newGroup, ...lines]);
    } else if (props >= lines.length) {
      setLines([...lines, newGroup]);
    } else {
      const updatedLines = [
        ...lines.slice(0, props + 1),
        newGroup,
        ...lines.slice(props + 1),
      ];

      setLines(updatedLines);
    }

    setNewGroupName('');
    setExpanded('group' + lines.length);
  }

  //  Add furniture type row to group
  function addNewLineProduct (props) {
    const prevLines = [...lines];

    prevLines[props] = {
      ...prevLines[props],
      items: [...lines[props]?.items,
        {
          furnitureType: { value: 'furniture', error: '', hidden: true },
          name: { id: 'name', value: '', error: '', required: true, label: 'Nome' },
          description: { id: 'description', value: '', error: '', label: 'Descrição', type: 'area' },
          amount: { id: 'amount', value: '', error: '', required: true, label: 'Quantidade', type: 'number' },
          obs: { id: 'obs', value: '', error: '', label: 'Observações', type: 'area' },
          width: { id: 'width', value: '', error: '', label: 'Largura' },
          height: { id: 'height', value: '', error: '', label: 'Altura' },
          thickness: { id: 'thickness', value: '', error: '', label: 'Profundidade' },
          price: { id: 'price', value: '', error: '', label: 'Valor', type: 'currency' },
          category: { hidden: true, id: 'category', value: '', error: '', options: categories, label: 'Categoria' },
        }]
    };

    setLines(prevLines);
  }

  //  Add accessory type row to group
  function addNewLineAccessory (props) {
    const prevLines = [...lines];

    prevLines[props] = {
      ...prevLines[props],
      items: [...lines[props]?.items,
        {
          furnitureType: { value: 'accessory', error: '', hidden: true },
          name: { id: 'name', value: '', error: '', required: true, label: 'Nome' },
          amount: { id: 'amount', value: '', error: '', required: true, label: 'Quantidade', type: 'number' },
          obs: { id: 'obs', value: '', error: '', label: 'Observações', type: 'area' },
          price: { id: 'price', value: '', error: '', label: 'Valor', type: 'currency' },
          category: { hidden: true, id: 'category', value: '', error: '', options: categories, label: 'Categoria' },
        }]
    };

    setLines(prevLines);
  }

  //  On Row change
  const onRowFieldChange = ({ lineIndex, index, e }) => {
    setLines(prevLines => {
      const thisItems = [...prevLines[lineIndex].items];

      thisItems[index] = { ...thisItems[index], [e.target.name]: { ...thisItems[index][e.target.name], value: e.target.value, error: '' } };

      return [
        ...prevLines.slice(0, lineIndex),
        { ...prevLines[lineIndex], items: thisItems },
        ...prevLines.slice(lineIndex + 1)
      ];
    });
  };

  //  On Row remove
  const removeRow = ({ lineIndex, index }) => {
    setLines(prevLines => {
      const thisItems = [...prevLines[lineIndex].items];

      thisItems.splice(index, 1);

      return [
        ...prevLines.slice(0, lineIndex),
        { ...prevLines[lineIndex], items: thisItems },
        ...prevLines.slice(lineIndex + 1)
      ];
    });
  };

  //  On Row remove
  const removeThisGroup = (props) => {
    setLines(prevData => {
      const newData = [...prevData];

      newData.splice(props, 1);

      return newData;
    });
  };

  const isBtnEnabled = (() => {
    const lastLine = lines[lines.length - 1];
    const lastItem = lastLine?.items?.[lastLine.items?.length - 1];

    return !!(lines.length && !(lastItem?.name?.value && lastItem?.amount?.value && lastLine.name));
  })();

  return (
    <Accordion expanded={sectionExpanded} onChange={() => setSectionExpanded(!sectionExpanded)} sx={{ width: '100%' }}>
      <AccordionSummary sx={{ background: 'lightGray.main' }} bgcolor={'lightGray.main'} aria-controls="panel1d-content" id="panel1d-header" expandIcon={<ChevronDown />}>
        <Typography id='align' className='headerTitleSm'>
          <Package size={pageProps?.globalVars?.iconSize} strokeWidth={pageProps?.globalVars?.iconStrokeWidth} /> Produtos
        </Typography>
      </AccordionSummary>
      <AccordionDetails>
        <Grid container p={'16px'} bgcolor={'lightGray.main'} sx={{
          border: '1px solid var(--grayEdges)',
          borderRadius: '4px'
        }} >
          <Grid container sx={{ height: 'fit-content' }}>
            <Grid container md={12} sm={12} xs={12}>
              {/* Lines */}
              {lines.map((line, i) => {
                return <Grow key={i} in={true}><Accordion key={i} expanded={expanded === line.id} onChange={handleChange(line.id)} sx={{ width: '100%' }}>
                  <AccordionSummary aria-controls="panel1d-content" id="panel1d-header" expandIcon={<ChevronDown />} sx={{ borderBottom: expanded === line.id && '1px solid', borderColor: expanded === line.id && 'divider' }}>
                    <Grid container justifyContent={'space-between'} alignItems={'center'}>
                      <Typography>{line.name}</Typography>
                      <Box pr={2}>
                        <Tooltip title='Remover este grupo'>
                          <IconButton onClick={() => removeThisGroup(i)} >
                            <X color='red' />
                          </IconButton>
                        </Tooltip>
                      </Box>
                    </Grid>
                  </AccordionSummary>
                  <AccordionDetails>
                    <Grid container md={3} sm={3} xs={3} p={1} >
                      <MyInput required label='Nome de grupo' placeholder={'Nome'} value={line.name} onChange={(e) => setLines([...lines.slice(0, i), { ...lines[i], name: e.target.value }, ...lines.slice(i + 1)])} />
                    </Grid>
                    {line.items.map((field, index) => {
                      return <Grow key={index}in={true}>
                        <Box>
                          {field?.furnitureType?.value === 'group' && <GroupForm field={field} index={index} lineIndex={i} lines={lines} onChange={onRowFieldChange} onRemove={removeRow} />}
                          {field?.furnitureType?.value === 'furniture' && <FurnitureForm field={field} index={index} lineIndex={i} lines={lines} onChange={onRowFieldChange} onRemove={removeRow} />}
                          {field?.furnitureType?.value === 'accessory' && <AccessoryForm field={field} index={index} lineIndex={i} lines={lines} onChange={onRowFieldChange} onRemove={removeRow} />}
                        </Box>
                      </Grow>;
                    })}
                    <Grid container md={12} sm={12} xs={12} pt={line.items.length !== 0 && 2}>
                      <Button disabled={!((line.items[line.items.length - 1]?.name.value && line.items[line.items.length - 1]?.amount.value) || (line.name && line.items.length === 0))} sx={{ border: '1px solid', borderColor: 'primary', color: 'primary', borderRadius: '50px', marginRight: '1rem' }} onClick={() => addNewLineProduct(i)} > <Plus /> Adicionar Móvel</Button>
                      <Button disabled={!((line.items[line.items.length - 1]?.name.value && line.items[line.items.length - 1]?.amount.value) || (line.name && line.items.length === 0))} sx={{ border: '1px solid', borderColor: 'primary', color: 'primary', borderRadius: '50px' }} onClick={() => addNewLineAccessory(i)} > <Plus /> Adicionar Acessório</Button>
                      <Button disabled={isBtnEnabled} sx={{ marginLeft: '1rem', border: '1px solid', borderColor: 'primary', color: 'primary', borderRadius: '50px' }} onClick={() => addGroup(i)} > <Plus />Novo grupo</Button>
                    </Grid>
                  </AccordionDetails>
                </Accordion>
                </Grow>;
              })}
              {/* Add group */}
              <Grid container md={12} pb={0}>
                <Grid container md={4} alignItems={'end'} display={lines.length > 0 && 'none'}>
                  <Box>
                    <Button disabled={isBtnEnabled} sx={{ marginLeft: '1rem', border: '1px solid', borderColor: 'primary', color: 'primary', borderRadius: '50px' }} onClick={addGroup} > <Plus />Novo grupo</Button>
                  </Box>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </AccordionDetails>
    </Accordion>
  );
};

ProductLinesTab2.propTypes = {
  chosenBudget: PropTypes.object,
  budgetData: PropTypes.object,
  pageProps: PropTypes.object,
  uploadedFiles: PropTypes.array,
  onTabChange: PropTypes.func,
  onBudgetChange: PropTypes.func,
  setUploadedFiles: PropTypes.func,
  docs: PropTypes.any,
  currentTab: PropTypes.number,
  noDrop: PropTypes.bool,
  onObsChange: PropTypes.func,
  obs: PropTypes.string,
  categories: PropTypes.string,
  inputFields: PropTypes.array,
  setInputFields: PropTypes.func,
};

export default ProductLinesTab2;
