/* eslint-disable no-constant-condition */
/* eslint-disable react/prop-types */
import { Box, Grid, Grow } from '@mui/material';
import React, { useState } from 'react';

import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import Checkbox from '@mui/material/Checkbox';
import Divider from '@mui/material/Divider';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import CustomBreadcrumbs from '../../breadcrumbs';
import PrimaryBtn from '../../buttons/primaryBtn';
import Navbar from '../../layout/navbar/navbar';

function not (a, b) {
  return a.filter((value) => b.indexOf(value) === -1);
}

function intersection (a, b) {
  return a.filter((value) => b.indexOf(value) !== -1);
}

function union (a, b) {
  return [...a, ...not(b, a)];
}

const Packing = (props) => {
  const { breadcrumbsPath } = props;
  const [checked, setChecked] = React.useState([]);

  const [partsAndModules, setPartsAndModules] = useState([
    { id: Math.random().toString(), name: 'Screw', type: 'part', amount: 50 },
    { id: Math.random().toString(), name: 'Nut', type: 'part', amount: 25 },
    { id: Math.random().toString(), name: 'Bolt', type: 'part', amount: 35 },
    { id: Math.random().toString(), name: 'Washer', type: 'part', amount: 20 },
    { id: Math.random().toString(), name: 'Panel', type: 'module', amount: 2 },
    { id: Math.random().toString(), name: 'Circuit board', type: 'module', amount: 4 },
    { id: Math.random().toString(), name: 'Power supply', type: 'module', amount: 1 },
    { id: Math.random().toString(), name: 'Motor', type: 'module', amount: 2 },
    { id: Math.random().toString(), name: 'Fan', type: 'module', amount: 3 },
    { id: Math.random().toString(), name: 'LED', type: 'part', amount: 100 },
    { id: Math.random().toString(), name: 'Switch', type: 'part', amount: 20 },
    { id: Math.random().toString(), name: 'Resistor', type: 'part', amount: 50 },
    { id: Math.random().toString(), name: 'Capacitor', type: 'part', amount: 30 },
    { id: Math.random().toString(), name: 'Diode', type: 'part', amount: 40 },
    { id: Math.random().toString(), name: 'Transistor', type: 'part', amount: 30 },
    { id: Math.random().toString(), name: 'Fuse', type: 'part', amount: 10 },
    { id: Math.random().toString(), name: 'Relay', type: 'part', amount: 5 },
  ]);

  const [selected, setSelected] = useState([]);
  const partsAndModulesChecked = intersection(checked, partsAndModules);
  const selectedChecked = intersection(checked, selected);

  const handleToggle = (value) => () => {
    const currentIndex = checked.indexOf(value);
    const newChecked = [...checked];

    if (currentIndex === -1) {
      newChecked.push(value);
    } else {
      newChecked.splice(currentIndex, 1);
    }

    setChecked(newChecked);
  };

  const numberOfChecked = (items) => intersection(checked, items).length;

  const handleToggleAll = (items) => () => {
    if (numberOfChecked(items) === items.length) {
      setChecked(not(checked, items));
    } else {
      setChecked(union(checked, items));
    }
  };

  const handleCheckedSelected = () => {
    setSelected(selected.concat(partsAndModulesChecked));
    setPartsAndModules(not(partsAndModules, partsAndModulesChecked));
    setChecked(not(checked, partsAndModulesChecked));
  };

  const handleCheckedPartsAndModules = () => {
    setPartsAndModules(partsAndModules.concat(selectedChecked));
    setSelected(not(selected, selectedChecked));
    setChecked(not(checked, selectedChecked));
  };

  const handleAllPartsAndModules = () => {
    setPartsAndModules(partsAndModules.concat(selected));
    setSelected([]);
  };

  const handleAllSelected = () => {
    setSelected(selected.concat(partsAndModules));
    setPartsAndModules([]);
  };

  function handlePacking () {
    //  TODO
    fetch('http://193.136.195.25/media/mofreitas/clientes/bruno.barros@nka.pt/urn:ngsi-ld:Budget:Chanut/Chanut/briefing/VF%20do%20Cliente/06')
      .then(response => response.blob())
      .then(blob => {
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');

        a.href = url;
        a.download = 'image.jpg'; // Change this to the desired file name if needed
        document.body.appendChild(a);
        a.click();

        setTimeout(() => {
          document.body.removeChild(a);
          URL.revokeObjectURL(url);
        }, 0);
      });
  }

  const CustomList = ({ title, items }) => (
    <Card >
      <Grid container justifyContent={'space-between'} alignItems={'center'} >
        <CardHeader
          sx={{ px: 2, py: 1 }}
          avatar={
            <Checkbox
              onClick={handleToggleAll(items)}
              checked={numberOfChecked(items) === items.length && items.length !== 0}
              indeterminate={
                numberOfChecked(items) !== items.length && numberOfChecked(items) !== 0
              }
              disabled={items.length === 0}
              inputProps={{
                'aria-label': 'all items selected',
              }}
            />
          }
          title={title}
          subheader={`${numberOfChecked(items)}/${items.length} selecionada(s)`}
        />
        {title === 'Para Embalar' && items.length > 0 && <Grow in={true}><Box sx={{ px: 2, py: 1 }}><PrimaryBtn text={'Embalar'} onClick={() => handlePacking()} /></Box></Grow>}
      </Grid>

      <Divider />
      <List
        sx={{
          bgcolor: 'background.paper',
          overflow: 'scroll',
          maxHeight: '60vh'
        }}
        dense
        component="div"
        role="list"
      >
        {items.map((value) => {
          const labelId = `transfer-list-all-item-${value}-label`;

          return (
            <ListItem
              key={value}
              role="listitem"
              button
              onClick={handleToggle(value)}
            >
              <ListItemIcon>
                <Checkbox
                  checked={checked.indexOf(value) !== -1}
                  tabIndex={-1}
                  disableRipple
                  inputProps={{
                    'aria-labelledby': labelId,
                  }}
                />
              </ListItemIcon>
              <ListItemText id={labelId} primary={`${value.type === 'part' ? 'Peça ' : 'Módulo '}${value.name}`} secondary={`Quantidade: ${value.amount}`} />
            </ListItem>
          );
        })}
      </List>
    </Card>
  );

  return <>
    <Navbar />
    <Grid component='main' sx={{ padding: '0rem 2rem 4rem 2rem' }}>
      <CustomBreadcrumbs path={breadcrumbsPath} />
      <Grid id={'pad'} container >
        <Grid container md={12} >
          <Grid md={5} item>
            <CustomList title='Módulos/Peças' items={partsAndModules}/>
          </Grid>
          <Grid container md={2} alignItems={'center'} >
            <Grid container direction="column" alignItems="center" >
              <Button
                sx={{ my: 0.5 }}
                variant="outlined"
                size="small"
                onClick={handleAllSelected}
                disabled={partsAndModules.length === 0}
                aria-label="move all selected"
              >
            ≫
              </Button>
              <Button
                sx={{ my: 0.5 }}
                variant="outlined"
                size="small"
                onClick={handleCheckedSelected}
                disabled={partsAndModulesChecked.length === 0}
                aria-label="move selected selected"
              >
            &gt;
              </Button>
              <Button
                sx={{ my: 0.5 }}
                variant="outlined"
                size="small"
                onClick={handleCheckedPartsAndModules}
                disabled={selectedChecked.length === 0}
                aria-label="move selected partsAndModules"
              >
            &lt;
              </Button>
              <Button
                sx={{ my: 0.5 }}
                variant="outlined"
                size="small"
                onClick={handleAllPartsAndModules}
                disabled={selected.length === 0}
                aria-label="move all partsAndModules"
              >
            ≪
              </Button>
            </Grid>
          </Grid>
          <Grid md={5} item>
            <CustomList title='Para Embalar'items={selected}/>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  </>;
};

export default Packing;
