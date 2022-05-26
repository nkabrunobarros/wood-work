//  Nodes
import React, { useEffect, useState } from 'react'
import CssBaseline from '@mui/material/CssBaseline'

import PropTypes from 'prop-types'

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
import {
  InputLabel,
  MenuItem,
  OutlinedInput,
  Pagination,
  Select
} from '@mui/material'

import styles from '../../../styles/Home.module.css'
import CustomTable from '../../table/table'

const PaginateItemsPerPage = (array, pageSize, pageNumber) => {
  const output = Object.keys(array).sort((a, b) => b - a)
  const arrayLenght = parseInt(output[0]) + 1
  const data = {
    array: array.slice(pageNumber * pageSize, pageNumber * pageSize + pageSize),
    showingMin: pageNumber * pageSize + 1,
    showingMax: (pageNumber * pageSize + pageSize) < arrayLenght ? pageNumber * pageSize + pageSize : arrayLenght
  }
  return data
}

const displayWithStyle = (text) => {
  //  Keywords for styling text
  const errorKeywords = ['Não', 'Não Iniciada', 'Indisponível', 'Indisponível']
  const successKeywords = ['Entregue', 'Terminada', 'Disponível']
  const warningKeywords = ['Iniciada', 'Em Curso']

  //  Find if the text match's with any of the keywords
  const resError = errorKeywords.find((keywork) => keywork === text)
  const resSuccess = successKeywords.find((keywork) => keywork === text)
  const resWarning = warningKeywords.find((keywork) => keywork === text)

  //  If match res is something else undefined && case undefined return default text
  if (resError !== undefined) return (<a className="errorBalloon">{text} </a>)
  if (resSuccess !== undefined) return (<a className="successBalloon">{text} </a>)
  if (resWarning !== undefined) return (<a className="warningBalloon">{text} </a>)
  return (text)
}

const HomeScreen = ({ ...props }) => {
  const { orders, categories } = props

  const getCategory = (categoryId) => {
    const { find } = require('lodash')
    const category = find(categories, { id: categoryId })
    return `${category.title}[${category.id}]`
  }
  //  States
  const [number, setNumber] = useState('')
  const [client, setClient] = useState('')
  const [category, setCategory] = useState('')
  const [stock, setStock] = useState('')

  const [page, setPage] = useState(1)
  const [entries, setEntries] = useState(5)
  const [totalPages, setTotalPages] = useState(0)
  const [showingMin, setShowingMin] = useState(0)
  const [showingMax, setShowingMax] = useState(entries)

  const [itemsPerPage, setItemsPerPage] = useState([])
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
    setCategory('')
    setStock('')
  }

  const handleChangePage = (event, value) => {
    setPage(value)
  }

  useEffect(() => {
    const calculatePages = () => {
      const numPages = Math.ceil(orders.length / entries)
      setTotalPages(numPages)
      const res = PaginateItemsPerPage(orders, entries, (page - 1))
      setItemsPerPage(res.array)
      setShowingMax(res.showingMax)
      setShowingMin(res.showingMin)
    }
    calculatePages()
  }, [entries, page])

  return (
    <Grid component='main'>
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
              <MenuItem value={''} disabled>
                Selecionar uma categoria
              </MenuItem>
              {categories.map(item => (
                <MenuItem key={item.id} value={item.id}>{item.title}[{item.id}]</MenuItem>
              ))}
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
              <MenuItem value={''} disabled>
                Selecionar uma estado de stock
              </MenuItem>
              <MenuItem value={'Disponivel'}>Disponível</MenuItem>
              <MenuItem value={'Indisponivel'}>Indisponível</MenuItem>
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
          <div
            style={{
              marginLeft: 'auto',
              display: 'flex',
              alignItems: 'center',
              color: 'var(--grayTexts)',
              fontSize: 'small'
            }}
          >
            Visualizar
            <Select
              value={entries}
              onChange={(e) => setEntries(e.target.value)}
            >
              <MenuItem value={5}>5</MenuItem>
              <MenuItem value={10}>10</MenuItem>
              <MenuItem value={15}>15</MenuItem>
            </Select>
            {''} Items
            <div className='spacer'>|</div>
            Mostrar {showingMin} a {showingMax} de {Object.keys(orders).length} items
            <div className='spacer'></div>
            <Pagination
              count={totalPages}
              page={page}
              onChange={handleChangePage}
              siblingCount={0}
              color='primary'
              className={'pagination'}
            />
          </div>
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
          {itemsPerPage
            .map((item, i) => (
            <tr key={item.id}>
              <td data-label='Nome' className='link'>
                Nº {item.id}
              </td>
              <td data-label='Categoria'> {getCategory(item.category)} </td>
              <td data-label='Stock'> {displayWithStyle(item.stock)}</td>
              <td data-label='Produção'>{displayWithStyle(item.production)} </td>
              <td data-label='Em Distribuição'>{displayWithStyle(item.distribution)}</td>
              <td data-label='Ações'>
                <Edit className='link' />
                <Trash className='link' />
              </td>
            </tr>
            ))}
        </CustomTable>
      </Content>
    </Grid>
  )
}
HomeScreen.propTypes = {
  orders: PropTypes.array,
  categories: PropTypes.array
}
export default HomeScreen
