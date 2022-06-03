/* eslint-disable react/prop-types */
//  Nodes
import React, { useEffect, useState } from 'react'
import CssBaseline from '@mui/material/CssBaseline'

import Grid from '@mui/material/Grid'
import CustomBreadcrumbs from '../../breadcrumbs'

import Content from '../../content/content'
import PrimaryBtn from '../../buttons/primaryBtn'

//  PropTypes
import PropTypes from 'prop-types'
import CustomTable from '../../table/table'
import { Edit, Trash } from 'lucide-react'
import {
  Autocomplete,
  Box,
  InputLabel,
  MenuItem,
  OutlinedInput,
  Pagination,
  Select,
  TextField
} from '@mui/material'
import PaginateItemsPerPage from '../../utils/PaginateItemsPerPage'
const DisplayCol = (col, item, index) => {
  if (index === 0) return <a className='link'>{item[`${col}`]}</a>
  switch (col) {
    case 'ações':
      return (
        <>
          <Edit stroke-width="1" className='link' />
          <Trash stroke-width="1" className='link' />
        </>
      )
    default:
      return <a>{item[`${col}`]}</a>
  }
}

const Users = ({ ...props }) => {
  const { items, breadcrumbsPath, tableCols, countries } = props
  const [page, setPage] = useState(1)
  const [entries, setEntries] = useState(5)
  const [totalPages, setTotalPages] = useState(0)
  const [showingMin, setShowingMin] = useState(0)
  const [showingMax, setShowingMax] = useState(entries)
  const [itemsPerPage, setItemsPerPage] = useState([])

  //  States
  const [nome, setNome] = useState('')
  const [email, setEmail] = useState('')
  const [pais, setPais] = useState('')

  const handleChangePage = (event, value) => {
    setPage(value)
  }
  const ClearFilters = () => {
    setNome('')
    setEmail('')
    setPais('')
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

  const onCountryChange = (value) => {
    if (value === null) setPais('')
    else setPais(value.label)
  }
  const onNameChange = (value) => {
    console.log(value)
    if (value === null) setNome('')
    else setNome(value.nome)
  }

  return (
    <Grid component='main' sx={{ height: '100%' }}>
      <CssBaseline />
      <CustomBreadcrumbs path={breadcrumbsPath} />
      {/* Filters */}
      <Content>
        <div id='pad'>
          <a className='headerTitleSm'>Filtros</a>
          <div className='filters'>
            <div className='filterContainer'>
              <InputLabel htmlFor='email'>Nome</InputLabel>
              <Autocomplete
                id='country-select-demo'
                fullWidth
                options={items}
                autoHighlight
                getOptionLabel={(option) => option.nome}
                onChange={(event, value) => onNameChange(value)}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    placeholder='Escrever um mome'
                    value={nome}
                    onChange={(e) => setNome(e.target.value)}
                    inputProps={{
                      ...params.inputProps,
                      autoComplete: 'new-password' // disable autocomplete and autofill
                    }}
                  />
                )}
              />
            </div>
            <div className='filterContainer'>
              <InputLabel htmlFor='email'>Email</InputLabel>
              <OutlinedInput
                margin='normal'
                fullWidth
                id='email'
                name='email'
                autoComplete='email'
                placeholder='Escrever um email'
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className={'filterContainer'}>
              <InputLabel htmlFor='Categoria'>País</InputLabel>
              <Autocomplete
                id='country-select-demo'
                fullWidth
                options={countries}
                autoHighlight
                getOptionLabel={(option) => option.label}
                onChange={(event, value) => onCountryChange(value)}

                renderOption={(props, option) => (
                  <Box
                    component='li'
                    sx={{ '& > img': { mr: 2, flexShrink: 0 } }}
                    {...props}
                  >
                    <img
                      loading='lazy'
                      width='20'
                      src={`https://flagcdn.com/w20/${option.code.toLowerCase()}.png`}
                      srcSet={`https://flagcdn.com/w40/${option.code.toLowerCase()}.png 2x`}
                      alt=''
                    />
                    {option.label} ({option.code}) +{option.phone}
                  </Box>
                )}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    placeholder='Escrever um país'
                    value={pais}
                    inputProps={{
                      ...params.inputProps,
                      autoComplete: 'new-password' // disable autocomplete and autofill
                    }}
                  />
                )}
              />
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
              alignItems: 'end',
              flexDirection: 'column',
              color: 'var(--grayTexts)',
              fontSize: 'small'
            }}
          >
            <div>
              <PrimaryBtn text='Adicionar' />
            </div>

            <div id='align' className='flex'>
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
              items
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
          {itemsPerPage
            .filter(
              (item) =>
                item.nome.includes(nome) &&
                item.email.includes(email) &&
                item.pais.includes(pais)
            )
            .map((item, i) => (
              <tr key={item.id}>
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
Users.propTypes = {
  product: PropTypes.any,
  docs: PropTypes.arrayOf(PropTypes.object),
  itemsPerPage: PropTypes.array,
  countries: PropTypes.array
}
export default Users
