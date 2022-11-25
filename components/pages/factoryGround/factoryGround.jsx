/* eslint-disable react/prop-types */
import { Box, Grid } from '@mui/material';
import { X } from 'lucide-react';
import React, { useState } from 'react';
// import AdvancedTable from '../../advancedTable/AdvancedTable';
// import CustomBreadcrumbs from '../../breadcrumbs';
import Content from '../../content/content';

const FactoryGround = ({ ...props }) => {
    const {  headCells } = props;
    const [activeRow, setActiveRow] = useState(0);

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
            {/* <AdvancedTable rows={[{}]} headCells={headCells} headCellsUpper={headCellsUpper} /> */}
            <Grid container>
                {/* Headers */}
                <Grid container md={12} sm={12} xs={12} bgcolor={'lightGray.edges'}>
                    <Grid {...cellProps}><Box className='fullCenter' sx={{  width: '100%', borderRight: '1px solid' }}>{headCells[0].label}</Box></Grid>
                    <Grid {...cellProps}><Box className='fullCenter' sx={{  width: '100%', borderRight: '1px solid' }}>{headCells[1].label}</Box></Grid>
                    <Grid {...cellProps}><Box className='fullCenter' sx={{  width: '100%', borderRight: '1px solid' }}>{headCells[2].label}</Box></Grid>
                    <Grid {...cellProps}><Box className='fullCenter' sx={{  width: '100%', borderRight: '1px solid' }}>{headCells[3].label}</Box></Grid>
                    <Grid {...cellProps}><Box className='fullCenter' sx={{  width: '100%', borderRight: '1px solid' }}>{headCells[4].label}</Box></Grid>
                    <Grid {...cellProps}><Box className='fullCenter' sx={{  width: '100%', borderRight: '1px solid' }}>{headCells[5].label}</Box></Grid>
                    <Grid {...cellProps}><Box className='fullCenter' sx={{  width: '100%', borderRight: '1px solid' }}>{headCells[6].label}</Box></Grid>
                    <Grid {...cellProps}><Box className='fullCenter' sx={{  width: '100%', borderRight: '1px solid' }}>{headCells[7].label}</Box></Grid>
                    <Grid {...cellProps}><Box className='fullCenter' sx={{  width: '100%', borderRight: '1px solid' }}>{headCells[8].label}</Box></Grid>
                    <Grid {...cellProps}><Box className='fullCenter' sx={{  width: '100%', borderRight: '1px solid' }}>{headCells[9].label}</Box></Grid>
                    <Grid {...cellProps}><Box className='fullCenter' sx={{  width: '100%', borderRight: '1px solid' }}>{headCells[10].label}</Box></Grid>
                    <Grid {...cellProps}><Box className='fullCenter' sx={{  width: '100%', borderRight: '0px solid' }}>{headCells[11].label}</Box></Grid>
                </Grid>
                <Grid container md={12} sm={12} xs={12}>
                    {[...Array(5)].map((x, rowIndex) => {
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
                </Grid>
            </Grid>
        </Content>
    </>;
};


export default FactoryGround;