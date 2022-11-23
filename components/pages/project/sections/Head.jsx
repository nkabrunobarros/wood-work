import { Tag } from "lucide-react";
import React from "react";
import PrimaryBtn from "../../../buttons/primaryBtn";

//  PropTypes
import { Box, Grid, Tooltip, Typography } from "@mui/material";
import PropTypes from 'prop-types';
import routes from '../../../../navigation/routes';
import AdvancedTable from "../../../advancedTable/AdvancedTable";
import IsInternal from "../../../utils/IsInternal";


const Head = (props) => {
    const {order, pageProps, orderDetail, headCellsOrderDetail, headCellsUpperOrderDetail} = props;
    const internalPOV = IsInternal(JSON.parse(localStorage.getItem('user')).perfil.descricao);

    return <>
      <Box id='pad'>
          <Box style={{ display: 'flex', marginBottom: '1rem' }}>
            <Typography className='headerTitleXl'>Encomenda {order.name.value}</Typography>
            <Box style={{ marginLeft: 'auto' }}>
              <PrimaryBtn
                hidden={!internalPOV}
                icon={
                  <Tag
                    strokeWidth={pageProps.globalVars.iconStrokeWidth}
                    size={pageProps.globalVars.iconSize}
                  />
                }
                text='Gerar Etiquetas'
              />
            </Box>
          </Box>
          {internalPOV && (
              <Grid container md={12}>
                <Grid md={4} container>
                  <Grid md={12} sm={6}>
                    <Box  style={{ width: 'fit-content'}}>
                      <Typography color={"lightTextSm.main"} >Cliente</Typography>
                      <Tooltip title='Ver cliente'>
                        <a href={routes.private.internal.client + order.orderBy.object.id} target="_blank"  rel="noreferrer" > 
                          <Typography color={"primary.main"}>{order.orderBy.object.legalName.value}</Typography>
                        </a>
                      </Tooltip>
                    </Box>
                  </Grid>
                  <Grid md={12} sm={6}>
                    <Typography color={"lightTextSm.main"} >Produto</Typography>
                    <Typography color={"lightTextSm.black"} >{order.name.value}</Typography>
                  </Grid>
                </Grid>
                <Grid
                  md={8}
                  container>
                  <AdvancedTable
                    noPagination
                    rows={orderDetail}
                    headCells={headCellsOrderDetail}
                    headCellsUpper={headCellsUpperOrderDetail}
                  />
                </Grid>
              </Grid>
          )}
        </Box></>;
};

Head.propTypes = {
    pageProps: PropTypes.any,
    order: PropTypes.object,
    orderDetail: PropTypes.array,
    headCellsOrderDetail: PropTypes.array,
    headCellsUpperOrderDetail: PropTypes.array
};

export default Head;