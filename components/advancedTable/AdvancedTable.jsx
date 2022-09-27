/* eslint-disable no-return-assign */
/* eslint-disable array-callback-return */
/* eslint-disable no-case-declarations */
// Node modules
import Router from 'next/router';
import React, { useEffect, useState } from 'react';

//  PropTypes
import PropTypes from 'prop-types';

//  Material Ui
import {
  Box, ButtonGroup, Chip, Grid,
  IconButton,
  Paper,
  Popover,
  Switch,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow,
  TableSortLabel,
  Tooltip
} from '@mui/material';

//  Icons
import { Edit, Filter, MoreVertical, Trash } from 'lucide-react';

//  Utlis
import { FilterItem } from '../utils/FilterItem';
import { MultiFilterArray } from '../utils/MultiFilterArray';

//  Services

//  Dialogs
import ConfirmDialog from '../dialogs/ConfirmDialog';
import Notification from '../dialogs/Notification';

import { toast } from 'react-toastify';
import * as CategoriesActions from '../../pages/api/actions/category';
import * as ClientsActions from '../../pages/api/actions/client';
import * as UserActions from '../../pages/api/actions/user';

import routes from '../../navigation/routes';

const AdvancedTable = ({
  children,
  rows,
  headCells,
  headCellsUpper,
  clickRoute,
  noPagination,
  editRoute,
  filters }) => {
  const [order, setOrder] = useState('asc');
  const [orderBy, setOrderBy] = useState();
  const [selected, setSelected] = useState([]);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [filteredItems, setFilteredItems] = useState(rows);
  const [data, setData] = useState({});
  const [deleteItemId, setDeleteItemId] = useState();
  const [dialogOpen, setDialogOpen] = useState(false);
  const [dialogMessage, setDialogMessage] = useState('');
  const [anchorEl, setAnchorEl] = useState(null);
  const [cellsFilter, setCellsFilter] = useState(headCells)
  const [refresh, setRefresh] = useState(new Date())

  useEffect(() => {
    const getData = async () => {
      const categories = await CategoriesActions.categories()
      const clients = await ClientsActions.clients()

      const allData = {
        categories: categories.data.payload.data,
        clients: clients.data.payload.data,
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

    function Test() {

      cellsFilter.map((cell, i) => {
        const oldState = cellsFilter;
        const newState = cellsFilter[i]

        newState.show = true;
        oldState[i] = newState;
        setCellsFilter(oldState)
      })
    }

    Test();
  }, []);

  function onDeleteClick(row) {
    setDialogOpen(true);

    if (Router.asPath.includes('orders')) setDeleteItemId(row.numEncomenda);
    else setDeleteItemId(row.id);
  }



  function OnFilterChange(i) {
    const oldState = cellsFilter;
    const newState = cellsFilter[i]

    newState.show = !newState.show;
    oldState[i] = newState;
    setCellsFilter(oldState)
    setRefresh(new Date())
  }

  function showAllHeaders() {
    cellsFilter.map((cell, i) => {
      const oldState = cellsFilter;
      const newState = cellsFilter[i]

      newState.show = true;
      oldState[i] = newState;
      setCellsFilter(oldState)
      setRefresh(new Date())
    })
  }

  async function onDeleteItem() {
    const thisRow = rows.find(r => r.id === deleteItemId)

    switch (Router.route) {
      case routes.private.internal.users:
        const builtUser = {
          id: thisRow.id,
          nome: thisRow.nome,
          ativo: false,
          email: thisRow.email,
          telemovel: thisRow.telemovel,
          telefone: thisRow.telefone,
          paisCodigo: thisRow.paisCodigo,
          idPerfil: thisRow.perfil.id,
          morada: thisRow.morada,
          obs: thisRow.obs,
          otherData: thisRow.otherData,
        }

        try {
          await UserActions.saveUser(builtUser)
        } catch (err) { }

        break;

      case routes.private.internal.clients:
        const builtClient = {
          id: thisRow.id,
          email: thisRow.email,
          giveName: thisRow.giveName,
          legalName: thisRow.legalName,
          address: thisRow.address,
          status: false,
          telephone: thisRow.telephone,
          buysTo: thisRow.organization.id,
          otherData: thisRow.otherData,
          obs: thisRow.obs,
          contact: thisRow.contact,
          taxId: thisRow.taxId,
          postalCode: thisRow.postalCode,

        }

        try {
          await ClientsActions.saveClient(builtClient);
        } catch (err) { }

        break;
      default:
        break;
    }

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
                <div style={{ display: 'flex', alignItems: 'center' }}>

                  {headCell.label}
                  {orderBy === headCell.id ? <Box component='span'></Box> : null}

                </div>
              </TableCell>
            )
            )}
          </>
        ) : null}

        <TableRow id={refresh}>
          {cellsFilter.map((headCell) => {
            return headCell.show && <TableCell
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
          }

          )}
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
    <Box id={refresh} sx={{ width: '100%' }}>
      <ConfirmDialog
        open={dialogOpen}
        handleClose={() => setDialogOpen(false)}
        onConfirm={() => onDeleteItem()}
        message={dialogMessage}
      />
      <Notification />
      <Paper sx={{ width: '100%', mb: 2 }}>
        <Box className='tableChips'>
          <Box>
            {Object.keys(filters || {}).map((x, i) => {
              if (filters[x]) return <Chip key={i} label={x} onDelete={() => console.log('deleted')} />
            })}

          </Box>
          {noPagination ? null : (
            <TablePagination
              showFirstButton
              showLastButton
              component='div'
              sx={{ marginLeft: 'auto' }}
              rowsPerPageOptions={[5, 10, 25]}
              count={filteredItems ? filteredItems.length : rows.length}
              rowsPerPage={rowsPerPage}
              page={page}
              onPageChange={handleChangePage}
              onRowsPerPageChange={handleChangeRowsPerPage}
              labelRowsPerPage={'Mostrar'}
            />
          )}
          <Box>

            <Tooltip title='Filtrar tabela'>
              <IconButton style={{ marginLeft: 'auto' }} onClick={(e) => setAnchorEl(e.currentTarget)}>
                <Filter size={20} strokeWidth={1.5} />
              </IconButton>
            </Tooltip>
          </Box>
          <Popover
            open={Boolean(anchorEl)}
            anchorEl={anchorEl}
            onClose={() => setAnchorEl(null)}
            anchorOrigin={{
              vertical: 'top',
              horizontal: 'left',
            }}
          >
            <Box p={1}>
              <Grid container>
                <Grid id={refresh}>
                  <Grid id='align' container Item sx={{ borderBottom: '1px solid'}}>
                    <Switch checked={!cellsFilter.find(item => item.show === false)} onClick={() => showAllHeaders()} />Mostrar todas
                  </Grid>
                  {cellsFilter.map((headCell, i) => {
                    return <Grid id='align' container item key={i} >
                      <Switch checked={headCell.show} onClick={() => OnFilterChange(i)} />{headCell.label}
                    </Grid>
                  })}
                </Grid>
              </Grid>
            </Box>
          </Popover>
        </Box>


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
                        {cellsFilter.map((headCell) => {
                          return headCell.show && <TableCell
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
                              <ButtonGroup>
                                <Tooltip title='Editar'>
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
                                <Tooltip title='Remover'>
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
                              </ButtonGroup>
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
                                  row,
                                  headCell.id
                                )}
                              </div>
                            )}
                          </TableCell>
                        })}
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
