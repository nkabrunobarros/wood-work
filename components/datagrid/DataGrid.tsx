import React, { MouseEventHandler } from 'react'
import Router from 'next/router'
import Link from 'next/link'

import { Button, CircularProgress, Typography } from '@mui/material'
import MUIDataTable from 'mui-datatables'
import { ThemeProvider, withStyles } from '@mui/styles'
import { createTheme } from '@mui/material/styles'
import { graphql } from 'lib/api'
import withTranslation from 'next-translate/withTranslation'
import CustomToolbar from './CustomToolbar'
import { ExportToCsv } from 'export-to-csv'
import IconButton from '@mui/material/IconButton'
import { Alert } from '@material-tailwind/react'
import { I18n, Translate } from 'next-translate'
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import { AlertError } from '@components/Alerts'

type Options = {
  filter: boolean
  sort: boolean
  empty: boolean
  custom?: boolean
  filterType?: string
  setCellHeaderProps: (() => void)
  customBodyRenderLite: ((dataIndex: number) => void)
}

type Column = {
  name: string
  label: string
  options: Options
  type?: string
  icon?: any
  onClick?: any
}

type Restriction = {
  field: string
  value: string
}

type Sort = {
  name: string
  direction: string
}

type Filter = {
  field: string
  value: string
}


type DataGridProps = {
  title: string
  entity: string
  entityPlural: string
  editAction: string
  newAction: string
  deleteAction: string
  onRowClickAction: string
  columns: Column[]
  restrictions: Restriction[]
  cellRenders: CellRender[]
  i18n: I18n
  otherFields: string[]
  newClickAction: MouseEventHandler
};

type CellRender = {
  name: string;
  render: CallableFunction
}

type DataGridState = {
  page: number
  count: number
  rowsPerPage: number
  columns: Column[]
  isLoading: boolean
  error: string
  data: any[]
  sortOrder?: Sort
  filterList?: Filter[]
  otherFields: string[]
};

function processColumnName(column: string, entities: number): string {
  if(column.indexOf('.') > 0 || entities > 0) {
    if(column.indexOf('.') > 0){
      return column.substring(0, column.indexOf('.')) + '{' + processColumnName(column.substring(column.indexOf('.') + 1), entities+1)
    }
    else return column + "}".repeat(entities)
  }
  else return column
}

function getAtributeValue(r: any, name: string) {
  if(name.indexOf('.')>0)
    return getAtributeValue(r[name.substring(0, name.indexOf('.'))], name.substring(name.indexOf('.') + 1))
  else return r && r[name] ? r[name] : ''
}

function processRestriction(field: string, value: string, entities: number): string {

  if(field.indexOf('.') > 0 || entities > 0) {
    if(field.indexOf('.') > 0){
      return field.substring(0, field.indexOf('.')) + ' : {' + processRestriction(field.substring(field.indexOf('.') + 1), value, entities+1)
    }
    else return field + ': { equals: "' + value  + '"}' + '}'.repeat(entities)
  }
  else return field + ': { equals: "' + value + '"}'
}

function processSort(field: string, value: string, entities: number): string {

  if(field.indexOf('.') > 0 || entities > 0) {
    if(field.indexOf('.') > 0){
      return field.substring(0, field.indexOf('.')) + ' : {' + processSort(field.substring(field.indexOf('.') + 1), value, entities+1)
    }
    else return field + ': ' + value  + '}'.repeat(entities)
  }
  else return field + ': ' + value
}

class DataGrid extends React.Component<DataGridProps, DataGridState> {

  entity: string
  entityPlural: string
  title: string
  editAction: string
  newAction: string
  newClickAction: MouseEventHandler
  onRowClickAction: string
  columns: Column[]
  restrictions: Restriction[]
  cellRenders: CellRender[]
  t: Translate
  otherFields: string[]

  constructor (props: DataGridProps) {
    super(props)
    this.entity = props.entity
    this.entityPlural = props.entityPlural ? props.entityPlural : props.entity + 's'
    this.title = props.title
    this.editAction = props.editAction
    this.newAction = props.newAction
    this.newClickAction = props.newClickAction
    this.t = props.i18n.t
    this.columns = props.columns.map((c) => {
      return { ...c, options: { ...c.options,
        setCellHeaderProps: c.options.setCellHeaderProps ? c.options.setCellHeaderProps : () => ({ style: { zIndex: '40' } }),
        customBodyRenderLite: c.icon ? (dataIndex: number) => {const { data } = this.state;
        return <IconButton onClick={() => { c.onClick(data[dataIndex]) }}>{c.icon}</IconButton> } : null
      }}
    })
    this.onRowClickAction = props.onRowClickAction
    this.restrictions = props.restrictions
    this.cellRenders = props.cellRenders

    if (props.editAction) {
      this.columns.push({
        name: 'Edit',
        label: ' ',
        options: {
          filter: false,
          sort: false,
          empty: true,
          setCellHeaderProps: () => ({ style: { width: '1px', zIndex: '40' } }),
          customBodyRenderLite: (dataIndex: number) => {
            const { data } = this.state
            return (
              <Link href={`${this.editAction}${this.editAction.indexOf('?') > 0 ? !this.editAction.endsWith('=') ? '&id=' : '' : '/'}${data[dataIndex]?.id}`}>
                <IconButton>
                  <EditOutlinedIcon className="h-5 w-5 fill-current text-blue-800"/>
                </IconButton>
              </Link>
            )
          }
        }
      })
    }

    if (props.deleteAction) {
      this.columns.push({
        name: 'Delete',
        label: ' ',
        options: {
          filter: false,
          sort: false,
          empty: true,
          setCellHeaderProps: () => ({ style: { width: '1px', zIndex: '40' } }),
          customBodyRenderLite: (dataIndex) => {
            return (<IconButton onClick={async () => {
              this.setState({ isLoading: true, error: '' })
              const { data } = this.state
              const aux = JSON.stringify({
                query: 'mutation ($id: String!) {remove' + this.entity.charAt(0).toUpperCase() + this.entity.slice(1) + '( id: $id ){ id } }', variables: { id: data[dataIndex]?.id }
              })
              const res = await graphql(aux)
              if (res?.error) { this.setState({ error: res.error.message ? res.error.message : 'status-' +res.error.code, isLoading: false }) }
              else this.getData(0, this.state.sortOrder, this.state.filterList, this.state.error)
            }}>
                <DeleteOutlineOutlinedIcon className="h-5 w-5 fill-current text-blue-800"/>
              </IconButton>
            )
          }
        }
      })
    }

    this.state = {
      page: 0,
      count: 1,
      rowsPerPage: 10,
      data: [[]],
      columns: this.columns,
      isLoading: false,
      error: '',
      otherFields: []
    }
  }

  componentDidMount () {
    this.getData(0, null, null, '')
  }

  doGetData = async (page: number, sortOrder: Sort, filterList: any[]) => {
    const queryHeader = (page !== null ? 'query page($take: Float, $skip: Float) {' : 'query all {') + this.entityPlural + (page !== null ? '(take: $take, skip: $skip' : '(')
    const orderBy = sortOrder && sortOrder.name ? '{' + processSort(sortOrder.name, sortOrder.direction.toUpperCase(), 0) + '}' : ''
    let where = filterList
      ? `${filterList.map((f: any[], index: number) => {
        debugger
        return f && f.length ? (this.columns[index].name.indexOf('.') > 0
            ? this.columns[index].name.substring(0, this.columns[index].name.indexOf('.')) + ': {' + this.columns[index].name.substring(this.columns[index].name.indexOf('.') + 1)
          : this.columns[index].name)
           + `: { ${['number', 'date'].includes(this.columns[index].type) ? ( f[0].indexOf('<')>=0 ? 'lte' : f[0].indexOf('>')>=0 ? 'gte' : 'equals' ) : ['boolean', 'number', 'date', 'enum'].includes(this.columns[index].type) ? 'equals' : 'contains'}: ` +
          (['boolean', 'number', 'enum'].includes(this.columns[index].type) ? ( f[0].match('[<>]')?.length>0 ? f[0].substring(f[0].indexOf(f[0].match('[<>]')[0])+1) : f[0] )  : ('"' + f[0] + '"')) +
          (this.columns[index].name.indexOf('.') > 0 ? '}}' : '}')
          : ''
      }).filter((f: string) => f !== '')}` : ''
    where += this.restrictions ? `${this.restrictions.map((f) => { return processRestriction(f.field, f.value, 0) })}` : ''
    let columns = ''
    this.state.columns.forEach((c) => { columns = columns + (c.name !== 'Edit' && c.name !== 'Delete' && !c.options.custom ? ' ' + processColumnName(c.name,0) : '') })
    this.props.otherFields?.forEach((c) => { columns = columns + (c.indexOf('.') > 0 ? c.substring(0, c.indexOf('.')) + '{' + c.substring(c.indexOf('.') + 1) + '}' : c) })
    const variables = page !== null ? { take: this.state.rowsPerPage, skip: page * this.state.rowsPerPage } : null
    const data = JSON.stringify({
      query: queryHeader + `${orderBy !== null ? ', orderBy: [' + orderBy + ']' : ''} ${where ? ', where: {' + where + '}' : ''}){
            count data { id${columns}}}}`,
      variables: variables
    })
    const res = await graphql(data)
    // se não tem result, provavelmente perdeu sessão e reencaminhou para login
    if (res[this.entityPlural]?.data) {
      for (const c in this.columns) {
        if (this.columns[c].name.indexOf('.') > 0) {
          res[this.entityPlural].data.map((r: { [x: string]: { [x: string]: any } }) => {
            r[this.columns[c].name] = getAtributeValue(r, this.columns[c].name)
            return { ...r }
          })
        }
      }

      for (const r in this.cellRenders) {
        res[this.entityPlural].data = res[this.entityPlural].data.map((c: { [x: string]: any }) => {
          const f = this.cellRenders[r]
          c[f.name] = f.render(c)
          return { ...c }
        })
      }
    }
    return res
  }

  // get data
  getData = async (page: number, sortOrder: Sort, filterList: any[], error: string) => {
    this.setState({ isLoading: true })
    const res = await this.doGetData(page, sortOrder, filterList)
    if (res && res[this.entityPlural]?.data) {
      this.setState({ isLoading: false, data: res[this.entityPlural].data, count: res[this.entityPlural].count, page: page, sortOrder: sortOrder, filterList: filterList, error: error })
    } else if (res?.error) {
      this.setState({ isLoading: false, data: [[<Alert key="alert-error" color="red">{this.t(res.data.error.message ? res.data.error.message : 'common:status-' + res.data.error.code)}</Alert>]], count: 0, page: 0, sortOrder: sortOrder, filterList: filterList }) 
    }
  };

  handleFilterSubmit = async (applyFilters: { (): any; (): any }) => {
    const filterList = applyFilters()
    this.getData(0, this.state.sortOrder, filterList, '')
  };

  exportCsv = async () => {
    const res = await this.doGetData(null, this.state.sortOrder, this.state.filterList)
    const options = {
      fieldSeparator: ';',
      quoteStrings: '"',
      decimalSeparator: '.',
      showLabels: true,
      showTitle: true,
      title: this.title,
      useTextFile: false,
      useBom: true,
      headers: this.state.columns.map((c) => { return c.label })
    }
    const csvExporter = new ExportToCsv(options)
    csvExporter.generateCsv(res[this.entityPlural].data.map((r: { id: any }) => { delete r.id; return r }))
  }

  reRender = () => {
    this.forceUpdate();
  };

  render () {
    const { data, page, count, isLoading, rowsPerPage, error } = this.state

    const options = {
      search: false,
      download: false,
      print: false,
      responsive: 'vertical',
      serverSide: true,
      count: count,
      page: page,
      rowsPerPage: rowsPerPage,
      rowsPerPageOptions: [],
      customToolbar: () => {
        return (
          <CustomToolbar newUrl={this.newAction ? this.newAction : this.editAction} newAction={this.newClickAction} exportCsv={this.exportCsv} 
            downloadCsvTitle={this.t('common:download-csv')} newItemTitle={this.t('common:editar-registo')}/>
        )
      },
      confirmFilters: true,
      customFilterDialogFooter: (_currentFilterList: any, applyNewFilters: any) => {
        return (
          <div style={{ marginTop: '40px' }}>
            <Button variant="outlined" onClick={() => this.handleFilterSubmit(applyNewFilters)}>{this.t('common:aplicar-filtros')}</Button>
          </div>
        )
      },
      onFilterChange: (_column: any, filterList: any, type: string) => {
        if (type === 'chip') {
          const newFilters = () => (filterList)
          this.handleFilterSubmit(newFilters)
        }
      },
      onRowClick: (rowMeta: { dataIndex: number, rowIndex: number }) => {
        this.onRowClickAction && Router.push(this.onRowClickAction + '/' + this.state.data[rowMeta.dataIndex].id)
      },
      onRowsDelete: (rowsDeleted: { data: any[] }) => {
        if (!this.state.isLoading) { this.setState({ isLoading: true }) }
        rowsDeleted.data.forEach(async (r: { dataIndex: string | number }) => {
          const aux = JSON.stringify({
            query: 'mutation ($id: String!) {remove' + this.entity.charAt(0).toUpperCase() + this.entity.slice(1) + '( id: $id ){ id } }', variables: { id: data[r.dataIndex].id }
          })
          await graphql(aux)
          this.getData(0, this.state.sortOrder, this.state.filterList, '')
        })
      },
      onTableChange: (action: any, tableState: { page: any; sortOrder: any; filterList: any }) => {
        // a developer could react to change on an action basis or
        // examine the state as a whole and do whatever they want
        switch (action) {
          case 'changePage':
            this.getData(tableState.page, tableState.sortOrder, tableState.filterList, '')
            break
          case 'sort':
            this.getData(tableState.page, tableState.sortOrder, tableState.filterList, '')
            break
        }
      },
      textLabels: {
        body: {
          noMatch: this.t('common:sem-registos'),
          toolTip: this.t('common:ordenar'),
          columnHeaderTooltip: (coluna: { label: any }) => this.t('common:ordenar-por', { coluna: coluna.label })
        },
        pagination: {
          next: this.t('common:proxima-pagina'),
          previous: this.t('common:pagina-anterior'),
          rowsPerPage: this.t('common:registos-por-pagina'),
          displayRows: this.t('common:de')
        },
        toolbar: {
          search: this.t('common:pesquisa'),
          downloadCsv: this.t('common:download-csv'),
          print: this.t('common:imprimir'),
          viewColumns: this.t('common:ver-colunas'),
          filterTable: this.t('common:filtrar-tabela')
        },
        filter: {
          all: this.t('common:todos'),
          title: this.t('common:filtros'),
          reset: this.t('common:redefinir')
        },
        viewColumns: {
          title: this.t('common:mostrar-colunas'),
          titleAria: this.t('common:mostrar-esconder-colunas')
        },
        selectedRows: {
          text: this.t('common:linhas-selecionadas'),
          delete: this.t('common:remover'),
          deleteAria: this.t('common:remover-linhas-seleccionadas')
        }
      },
      setTableProps: () => {
        return { size: 'small'}
      }
    }

    const theme = createTheme({ components: { MuiTableCell: { defaultProps: { sx: { padding: '3px 6px' } } } } })

    if (typeof window !== 'undefined') {
      return (
        <>
        <ThemeProvider theme={theme}>
          {error && <div className="p-2 bg-white"><AlertError message={error} fallbackMessage='erro-inesperado'/></div>}
          <MUIDataTable
            title={
              isLoading
                ? <><CircularProgress size={20} style={{ marginLeft: 250, position: 'relative', top: 30 }}/> <Typography variant="h6">{this.title}</Typography></>
                : <Typography variant="h6">{this.title}</Typography>
            }
            data={data} columns={this.state.columns} options={options} padding='normal'
          />
        </ThemeProvider>
        </>
      )
    } else return ''
  }
}

const defaultToolbarStyles = {
  iconButton: {
  }
}

export default withStyles(defaultToolbarStyles)(withTranslation(DataGrid))