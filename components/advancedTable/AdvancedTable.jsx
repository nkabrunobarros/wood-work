// Node modules
import React, { useState } from 'react';
//  PropTypes
import PropTypes from 'prop-types';
import {
  Box,
  IconButton,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow,
  TableSortLabel,
  Tooltip,
} from '@mui/material';
import { Edit, Trash } from 'lucide-react';
import { FilterItem } from '../utils/FilterItem';
import Router from 'next/router';
const AdvancedTable = ({
  rows,
  headCells,
  headCellsUpper,
  clickRoute,
  noPagination,
  editRoute
}) => {
  const [order, setOrder] = useState('asc');
  const [orderBy, setOrderBy] = useState('calories');
  const [selected, setSelected] = useState([]);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  function EnhancedTableHead(props) {
    const { order, orderBy, onRequestSort } = props;
    const createSortHandler = (property) => (event) => {
      onRequestSort(event, property);
    };

    return (
      <TableHead>
        {headCellsUpper ? (
          <>
            {headCellsUpper.map((headCell) => (
              <TableCell
                colSpan={headCell.span}
                key={headCell.id}
                align={headCell.numeric ? 'right' : 'left'}
                padding={headCell.disablePadding ? 'none' : 'normal'}
                sortDirection={orderBy === headCell.id ? order : false}
                sx={{
                  borderRight: headCell.borderRight
                    ? '1px solid var(--grayEdges)'
                    : null,
                  borderLeft: headCell.borderLeft
                    ? '1px solid var(--grayEdges)'
                    : null,
                  backgroundColor: 'var(--grayBG)',
                }}
              >
                {headCell.label}
                {orderBy === headCell.id ? <Box component='span'></Box> : null}
              </TableCell>
            ))}
          </>
        ) : null}

        <TableRow>
          {headCells.map((headCell) => (
            <TableCell
              colSpan={headCell.span}
              key={headCell.id}
              align={headCell.numeric ? 'right' : 'left'}
              padding={headCell.disablePadding ? 'none' : 'normal'}
              sortDirection={orderBy === headCell.id ? order : false}
              sx={{
                borderRight: headCell.borderRight
                  ? '1px solid var(--grayEdges)'
                  : null,
                borderLeft: headCell.borderLeft
                  ? '1px solid var(--grayEdges)'
                  : null,
                backgroundColor: 'var(--grayBG)',
              }}
            >
              <TableSortLabel
                active={orderBy === headCell.id}
                direction={orderBy === headCell.id ? order : 'asc'}
                onClick={createSortHandler(headCell.id)}
              >
                {headCell.label}
                {orderBy === headCell.id ? <Box component='span'></Box> : null}
              </TableSortLabel>
            </TableCell>
          ))}
        </TableRow>
      </TableHead>
    );
  }
  EnhancedTableHead.propTypes = {
    numSelected: PropTypes.number.isRequired,
    onRequestSort: PropTypes.func.isRequired,
    order: PropTypes.oneOf(['asc', 'desc']).isRequired,
    orderBy: PropTypes.string.isRequired,
    rowCount: PropTypes.number.isRequired,
    headCellsUpper: PropTypes.array,
  };

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  const handleClick = (event, name) => {
    const selectedIndex = selected.indexOf(name);
    let newSelected = [];

    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, name);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1));
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
        selected.slice(0, selectedIndex),
        selected.slice(selectedIndex + 1)
      );
    }

    setSelected(newSelected);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const isSelected = (name) => selected.indexOf(name) !== -1;

  const emptyRows =
    page > 0 ? Math.max(0, (1 + page) * rowsPerPage - rows.length) : 0;
  function descendingComparator(a, b, orderBy) {
    if (b[orderBy] < a[orderBy]) {
      return -1;
    }
    if (b[orderBy] > a[orderBy]) {
      return 1;
    }
    return 0;
  }
  function getComparator(order, orderBy) {
    return order === 'desc'
      ? (a, b) => descendingComparator(a, b, orderBy)
      : (a, b) => -descendingComparator(a, b, orderBy);
  }
  function stableSort(array, comparator) {
    const stabilizedThis = array.map((el, index) => [el, index]);
    stabilizedThis.sort((a, b) => {
      const order = comparator(a[0], b[0]);
      if (order !== 0) {
        return order;
      }
      return a[1] - b[1];
    });
    return stabilizedThis.map((el) => el[0]);
  }
  return (
    <Box sx={{ width: '100%' }}>
      <Paper sx={{ width: '100%', mb: 2 }}>
        {noPagination ? null : (
          <TablePagination
            rowsPerPageOptions={[5, 10, 25]}
            component='div'
            count={rows.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
          />
        )}

        <TableContainer>
          <Table sx={{ minWidth: 750 }} aria-labelledby='tableTitle'>
            <EnhancedTableHead
              numSelected={selected.length}
              order={order}
              orderBy={orderBy}
              onRequestSort={handleRequestSort}
              rowCount={rows.length}
            />
            <TableBody>
              {stableSort(rows, getComparator(order, orderBy))
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((row, index) => {
                  const isItemSelected = isSelected(row.numero);
                  // const labelId = `enhanced-table-checkbox-${index}`;

                  return (
                    <TableRow
                      hover
                      onClick={(event) => handleClick(event, row.numero)}
                      role='checkbox'
                      aria-checked={isItemSelected}
                      tabIndex={-1}
                      key={row.name}
                      selected={isItemSelected}
                    >
                      {headCells.map((headCell) => (
                        <TableCell
                          key={headCell.id}
                          align={headCell.numeric ? 'right' : 'left'}
                          padding={headCell.disablePadding ? 'none' : 'normal'}
                          sx={{
                            borderRight: headCell.borderRight
                              ? '1px solid var(--grayEdges)'
                              : null,
                            borderLeft: headCell.borderLeft
                              ? '1px solid var(--grayEdges)'
                              : null,
                          }}
                        >
                          {headCell.id === 'actions' ? (
                            <>
                              <Tooltip title='Edit'>
                                <IconButton  onClick={() =>
                                clickRoute
                                  ? Router.push(`${editRoute}${row.id}`)
                                  : null
                              }>
                                  <Edit stroke-width="1" className='link' />
                                </IconButton>
                              </Tooltip>
                              <Tooltip title='Delete'>
                                <IconButton>
                                  <Trash stroke-width="1" className='link' />
                                </IconButton>
                              </Tooltip>
                            </>
                          ) : (
                            <div
                              onClick={() =>
                                clickRoute
                                  ? Router.push(`${clickRoute}${row.id}`)
                                  : null
                              }
                            >
                              {FilterItem(row[`${headCell.id}`], headCell.id)}
                            </div>
                          )}
                        </TableCell>
                      ))}
                    </TableRow>
                  );
                })}
              {emptyRows > 0 && (
                <TableRow>
                  <TableCell colSpan={6} />
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>
      </Paper>
    </Box>
  );
};
AdvancedTable.propTypes = {
  rows: PropTypes.array.isRequired,
  headCellsUpper: PropTypes.array,
  headCells: PropTypes.array.isRequired,
  children: PropTypes.any,
  clickRoute: PropTypes.any,
  editRoute: PropTypes.string,
  noPagination: PropTypes.boolean,
};

export default AdvancedTable;
