//  Nodes
import React, { useState } from 'react'
import CssBaseline from '@mui/material/CssBaseline'

import Grid from '@mui/material/Grid'
import CustomBreadcrumbs from '../../breadcrumbs'
import routes from '../../../navigation/routes'
import InfoCard from '../../cards/infoCard'
import {
  AlertOctagon,
  Edit,
  Layers,
  LayoutTemplate,
  PackageCheck,
  Trash
} from 'lucide-react'
import Content from '../../content/content'
import PrimaryBtn from '../../buttons/primaryBtn'
import { InputLabel, MenuItem, OutlinedInput, Pagination, Select } from '@mui/material'

import styles from '../../../styles/Home.module.css'
import CustomTable from '../../table/table'

const HomeScreen = () => {
  //  States
  const [number, setNumber] = useState('')
  const [client, setClient] = useState('')
  const [category, setCategory] = useState('all')
  const [stock, setStock] = useState('all')
  const [page, setPage] = useState(1)
  //  Breadcrumbs path feed
  const breadcrumbsPath = [
    {
      title: 'Encomendas',
      href: `${routes.private.home}`
    }
  ]
  //  Clear Filters to default
  const ClearFilters = () => {
    setNumber('')
    setClient('')
    setCategory('all')
    setStock('all')
  }

  const handleChangePage = (event, value) => {
    setPage(value)
  }
  return (
    <Grid component='main' sx={{ height: '100vh' }}>
      <CssBaseline />
      {/* Breadcrumbs */}
      <CustomBreadcrumbs path={breadcrumbsPath} />
      {/* Statistics Cards */}
      <div
        style={{
          display: 'flex',
          flexWrap: 'wrap',
          justifyContent: 'space-between',
          padding: 0
        }}
      >
        <InfoCard
          amount={2}
          color={'var(--primary)'}
          icon={<PackageCheck size={40} />}
          title={'Em Orçamentação'}
        />
        <InfoCard
          amount={1}
          color={'var(--green)'}
          icon={<LayoutTemplate size={40} />}
          title={'Em Desenho'}
        />
        <InfoCard
          amount={3}
          color={'var(--orange)'}
          icon={<Layers size={40} />}
          title={'Em Produção'}
        />
        <InfoCard
          amount={7}
          color={'var(--babyblue)'}
          icon={<AlertOctagon size={40} />}
          title={'Concluidas'}
        />
      </div>
      {/* Filters */}
      <Content>
        <h3>Filtros</h3>
        <div className={styles.filters}>
          <div className={styles.filterContainer}>
            <InputLabel htmlFor='email'>Número</InputLabel>
            <OutlinedInput
              margin='normal'
              fullWidth
              id='number'
              name='number'
              autoComplete='number'
              type='number'
              placeholder='Escrever um número'
              value={number}
              onChange={(e) => setNumber(e.target.value)}
            />
          </div>
          <div className={styles.filterContainer}>
            <InputLabel htmlFor='email'>Cliente</InputLabel>
            <OutlinedInput
              margin='normal'
              fullWidth
              id='client'
              name='client'
              autoComplete='client'
              placeholder='Escrever um nome'
              value={client}
              onChange={(e) => setClient(e.target.value)}
            />
          </div>
          <div className={styles.filterContainer}>
            <InputLabel htmlFor='Categoria'>Categoria</InputLabel>
            <Select
              labelId='Categoria'
              id='Categoria'
              fullWidth
              value={category}
              onChange={(e) => setCategory(e.target.value)}
            >
              <MenuItem value={'all'} disabled>
                Selecionar uma categoria
              </MenuItem>
              <MenuItem value={'Categoria 1'}>Categoria 1</MenuItem>
              <MenuItem value={'Categoria 2'}>Categoria 2</MenuItem>
              <MenuItem value={'Categoria 3'}>Categoria 3</MenuItem>
            </Select>
          </div>
          <div className={styles.filterContainer}>
            <InputLabel htmlFor='Stock'>Stock</InputLabel>
            <Select
              labelId='Stock'
              id='Stock'
              fullWidth
              value={stock}
              onChange={(e) => setStock(e.target.value)}
            >
              <MenuItem value={'all'} disabled>
                Selecionar uma estado de stock
              </MenuItem>
              <MenuItem value={'Disponivel'}>Disponivel</MenuItem>
              <MenuItem value={'Indisponivel'}>Indisponivel</MenuItem>
            </Select>
          </div>
        </div>
        <div
          style={{
            width: 'fit-content',
            marginLeft: 'auto',
            paddingTop: '1rem'
          }}
        >
          <PrimaryBtn text='Limpar' light onClick={ClearFilters} />
        </div>
      </Content>
      {/* Orders */}
      <Content>
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <div>
            <h3>Encomendas</h3>
          </div>
          <div style={{ marginLeft: 'auto' }}>
            <Pagination count={5} page={page} onChange={handleChangePage} siblingCount={0} color="primary" className={'pagination'} /></div>
        </div>
        <CustomTable
          columns={[
            'Número',
            'Categoria',
            'Stock',
            'Produção',
            'Em Distribuição',
            'Ações'
          ]}
        >
          <tr key={'i'} className='tdLinks'>
            <td data-label='Name' className='link'>
              Número
            </td>
            <td data-label='Categoria'>Categoria</td>
            <td data-label='Stock'>Stock</td>
            <td data-label='Produção'>Produção</td>
            <td data-label='Em Distribuição'>Em Distribuição</td>
            <td data-label='Ações'>
              <Edit className='link' />
              <Trash className='link' />
            </td>
          </tr>
        </CustomTable>
      </Content>
    </Grid>
  )
}
export default HomeScreen
