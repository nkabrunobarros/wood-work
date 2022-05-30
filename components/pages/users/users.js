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
import { MenuItem, Pagination, Select } from '@mui/material'
import PaginateItemsPerPage from '../../utils/PaginateItemsPerPage'

const DisplayCol = (col, item, index) => {
  if (index === 0) return <a className='link'>{item[`${col}`]}</a>
  switch (col) {
    case 'ações':
      return (
        <>
          <Edit className='link' />
          <Trash className='link' />
        </>
      )
    default:
      return <a>{item[`${col}`]}</a>
  }
}

const Users = ({ ...props }) => {
  const { items, breadcrumbsPath, tableCols } = props
  const [page, setPage] = useState(1)
  const [entries, setEntries] = useState(5)
  const [totalPages, setTotalPages] = useState(0)
  const [showingMin, setShowingMin] = useState(0)
  const [showingMax, setShowingMax] = useState(entries)

  const [itemsPerPage, setItemsPerPage] = useState([])

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
    <Grid component='main' sx={{ height: '100%' }}>
      <CssBaseline />
      <CustomBreadcrumbs path={breadcrumbsPath} />
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
              Mostrar {showingMin} a {showingMax} de {Object.keys(items).length} {' '}
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
          {itemsPerPage.map((item, i) => (
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
  itemsPerPage: PropTypes.array
}
export default Users
