//  Nodes
import React, { useEffect, useState } from 'react'
import CssBaseline from '@mui/material/CssBaseline'

import PropTypes from 'prop-types'

import Grid from '@mui/material/Grid'
import CustomBreadcrumbs from '../../breadcrumbs'
import { Eye, Filter, X } from 'lucide-react'
import Content from '../../content/content'
import {
  Autocomplete,
  Button,
  ButtonGroup,
  MenuItem,
  Pagination,
  Select,
  TextField
} from '@mui/material'

import CustomTable from '../../table/table'
import Router from 'next/router'
import PaginateItemsPerPage from '../../utils/PaginateItemsPerPage'
import displayWithStyle from '../../utils/displayTextWithStyle'
import PrimaryBtn from '../../buttons/primaryBtn'

const OrdersScreen = ({ ...props }) => {
  const { items, tableCols, breadcrumbsPath, detailPage } = props

  // eslint-disable-next-line react/prop-types
  const DisplayCol = (col, item, index) => {
    if (item[`${col}`] < 0 && (col === 'desvio' || col === 'desvio2')) {
      return (
        <a className='successBalloon'>
          {item[`${col}`]} {Number.isInteger(item[`${col}`]) ? 'horas' : null}
        </a>
      )
    } else if (item[`${col}`] > 0 && (col === 'desvio' || col === 'desvio2')) {
      return (
        <a className='errorBalloon'>
          {item[`${col}`]} {Number.isInteger(item[`${col}`]) ? 'horas' : null}
        </a>
      )
    } else if (
      item[`${col}`] === 0 &&
      (col === 'desvio' || col === 'desvio2')
    ) {
      return (
        <a className='warningBalloon'>
          {item[`${col}`]} {Number.isInteger(item[`${col}`]) ? 'horas' : null}
        </a>
      )
    }

    if (index === 0) {
      return (
        <a className='link'>
          Nº {displayWithStyle(item[`${col}`])}{' '}
          {Number.isInteger(item[`${col}`]) ? 'horas' : null}
        </a>
      )
    }
    switch (col) {
      case 'ações':
        return <Eye className='link' />
      default:
        return (
          <a>
            {displayWithStyle(item[`${col}`])}{' '}
            {Number.isInteger(item[`${col}`]) ? 'horas' : null}
          </a>
        )
    }
  }
  //  States Pagination
  const [page, setPage] = useState(1)
  const [entries, setEntries] = useState(5)
  const [totalPages, setTotalPages] = useState(0)
  const [showingMin, setShowingMin] = useState(0)
  const [showingMax, setShowingMax] = useState(entries)
  const [itemsPerPage, setItemsPerPage] = useState([])
  //  Modal State
  const [modal, setModal] = useState(false)
  // Filters States
  const [client, setClient] = useState('')
  const [woodType, setWoodType] = useState('')
  const [totalTime, setTotalTime] = useState('')
  const [orderId, setOrderId] = useState('')
  const [product, setProduct] = useState('')
  const [totalArea, setTotalArea] = useState('')
  const [cost, setCost] = useState('')
  const [operation, setOperation] = useState('')

  const handleChangePage = (event, value) => {
    setPage(value)
  }
  const handleClick = (event) => {
    setModal(!modal)
  }
  const onClientChange = (value) => {
    console.log(value)
    if (value === null) setClient('')
    else setClient(value)
  }
  const onWoodTypeChange = (value) => {
    console.log(value)
    if (value === null) setWoodType('')
    else setWoodType(value)
  }
  const onProductChange = (value) => {
    console.log(value)
    if (value === null) setProduct('')
    else setProduct(value)
  }
  const onOperationChange = (value) => {
    console.log(value)
    if (value === null) setOperation('')
    else setOperation(value)
  }

  const ApplyFilters = () => {
    // Set Filters
    setModal(!modal)
  }
  const ClearFilters = () => {
    setClient(null)
    setWoodType(null)
    setProduct(null)
    setOperation(null)
    setTotalTime('')
    setOrderId('')
    setTotalArea('')
    setCost('')
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
      {/* Orders */}
      <Content>
        <div id='pad' className='flex' style={{ alignItems: 'center' }}>
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
            {modal
              ? (
              <div className='filterPopupMain'>
                <h2 className='black' style={{ marginLeft: '1rem' }}>
                  Filtros
                  <Button sx={{ float: 'right' }} onClick={handleClick}>
                    <X />
                  </Button>
                </h2>
                <div
                  style={{
                    display: 'flex',
                    flex: 1
                  }}
                >
                  <div className='filterPopupCol'>
                    <Autocomplete
                      id='country-select-demo'
                      options={items}
                      autoHighlight
                      value={client}
                      onChange={(event, value) => onClientChange(value)}
                      getOptionLabel={(option) => option.nome}
                      renderInput={(params) => (
                        <TextField
                          variant='standard'
                          {...params}
                          value={client}
                          label='Cliente'
                        />
                      )}
                    />
                    <Autocomplete
                      id='country-select-demo'
                      options={items}
                      autoHighlight
                      value={woodType}
                      onChange={(event, value) => onWoodTypeChange(value)}
                      getOptionLabel={(option) => option.nome}
                      renderInput={(params) => (
                        <TextField
                          variant='standard'
                          {...params}
                          value={woodType}
                          label='Tipo de Madeira'
                        />
                      )}
                    />
                    <TextField
                      id='standard-basic'
                      label='Tempo total'
                      variant='standard'
                      value={totalTime}
                      onChange={(e) => setTotalTime(e.target.value)}
                    />
                    <TextField
                      id='standard-basic'
                      label='Nº de Encomenda'
                      variant='standard'
                      value={orderId}
                      onChange={(e) => setOrderId(e.target.value)}
                    />
                  </div>
                  <div className='filterPopupCol'>
                    <Autocomplete
                      id='country-select-demo'
                      options={items}
                      autoHighlight
                      getOptionLabel={(option) => option.nome}
                      value={product}
                      onChange={(event, value) => onProductChange(value)}
                      renderInput={(params) => (
                        <TextField
                          variant='standard'
                          {...params}
                          label='Produto'
                          value={product}
                        />
                      )}
                    />
                    <TextField
                      id='standard-basic'
                      label='Area total'
                      variant='standard'
                      value={totalArea}
                      onChange={(e) => setTotalArea(e.target.value)}
                    />
                    <TextField
                      id='standard-basic'
                      label='Custo'
                      variant='standard'
                      value={cost}
                      onChange={(e) => setCost(e.target.value)}
                    />
                    <Autocomplete
                      id='country-select-demo'
                      options={items}
                      autoHighlight
                      onChange={(event, value) => onOperationChange(value)}
                      value={operation}
                      getOptionLabel={(option) => option.nome}
                      renderInput={(params) => (
                        <TextField
                          variant='standard'
                          {...params}
                          label='Operação'
                          value={operation}
                        />
                      )}
                    />
                  </div>
                </div>
                <div id='pad'>
                  <ButtonGroup>
                    <PrimaryBtn text='Aplicar Filtros' onClick={ApplyFilters} />
                    <PrimaryBtn
                      text='Redefinir'
                      light
                      noBorder
                      onClick={ClearFilters}
                    />
                  </ButtonGroup>
                </div>
              </div>
                )
              : null}
            <Button onClick={handleClick}>
              <Filter />
            </Button>
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
            Mostrar {showingMin} a {showingMax} de {Object.keys(items).length}{' '}
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
        <div className='scrollableX'>
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
        </div>
      </Content>

      {/* <br></br>
      {JSON.stringify(client)}
      <br></br>
      {JSON.stringify(woodType)}
      <br></br>
      {JSON.stringify(totalTime)}
      <br></br>
      {JSON.stringify(orderId)}
      <br></br>
      {JSON.stringify(product)}
      <br></br>
      {JSON.stringify(totalArea)}
      <br></br>
      {JSON.stringify(cost)}
      <br></br>
      {JSON.stringify(operation)} */}
    </Grid>
  )
}
OrdersScreen.propTypes = {
  items: PropTypes.array,
  tableCols: PropTypes.array,
  panelsInfo: PropTypes.object,
  breadcrumbsPath: PropTypes.array,
  detailPage: PropTypes.string
}
export default OrdersScreen
