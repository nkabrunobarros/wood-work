/* eslint-disable react/prop-types */
/* eslint-disable consistent-return */
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
  IconButton, Paper,
  Popover,
  Skeleton,
  Switch,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow,
  TableSortLabel, Tooltip
} from '@mui/material';

//  Icons
import { DeleteOutline, EditOutlined } from '@mui/icons-material';
import { Filter } from 'lucide-react';

//  Utlis
import { FilterItem } from '../utils/FilterItem';
import { MultiFilterArray } from '../utils/MultiFilterArray';

//  Services
// import * as CategoriesActions from '../../pages/api/actions/category';

//  Dialogs
import ConfirmDialog from '../dialogs/ConfirmDialog';
import Notification from '../dialogs/Notification';

//  Navigation
import routes from '../../navigation/routes';

//  Utils
import { useSelector } from 'react-redux';
import CanDo from '../utils/CanDo';

const AdvancedTable = ({
  rows,
  headCells,
  headCellsUpper,
  clickRoute,
  actionId,
  noPagination,
  editRoute,
  filters,
  setFilters,
  rangeFilters,
  setRangeFilters,
  onDelete
}) => {
  const [order, setOrder] = useState('asc');
  const [orderBy, setOrderBy] = useState();
  const [selected, setSelected] = useState([]);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [filteredItems, setFilteredItems] = useState(rows);
  const [data, setData] = useState({});
  const [deleteItemId, setDeleteItemId] = useState();
  const [dialogOpen, setDialogOpen] = useState(false);
  const [dialogMessage, setDialogMessage] = useState('');
  const [anchorEl, setAnchorEl] = useState(null);
  const [cellsFilter, setCellsFilter] = useState(headCells);
  const [refresh, setRefresh] = useState(new Date());
  const [loaded, setLoaded] = useState(true);
  const [displaying, setDisplaying] = useState();
  const reduxState = useSelector((state) => state);

  useEffect(() => {
    const getData = async () => {
      const allData = {
        categories: [],
        // categories: categories.data.payload.data,
        clients: reduxState.clients?.data
      };

      setData(allData);
    };

    const getWhatDisplaying = () => {
      switch (Router.route) {
      case routes.private.internal.projects:
        setDisplaying('projects');

        break;
      case routes.private.internal.projectsSimilar:
        setDisplaying('projects');
        setDialogMessage('Está prestes a apagar um projeto o que é irreversivel, tem certeza que quer continuar?');

        break;
      case routes.private.internal.stocks:
        setDisplaying('stocks');

        break;
      case routes.private.internal.clients:
        setDisplaying('clients');
        setDialogMessage('Está prestes a apagar um cliente o que é irreversivel, tem certeza que quer continuar?');

        break;
      case routes.private.internal.workers:
        setDisplaying('workers');
        setDialogMessage('Está prestes a apagar um utilizador o que é irreversivel, tem certeza que quer continuar?');

        break;
      }
    };

    function RebuildHeadCellsWithFilterState () {
      cellsFilter.map((cell, i) => {
        const oldState = cellsFilter;
        const newState = cellsFilter[i];

        newState.show = true;
        oldState[i] = newState;
        setCellsFilter(oldState);
      });
    }

    Promise.all([getData(), RebuildHeadCellsWithFilterState(), getWhatDisplaying()]).then(() => setLoaded(true));
  }, []);

  function onDeleteClick (row) {
    setDialogOpen(true);

    if (Router.asPath.includes('orders')) setDeleteItemId(row.id);
    else setDeleteItemId(row.id);
  }

  function OnFilterChange (i) {
    const oldState = cellsFilter;
    const newState = cellsFilter[i];

    newState.show = !newState.show;
    oldState[i] = newState;
    setCellsFilter(oldState);
    setRefresh(new Date());
  }

  function showAllHeaders () {
    cellsFilter.map((cell, i) => {
      const oldState = cellsFilter;
      const newState = cellsFilter[i];

      newState.show = true;
      oldState[i] = newState;
      setCellsFilter(oldState);
      setRefresh(new Date());
    });
  }

  function EnhancedTableHead (props) {
    const { order, orderBy, onRequestSort } = props;

    const createSortHandler = (property) => (event) => {
      onRequestSort(event, property);
    };

    return (
      <TableHead>
        {headCellsUpper
          ? (
            <>
              {headCellsUpper.map((headCell) => (
                <TableCell
                  colSpan={headCell.span}
                  key={headCell.id}
                  align={headCell.numeric ? 'right' : 'left'}
                  padding={headCell.disablePadding ? 'none' : 'normal'}
                  sortDirection={orderBy === headCell.id ? order : false}
                  color={'palette.background.default'}
                  sx={{
                    backgroundColor: 'primary.main',
                    color: 'white',
                    borderRight: headCell.borderRight
                      ? '1px solid var(--grayEdges)'
                      : null,
                    borderLeft: headCell.borderLeft
                      ? '1px solid var(--grayEdges)'
                      : null,
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center' }}>
                    {loaded
                      ? <>
                        {headCell.label}
                        {orderBy === headCell.id ? <Box component='span'></Box> : null}
                      </>
                      : <Skeleton animation="wave" width='100%' />
                    }
                  </div>
                </TableCell>
              )
              )}
            </>
          )
          : null
        }

        <TableRow sx={{ backgroundColor: 'primary.main' }} >
          {cellsFilter.map((headCell) => {
            return headCell.show && <TableCell
              key={headCell.id}
              colSpan={headCell.span}
              align={headCell.numeric ? 'right' : 'left'}
              padding={headCell.disablePadding ? 'none' : 'normal'}
              sortDirection={orderBy === headCell.id ? order : false}
              width={headCell.width && `${headCell.width}%`}
              sx={{
                borderRight: headCell.borderRight
                  ? '1px solid var(--grayEdges)'
                  : null,
                borderLeft: headCell.borderLeft
                  ? '1px solid var(--grayEdges)'
                  : null,
              }}
            >
              <TableSortLabel
                active={orderBy === headCell.id}
                direction={orderBy === headCell.id ? order : 'asc'}
                onClick={createSortHandler(headCell.id)}
                sx={{ width: '100%', height: '100%', color: 'white' }}
              >
                {loaded
                  ? <>
                    {headCell.label}
                    {orderBy === headCell.id ? <Box component='span'></Box> : null}
                  </>
                  : <Skeleton animation="wave" width='100%' />
                }
              </TableSortLabel>
            </TableCell>;
          }
          )}
        </TableRow>
      </TableHead >
    );
  }

  EnhancedTableHead.propTypes = {
    numSelected: PropTypes.number,
    onRequestSort: PropTypes.func,
    order: PropTypes.oneOf(['asc', 'desc']),
    orderBy: PropTypes.string,
    rowCount: PropTypes.number,
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

  function descendingComparator (a, b, orderBy) {
    if (b[orderBy] < a[orderBy]) {
      return -1;
    }

    if (b[orderBy] > a[orderBy]) {
      return 1;
    }

    return 0;
  }

  function getComparator (order, orderBy) {
    return order === 'desc'
      ? (a, b) => descendingComparator(a, b, orderBy)
      : (a, b) => -descendingComparator(a, b, orderBy);
  }

  function stableSort (array, comparator) {
    const stabilizedThis = array?.map((el, index) => [el, index]);

    stabilizedThis?.sort((a, b) => {
      const order = comparator(a[0], b[0]);

      if (order !== 0) return order;

      return a[1] - b[1];
    });

    return stabilizedThis?.map((el) => el[0]);
  }

  useEffect(() => {
    if (filters) {
      const filtered = MultiFilterArray(rows, filters);
      const keys = Object.keys(rangeFilters || {});

      const filteredTest = filtered.filter((row) => {
        return keys.every((key) => {
          if (
            row[key] >= rangeFilters[key].values[0] && row[key] <= rangeFilters[key].values[1]
          ) return row;
        });
      }
      );

      setFilteredItems(filteredTest);
    }
  }, [filters, rangeFilters, rows]);

  function onFilterRemove (filterName) {
    const filtersToWork = { ...filters };

    delete filtersToWork[filterName];
    setFilters(filtersToWork);
  }

  function onFilterSizeRemove (filterName) {
    const rangeFiltersToWork = { ...rangeFilters };

    rangeFiltersToWork[filterName].values = [rangeFiltersToWork[filterName].min, rangeFiltersToWork[filterName].max];
    setRangeFilters(rangeFiltersToWork);
  }

  return (
    <Box sx={{ width: '100%' }}>
      <ConfirmDialog
        open={dialogOpen}
        handleClose={() => setDialogOpen(false)}
        onConfirm={() => {
          !!onDelete && onDelete(deleteItemId);
          setDialogOpen(false);
        } }
        message={dialogMessage}
      />

      <Notification />
      <Paper sx={{ width: '100%', mb: 2 }}>
        <Box className='tableChips'>
          <Box>
            {Object.keys(filters || {})?.map((x) => {
              if (filters[x]) return <Chip key={x} label={x} onDelete={() => onFilterRemove(x)} />;
            })}
            {Object.keys(rangeFilters || {})?.map((x) => {
              if (JSON.stringify(rangeFilters[x].values) !== JSON.stringify([rangeFilters[x].min, rangeFilters[x].max])) return <Chip key={x} label={x} onDelete={() => onFilterSizeRemove(x)} />;
            })}

          </Box>
          {noPagination
            ? null
            : loaded
              ? <>
                <TablePagination
                  showFirstButton
                  showLastButton
                  component='div'
                  sx={{ marginLeft: 'auto' }}
                  rowsPerPageOptions={[5, 10, 25]}
                  count={filteredItems ? filteredItems?.length : rows?.length}
                  rowsPerPage={rowsPerPage}
                  page={page}
                  onPageChange={handleChangePage}
                  onRowsPerPageChange={handleChangeRowsPerPage}
                  labelRowsPerPage={'Mostrar'}
                  labelDisplayedRows={({ count, from, to }) => {
                    return `${from} - ${to} de ${count}`;
                  }}
                />
                <Box>
                  <Tooltip title='Filtrar tabela'>
                    <IconButton style={{ marginLeft: 'auto' }} onClick={(e) => setAnchorEl(e.currentTarget)}>
                      <Filter size={20} strokeWidth={1.5} />
                    </IconButton>
                  </Tooltip>
                </Box>
              </>
              : <Skeleton animation="wave" width='100%' />
          }
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
                  <Grid id='align' container Item sx={{ borderBottom: '1px solid', borderColor: 'divider' }}>
                    <Switch checked={!cellsFilter.find(item => item.show === false)} onClick={() => showAllHeaders()} />Mostrar todas
                  </Grid>
                  {cellsFilter.map((headCell, i) => {
                    return <Grid id='align' container item key={headCell.label} >
                      <Switch checked={headCell.show} onClick={() => OnFilterChange(i)} />{headCell.label}
                    </Grid>;
                  })}
                </Grid>
              </Grid>
            </Box>
          </Popover>
        </Box>
        <TableContainer>
          <Table aria-labelledby='tableTitle'>
            <EnhancedTableHead
              numSelected={selected?.length}
              order={order}
              orderBy={orderBy}
              onRequestSort={handleRequestSort}
              rowCount={filteredItems?.length}
            />

            <TableBody>
              {(stableSort(filteredItems, getComparator(order, orderBy)))
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((row, index) => {
                  const isItemSelected = isSelected(row.id);
                  const labelId = `enhanced-table-checkbox-${index}`;

                  return (
                    <TableRow
                      hover
                      onClick={(event) => handleClick(event, row.id)}
                      role='checkbox'
                      aria-checked={isItemSelected}
                      tabIndex={-1}
                      key={row.id}
                      selected={isItemSelected}
                    >
                      {cellsFilter.map((headCell, index2) => {
                        return headCell.show && <TableCell
                          id={labelId}
                          key={headCell.id}
                          align={headCell.numeric ? 'right' : 'left'}
                          padding={
                            headCell.disablePadding ? 'none' : 'normal'
                          }
                          sx={{
                            borderRight: headCell.borderRight && '1px solid var(--grayEdges)',
                            borderLeft: headCell.borderLeft && '1px solid var(--grayEdges)'
                          }}
                        >
                          {loaded
                            ? <>
                              {headCell.id === 'actions' || headCell.id === 'actionsConf'
                                ? (
                                  <ButtonGroup color='link.main'>
                                    {headCell.id !== 'actionsConf' &&
                                        <>
                                          {editRoute &&
                                            <Tooltip title={'Editar'}>
                                              <Box style={{ color: 'red' }}>
                                                <IconButton
                                                  onClick={() => editRoute && Router.push(`${editRoute}${row.id}`)}>
                                                  <EditOutlined
                                                    fontSize="small"
                                                    color={'primary'}
                                                  />
                                                </IconButton>
                                              </Box>
                                            </Tooltip>
                                          }
                                        </>
                                    }
                                    {!!onDeleteClick && <Tooltip title={'Remover'}>
                                      <IconButton onClick={() => onDeleteClick(row)} >
                                        <DeleteOutline
                                          color={'primary'}
                                          fontSize="small"
                                        />
                                      </IconButton>
                                    </Tooltip>}
                                  </ButtonGroup>
                                )
                                : (
                                  <Box
                                    onClick={() =>
                                      clickRoute && Router.route === routes.private.projects && row.id.includes('urn:ngsi-ld:Budget:')
                                        ? Router.push(`${routes.private.budget}${row[actionId || 'id']}`)
                                        : Router.push(`${clickRoute}${row[actionId || 'id']}`)
                                    }
                                    color={index2 === 0 && 'primary.main'}
                                    sx={{ cursor: clickRoute && 'pointer' }}
                                  >
                                    {FilterItem(
                                      data,
                                      row,
                                      headCell.id
                                    )}
                                  </Box>
                                )}
                            </>
                            : <Skeleton animation="wave" width='100%' />}
                        </TableCell>;
                      })}
                    </TableRow>
                  );
                })}
              {(page > 0 ? Math.max(0, (1 + page) * rowsPerPage - filteredItems?.length) : 0) > 0 && (
                <TableRow>
                  <TableCell colSpan={6} />
                </TableRow>
              )}
            </TableBody>

          </Table>
        </TableContainer>
      </Paper>
    </Box >
  );
};

export default AdvancedTable;
