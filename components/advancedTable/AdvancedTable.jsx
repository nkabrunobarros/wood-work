// Node modules
import React, { useEffect, useState } from 'react';
import Router from 'next/router';

//  PropTypes
import PropTypes from 'prop-types';

//  Material Ui
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

//  Icons
import { Edit, Trash } from 'lucide-react';

//  Utlis
import { FilterItem } from '../utils/FilterItem';
import { MultiFilterArray } from '../utils/MultiFilterArray';

//  Services
import clientService from '../../services/clients/client-service';
import categoryService from '../../services/categories/category-service';
import productService from '../../services/products/product-service';

//  Dialogs
import ConfirmDialog from '../dialogs/ConfirmDialog';
import Notification from '../dialogs/Notification';

import { toast } from 'react-toastify';

const AdvancedTable = ({
  children,
  rows,
  headCells,
  headCellsUpper,
  clickRoute,
  noPagination,
  editRoute,
  filters,
  setRows //  SetItem from main wrapper component
}) => {

  const [order, setOrder] = useState('asc');
  const [orderBy, setOrderBy] = useState('calories');
  const [selected, setSelected] = useState([]);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [filteredItems, setFilteredItems] = useState(rows);
  const [data, setData] = useState({});

  const [deleteItemId, setDeleteItemId] = useState();

  const [dialogOpen, setDialogOpen] = useState(false);
  const [dialogMessage, setDialogMessage] = useState('');
  useEffect(() => {
    const getData = async () => {
      const categories = await categoryService.getAllCategories();
      const clients = await clientService.getAllClients();
      const products = await productService.getAllProducts();

      const allData = {
        categories: categories.data.data,
        clients: clients.data.data,
        products: products.data.data,
      };
      setData(allData);
    };
    getData();
    const BuildDeleteMessage = () => {
      if (Router.asPath.includes('/orders'))
        setDialogMessage(
          'Está prestes a apagar uma encomenda o que é irreversivel, tem certeza que quer continuar?'
        );
      if (Router.asPath.includes('/users'))
        setDialogMessage(
          'Está prestes a apagar um utilizador o que é irreversivel, tem certeza que quer continuar?'
        );
      if (Router.asPath.includes('/clients'))
        setDialogMessage(
          'Está prestes a apagar um cliente o que é irreversivel, tem certeza que quer continuar?'
        );
    };
    BuildDeleteMessage();
  }, []);

  function onDeleteClick(row) {
    setDialogOpen(true);
    if (Router.asPath.includes('orders')) setDeleteItemId(row.numEncomenda);
    else setDeleteItemId(row.id);
  }

  function onDeleteItem() {
    const oldRows = filteredItems;
    if (Router.asPath.includes('/orders')) {
      const newRows = oldRows.filter(
        (row) => !(row.numEncomenda === deleteItemId)
      );
      setFilteredItems(newRows);
    } else {
      const newRows = oldRows.filter((row) => !(row.id === deleteItemId))
      setFilteredItems(newRows);
    }
    setDialogOpen(false);
    toast.success('Removido com sucesso!');
  }

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
              width={headCell.width ? `${headCell.width}%` : null}
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
    page > 0 ? Math.max(0, (1 + page) * rowsPerPage - filteredItems.length) : 0;
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

  useEffect(() => {
    if (filters) {
      const filtered = MultiFilterArray(rows, filters);
      setFilteredItems(filtered);
    }
  }, [filters]);
  return (
    <Box sx={{ width: '100%' }}>
      <ConfirmDialog
        open={dialogOpen}
        handleClose={() => setDialogOpen(false)}
        onConfirm={() => onDeleteItem()}
        message={dialogMessage}
      />
      <Notification />
      <Paper sx={{ width: '100%', mb: 2 }}>
        {noPagination ? null : (
          <TablePagination
            rowsPerPageOptions={[5, 10, 25]}
            component='div'
            count={filteredItems ? filteredItems.length : rows.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
            labelRowsPerPage={'Visualizar '}
          />
        )}

        <TableContainer>
          <Table aria-labelledby='tableTitle'>
            <EnhancedTableHead
              numSelected={selected.length}
              order={order}
              orderBy={orderBy}
              onRequestSort={handleRequestSort}
              rowCount={filteredItems.length}
            />
            {children ? (
              <>{children}</>
            ) : (
              <TableBody>
                {stableSort(filteredItems, getComparator(order, orderBy))
                  .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  .map((row, index) => {
                    const isItemSelected = isSelected(row.numero);
                    const labelId = `enhanced-table-checkbox-${index}`;

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
                            id={labelId}
                            key={headCell.id}
                            align={headCell.numeric ? 'right' : 'left'}
                            padding={
                              headCell.disablePadding ? 'none' : 'normal'
                            }
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
                                  <IconButton
                                    onClick={() =>
                                      clickRoute
                                        ? Router.push(`${editRoute}${row.id}`)
                                        : null
                                    }
                                  >
                                    <Edit
                                      strokeWidth='1'
                                      className='link'
                                      size={20}
                                    />
                                  </IconButton>
                                </Tooltip>
                                <Tooltip title='Delete'>
                                  <IconButton
                                    onClick={() => onDeleteClick(row)}
                                  >
                                    <Trash
                                      strokeWidth='1'
                                      className='link'
                                      size={20}
                                    />
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
                                {FilterItem(
                                  data,
                                  row[`${headCell.id}`],
                                  headCell.id
                                )}
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
            )}
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
  noPagination: PropTypes.any,
  filters: PropTypes.any,
  setRows: PropTypes.any,
};

export default AdvancedTable;
