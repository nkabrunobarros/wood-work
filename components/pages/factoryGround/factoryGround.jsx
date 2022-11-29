/* eslint-disable react/prop-types */
import { Box, Grid, TablePagination, TableSortLabel } from '@mui/material';
import { Edit2, X } from 'lucide-react';
import React, { useState } from 'react';
import AdvancedTable from '../../advancedTable/AdvancedTable';
// import CustomBreadcrumbs from '../../breadcrumbs';
import Content from '../../content/content';

const FactoryGround = ({ ...props }) => {
    const {  headCells, headCellsUpper } = props;
    const [activeRow, setActiveRow] = useState(0);

    const rows = [
        { id: Math.random()},
        { id: Math.random()},
        { id: Math.random()},
        { id: Math.random()},
        { id: Math.random()},
        { id: Math.random()},
        { id: Math.random()},
        { id: Math.random()},
        { id: Math.random()},
        { id: Math.random()},
        { id: Math.random()},
        { id: Math.random()},
        ];

    const cellProps = {
        md: 1,
        sm: 1,
        xs: 1,
        paddingTop: '1rem',
        paddingBottom: '1rem',
        className: 'fullCenter',
        container: true
    };

    const rowProps = {
        md: 12,
        sm: 12,
        xs: 12,
        sx: { cursor: 'pointer' },
        className: 'hoverOpacity',
        container: true
    };

    return <>
        {/* <CustomBreadcrumbs path={breadcrumbsPath} /> */}
        <Content>
             <AdvancedTable rows={rows} headCells={headCells} headCellsUpper={headCellsUpper} /> 
            <Grid container sx={{ minWidth: '1024px', overflow: 'scroll', display: 'none'}}>
                {/* Headers */}
                <Grid container md={12} sm={12} xs={12} bgcolor={'lightGray.edges'}>
                    <Grid {...cellProps}><Box className='fullCenter' sx={{  width: '100%', borderRight: '1px solid' }}><TableSortLabel active={false} direction='desc'> {headCells[0].label} </TableSortLabel></Box></Grid>
                    <Grid {...cellProps}><Box className='fullCenter' sx={{  width: '100%', borderRight: '1px solid' }}><TableSortLabel active={false} direction='desc'> {headCells[1].label} </TableSortLabel></Box></Grid>
                    <Grid {...cellProps}><Box className='fullCenter' sx={{  width: '100%', borderRight: '1px solid' }}><TableSortLabel active={false} direction='desc'> {headCells[2].label} </TableSortLabel></Box></Grid>
                    <Grid {...cellProps}><Box className='fullCenter' sx={{  width: '100%', borderRight: '1px solid' }}><TableSortLabel active={false} direction='desc'> {headCells[3].label} </TableSortLabel></Box></Grid>
                    <Grid {...cellProps}><Box className='fullCenter' sx={{  width: '100%', borderRight: '1px solid' }}><TableSortLabel active={false} direction='desc'> {headCells[4].label} </TableSortLabel></Box></Grid>
                    <Grid {...cellProps}><Box className='fullCenter' sx={{  width: '100%', borderRight: '1px solid' }}><TableSortLabel active={false} direction='desc'> {headCells[5].label} </TableSortLabel></Box></Grid>
                    <Grid {...cellProps}><Box className='fullCenter' sx={{  width: '100%', borderRight: '1px solid' }}><TableSortLabel active={false} direction='desc'> {headCells[6].label} </TableSortLabel></Box></Grid>
                    <Grid {...cellProps}><Box className='fullCenter' sx={{  width: '100%', borderRight: '1px solid' }}><TableSortLabel active={false} direction='desc'> {headCells[7].label} </TableSortLabel></Box></Grid>
                    <Grid {...cellProps}><Box className='fullCenter' sx={{  width: '100%', borderRight: '1px solid' }}><TableSortLabel active={false} direction='desc'> {headCells[8].label} </TableSortLabel></Box></Grid>
                    <Grid {...cellProps}><Box className='fullCenter' sx={{  width: '100%', borderRight: '1px solid' }}><TableSortLabel active={false} direction='desc'> {headCells[9].label} </TableSortLabel></Box></Grid>
                    <Grid {...cellProps}><Box className='fullCenter' sx={{  width: '100%', borderRight: '1px solid' }}><TableSortLabel active={false} direction='desc'> {headCells[10].label} </TableSortLabel></Box></Grid>
                    <Grid {...cellProps}><Box className='fullCenter' sx={{  width: '100%', borderRight: '0px solid' }}><TableSortLabel active={false} direction='desc'> <Edit2 /> </TableSortLabel></Box></Grid>
                </Grid>
                <Grid container md={12} sm={12} xs={12}>
                    {[...Array(10)].map((x, rowIndex) => {
                        return (
                            <Grid
                                {...rowProps}
                                key={rowIndex}
                                bgcolor={rowIndex % 2 !== 0 ? (rowIndex === activeRow ? 'primary.main' : "lightGray.edges") : (rowIndex === activeRow && "primary.main")}
                                onClick={() => rowIndex === activeRow ? setActiveRow() : setActiveRow(rowIndex)}
                            >
                                <Grid {...cellProps} ></Grid>
                                <Grid {...cellProps} ></Grid>
                                <Grid {...cellProps} ></Grid>
                                <Grid {...cellProps} ></Grid>
                                <Grid {...cellProps} ></Grid>
                                <Grid {...cellProps} ></Grid>
                                <Grid {...cellProps} ></Grid>
                                <Grid {...cellProps} ></Grid>
                                <Grid {...cellProps} ></Grid>
                                <Grid {...cellProps} ><X /></Grid>
                                <Grid {...cellProps} ></Grid>
                                <Grid {...cellProps} ></Grid>
                            </Grid>
                        );
                    })}
                    <Grid
                        {...rowProps}>
                            <TablePagination
                            showFirstButton
                            showLastButton
                            component='div'
                            sx={{ marginLeft: 'auto' }}
                            rowsPerPageOptions={[5, 10, 25]}
                            count={50}
                            // count={filteredItems ? filteredItems?.length : rows?.length}
                            rowsPerPage={10}
                            // page={page}
                            // onPageChange={handleChangePage}
                            // onRowsPerPageChange={handleChangeRowsPerPage}
                            labelRowsPerPage={'Mostrar'}
                        />
                    </Grid>
                </Grid>
            </Grid>
        </Content>
    </>;
};


export default FactoryGround;