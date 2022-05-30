//  Nodes
import React, { useEffect, useState } from 'react'
import CssBaseline from '@mui/material/CssBaseline'

import PropTypes from 'prop-types'

import Grid from '@mui/material/Grid'
import CustomBreadcrumbs from '../../breadcrumbs'
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

import styles from '../../../styles/Orders.module.css'
import CustomTable from '../../table/table'
import Router from 'next/router'
import PaginateItemsPerPage from '../../utils/PaginateItemsPerPage'
import displayWithStyle from '../../utils/displayTextWithStyle'
import getCategory from '../../utils/getCategory'

const OrdersScreen = ({ ...props }) => {
  const {
    items,
    categories,
    panelsInfo,
    tableCols,
    breadcrumbsPath,
    detailPage
  } = props

  // eslint-disable-next-line react/prop-types
  const DisplayCol = (col, item, index) => {
    if (col === 'em distribuição') {
      return <a>{displayWithStyle(item.distribuição)}</a>
    } else if (index === 0) {
      return <a className='link'>{displayWithStyle(item[`${col}`])}</a>
    }
    switch (col) {
      case 'categoria':
        return <a>{getCategory(item[`${col}`])}</a>
      case 'ações':
        return (
          <>
            <Edit className='link' />
            <Trash className='link' />
          </>
        )
      default:
        return <a>{displayWithStyle(item[`${col}`])}</a>
    }
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
      const numPages = Math.ceil(items.length / entries)
      setTotalPages(numPages)
      const res = PaginateItemsPerPage(items, entries, page - 1)
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
      {panelsInfo
        ? (
        <div
          style={{
            display: 'flex',
            flexWrap: 'wrap',
            justifyContent: 'space-between',
            padding: 0
          }}
        >
          <InfoCard
            amount={panelsInfo.budgeting}
            color={'var(--primary)'}
            icon={<PackageCheck size={40} />}
            title={'Em Orçamentação'}
          />
          <InfoCard
            amount={panelsInfo.drawing}
            color={'var(--green)'}
            icon={<LayoutTemplate size={40} />}
            title={'Em Desenho'}
          />
          <InfoCard
            amount={panelsInfo.production}
            color={'var(--orange)'}
            icon={<Layers size={40} />}
            title={'Em Produção'}
          />
          <InfoCard
            amount={panelsInfo.concluded}
            color={'var(--babyblue)'}
            icon={<AlertOctagon size={40} />}
            title={'Concluidas'}
          />
        </div>
          )
        : null}

      {/* Filters */}
      <Content>
        <div id='pad'>
          <a className='headerTitleSm'>Filtros</a>
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
                {categories.map((item) => (
                  <MenuItem key={item.id} value={item.id}>
                    {item.title}[{item.id}]
                  </MenuItem>
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
        </div>
      </Content>
      {/* Orders */}
      <Content>
        <div
          id='pad'
          className='flex'
          style={{ display: 'flex', alignItems: 'center' }}
        >
          <div>
            <a className='headerTitleXl'>{breadcrumbsPath[0].title}</a>
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
            Itens
            <div className='spacer'>|</div>
            Mostrar {showingMin} a {showingMax} de {Object.keys(items).length} {' '}
            itens
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
          <Pagination
            count={totalPages}
            page={page}
            onChange={handleChangePage}
            siblingCount={0}
            color='primary'
            className={'pagination mobile'}
          />
        </div>
        <CustomTable columns={tableCols}>
          {itemsPerPage.map((item, i) => (
            <tr
              key={item.numero}
              onClick={() =>
                Router.push({ pathname: `${detailPage}${item.numero}` })
              }
            >
              {tableCols.map((element, i) => (
                <td key={element.id} data-label={tableCols[i].toUpperCase()}>
                  {DisplayCol(element, item, i)}
                </td>
              ))}
            </tr>
          ))}
        </CustomTable>
      </Content>
    </Grid>
  )
}
OrdersScreen.propTypes = {
  items: PropTypes.array,
  categories: PropTypes.array,
  tableCols: PropTypes.array,
  panelsInfo: PropTypes.object,
  breadcrumbsPath: PropTypes.array,
  detailPage: PropTypes.string
}
export default OrdersScreen
