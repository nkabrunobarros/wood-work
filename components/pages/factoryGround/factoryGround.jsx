import { Box, Grid } from '@mui/material';
import PropTypes from 'prop-types';
import React, { useState } from 'react';
// import AdvancedTable from '../../advancedTable/AdvancedTable';
// import CustomBreadcrumbs from '../../breadcrumbs';
import Content from '../../content/content';

const FactoryGround = ({ ...props }) => {
    const { breadcrumbsPath, headCells, headCellsUpper } = props;
    const [activeRow, setActiveRow] = useState(0);

    return <>
        {/* <CustomBreadcrumbs path={breadcrumbsPath} /> */}
        <Content>
            {/* <AdvancedTable rows={[{}]} headCells={headCells} headCellsUpper={headCellsUpper} /> */}
            <Grid container>
                {/* Headers */}
                <Grid container md={12} sm={12} xs={12} bgcolor={'lightGray.edges'} >
                    {headCells.map((cell, i) => <Grid
                        key={cell.id}
                        container
                        bgcolor={'lightGray.edges'}
                        md={12 / Object.keys(headCells).length}
                        sm={12 / Object.keys(headCells).length}
                        xs={12 / Object.keys(headCells).length}
                        sx={{
                            paddingTop: '1rem',
                            paddingBottom: '1rem'
                        }}
                    >
                        <Box sx={{
                            display: 'flex',
                            justifyContent: 'center', width: '100%', borderRight: i !== Object.keys(headCells).length - 1 ? '1px solid' : null
                        }}>{cell.label}</Box>
                    </Grid>
                    )}
                </Grid>
                <Grid container md={12} sm={12} xs={12}>
                    {[...Array(5)].map((x, rowIndex) => {
                        return (
                            <Grid
                                container
                                md={12}
                                sm={12}
                                xs={12}
                                key={rowIndex}
                                bgcolor={rowIndex % 2 !== 0 ? (rowIndex === activeRow ? 'primary.main' : "lightGray.edges") : (rowIndex === activeRow && "primary.main")}
                                className='hoverOpacity'
                                sx={{ cursor: 'pointer' }}
                                onClick={() => rowIndex === activeRow ? setActiveRow() : setActiveRow(rowIndex)}
                            >
                                {headCells.map((cell, i) => <Grid key={i} sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', minHeight: '50px' }} container md={12 / Object.keys(headCells).length} sm={12 / Object.keys(headCells).length} xs={12 / Object.keys(headCells).length}>{i + 1}</Grid>)}
                            </Grid>
                        );

                    })}
                </Grid>
            </Grid>
        </Content>
    </>;
};

FactoryGround.propTypes = {
    breadcrumbsPath: PropTypes.any,
    headCells: PropTypes.any,
    headCellsUpper: PropTypes.any
};

export default FactoryGround;